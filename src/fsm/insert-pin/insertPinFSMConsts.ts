/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-function-return-type */

export const insertPinConsts = {
  checkPinStatus: (context): Promise<any> => {
    return new Promise((resolve, reject) => {
      resolve({
        leftTrials: 3,
        timeForNextTrial: 10
      });
    });
  },
  checkPin: (context, event): Promise<any> => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
};
