export const promo = {
  id: "1",
  onEvidence: true,
  oneclick: true,
  promotype: "Promo", // ? possibili valori 'Promo' | 'product' | 'tecnologico'
  promoSections: {
    shopHomeHeroGridData: {
      type: "OFFER", // per gestire l'eventuale tipologia di elementi della griglia (offerte o video, può essere harcodato e quindi non fornito dal cms)
      data: {
        title: "tile 4 title",
        description: "tile 4 description",
        price: "23,00",
        offerPeriod: "al mese",
        tileUri: "assets/data/images/offersCatalogue/tile4.png",
        bgUri: "assets/data/images/offersCatalogue/bgTile4.jpg"
      }
    },
    categoryPageData: {
      label: "Label 1",
      fullPrice: "20,9",
      offerPrice: "10,99",
      offerDuration: "12",
      img: "assets/data/images/offersCatalogue/tile1.png",
      offerTitle: "Titolo dell'offerta 1",
      offerSubTitle: "Sottotiolo offerta 1",
      offerDescription: "Descrizione prootto 1",
      bgUri: "assets/data/images/offersCatalogue/bgTile1.jpg"
    },
    bulletPointData: {
      bulletPointTitle: "Aggiungi Sky Sport al tuo abbonamento",
      bulletPointDescription:
        "Con Sky Sport avrai:  \n \n \u2713Tutta la UEFA Champions League \n \u2713La UEFA Europa League \n \u27135 Partite a turno della  Premier League " +
        "\n \u27133 partite a turno della Bundesliga " +
        "\n✓La UEFA Europa League \n \u27135 Partite a turno della  Premier League \n \u27133 partite a " +
        "turno della Bundesliga",
      bulletSmallTitle: "Titolo small",
      bgUri: "assets/data/images/offersCatalogue/bgTile1.jpg",
      logoUri: "",
      heroTitle: "BulletPoint",
      heroSubTitle: ""
    },
    productPageData: {
      productPageType: "MIGRATION",
      noPricingData: {
        noPricingTitle: "Il titolo va inserito qui, solo una riga",
        noPricingDescription:
          "Descrizione molto lunga del no pricing per capire dove croppare la descrizione. Da capire se sono 2 o 3 righe",
        noPricingSubTitle: "Sottotitolo da inserire qui",
        noPricingSubDescription:
          "Al termine della promozione continuerai a vedere Sky Sport al prezzo di listino, 11,80€ al mese. " +
          "Ricorda che se lo desideri, potrai sempre modificare il tuo abbonamento in My Account/gestisci abbonamento",
        bgUri: "assets/data/images/offersCatalogue/bgTile1.jpg",
        logoUri: "",
        heroTitle: "NoPricing",
        heroSubTitle: ""
      },
      pricingData: {
        pricingTitle:
          "Cosa aspetti il meglio degli eventi sportivi ti aspetta!",
        pricingDescription:
          "Per te 1 anno di Sky Sport con il 50%, a soli <bold> 5,90€ al mese </bold>anzichè 11,80€ al mese. Dopodichè pagherai 8,40€ per i prossimi 6 mesi.",
        pricingSubDescription:
          "Al termine della promozione continuerai a vedere \nSky Sport al prezzo di listino, 11,80€ al mese. \n" +
          "Ricorda che se lo desideri, potrai sempre modificare il\ntuo abbonamento in My Account/gestisci abbonamento \n " +
          "Ricorda che se lo desideri, potrai sempre modificare il\ntuo abbonamento in My Account/gestisci abbonamento",
        bgUri: "assets/data/images/offersCatalogue/bgTile1.jpg",
        logoUri: "",
        heroTitle: "Pricing",
        heroSubTitle: ""
      },
      migrationData: {
        migrationTitle: "Aggiungi il meglio dello sport al tuo abbonamento",
        migrationDescription: "Per te Sky Sport a 15,90€ al mese",
        migrationSubTitle:
          "L'upgrade comporta la perdita degli sconti attuali: ",
        migrationSubDescription:
          "descrizionedescrizionedescrizionedescrizioned escrizionedescrizionedescrizionedescri zionedescrizionedescrizionedescrizionedescrizione",
        migrationItems: [
          {
            price: "10,22",
            title: "Sky TV + HD + CINEMA",
            subtitle: "al mese, invece di 19,90\u20AC"
          },
          {
            price: "20,33",
            title: "Sky Sport",
            subtitle: "al mese"
          }
        ],
        bgUri: "assets/data/images/offersCatalogue/bgTile1.jpg",
        logoUri: "",
        heroTitle: "Migration",
        heroSubTitle: ""
      },
      noMigrationData: {
        noMigrationTitle:
          "Il titolo va inserito qui, solo una riga no migration",
        noMigrationDescription:
          "Per te 1 anno di Sky Sport con il 50%, a soli <bold> 5,90€ al mese </bold>anzichè 11,80€ al mese. Dopodichè pagherai 8,40€ per i prossimi 6 mesi.",
        noMigrationSubTitle: "Perdi queste cose",
        noMigrationSubDescription: "SubDescription da inserire qui",
        noMigrationItems: [
          {
            price: "10,22",
            title: "Sky TV + HD + CINEMA",
            subtitle: "al mese, invece di 19,90\u20AC"
          },
          {
            price: "20,33",
            title: "Sky Sport",
            subtitle: "al mese"
          }
        ],
        bgUri: "assets/data/images/offersCatalogue/bgTile1.jpg",
        logoUri: "",
        heroTitle: "NoMigration",
        heroSubTitle: ""
      }
    },
    termsAndConditionsData: {
      terms: [
        {
          title: "Questo è un titolo!",
          subTitle: "Sottotitolo qui!",
          firstPartyName: "SKY Italia",
          firstPartyTerms:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In scelerisque diam eu massa scelerisque " +
            "pharetra. Suspendisse euismod tellus nibh, malesuada volutpat mi mollis et. Sed fringilla dolor et accumsan vulputate. " +
            "Aenean sollicitudin, metus vel malesuada faucibus, lacus diam mollis ipsum, a interdum risus lorem vel turpis. Aliquam velit metus, " +
            "lobortis hendrerit maximus non, imperdiet eu ex. Fusce congue ex vitae erat vehicula venenatis. Duis tempus ipsum urna, nec faucibus tellus.",
          isThirdsParts: false,
          thirdsPartyName: null,
          thirdsPartyTerms: null
        },
        {
          title: "Questo è un titolo!",
          subTitle: "Sottotitolo qui!",
          firstPartyName: "SKY Italia",
          firstPartyTerms:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In scelerisque diam eu massa scelerisque pharetra. Suspendisse euismod tellus nibh, " +
            "malesuada volutpat mi mollis et. Sed fringilla dolor et accumsan vulputate. Aenean sollicitudin, metus vel malesuada faucibus, lacus diam mollis ipsum," +
            " a interdum risus lorem vel turpis. Aliquam velit metus, lobortis hendrerit maximus non, imperdiet eu ex. Fusce congue ex vitae erat vehicula venenatis. " +
            "Duis tempus ipsum urna, nec faucibus tellus vestibulum congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius leo nunc.",
          isThirdsParts: true,
          thirdsPartyName: "DAZN",
          thirdsPartyTerms: "Non piratare i nostri show"
        }
      ]
    },
    noUpgradePageData: {
      title: "Si è verificato un errore",
      subtitle: "Siamo spiacenti, il servizio non è al momento disponibile",
      body:
        "Ti invitiamo a riprovare più tardi. Grazie per aver utilizzato i nostri servizi.",
      bgUri: "assets/data/images/offersCatalogue/bgTile2.jpg",
      logoUri: "",
      heroTitle: "Titolo va inserito qui",
      heroSubTitle: "Sottotitolo qui"
    },
    orderSummaryData: {
      type: "DEFAULT",
      tantum: {
        label: "first item",
        cellLabels: ["Attivazione SkyQ Platinum", "1 Sky Mini"],
        price: 100
      },
      currentItems: {
        scrollLineItems: [
          {
            label: "first item",
            cellLabels: ["Sky TV + HD + Cinema"],
            price: 44.2
          },
          {
            label: "sec item",
            cellLabels: ["Sky TV + HD + Cinema"],
            price: 44.2
          },
          {
            label: "third item",
            cellLabels: ["Sky TV + HD + Cinema"],
            price: 44.2
          }
        ],
        rows: [],
        rowSpacing: -1
      },
      addedItem: {
        label: "una etichetta",
        cellLabels: ["Sky Sport", "Sconto"],
        priceReduction: 7.6,
        price: 100.2
      },
      bgUri: "assets/data/images/offersCatalogue/bgTile2.jpg",
      heroTitle: "Titolo di hero data!",
      heroSubTitle: "sottotitolo di hero data!"
    },
    genericMessageData: {
      title: "Questo è un titolo!",
      subtitle: "Questo è un sottotitolo, ha meno enfasi del titolo!",
      body: "Questo è un body, non ha enfasi e nessuno se lo legge!",
      bgUri: "assets/data/images/offersCatalogue/bgTile2.jpg",
      logoUri: "",
      heroTitle: "Titolo di hero data!",
      heroSubTitle: "sottotitolo di hero data!"
    },
    platinumUpdate: {
      platinumTitle: "Dettagli sulla consegna del decoder",
      platinumDesc:
        "Il tuo nuovo Sky Platinum verrà consegnato tramite l'installatore Sky",
      platinumSubTitle: "Come vuoi procedere con il tuo decoder attuale?",
      bgUri: "assets/data/images/offersCatalogue/bgTile1.jpg",
      heroTitle: "Platinum"
    },
    selectionMini: {
      selectionMiniTitle: "Sky Q Mini",
      selectionMiniDesc:
        "Con Sky Q vedi tutto il mondo Sky sulle TV di casa che vuoi, senza cavi aggiunti.",
      selectionMiniSubTitle: "Scegli quanti mini vuoi:",
      selectionMiniSubDesc:
        "L'attivazione del primo Sky Q Mini è interamente scontata e per ogni Sky Q Mini in più che sceglierai ti verrà richiesto un costo aggiuntivo.",
      bgUri: "assets/data/images/offersCatalogue/bgTile1.jpg",
      heroTitle: "SkyQmini"
    },
    thankYou: {
      type: "ONE",
      title: "Grazie per aver scelto {packageName}!",
      description:
        "Ti confermiamo l'aggiunta del pacchetto {packageName} con il {discountValue}% di sconto per {subscriptionPeriod}:" +
        " a soli <bold>{newPrice}</bold> anziché {packagePrice} al mese.",
      packageData: {
        packageName: "Sky Sport",
        packagePrice: 15.2,
        discountValue: 50,
        subscriptionPeriod: "1 anno"
      },
      bgUri: "assets/data/images/offersCatalogue/bgTile1.jpg",
      cancelSubscription:
        "Hai acquistato per sbaglio?\n Puoi cancellare la tua richiesta entro 5 minuti.",
      logoUri: "",
      heroTitle: "Titolo va inserito quì",
      heroSubTitle: "Sottotitolo quì",
      gridItems: [
        {
          title: "Torna al canale",
          tileUri: "assets/data/images/offersCatalogue/tile2.png"
        },
        {
          title: "Shop Home Grid",
          tileUri: "assets/data/images/offersCatalogue/tile3.png"
        }
      ]
    }
  }
};

export const promoGrid1 = {
  onEvidence: true,
  promoID: "12",
  titleGridPage: "Titolo 1",
  descriptionGridPage: "DESC 1",
  gridPrice: "489",
  tileGridImage: "assets/data/images/offersCatalogue/tile1.png",
  bgGridPage: "assets/data/images/offersCatalogue/bgTile1.jpg",
  promopaymentfrequency: "al mese",
  promoMonths: "14",
  promoOldPrice: "10",
  titleBulletPointPage: "Aggiungi Sky Sport al tuo abbonamento",
  descritpionBulletPointPage:
    "Con Sky Sport avrai:  \n \n \u2713" +
    "Tutta la UEFA Champions League \n \u2713" +
    "La UEFA Europa League \n \u2713" +
    "5 Partite a turno della  Premier League \n \u2713" +
    "3 partite a turno della Bundesliga \n✓La UEFA Europa League \n \u2713" +
    "5 Partite a turno della  Premier League \n \u2713" +
    "3 partite a turno della Bundesliga",
  smallTitleBulletPointPage: "Titolo small",
  smallSubTitleBulletPointPage: "Small subtitle",
  bgBulletPointPage: "assets/data/images/offersCatalogue/bgTile9.jpg",
  channelLogoBulletPointPage: ""
};
export const promoGrid2 = {
  onEvidence: false,
  promoID: "44",
  titleGridPage: "Titolo 2",
  descriptionGridPage: "DESC 2",
  gridPrice: "122",
  tileGridImage: "assets/data/images/offersCatalogue/bgTile2.jpg",
  bgGridPage: "assets/data/images/offersCatalogue/bgTile2.jpg",
  promopaymentfrequency: "al secolo",
  promoMonths: "1",
  promoOldPrice: "99,2",
  titleBulletPointPage: "Aggiungi Sky Sport al tuo abbonamento",
  descritpionBulletPointPage:
    "Con Sky Sport avrai:  \n \n \u2713" +
    "Tutta la UEFA Champions League \n \u2713" +
    "La UEFA Europa League \n \u2713" +
    "5 Partite a turno della  Premier League \n \u2713" +
    "3 partite a turno della Bundesliga \n✓La UEFA Europa League \n \u2713" +
    "5 Partite a turno della  Premier League \n \u2713" +
    "3 partite a turno della Bundesliga",
  smallTitleBulletPointPage: "Titolo small",
  smallSubTitleBulletPointPage: "Small subtitle",
  bgBulletPointPage: "assets/data/images/offersCatalogue/bgTile2.jpg",
  channelLogoBulletPointPage: ""
};
export const promoGrid3 = {
  onEvidence: false,
  promoID: "244",
  titleGridPage: "Titolo 3",
  descriptionGridPage: "DESC 3",
  gridPrice: "122",
  tileGridImage: "assets/data/images/offersCatalogue/tile3.png",
  bgGridPage: "assets/data/images/offersCatalogue/bgTile3.jpg",
  promopaymentfrequency: "al secolo",
  promoMonths: "1",
  promoOldPrice: "99,2",
  titleBulletPointPage: "Aggiungi Sky Sport al tuo abbonamento",
  descritpionBulletPointPage:
    "Con Sky Sport avrai:  \n \n \u2713" +
    "Tutta la UEFA Champions League \n \u2713" +
    "La UEFA Europa League \n \u2713" +
    "5 Partite a turno della  Premier League \n \u2713" +
    "3 partite a turno della Bundesliga \n✓La UEFA Europa League \n \u2713" +
    "5 Partite a turno della  Premier League \n \u2713" +
    "3 partite a turno della Bundesliga",
  smallTitleBulletPointPage: "Titolo small",
  smallSubTitleBulletPointPage: "Small subtitle",
  bgBulletPointPage: "assets/data/images/offersCatalogue/bgTile3.jpg",
  channelLogoBulletPointPage: ""
};
export const promoGrid4 = {
  onEvidence: false,
  promoID: "44d",
  titleGridPage: "Titolo 4",
  descriptionGridPage: "DESC 4",
  gridPrice: "122",
  tileGridImage: "assets/data/images/offersCatalogue/tile4.png",
  bgGridPage: "assets/data/images/offersCatalogue/bgTile4.jpg",
  promopaymentfrequency: "al secolo",
  promoMonths: "1",
  promoOldPrice: "99,2",
  titleBulletPointPage: "Aggiungi Sky Sport al tuo abbonamento",
  descritpionBulletPointPage:
    "Con Sky Sport avrai:  \n \n \u2713" +
    "Tutta la UEFA Champions League \n \u2713" +
    "La UEFA Europa League \n \u2713" +
    "5 Partite a turno della  Premier League \n \u2713" +
    "3 partite a turno della Bundesliga \n✓La UEFA Europa League \n \u2713" +
    "5 Partite a turno della  Premier League \n \u2713" +
    "3 partite a turno della Bundesliga",
  smallTitleBulletPointPage: "Titolo small",
  smallSubTitleBulletPointPage: "Small subtitle",
  bgBulletPointPage: "assets/data/images/offersCatalogue/bgTile8.jpg",
  channelLogoBulletPointPage: ""
};
export const promoGrid5 = {
  onEvidence: false,
  promoID: "44d",
  titleGridPage: "Titolo 5",
  descriptionGridPage: "DESC 5",
  gridPrice: "122",
  tileGridImage: "assets/data/images/offersCatalogue/tile5.png",
  bgGridPage: "assets/data/images/offersCatalogue/bgTile5.jpg",
  promopaymentfrequency: "al secolo",
  promoMonths: "1",
  promoOldPrice: "99,2",
  titleBulletPointPage: "Aggiungi Sky Sport al tuo abbonamento",
  descritpionBulletPointPage:
    "Con Sky Sport avrai:  \n \n \u2713" +
    "Tutta la UEFA Champions League \n \u2713" +
    "La UEFA Europa League \n \u2713" +
    "5 Partite a turno della  Premier League \n \u2713" +
    "3 partite a turno della Bundesliga \n✓La UEFA Europa League \n \u2713" +
    "5 Partite a turno della  Premier League \n \u2713" +
    "3 partite a turno della Bundesliga",
  smallTitleBulletPointPage: "Titolo small",
  smallSubTitleBulletPointPage: "Small subtitle",
  bgBulletPointPage: "assets/data/images/offersCatalogue/bgTile8.jpg",
  channelLogoBulletPointPage: ""
};
