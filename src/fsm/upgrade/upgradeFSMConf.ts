import { assign } from "xstate";
import { IUpgradeFSMContext, UpgradeFSMEvent } from "./upgradeFSMInterfaces";
import * as consts from "./upgradeFSMConsts";

const promo = {
  onEvidence: true,
  bgHeroPage: "url",
  channelLogoHero: "url",
  titleHeroPage: "string",
  descriptionHeroPage: "string",
  bgGridPage: "url",
  titleGridPage: "string",
  descriptionGridPage: "string",
  gridPrice: "string",
  tileGridImage: "string",
  descriptionTileGridPage: "string",
  bgBulletPointPage: "url",
  channelLogoBulletPointPage: "url",
  smallTitleBulletPointPage: "string",
  smallSubTitleBulletPointPage: "string",
  titleBulletPointPage: "string",
  descritpionBulletPointPage: "string",
  bgNoPricePage: "url",
  channelLogoNoPrice: "url",
  smallTitleNoPricePage: "string",
  titleNoPricePage: "string",
  smallSubtitleNoPricePage: "string",
  descritptionNoPricePage: "string",
  subtitleNoPricePage: "string",
  secondaryDescriptionNoPricePage: "string",
  promoTitle: "string",
  promoID: "string",
  promoprice: "string",
  promopricediscount: "string",
  promoMonths: "string",
  promoOldPrice: "string",
  promopaymentfrequency: "string",
  promoTermsAndCondition: "string",
  promoThirdPartyTermsAndCondition: "array", //[ {tab1Title: tab1Text}, {tab2Title: tab2Text}, ....],
  promoproviderID: "SKY_Q_BLACK", // 'SKY_Q_BLACK' | 'SKY_Q_PLATINUM' | 'SKY_MINI',
  // 'Sky Wi fi' | 'Famiglia' | 'Cinema' | 'Sport' | 'Calcio' | 'HD' | 'DAZN' | 'Intrattenimento Plus'
  // | 'Platinum' | 'Sky Go Plus' | 'Spotify' | 'Mini' | 'Telecomando' | 'Caccia e Pesca' | 'Lazio Channel' | 'Milan Tv' | 'Inter Tv' | 'Torino Channel',
  promopackage: "Sky Wi fi",
  promocategory: "Pacchetti", // 'Pacchetti' | 'Innovazione Tecnologica' | 'Servizi Sky' | 'Canali Opzionali' | 'Broadband' | 'My Offer',
  promopurchasepolicy: "SKY_Q_BLACK", // 'SKY_Q_BLACK' | 'SKY_Q_PLATINUM' | 'SKY_MINI',
  promotype: "Promo", // 'Promo' | 'product' | 'tecnologico',
  oneclick: "boolean"
};

export const upgradeFSMFunctions = {
  getPromoByPackageOfInterest: (context, event) =>
    new Promise((resolve, reject) => {
      resolve({ promo: consts.promoGrid1 });
    }),
  getPromosByCategoryOfInterest: (context, event) =>
    new Promise((resolve, reject) => {
      resolve({
        promos: [
          consts.promoGrid1,
          consts.promoGrid2,
          consts.promoGrid3,
          consts.promoGrid4,
          consts.promoGrid5
        ]
      });
    }),
  goToCart: (e2eContractId, promo) =>
    new Promise((resolve, reject) => {
      resolve({
        cartId: "111",
        addedPromoId: "1",
        addedProductsTotalMonthlyFee: "300",
        addedPromos: [
          { name: "name", price: "300", discount: "100" },
          { name: "name", price: "300", discount: "100" }
        ],
        currentTotalMonthlyFee: "200",
        currentMonthlyEntries: [
          { name: "SkyTV", price: "300" },
          { name: "Sky Roma Channel", price: "300" },
          { name: "SkyTV", price: "300" },
          { name: "Sky Roma Channel", price: "300" }
        ],
        newTotalMonthlyFee: "400",
        unaTantumProductsTotalMonthlyFee: "400",
        addedunaTantumProducts: [
          { name: "name", price: "300", discount: "100" }
        ],
        bottomMessages: [
          "Il nuovo importo sarà addebitato sulla prima fattura utile"
        ]
      });
    }),
  order: (e2eContractId, promo) =>
    new Promise((resolve, reject) => {
      resolve();
    })
};

export const upgradeFSMConf = {
  actions: {
    assignSelectedPromo: assign({
      //TODO: (context, event) => event.data.promo
      selectedPromo: (context: IUpgradeFSMContext, event: UpgradeFSMEvent) => {
        let selectedPromo;
        if (event.type === "PROMO_SELECTED")
          selectedPromo = context.promos[event.promoArrayIndex];

        return selectedPromo;
      }
    }), //TODO: trova un modo (id?) per selezionare facilmente la promo dall'array
    assignOnePromo: assign({
      selectedPromo: (context: IUpgradeFSMContext) => context.promos[0]
    })
  },
  guards: {}
};
