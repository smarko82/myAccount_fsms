import { InsertPinFSMEvents } from "./insertPinFSMInterfaces";

// object that represents all FSM events
export const insertPinFSMEvents: InsertPinFSMEvents = {
  // internal FSM events
  STOP_FSM: "STOP_FSM",
  OK: "OK",
  PIN_DIGITS_COMPLETE: { type: "PIN_DIGITS_COMPLETE", pin: undefined },
  // sent to parent FSM (rootFSM)
  RESET_PIN_HOME: "RESET_PIN_HOME",
  INSERT_PIN_ENTRY_POINT: "INSERT_PIN_ENTRY_POINT",
  EPG_ENTRY_POINT: "EPG_ENTRY_POINT",
  DISMISS: "DISMISS",
  INSERTED_CORRECT_PIN: "INSERTED_CORRECT_PIN",
  GO_TO_RESET_PIN: "GO_TO_RESET_PIN",
  RESET_LEFT_TRIALS: "RESET_LEFT_TRIALS" //TODO: this event shouldn't be reported; just for simulation
};
