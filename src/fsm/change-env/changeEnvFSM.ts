/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-function-return-type */
import { Machine } from "xstate";
import {
  ChangeEnvFSMEvent,
  IChangeEnvFSMContext,
  IChangeEnvFSMStateSchema
} from "./changeEnvFSMInterfaces";

export const changeEnvFSM = Machine<
  IChangeEnvFSMContext,
  IChangeEnvFSMStateSchema,
  ChangeEnvFSMEvent
>({
  id: "changeEnvFSM",
  initial: "initialState",
  states: {
    initialState: {
      on: {
        "": "changeEnvVariableScreen"
      }
    },
    changeEnvVariableScreen: {
      on: {
        SET_ENV: {
          target: "finalState",
          actions: (context, event) => {
            // cookieManager.setItem('env', event.env);
            console.log("Cookie written!");
          }
        },
        EXIT: "finalState"
      }
    },
    finalState: {
      type: "final"
    }
  }
});
