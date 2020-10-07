import { assign, Machine, sendParent } from "xstate";
import { upgradeFSMFunctions } from "./upgradeFSMConf";

const postCart = () => {
  return new Promise((resolve, reject) => {
    reject();
  });
};

export const postCartMachine = Machine<any, any, any>({
  id: "postCart",
  initial: "initialState",
  context: {},
  states: {
    initialState: {
      invoke: {
        id: "postCart",
        src: (context, event) => upgradeFSMFunctions.postCart(),
        onDone: {
          target: "success"
        },
        onError: {
          target: "error"
        }
      }
    },

    success: {
      entry: sendParent("POST_CART_SUCCESS"),
      type: "final"
    },

    error: {
      entry: sendParent("POST_CART_ERROR"),
      type: "final"
    }
  }
});
