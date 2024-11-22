import AboutPersonPhoto1 from 'assets/images/AboutPersonImage1.png';
import AboutPersonPhoto2 from 'assets/images/AboutPersonImage2.png';

type PersonSectionItem = {
  content: {
    preTitleKey?: string;
    titleKey: string;
    infoKey: string;
    textKey: string;
    additionalInfoKey: string;
  };
  image: {
    src: string;
    alt: string;
  };
};

export const AboutPersonSectionItem: PersonSectionItem[] = [
  {
    content: {
      preTitleKey: 'aboutUs',
      titleKey: 'aboutPersonTitle1',
      infoKey: 'aboutPersonInfo1',  
      textKey: 'aboutPersonText1',
      additionalInfoKey: 'aboutAdditionalInfo1',
    },
    image: {
      src: AboutPersonPhoto2,
      alt: 'onlineTrainings',
    },
  },
  {
    content: {
      preTitleKey: 'aboutUs',
      titleKey: 'aboutPersonTitle2',
      infoKey: 'aboutPersonInfo2',
      textKey: 'aboutPersonText2',
      additionalInfoKey: 'aboutAdditionalInfo2',
    },
    image: {
      src: AboutPersonPhoto1,
      alt: 'onlineTrainings',
    },
  },
];
