import { PinResetFSMEvents } from "./pinResetFSMInterfaces";

// object that represents all FSM events
export const pinResetFSMEvents: PinResetFSMEvents = {
  // internal FSM events
  SMS_CTA: "SMS_CTA",
  EMAIL_CTA: "EMAIL_CTA",
  APP_CTA: "APP_CTA",
  MAX_TRIAL_ERROR: "MAX_TRIAL_ERROR",
  BACK_BUTTON: "BACK_BUTTON",
  STOP_FSM: "STOP_FSM",
  GENERIC_ERROR: "GENERIC_ERROR",
  EXIT_SECTION: "EXIT_SECTION",
  EXIT_BUTTON: "EXIT_BUTTON",
  SELECTED_INDEX: "SELECTED_INDEX",
  GO_BACK: "GO_BACK",
  CONFIRM: "CONFIRM",
  INFO_BUTTON: "INFO_BUTTON",
  // sent to parent FSM (rootFSM)
  RESET_PIN_HOME: "RESET_PIN_HOME",
  INSERT_PIN_ENTRY_POINT: "INSERT_PIN_ENTRY_POINT",
  EPG_ENTRY_POINT: "EPG_ENTRY_POINT"
};
