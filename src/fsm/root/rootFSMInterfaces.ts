import { IConfigFile } from "./rootFSMConf";

// The hierarchical schema for the machine states
export interface IRootFSMStateSchema {
  states: {
    initialState: {};
    getConfigFileByEnv: {};
    stopAudioState: {};
    getSmartCardId: {};
    getTokens: {};
    getContacts: {};
    home: {};
    resetPin: {};
    m_InsertPin: {};
    authError: {};
    insertAndResetPinUserJourney: {};
    changeEnvVariable: {};
    upgrade: {};
  };
}

// The event typology that the machine handles
export type RootFSMEvent =
  // Internal FSM (RootFSM) generated events
  | { type: "GO_TO_RESET_PIN" }
  | { type: "GO_TO_INSERT_PIN" }
  | { type: "GO_TO_INSERT_RESET_UJ" }
  | { type: "GO_TO_UPGRADE" }
  // Spawned FSM (InsertPin) can generate the following events
  | { type: "DISMISS" }
  | { type: "INSERTED_CORRECT_PIN" }
  | { type: "TESTEVENT" }
  | { type: "GO_TO_CHANGE_ENV_VARIALE" };

// All the events that the machine handles
export type RootFSMEvents = {
  [key in RootFSMEvent["type"]]: RootFSMEvent["type"];
};

// The context (extended state) of the machine */
export interface IRootFSMContext {
  userId: string;
  e2eContractID: any;
  phoneNumber: string[];
  email: string;
  goToWaitingPin: boolean;
  // player: MainPlayer;
  configFile: IConfigFile;
}

// Tha data received from a child FSM
export interface IFromChildFSMData {
  nextScreen: string;
}
