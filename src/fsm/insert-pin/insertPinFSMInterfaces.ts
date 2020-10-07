// The hierarchical schema for the machine states
export interface IInsertPinFSMStateSchema {
  states: {
      initialState: {};
      insertPinForm: {};
      finalState: {};
      m_blockedPin: {};
      m_resetPinConfirmation: {};
      checkPinStatusComplete: {};
      pinChecking: {};
  };
}

// The context (extended state) of the machine
export interface IInsertPinFSMContext {
  isFirstTime: boolean;
  cookieName: string;
  smcId: string;
  leftTrials: number;
  timeForNextTrial: number;
  resetPinFSM: any; //TODO: Specify the pinResetFSM
}

// The event typology that the machine handles
export type InsertPinFSMEvent =
  // internal FSM events
  | { type: 'STOP_FSM' }
  | { type: 'OK' }
  | { type: 'PIN_DIGITS_COMPLETE'; pin: number }
  // sended to parent FSM (rootFSM)
  | { type: 'RESET_PIN_HOME' }
  | { type: 'INSERT_PIN_ENTRY_POINT' }
  | { type: 'EPG_ENTRY_POINT' }
  // New insert pin management events
  | { type: 'DISMISS' }
  | { type: 'INSERTED_CORRECT_PIN' }
  | { type: 'GO_TO_RESET_PIN' }
  | { type: 'RESET_LEFT_TRIALS'} //TODO: this event shouldn't be reported; just for simulation

// All the events that the machine handles
export type InsertPinFSMEvents = {
  [key in InsertPinFSMEvent['type']]: InsertPinFSMEvent['type'] | { type: InsertPinFSMEvent['type']; pin: number };
};
