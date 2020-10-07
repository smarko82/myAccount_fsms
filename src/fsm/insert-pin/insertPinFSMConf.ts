export const insertPinFSMFunction = {
  // write actual timestamp as cookie named "context.cookieName" (it will persist after reboot)
  writeCookie: (context) => {
    console.log("Cookie written!");
  }
};

export const insertPinConf = {
  actions: {},
  guards: {}
};
