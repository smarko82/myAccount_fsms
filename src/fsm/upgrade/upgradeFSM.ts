import { assign, Machine, spawn } from "xstate";
import {
  IUpgradeFSMContext,
  IUpgradeFSMStateSchema,
  UpgradeFSMEvent
} from "./upgradeFSMInterfaces";
import { upgradeFSMConf, upgradeFSMFunctions } from "./upgradeFSMConf";
import { insertPinFSM } from "../insert-pin/insertPinFSM";
import { pinResetFSM } from "../pin-reset/pinResetFSM";

////////////////////////////////
// MACRO STATES
////////////////////////////////
const shopHomeStates: any = {
  key: "shopHome",
  initial: "chooseHomePage",
  states: {
    chooseHomePage: {
      on: {
        "": [
          {
            target: "noUpgradePage",
            cond: (context) =>
              context.promos === undefined || context.promos.length === 0
          },
          {
            target: "shopHomeGridPage",
            cond: (context) =>
              context.promos[0] &&
              context.promos[0].onEvidence === false &&
              context.promos.length >= 4
          },
          {
            target: "shopHomeHeroPage",
            cond: (context) =>
              context.promos[0] && context.promos[0].onEvidence === true
          },
          {
            target: "categoryPage",
            cond: (context) =>
              context.promos[0] &&
              context.promos[0].onEvidence === false &&
              context.promos.length < 4
          }
        ]
      }
    },

    shopHomeHeroPage: {
      on: {
        LEFT_KEY: {
          target: "#finalState"
        }
      }
    },

    shopHomeGridPage: {
      on: {
        LEFT_KEY: {
          target: "#finalState"
        }
      }
    },

    categoryPage: {
      on: {
        LEFT_KEY: {
          target: "#finalState"
        }
      }
    },

    noUpgradePage: {
      on: {
        OK_KEY: {
          target: "#finalState"
        }
      }
    },

    hist: {
      type: "history",
      history: "deep"
    }
  }
};

const productPageStates = {
  initial: "chooseProductPage",

  states: {
    chooseProductPage: {
      on: {
        "": [
          {
            cond: (context, event) =>
              context.selectedPromo ? context.selectedPromo.price !== "" : true,
            target: "productPagePrice"
          },
          {
            target: "productPageNoPrice"
          }
        ]
      }
    },

    productPagePrice: {
      on: {}
    },

    productPageNoPrice: {
      on: {}
    },

    hist: {
      type: "history",
      history: "deep"
    }
  }
};

const orderSummaryPageStates = {
  initial: "chooseOrderSummaryPage",
  states: {
    chooseOrderSummaryPage: {
      on: {
        "": [
          {
            cond: (context) =>
              context.promoOnCart
                ? context.promoOnCart.addedunaTantumProducts.length > 0
                : false,
            target: "orderSummaryPageConCostiUnaTantum"
          },
          {
            target: "orderSummaryPage"
          }
        ]
      }
    },

    orderSummaryPageConCostiUnaTantum: {
      id: "orderSummaryPageConCostiUnaTantum",
      on: {}
    },

    orderSummaryPage: {
      id: "orderSummaryPage1x",
      on: {}
    },

    hist: {
      type: "history"
    }
  }
};

////////////////////////////////
// MAIN FSM
////////////////////////////////
export const upgradeFSM = Machine<
  IUpgradeFSMContext,
  IUpgradeFSMStateSchema,
  UpgradeFSMEvent
>(
  {
    id: "upgrade",
    initial: "initialState",
    context: {
      packageOfInterest: "", //'' se vengo da una tile (non da VOD o da EPG)
      categoryOfInterest: "ss", //'' se vengo da VOD o EPG (non da tile)

      promos: [], //one promo or array of promo or zero promo
      selectedPromo: undefined,

      e2eContractId: undefined, // from rootFSM
      promoOnCart: undefined,
      goToWaitingPin: undefined,
      backFromTAndC: undefined,
      goBackTo: undefined,
      insertPinFSM: undefined
    },
    states: {
      initialState: {
        on: {
          "": [
            {
              target: "getPromoByPackageOfInterest",
              cond: (context) => context.packageOfInterest !== ""
            },
            {
              target: "getPromosByCategoryOfInterest",
              cond: (context) => context.categoryOfInterest !== ""
            }
          ]
        }
      },

      getPromoByPackageOfInterest: {
        invoke: {
          src: (context, event) =>
            upgradeFSMFunctions.getPromoByPackageOfInterest(context, event),
          // resolved promise
          onDone: {
            target: "productPageBulletPoint",
            actions: assign({
              selectedPromo: (context, event) => event.data.promo
            })
          },
          // reject promise
          onError: {
            target: "errorPage",
            actions: (context, event) =>
              console.log(
                "getPromoByPackageOfInterest Failed, cause: ",
                event.data
              )
          }
        }
      },

      getPromosByCategoryOfInterest: {
        invoke: {
          src: (context, event) =>
            upgradeFSMFunctions.getPromosByCategoryOfInterest(context, event),
          // resolved promise
          onDone: {
            target: "shopHome.chooseHomePage",
            actions: assign({ promos: (context, event) => event.data.promos })
          },
          // reject promise
          onError: {
            target: "errorPage",
            actions: (context, event) =>
              console.log(
                "getPromosByCategoryOfInterest Failed, cause: ",
                event.data
              )
          }
        }
      },

      shopHome: {
        on: {
          "": {
            target: "productPageBulletPoint", //CHECK IF IS ONE PROMO
            cond: (context) => context.promos.length === 1,
            actions: "assignOnePromo"
          },
          DISMISS_KEY: {
            target: "finalState"
          },
          LEFT_KEY: {
            target: "finalState"
          },
          PROMO_SELECTED: {
            target: "productPageBulletPoint", //TODO: qui non è possibile avere categoryPage? Sembrerebbe di no
            actions: "assignSelectedPromo"
          }
        },
        ...shopHomeStates
      },

      productPageBulletPoint: {
        id: "productPageBulletPoint",
        on: {
          LEFT_KEY: [
            {
              target: "shopHome.hist",
              cond: (context) =>
                context.categoryOfInterest !== "" && context.promos.length !== 1
            },
            {
              target: "finalState"
            }
          ],
          OK_KEY: {
            target: "productPages"
          },
          INFO_KEY: {
            target: "termsAndCondition",
            actions: assign({ backFromTAndC: () => "productPageBulletPoint" })
          }
        }
      },

      productPages: {
        on: {
          INFO_KEY: {
            target: "termsAndCondition",
            actions: assign({ backFromTAndC: () => "productPages" })
          },
          GO_TO_SUMMARY: {
            target: "prepareChart"
          },
          LEFT_KEY: {
            target: "#productPageBulletPoint"
          }
        } as any,
        ...productPageStates
      } as any,

      prepareChart: {
        invoke: {
          src: (context) =>
            upgradeFSMFunctions.goToCart(
              context.e2eContractId,
              context.selectedPromo
            ), // da verificare (era promo)
          onDone: {
            target: "orderSummaryPages",
            actions: assign({ promoOnCart: (context, event) => event.data })
          },
          onError: {
            target: "errorPage",
            actions: (context, event) =>
              console.log("Error on goToCart: ", event.data)
          }
        }
      },

      orderSummaryPages: {
        after: {
          100: {
            target: "waitingForInsertPin",
            cond: (context) => context.goToWaitingPin,
            actions: assign({ goToWaitingPin: false })
          }
        },
        on: {
          INFO_KEY: {
            target: "termsAndCondition",
            actions: assign({ backFromTAndC: () => "orderSummaryPages" })
          },
          DISMISS_KEY: {
            target: "m_confirmExit"
          },
          GO_ON: {
            target: "waitingForInsertPin"
          }
        },
        ...orderSummaryPageStates
      } as any,

      waitingForInsertPin: {
        entry: [assign({ insertPinFSM: () => spawn(insertPinFSM) })],
        on: {
          DISMISS: "m_confirmExit",
          INSERTED_CORRECT_PIN: "performPurchase",
          GO_TO_RESET_PIN: {
            target: "resetPin",
            actions: assign({ goToWaitingPin: () => true })
          }
        }
      } as any,

      resetPin: {
        invoke: {
          src: pinResetFSM,
          id: "resetPinService",
          data: {
            userId: (context) => context.userId,
            e2eContractID: (context) => context.e2eContractID,
            phoneNumber: (context) => context.phoneNumber,
            email: (context) => context.email
          },
          onDone: "orderSummaryPages"
        }
      },

      m_confirmExit: {
        on: {
          DISMISS: [
            {
              target: "orderSummaryPages.hist"
            }
          ],
          CONFIRM: "finalState"
        }
      },

      termsAndCondition: {
        on: {
          LEFT_KEY: [
            {
              target: "productPages.hist",
              cond: (context) => context.backFromTAndC === "productPages"
            },
            {
              target: "orderSummaryPages.hist",
              cond: (context) => context.backFromTAndC === "orderSummaryPages"
            },
            {
              target: "productPageBulletPoint",
              cond: (context) =>
                context.backFromTAndC === "productPageBulletPoint"
            }
          ]
        }
      },

      performPurchase: {
        invoke: {
          src: (context) =>
            upgradeFSMFunctions.order(
              context.e2eContractId,
              context.selectedPromo
            ), // verificare se è selectedPromo o promo
          onDone: {
            target: "successPage"
          },
          onError: {
            target: "errorPage"
          }
        }
      },

      successPage: {
        on: {
          GO_TO_MY_OFFER: {
            target: "initialState"
          },
          TURN_TO_CHANNEL: {
            target: "#finalState"
          },
          DISMISS_KEY: {
            target: "#finalState"
          }
        }
      },

      errorPage: {
        on: {
          OK_KEY: "finalState"
        }
      },

      finalState: {
        id: "finalState",
        type: "final"
      }
    }
  },
  upgradeFSMConf
);
