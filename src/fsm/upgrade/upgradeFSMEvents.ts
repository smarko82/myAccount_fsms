// object that represents all upgrade FSM events
import { UpgradeFSMEvents } from "./upgradeFSMInterfaces";

export const upgradeFSMEvents: UpgradeFSMEvents = {
  DISMISS_KEY: "DISMISS_KEY",
  PROMO_SELECTED: { type: "PROMO_SELECTED", promoArrayIndex: undefined },
  DOWN_KEY: "DOWN_KEY",
  LEFT_KEY: "LEFT_KEY",
  BACK: "BACK",
  OK_KEY: "OK_KEY",
  INFO_KEY: "INFO_KEY",
  GO_TO_SUMMARY: "GO_TO_SUMMARY",
  GO_ON: "GO_ON",
  CONFIRM: "CONFIRM",
  GO_TO_MY_OFFER: "GO_TO_MY_OFFER",
  TURN_TO_CHANNEL: "TURN_TO_CHANNEL",
  // Recived from insertPinFSM
  DISMISS: "DISMISS",
  INSERTED_CORRECT_PIN: "INSERTED_CORRECT_PIN",
  GO_TO_RESET_PIN: "GO_TO_RESET_PIN"
};
