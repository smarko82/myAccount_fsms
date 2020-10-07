// The hierarchical schema for the machine states
export interface IChangeEnvFSMStateSchema {
  states: {
    initialState: {};
    changeEnvVariableScreen: {};
    finalState: {};
  };
}

// The context (extended state) of the machine
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IChangeEnvFSMContext {}

// The event typology that the machine handles
export type ChangeEnvFSMEvent =
  // internal FSM events
  { type: "SET_ENV"; env: string } | { type: "EXIT" };
// sent to parent FSM (rootFSM)

// All the events that the machine handles
export type ChangeEnvFSMEvents = {
  [key in ChangeEnvFSMEvent["type"]]:
    | ChangeEnvFSMEvent["type"]
    | { type: ChangeEnvFSMEvent["type"]; env: string };
};
