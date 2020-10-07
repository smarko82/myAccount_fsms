import { ChangeEnvFSMEvents } from "./changeEnvFSMInterfaces";

// object that represents all FSM events
export const changeEnvFSMEvents: ChangeEnvFSMEvents = {
  // internal FSM events
  SET_ENV: { type: "SET_ENV", env: undefined },
  EXIT: "EXIT"
  // sent to parent FSM (rootFSM)
};
