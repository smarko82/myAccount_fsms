// The hierarchical schema for the machine states
export interface IPinResetFSMStateSchema {
  states: {
    initialState: {};
    home: {};
    resetPinByApp: {}; // todo eliminare
    m_resetPinMaxTrialsReached: {};
    resetPinSuccess: {};
    m_resetPinError: {};
    _resetPinBySMS: {};
    _resetPinByEmail: {};
    finalState: {};
    m_ResetPinNoValidContact: {};
    resetPinBySMS_step1: {};
    resetPinByEmail_step1: {};
    moreInfos: {};
  };
}

// The context (extended state) of the machine
export interface IPinResetFSMContext {
  userId: string;
  e2eContractID: string;
  phoneNumber: string[];
  selectedPhoneNumberIndex: number;
  email: string;
  currentCTA: string;
  retFromMoreInfos: string;
}

// The event typology that the machine handles
export type PinResetFSMEvent =
  // internal FSM events
  | { type: "SMS_CTA" }
  | { type: "EMAIL_CTA" }
  | { type: "APP_CTA" } // todo eliminare
  | { type: "MAX_TRIAL_ERROR" }
  | { type: "BACK_BUTTON" }
  | { type: "STOP_FSM" }
  | { type: "GENERIC_ERROR" }
  | { type: "EXIT_SECTION" }
  | { type: "SELECTED_INDEX"; selectedIndex: number }
  | { type: "GO_BACK" }
  | { type: "CONFIRM" }
  | { type: "EXIT_BUTTON" }
  | { type: "INFO_BUTTON" }
  // sended to parent FSM (rootFSM)
  | { type: "RESET_PIN_HOME" }
  | { type: "INSERT_PIN_ENTRY_POINT" }
  | { type: "EPG_ENTRY_POINT" };

// All the events that the machine handles
export type PinResetFSMEvents = {
  [key in PinResetFSMEvent["type"]]: PinResetFSMEvent["type"];
};
