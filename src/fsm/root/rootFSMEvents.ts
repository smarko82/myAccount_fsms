import { RootFSMEvents } from "./rootFSMInterfaces";

// object that represents all FSM events
export const rootFSMEvents: RootFSMEvents = {
  GO_TO_RESET_PIN: "GO_TO_RESET_PIN",
  GO_TO_INSERT_PIN: "GO_TO_INSERT_PIN",
  GO_TO_INSERT_RESET_UJ: "GO_TO_INSERT_RESET_UJ",
  GO_TO_UPGRADE: "GO_TO_UPGRADE",
  DISMISS: "DISMISS",
  INSERTED_CORRECT_PIN: "INSERTED_CORRECT_PIN",
  TESTEVENT: "TESTEVENT",
  GO_TO_CHANGE_ENV_VARIALE: "GO_TO_CHANGE_ENV_VARIALE"
};
