/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-function-return-type */
import { assign, Machine, sendParent } from "xstate";
import { insertPinConf, insertPinFSMFunction } from "./insertPinFSMConf";
import {
  IInsertPinFSMContext,
  IInsertPinFSMStateSchema,
  InsertPinFSMEvent
} from "./insertPinFSMInterfaces";
import { insertPinFSMEvents } from "./insertPinFSMEvents";
import { insertPinConsts } from "./insertPinFSMConsts";

export let pinTriesLeft = 3; //TODO: this const shouldn't be reported; just for simulation
export const insertPinFSM = Machine<
  IInsertPinFSMContext,
  IInsertPinFSMStateSchema,
  InsertPinFSMEvent
>(
  {
    id: "insertPin",
    initial: "initialState",
    context: {
      isFirstTime: true,
      cookieName: "TimestampStartBlock",
      leftTrials: 0,
      timeForNextTrial: 10,
      smcId: "123456789",
      resetPinFSM: undefined
    },
    states: {
      initialState: {
        invoke: {
          src: (context, event) => insertPinConsts.checkPinStatus(context),
          onDone: [
            {
              target: "checkPinStatusComplete",
              cond: (context, event) =>
                event.data ? event.data.leftTrials > 0 : true,
              actions: assign({
                leftTrials: (context, event) => event.data.leftTrials
              })
            },
            {
              target: "m_blockedPin",
              cond: (context, event) =>
                event.data
                  ? event.data.leftTrials === 0 && context.isFirstTime
                  : false,
              actions: assign({
                leftTrials: (context, event) => event.data.leftTrials,
                timeForNextTrial: (context, event) =>
                  event.data.timeForNextTrial
              })
            },
            {
              target: "m_blockedPin",
              actions: [
                assign({
                  leftTrials: (context, event) =>
                    event.data
                      .leftTrials /*, timeForNextTrial: (context, event) => event.data.timeForNextTrial */
                }),
                insertPinFSMFunction.writeCookie
              ]
            }
          ],
          onError: {
            target: "m_blockedPin",
            actions: (context, event) =>
              console.log("CheckPinStatus Failed, cause: ", event.data)
          }
        }
      },
      checkPinStatusComplete: {
        always: {
          target: "insertPinForm",
          actions: (context, event) => {
            context.isFirstTime = false;
          }
        }
      },
      insertPinForm: {
        on: {
          PIN_DIGITS_COMPLETE: "pinChecking",
          STOP_FSM: {
            target: "finalState",
            actions: sendParent(insertPinFSMEvents.DISMISS)
          },
          GO_TO_RESET_PIN: {
            target: "finalState",
            actions: sendParent(insertPinFSMEvents.GO_TO_RESET_PIN)
          }
        }
      },
      pinChecking: {
        invoke: {
          id: "checkPin",
          src: (context: IInsertPinFSMContext, event) =>
            insertPinConsts.checkPin(context, event),
          onDone: {
            target: "finalState",
            actions: sendParent(insertPinFSMEvents.INSERTED_CORRECT_PIN)
          },
          onError: {
            actions: (context, event) => {
              pinTriesLeft--;
            }, //TODO: this action sould not be reported, just to simulate
            target: "initialState"
          }
        }
      },
      m_blockedPin: {
        on: {
          RESET_LEFT_TRIALS: {
            // TODO: this event RESET_LEFT_TRIALS shouldn't be reported; just for simulation
            target: "finalState",
            actions: [
              (context, event) => {
                pinTriesLeft = 3;
              },
              sendParent(insertPinFSMEvents.DISMISS)
            ]
          },
          STOP_FSM: {
            target: "finalState",
            actions: sendParent(insertPinFSMEvents.DISMISS)
          },
          OK: "m_resetPinConfirmation"
        }
      },
      m_resetPinConfirmation: {
        on: {
          OK: {
            target: "finalState",
            actions: sendParent(insertPinFSMEvents.GO_TO_RESET_PIN)
          }
        }
      },
      finalState: {
        type: "final"
      }
    }
  },
  insertPinConf
);
