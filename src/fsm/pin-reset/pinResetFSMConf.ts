/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-function-return-type */
// import { isResetPinMaxTrial, isResetPinResultOk, isResetPinKO } from '../../it.sky.managePIN/managePIN';
import { pinResetFSMEvents } from "./pinResetFSMEvents";

export const pinResetFSMConditions = {
  // isResetPinResultOk: (context, event) => isResetPinResultOk(event.data),
  isResetPinResultOk: (context, event) => true,
  // isResetPinResultMaxTrialReached: (context, event) => isResetPinMaxTrial(event.data),
  isResetPinResultMaxTrialReached: (context, event) => false,
  // isResetPinResultKO: (context, event) => isResetPinKO(event.data),
  isResetPinResultKO: (context, event) => true,

  isBackResetPinHome: (context, event) => true,

  isNotValidPhoneNumber: (context, event) => context.phoneNumber.length === 0,
  isNotValidEmail: (context, event) => context.email === "",

  isComingFromHome: (context, event) => context.retFromMoreInfos === "home",
  isComingFromResetPinBySMS_step1: (context, event) =>
    context.retFromMoreInfos === "resetPinBySMS_step1",
  isComingFromResetPinByEmail_step1: (context, event) =>
    context.retFromMoreInfos === "resetPinByEmail_step1",
  isComingFromResetPinSuccess: (context, event) =>
    context.retFromMoreInfos === "resetPinSuccess",
  isComingFromResetPinByApp: (context, event) =>
    context.retFromMoreInfos === "resetPinByApp"
};

export const pinResetFSMConf = {
  actions: {},
  guards: {}
};
