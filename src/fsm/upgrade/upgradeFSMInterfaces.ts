// The hierarchical schema for the machine states
export interface IUpgradeFSMStateSchema {
  states: {
    initialState: {};
    getPromoByPackageOfInterest: {};
    getPromosByCategoryOfInterest: {};
    shopHome: {
      states: {
        chooseHomePage: {};
        shopHomeHeroPage: {};
        shopHomeGridPage: {};
        categoryPage: {};
        noUpgradePage: {};
        hist: {};
      };
    };
    productPageBulletPoint: {};
    productPages: {
      states: {
        chooseProductPage: {};
        productPagePrice: {};
        productPageNoPrice: {};
        hist: {};
      };
    };
    prepareChart: {};
    orderSummaryPages: {
      states: {
        chooseOrderSummaryPage: {};
        orderSummaryPageConCostiUnaTantum: {};
        orderSummaryPage1x: {};
        orderSummaryPage2x: {};
        hist: {};
      };
    };
    waitingForInsertPin: {};
    resetPin: {};
    m_confirmExit: {};
    termsAndCondition: {};
    performPurchase: {};
    successPage: {};
    errorPage: {};
    finalState: {};
  };
}

// The context (extended state) of the machine */
export interface IUpgradeFSMContext {
  packageOfInterest: string;
  categoryOfInterest: string;
  promos: any[];
  selectedPromo: any;
  promoOnCart: any;
  backFromTAndC: any;
  goBackTo: any;
  // revived from root
  e2eContractId: string;
  // for insertPin
  goToWaitingPin: boolean;
  insertPinFSM: any;
}

// The event typology that the machine handles
export type UpgradeFSMEvent =
  // internal FSM events
  | { type: "DISMISS_KEY" }
  | { type: "PROMO_SELECTED"; promoArrayIndex: number }
  | { type: "DOWN_KEY" }
  | { type: "LEFT_KEY" }
  | { type: "BACK" }
  | { type: "OK_KEY" }
  | { type: "INFO_KEY" }
  | { type: "GO_TO_SUMMARY" }
  | { type: "GO_ON" }
  | { type: "CONFIRM" }
  | { type: "GO_TO_MY_OFFER" }
  | { type: "TURN_TO_CHANNEL" }
  // Recived from insertPinFSM
  | { type: "DISMISS" }
  | { type: "INSERTED_CORRECT_PIN" }
  | { type: "GO_TO_RESET_PIN" };

// All the events that the machine handles
export type UpgradeFSMEvents = {
  [key in UpgradeFSMEvent["type"]]:
    | UpgradeFSMEvent["type"]
    | { type: UpgradeFSMEvent["type"]; promoArrayIndex: number };
};
