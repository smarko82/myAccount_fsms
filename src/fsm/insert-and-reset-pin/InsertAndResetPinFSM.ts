import { Machine, spawn, assign } from "xstate";
import { pinResetFSM } from "../pin-reset/pinResetFSM";
import { insertPinFSM } from "../insert-pin/insertPinFSM";

// TODO: Add interfaces for context, schema and events
export const InsertAndResetPinFSM = Machine({
  id: "InsertAndResetPinUserJourney",
  initial: "initialState",
  context: {
    retries: 0,
    insertPinFSM: undefined,
    userId: undefined,
    e2eContractID: undefined,
    phoneNumber: undefined,
    email: undefined,

    // Manages if after resetPin the state must go back to waiting pin
    goToWaitingPin: false
  },
  states: {
    initialState: {
      always: "state0"
    },

    state0: {
      on: {
        GO_TO_NEXT: "state1",
        EXIT: "finalState"
      }
    },

    state1: {
      on: {
        GO_TO_NEXT: "waitingForInsertPin",
        GO_TO_PREV: "state0"
      },
      after: {
        100: {
          target: "waitingForInsertPin",
          cond: (context: any) => context.goToWaitingPin,
          actions: assign({
            goToWaitingPin: false
          })
        }
      }
    },

    waitingForInsertPin: {
      entry: [
        assign({
          insertPinFSM: () => spawn(insertPinFSM)
        })
      ],
      on: {
        DISMISS: "state1",
        INSERTED_CORRECT_PIN: "state2",
        GO_TO_RESET_PIN: {
          target: "resetPin",
          actions: assign({
            goToWaitingPin: true
          })
        }
      }
    },

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
        onDone: "state1"
      }
    },

    state2: {
      on: {
        END_UJ: "finalState",
        GO_TO_STATE0: "state0"
      }
    },

    finalState: {
      type: "final"
    }
  }
});
