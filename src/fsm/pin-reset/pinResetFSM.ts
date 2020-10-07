/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-function-return-type */
import { assign, Machine } from "xstate";
import { pinResetFSMConditions, pinResetFSMConf } from "./pinResetFSMConf";
import {
  IPinResetFSMContext,
  IPinResetFSMStateSchema,
  PinResetFSMEvent
} from "./pinResetFSMInterfaces";
import { pinResetFSMEvents } from "./pinResetFSMEvents";

export const pinResetFSM = Machine<
  IPinResetFSMContext,
  IPinResetFSMStateSchema,
  PinResetFSMEvent
>(
  {
    id: "resetPin",
    initial: "initialState",
    context: {
      userId: undefined,
      e2eContractID: undefined,
      phoneNumber: undefined,
      selectedPhoneNumberIndex: 0,
      email: undefined,
      currentCTA: undefined,
      retFromMoreInfos: undefined
    },
    states: {
      initialState: {
        always: "home"
      },
      home: {
        entry: [assign({ currentCTA: (context, event) => "" })],
        on: {
          SMS_CTA: [
            {
              target: "m_ResetPinNoValidContact",
              cond: pinResetFSMConditions.isNotValidPhoneNumber,
              actions: assign({
                currentCTA: (context, event) => pinResetFSMEvents.SMS_CTA
              })
            },
            {
              target: "resetPinBySMS_step1",
              actions: assign({
                currentCTA: (context, event) => pinResetFSMEvents.SMS_CTA
              })
            }
          ],
          EMAIL_CTA: [
            {
              target: "m_ResetPinNoValidContact",
              cond: pinResetFSMConditions.isNotValidEmail,
              actions: assign({
                currentCTA: (context, event) => pinResetFSMEvents.EMAIL_CTA
              })
            },
            {
              target: "resetPinByEmail_step1",
              actions: assign({
                currentCTA: (context, event) => pinResetFSMEvents.EMAIL_CTA
              })
            }
          ],
          APP_CTA: "resetPinByApp", // todo: eliminare
          INFO_BUTTON: {
            target: "moreInfos",
            actions: assign({
              retFromMoreInfos: () => "home"
            })
          },
          STOP_FSM: "finalState"
        }
      },
      resetPinByApp: {
        // todo: eliminare
        on: {
          BACK_BUTTON: "finalState"
        }
      },
      moreInfos: {
        on: {
          GO_BACK: [
            {
              target: "home",
              cond: pinResetFSMConditions.isComingFromHome
            },
            {
              target: "resetPinBySMS_step1",
              cond: pinResetFSMConditions.isComingFromResetPinBySMS_step1
            },
            {
              target: "resetPinByEmail_step1",
              cond: pinResetFSMConditions.isComingFromResetPinByEmail_step1
            },
            {
              target: "resetPinSuccess",
              cond: pinResetFSMConditions.isComingFromResetPinSuccess
            },
            {
              target: "resetPinByApp",
              cond: pinResetFSMConditions.isComingFromResetPinByApp
            }
          ]
        }
      },
      m_ResetPinNoValidContact: {
        on: {
          EXIT_SECTION: "finalState",
          BACK_BUTTON: "home"
        }
      },
      resetPinBySMS_step1: {
        on: {
          SELECTED_INDEX: {
            target: "_resetPinBySMS",
            actions: assign({
              selectedPhoneNumberIndex: (context, event: any) =>
                event.selectedIndex
            })
          },
          INFO_BUTTON: {
            target: "moreInfos",
            actions: assign({
              retFromMoreInfos: (context, event) => "resetPinBySMS_step1"
            })
          },
          GO_BACK: "home"
        }
      },
      resetPinByEmail_step1: {
        on: {
          SELECTED_INDEX: "_resetPinByEmail",
          INFO_BUTTON: {
            target: "moreInfos",
            actions: assign({
              retFromMoreInfos: (context, event) => "resetPinByEmail_step1"
            })
          },
          GO_BACK: "home"
        }
      },
      m_resetPinMaxTrialsReached: {
        on: {
          BACK_BUTTON: "home",
          EXIT_SECTION: "finalState"
        }
      },
      resetPinSuccess: {
        on: {
          BACK_BUTTON: "finalState",
          INFO_BUTTON: {
            target: "moreInfos",
            actions: (context, event) => {
              context.retFromMoreInfos = "resetPinSuccess";
            }
          }
        }
      },
      m_resetPinError: {
        on: {
          BACK_BUTTON: "home",
          EXIT_SECTION: "finalState"
        }
      },
      _resetPinBySMS: {
        invoke: {
          id: "resetBySMS",
          // src: (context, events) =>
          //   resetBySMS(
          //     context.userId,
          //     context.e2eContractID,
          //     context.phoneNumber[context.selectedPhoneNumberIndex]
          //   ),
          src: (context, events) => new Promise((resolve) => resolve()),
          onDone: [
            {
              target: "resetPinSuccess",
              cond: pinResetFSMConditions.isResetPinResultOk
            },
            {
              target: "m_resetPinMaxTrialsReached",
              cond: pinResetFSMConditions.isResetPinResultMaxTrialReached
            },
            {
              target: "m_resetPinError",
              cond: pinResetFSMConditions.isResetPinResultKO
            }
          ],
          onError: "m_resetPinError"
        }
      },
      _resetPinByEmail: {
        invoke: {
          id: "resetPinByEmail",
          // src: (context, event) =>
          //   resetByEmail(context.userId, context.e2eContractID, context.email),
          src: (context, events) => new Promise((resolve) => resolve()),
          onDone: [
            {
              target: "resetPinSuccess",
              cond: pinResetFSMConditions.isResetPinResultOk
            },
            {
              target: "m_resetPinMaxTrialsReached",
              cond: pinResetFSMConditions.isResetPinResultMaxTrialReached
            },
            {
              target: "m_resetPinError",
              cond: pinResetFSMConditions.isResetPinResultKO
            }
          ],
          onError: {
            target: "m_resetPinError",
            actions: assign({ error: (context, event) => "Generic Error" })
          }
        } as any
      },
      finalState: {
        type: "final"
      }
    },
    on: {
      EXIT_BUTTON: "finalState"
    }
  },
  pinResetFSMConf
);
