/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-function-return-type */
import { Machine, assign } from "xstate";
import {
  IRootFSMContext,
  RootFSMEvent,
  IRootFSMStateSchema
} from "./rootFSMInterfaces";
import { rootFSMConf, rootFSMFunctions } from "./rootFSMConf";
import { pinResetFSM } from "../pin-reset/pinResetFSM";
import { insertPinFSM } from "../insert-pin/insertPinFSM";
import { InsertAndResetPinFSM } from "../insert-and-reset-pin/InsertAndResetPinFSM";
import { changeEnvFSM } from "../change-env/changeEnvFSM";
import { upgradeFSM } from "../upgrade/upgradeFSM";

export const rootFSM = Machine<
  IRootFSMContext,
  IRootFSMStateSchema,
  RootFSMEvent
>({
  id: "root",
  initial: "initialState",
  context: {
    userId: "",
    e2eContractID: undefined,
    phoneNumber: undefined,
    email: undefined,
    goToWaitingPin: false,
    configFile: undefined
  },
  states: {
    initialState: {
      on: {
        "": {
          target: "home"
        }
      },
      invoke: {
        src: (context: IRootFSMContext, event) => rootFSMFunctions.getCert(),
        onDone: {
          target: "getConfigFileByEnv"
        },
        onError: {
          target: "authError",
          actions: (context, event) =>
            console.log("Authentication Failed, cause: certificate invalid")
        }
      }
    },
    getConfigFileByEnv: {
      invoke: {
        src: (context, event) => rootFSMFunctions.getConfigFileByEnv(),
        onDone: {
          target: "stopAudioState",
          actions: [
            assign({
              configFile: (context, event) => event.data.configFile
            }),
            (context) =>
              // cookieManager.setItem(
              //   "showLogs",
              //   context.configFile.showLogs.toString()
              // ),
              console.log("Cookie written!"),
            (context, event) =>
              console.log("CDN config file URL: ", event.data.configFileUrl),
            (context) =>
              rootFSMFunctions.updateItHttpManagersUrls(context.configFile)
          ]
        },
        onError: {
          target: "authError",
          actions: (context, event) =>
            console.log("Authentication Failed, cause: ", event.data)
        }
      }
    },
    stopAudioState: {
      invoke: {
        src: (context: IRootFSMContext, event) => rootFSMFunctions.stopAudio(),
        onDone: {
          target: "getSmartCardId"
        },
        onError: {
          target: "authError",
          actions: (context, event) =>
            console.log("Authentication Failed, cause: ", event.data)
        }
      }
    },
    getSmartCardId: {
      invoke: {
        src: (context, event) =>
          rootFSMFunctions.getSmartCardID(context.userId),
        onDone: {
          target: "getTokens",
          actions: assign({ userId: (context, event) => event.data })
        },
        onError: {
          target: "authError",
          actions: (context, event) =>
            console.log("Authentication Failed, cause: ", event.data)
        }
      }
    },
    getTokens: {
      invoke: {
        src: (context: IRootFSMContext, event) =>
          rootFSMFunctions.getTokens(
            context.configFile.servicesUrls,
            context.userId
          ),
        onDone: {
          target: "getContacts",
          actions: assign({ e2eContractID: (context, event) => event.data })
        },
        onError: {
          target: "authError",
          actions: (context, event) =>
            console.log("Authentication Failed, cause: ", event.data)
        }
      }
    },
    getContacts: {
      invoke: {
        id: "getContacts",
        src: (context, event) => rootFSMFunctions.getContacts(),
        onDone: {
          target: "home",
          actions: assign((context, event) => {
            const phonesNumber = [];
            const tempNumbers = [
              event.data.contact.phoneNumber,
              event.data.contact.mobilePhone,
              event.data.contact.otherPhone
            ];
            tempNumbers.forEach((num: string) => {
              if (num) phonesNumber.push(num);
            });
            return {
              phoneNumber: phonesNumber,
              email: event.data.contact.email
            };
          })
        },
        onError: {
          target: "authError",
          actions: (context, event) =>
            console.log("Authentication Failed, cause: ", event.data)
        }
      }
    },
    home: {
      on: {
        GO_TO_RESET_PIN: "resetPin",
        GO_TO_INSERT_PIN: "m_InsertPin",
        GO_TO_INSERT_RESET_UJ: "insertAndResetPinUserJourney",
        GO_TO_UPGRADE: "upgrade",
        GO_TO_CHANGE_ENV_VARIALE: "changeEnvVariable"
      },
      after: {
        100: {
          target: "m_InsertPin",
          cond: (context, event) => context.goToWaitingPin,
          actions: assign({
            goToWaitingPin: false
          })
        }
      } as any
    },
    authError: {
      entry: () => console.log("[rootFSM] authError")
    },
    insertAndResetPinUserJourney: {
      entry: () => console.log("[rootFSM] insertAndResetPinUserJourney"),
      invoke: {
        src: InsertAndResetPinFSM,
        id: "insertAndResetPinUserJourneyService",
        data: {
          userId: (context, event) => context.userId,
          e2eContractID: (context, event) => context.e2eContractID,
          phoneNumber: (context, event) => context.phoneNumber,
          email: (context, event) => context.email
        },
        onDone: "home"
      }
    },
    resetPin: {
      invoke: {
        src: pinResetFSM,
        id: "resetPinService",
        data: {
          userId: (context, event) => context.userId,
          e2eContractID: (context, event) => context.e2eContractID,
          phoneNumber: (context, event) => context.phoneNumber,
          email: (context, event) => context.email
        },
        onDone: "home"
      }
    },
    m_InsertPin: {
      invoke: {
        src: insertPinFSM,
        id: "insertPinService",
        data: {
          ...insertPinFSM.context,
          smcId: (context, event) => context.userId
        }
      },
      on: {
        DISMISS: "home",
        INSERTED_CORRECT_PIN: "home",
        GO_TO_RESET_PIN: {
          target: "resetPin",
          actions: assign({
            goToWaitingPin: true
          })
        } as any
      }
    },
    changeEnvVariable: {
      entry: () => console.log("[rootFSM] changeEnvVariable"),
      invoke: {
        src: changeEnvFSM,
        id: "changeEnvVariableService",
        onDone: {
          target: "initialState"
        }
      }
    },
    upgrade: {
      entry: () => console.log("[rootFSM] upgrade"),
      invoke: {
        src: upgradeFSM,
        id: "upgradeService",
        data: {
          ...upgradeFSM.context,
          userId: (context, event) => context.userId,
          e2eContractID: (context, event) => context.e2eContractID,
          phoneNumber: (context, event) => context.phoneNumber,
          email: (context, event) => context.email
        },
        onDone: "home"
      }
    }
  },
  on: {
    GO_TO_CHANGE_ENV_VARIALE: {
      target: "changeEnvVariable"
    }
  }
});
