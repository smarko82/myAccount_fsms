export interface IConfigFile {
  servicesUrls: {
    authManagerUrls: {
      post_smcauths: string;
      post_rtd: string;
      put_smcauths: string;
      get_customersMe: string;
      keep_alive: string;
    };
    pinResetManagerUrls: {
      postResetPin: string;
    };
    upgradeManagerUrls: {
      get_offers: string;
      post_cart: string;
      cart_calculation: string;
      sales_data: string;
    };
  };
  showLogs: boolean;
}

export const defaultConfigFile: IConfigFile = {
  servicesUrls: {
    authManagerUrls: {
      post_smcauths: "http://127.0.0.1:3000/smcauths",
      post_rtd: "http://127.0.0.1:3000/rtd",
      put_smcauths: "http://127.0.0.1:3000/smcauths/{sessionId}",
      get_customersMe: "http://127.0.0.1:3000/customers/me",
      keep_alive: "http://127.0.0.1:3000/keep-alive"
    },
    pinResetManagerUrls: {
      postResetPin:
        "http://127.0.0.1:3000/e2e-contracts/{id}/smartcards/{smartcardId}/reset-pin"
    },
    upgradeManagerUrls: {
      get_offers: "http://127.0.0.1:3000/e2e-contracts/{id}/offers",
      post_cart: "http://127.0.0.1:3000/cart",
      cart_calculation: "http://127.0.0.1:3000/cart-calculation",
      sales_data: "http://127.0.0.1:3000/e2e-contracts/{id}/sales-data"
    }
  },
  showLogs: true
};

export const rootFSMFunctions = {
  getCert: (): Promise<void> =>
    new Promise((resolve) => {
      resolve();
    }),
  getConfigFileByEnv: (): Promise<{
    configFile: IConfigFile;
    configFileUrl: string;
  }> =>
    new Promise((resolve) => {
      resolve({ configFile: defaultConfigFile, configFileUrl: "localhost" });
    }),
  getSmartCardID: (contextUserID?): Promise<string> => {
    if (contextUserID)
      return new Promise((resolve) => {
        resolve(contextUserID);
      });
  },
  updateItHttpManagersUrls: (contextConfigFile: IConfigFile): void => {
    // itHttpManager.itHttpManagerUrls = contextConfigFile.servicesUrls;
    // itHttpManager.showServicesLogs = JSON.parse(
    //   cookieManager.getItem("showLogs") as string
    // );
    console.log("HttpManagersUrls updated!");
  },
  getTokens: (contextUrls, contextUserID): Promise<string> =>
    new Promise((resolve) => {
      resolve("e2eContractId");
    }),
  getContacts: (): Promise<any> =>
    new Promise((resolve) => {
      let contact = {
        phoneNumber: "3401911829",
        otherPhone: "3475159291",
        mobilePhone: "8801112222",
        contactId: "420",
        firstName: "David",
        lastName: "Bowie",
        email: "blackstar@antares.com",
        birthDate: "2020-06-03",
        fiscalCode: "DBW01"
      };
      resolve(contact);
    }),
  stopAudio: (): Promise<void> => {
    return new Promise((resolve) => resolve());
  }
};

export const rootFSMConf = {
  actions: {},
  guards: {}
};
