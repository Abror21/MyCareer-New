import learn001 from 'assets/images/learn001.webp';
import learn002 from 'assets/images/learn002.webp';
import learn003 from 'assets/images/learn003.webp';
import learn004 from 'assets/images/learn004.webp';
import teamMember01 from 'assets/images/team001.webp';
import teamMember02 from 'assets/images/team002.webp';
import teamMember03 from 'assets/images/team003.webp';
import flagUz from 'assets/images/flag_uzb.png';
import flagLv from 'assets/images/flag_lv.png';

export type NavigationItem = {
  key: string;
  to: string;
  isActive: boolean;
  permission?: string | null;
};
export const navigation: NavigationItem[] = [
  { key: 'aboutUs', to: 'about-us', isActive: false },
  { key: 'trainings', to: 'trainings', isActive: false },
  { key: 'partners', to: 'partners', isActive: false },
  { key: 'contacts', to: 'contact-us', isActive: false },
];

export const adminNavigation: NavigationItem[] = [
  { key: 'users', to: '/admin', isActive: true, permission: 'system_administration' },
  { key: 'translations', to: '/admin/translations', isActive: false, permission: 'cms_translation' },
  { key: 'logs', to: '/admin/logs', isActive: false, permission: 'log_files' },
  { key: 'permissions', to: '/admin/permissions', isActive: false, permission: 'user_permission' },
  { key: 'telegram-logs', to: '/admin/telegram-logs', isActive: false, permission: 'telegram_logs' },
  { key: 'mindee-logs', to: '/admin/mindee-logs', isActive: false, permission: 'mindee_logs' },
  { key: 'tests', to: '/admin/tests', isActive: false, permission: 'tests' },
  { key: 'partners', to: '/admin/partners', isActive: false, permission: 'partners' },
  { key: 'hirings', to: '/admin/hirings', isActive: false, permission: 'jobs' },
];

type Benefit = {
  key: string;
  icon: string;
};
export const benefits: Benefit[] = [
  { key: 'benefit1', icon: 'iconRightLeft' },
  { key: 'benefit2', icon: 'globe' },
  { key: 'benefit3', icon: 'server' },
  { key: 'benefit4', icon: 'computer' },
];

export type LearnSectionItem = {
  content: {
    preTitleKey?: string;
    titleKey: string;
    textKey: string;
    callToActionKey?: string;
    buttonTextKey: string;
  };
  image: {
    src: string;
    alt: string;
  };
  route?: string;
  nextRoute?: string;
};
export const learnSectionData: LearnSectionItem[] = [
  {
    content: {
      preTitleKey: 'onlineTrainings',
      titleKey: 'learn',
      textKey: 'learnText',
      buttonTextKey: 'startTraining',
    },
    image: {
      src: learn001,
      alt: 'onlineTrainings',
    },
    route: '/trainings',
    nextRoute: '/trainings',
  },
  {
    content: {
      preTitleKey: 'working',
      titleKey: 'work',
      textKey: 'workText',
      callToActionKey: 'workCallToAction',
      buttonTextKey: 'showMore',
    },
    image: {
      src: learn002,
      alt: 'working',
    },
    route: '/talents',
    nextRoute: '/talents',
  },
  {
    content: {
      preTitleKey: 'get_experience',
      titleKey: 'practice',
      textKey: 'experienceText',
      callToActionKey: 'experienceCallToAction',
      buttonTextKey: 'startPractice',
    },
    image: {
      src: learn003,
      alt: 'experience',
    },
    route: '/login/practice',
    nextRoute: '/purchase-services',
  },
  {
    content: {
      titleKey: 'createYourCv',
      textKey: 'growYourCareerText',
      buttonTextKey: 'createCv',
    },
    image: {
      src: learn004,
      alt: 'growYourCareer',
    },
    route: '/login/create-cv',
    nextRoute: '/profile/cv',
  },
];

export const trainigsLearnSectionData: LearnSectionItem[] = [
  {
    content: {
      titleKey: 'php',
      textKey: 'phpOveralText',
      buttonTextKey: 'showMore',
    },
    image: {
      src: learn001,
      alt: 'onlineTrainings',
    },
  },
  {
    content: {
      titleKey: 'dotnet',
      textKey: 'netOveralText',
      buttonTextKey: 'showMore',
    },
    image: {
      src: learn002,
      alt: 'working',
    },
  },
  {
    content: {
      titleKey: 'javascript',
      textKey: 'javascriptOveralText',
      buttonTextKey: 'showMore',
    },
    image: {
      src: learn003,
      alt: 'experience',
    },
  },
];

type TeamItem = {
  name: string;
  image: {
    src: string;
    alt: string;
  };
  position: string;
  flagIcon: {
    src: string;
    alt: string;
  };
};
export const team: TeamItem[] = [
  {
    name: 'teamMember01',
    image: { src: teamMember01, alt: 'teamMember01' },
    position: 'projectLeadingMentor',
    flagIcon: { src: flagLv, alt: 'flag' },
  },
  {
    name: 'teamMember02',
    image: { src: teamMember02, alt: 'teamMember02' },
    position: 'trainingProgrammeManager',
    flagIcon: { src: flagLv, alt: 'flag' },
  },
  {
    name: 'teamMember03',
    image: { src: teamMember03, alt: 'teamMember03' },
    position: 'programmeAdministrativeManager',
    flagIcon: { src: flagUz, alt: 'flag' },
  },
];

export type experienceOptionType = {
  value: string;
  label: string;
};

export const experienceOptions: experienceOptionType[] = [
  { value: 'LessThanAYear', label: 'Less than a year' },
  { value: 'OneYear', label: '1 year' },
  { value: 'TwoYears', label: '2 years' },
  { value: 'ThreeYears', label: '3 years' },
  { value: 'MoreThanThreeYears', label: 'More than 3 years' },
];
type LevelProps = {
  label: string;
  value: string;
};
export const languageLevels: LevelProps[] = [
  { label: 'A1 - Beginner', value: 'Beginner' },
  { label: 'A2 - Elementary', value: 'Elementary' },
  { label: 'B1 - Intermediate', value: 'Intermediate' },
  { label: 'B2 - Upper Intermediate', value: 'UpperIntermediate' },
  { label: 'C1 - Advanced', value: 'Advanced' },
  { label: 'C2 - Proficient', value: 'Proficient' },
  { label: 'Native', value: 'Native' },
];
export const skillLevels: LevelProps[] = [
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
];

export type trainigsItem = {
  id: number;
  title: string;
  titleId: number;
  level: string;
  levelId: number;
  allLevels: string[];
  description: string;
  content: {
    level: string;
    levelDescription: string;
    enroll: string[];
    end: string;
    price?: string;
  };
  objectives: {
    option: {
      id: number;
      optionKey: string;
      optionText: string[];
    }[];
  };
};

export const trainings: trainigsItem[] = [
  {
    id: 1,
    title: 'PHP_Title',
    level: 'begginer',
    titleId: 1,
    levelId: 1,
    allLevels: ['begginer', 'Intermediate', 'Advanced'],
    description: 'phpDescription',
    content: {
      level: 'begginer',
      levelDescription: 'phpLevelDescription1',
      end: 'phpContextEnd1',
      enroll: ['phpEnrollInfo1', 'phpEnrollInfo2', 'phpEnrollInfo3'],
      // price: '100 EUR',
    },
    objectives: {
      option: [
        { id: 1, optionKey: 'phpOptionKey1', optionText: ['phpOptionText1', 'phpOptionText2'] },
        { id: 2, optionKey: 'phpOptionKey2', optionText: ['phpOptionText3', 'phpOptionText4'] },
        { id: 3, optionKey: 'phpOptionKey3', optionText: ['phpOptionText5', 'phpOptionText6'] },
        { id: 4, optionKey: 'phpOptionKey4', optionText: ['phpOptionText7', 'phpOptionText8'] },
        { id: 5, optionKey: 'phpOptionKey5', optionText: ['phpOptionText9', 'phpOptionText10'] },
        { id: 6, optionKey: 'phpOptionKey6', optionText: ['phpOptionText11', 'phpOptionText12'] },
        { id: 7, optionKey: 'phpOptionKey7', optionText: ['phpOptionText13', 'phpOptionText14'] },
        { id: 8, optionKey: 'phpOptionKey8', optionText: ['phpOptionText15', 'phpOptionText16'] },
      ],
    },
  },
  {
    id: 2,
    title: 'PHP_Title',
    level: 'Intermediate',
    titleId: 1,
    levelId: 2,
    allLevels: ['begginer', 'Intermediate', 'Advanced'],
    description: 'phpDescription',
    content: {
      level: 'Intermediate',
      levelDescription: 'phpLevelDescription2',
      end: 'phpContextEnd2',
      enroll: ['phpEnrollInfo4', 'phpEnrollInfo5', 'phpEnrollInfo6'],
      price: '',
    },

    objectives: {
      option: [
        { id: 1, optionKey: 'phpOptionKey9', optionText: ['phpOptionText17', 'phpOptionText18'] },
        { id: 2, optionKey: 'phpOptionKey10', optionText: ['phpOptionText19', 'phpOptionText20'] },
        { id: 3, optionKey: 'phpOptionKey11', optionText: ['phpOptionText21', 'phpOptionText22'] },
        { id: 4, optionKey: 'phpOptionKey12', optionText: ['phpOptionText23', 'phpOptionText24'] },
        { id: 5, optionKey: 'phpOptionKey13', optionText: ['phpOptionText25', 'phpOptionText26'] },
        { id: 6, optionKey: 'phpOptionKey14', optionText: ['phpOptionText27', 'phpOptionText28'] },
        { id: 7, optionKey: 'phpOptionKey15', optionText: ['phpOptionText29', 'phpOptionText30'] },
        { id: 8, optionKey: 'phpOptionKey16', optionText: ['phpOptionText31', 'phpOptionText32'] },
      ],
    },
  },
  {
    id: 3,
    title: 'PHP_Title',
    level: 'Advanced',
    titleId: 1,
    levelId: 3,
    allLevels: ['begginer', 'Intermediate', 'Advanced'],
    description: 'phpDescription',
    content: {
      level: 'Advanced',
      levelDescription: 'phpLevelDescription3',
      end: 'phpContextEnd3',
      enroll: ['phpEnrollInfo7', 'phpEnrollInfo8', 'phpEnrollInfo9'],
      price: '',
    },

    objectives: {
      option: [
        { id: 1, optionKey: 'phpOptionKey17', optionText: ['phpOptionText33', 'phpOptionText34'] },
        { id: 2, optionKey: 'phpOptionKey18', optionText: ['phpOptionText35', 'phpOptionText36'] },
        { id: 3, optionKey: 'phpOptionKey19', optionText: ['phpOptionText37', 'phpOptionText38'] },
        { id: 4, optionKey: 'phpOptionKey20', optionText: ['phpOptionText39', 'phpOptionText40'] },
        { id: 5, optionKey: 'phpOptionKey21', optionText: ['phpOptionText41', 'phpOptionText42'] },
        { id: 6, optionKey: 'phpOptionKey22', optionText: ['phpOptionText43', 'phpOptionText44'] },
        { id: 7, optionKey: 'phpOptionKey23', optionText: ['phpOptionText45', 'phpOptionText46'] },
        { id: 8, optionKey: 'phpOptionKey24', optionText: ['phpOptionText47', 'phpOptionText48'] },
      ],
    },
  },
  {
    id: 4,
    title: '.NET',
    level: 'begginer',
    titleId: 2,
    levelId: 1,
    allLevels: ['begginer', 'Intermediate', 'Advanced'],
    description: 'netDescription',
    content: {
      level: 'begginer',
      levelDescription: 'netLevelDescription1',
      end: 'netContextEnd1',
      enroll: ['netEnrollInfo1', 'netEnrollInfo2', 'netEnrollInfo3'],
      price: '',
    },

    objectives: {
      option: [
        { id: 1, optionKey: 'netOptionKey1', optionText: ['netOptionText1', 'netOptionText2'] },
        { id: 2, optionKey: 'netOptionKey2', optionText: ['netOptionText3', 'netOptionText4'] },
        { id: 3, optionKey: 'netOptionKey3', optionText: ['netOptionText5', 'netOptionText6'] },
        { id: 4, optionKey: 'netOptionKey4', optionText: ['netOptionText7', 'netOptionText8'] },
        { id: 5, optionKey: 'netOptionKey5', optionText: ['netOptionText9', 'netOptionText10'] },
        { id: 6, optionKey: 'netOptionKey6', optionText: ['netOptionText11', 'netOptionText12'] },
        { id: 7, optionKey: 'netOptionKey7', optionText: ['netOptionText13', 'netOptionText14'] },
        { id: 8, optionKey: 'netOptionKey8', optionText: ['netOptionText15', 'netOptionText16'] },
      ],
    },
  },
  {
    id: 5,
    title: '.NET',
    level: 'Intermediate',
    titleId: 2,
    levelId: 2,
    allLevels: ['begginer', 'Intermediate', 'Advanced'],
    description: 'netDescription',
    content: {
      level: 'Intermediate',
      levelDescription: 'netLevelDescription2',
      end: 'netContextEnd2',
      enroll: ['netEnrollInfo4', 'netEnrollInfo5', 'netEnrollInfo6'],
      price: '',
    },

    objectives: {
      option: [
        { id: 1, optionKey: 'netOptionKey9', optionText: ['netOptionText17', 'netOptionText18'] },
        { id: 2, optionKey: 'netOptionKey10', optionText: ['netOptionText19', 'netOptionText20'] },
        { id: 3, optionKey: 'netOptionKey11', optionText: ['netOptionText21', 'netOptionText22'] },
        { id: 4, optionKey: 'netOptionKey12', optionText: ['netOptionText23', 'netOptionText24'] },
        { id: 5, optionKey: 'netOptionKey13', optionText: ['netOptionText25', 'netOptionText26'] },
        { id: 6, optionKey: 'netOptionKey14', optionText: ['netOptionText27', 'netOptionText28'] },
        { id: 7, optionKey: 'netOptionKey15', optionText: ['netOptionText29', 'netOptionText30'] },
        { id: 8, optionKey: 'netOptionKey16', optionText: ['netOptionText31', 'netOptionText32'] },
      ],
    },
  },
  {
    id: 6,
    title: '.NET',
    level: 'Advanced',
    titleId: 2,
    levelId: 3,
    allLevels: ['begginer', 'Intermediate', 'Advanced'],
    description: 'netDescription',
    content: {
      level: 'Advanced',
      levelDescription: 'netLevelDescription3',
      end: 'netContextEnd3',
      enroll: ['netEnrollInfo7', 'netEnrollInfo8', 'netEnrollInfo9'],
      price: '',
    },

    objectives: {
      option: [
        { id: 1, optionKey: 'netOptionKey17', optionText: ['netOptionText33', 'netOptionText34'] },
        { id: 2, optionKey: 'netOptionKey18', optionText: ['netOptionText35', 'netOptionText36'] },
        { id: 3, optionKey: 'netOptionKey19', optionText: ['netOptionText37', 'netOptionText38'] },
        { id: 4, optionKey: 'netOptionKey20', optionText: ['netOptionText39', 'netOptionText40'] },
        { id: 5, optionKey: 'netOptionKey21', optionText: ['netOptionText41', 'netOptionText42'] },
        { id: 6, optionKey: 'netOptionKey22', optionText: ['netOptionText43', 'netOptionText44'] },
        { id: 7, optionKey: 'netOptionKey23', optionText: ['netOptionText45', 'netOptionText46'] },
        { id: 8, optionKey: 'netOptionKey24', optionText: ['netOptionText47', 'netOptionText48'] },
      ],
    },
  },
  {
    id: 7,
    title: 'JavaScript',
    level: 'begginer',
    titleId: 3,
    levelId: 1,
    allLevels: ['begginer', 'Intermediate', 'Advanced'],
    description: 'jsDescription',
    content: {
      level: 'begginer',
      levelDescription: 'jsLevelDescription1',
      end: 'jsContextEnd1',
      enroll: ['jsEnrollInfo1', 'jsEnrollInfo2', 'jsEnrollInfo3'],
      price: '',
    },

    objectives: {
      option: [
        { id: 1, optionKey: 'jsOptionKey1', optionText: ['jsOptionText1', 'jsOptionText2'] },
        { id: 2, optionKey: 'jsOptionKey2', optionText: ['jsOptionText3', 'jsOptionText4'] },
        { id: 3, optionKey: 'jsOptionKey3', optionText: ['jsOptionText5', 'jsOptionText6'] },
        { id: 4, optionKey: 'jsOptionKey4', optionText: ['jsOptionText7', 'jsOptionText8'] },
        { id: 5, optionKey: 'jsOptionKey5', optionText: ['jsOptionText9', 'jsOptionText10'] },
        { id: 6, optionKey: 'jsOptionKey6', optionText: ['jsOptionText11', 'jsOptionText12'] },
        { id: 7, optionKey: 'jsOptionKey7', optionText: ['jsOptionText13', 'jsOptionText14'] },
        { id: 8, optionKey: 'jsOptionKey8', optionText: ['jsOptionText15', 'jsOptionText16'] },
      ],
    },
  },
  {
    id: 8,
    title: 'JavaScript',
    level: 'Intermediate',
    titleId: 3,
    levelId: 2,
    allLevels: ['begginer', 'Intermediate', 'Advanced'],
    description: 'jsDescription',
    content: {
      level: 'Intermediate',
      levelDescription: 'jsLevelDescription2',
      end: 'jsContextEnd2',
      enroll: ['jsEnrollInfo4', 'jsEnrollInfo5', 'jsEnrollInfo6'],
      price: '',
    },

    objectives: {
      option: [
        { id: 1, optionKey: 'jsOptionKey9', optionText: ['jsOptionText17', 'jsOptionText18'] },
        { id: 2, optionKey: 'jsOptionKey10', optionText: ['jsOptionText19', 'jsOptionText20'] },
        { id: 3, optionKey: 'jsOptionKey11', optionText: ['jsOptionText21', 'jsOptionText22'] },
        { id: 4, optionKey: 'jsOptionKey12', optionText: ['jsOptionText23', 'jsOptionText24'] },
        { id: 5, optionKey: 'jsOptionKey13', optionText: ['jsOptionText25', 'jsOptionText26'] },
        { id: 6, optionKey: 'jsOptionKey14', optionText: ['jsOptionText27', 'jsOptionText28'] },
        { id: 7, optionKey: 'jsOptionKey15', optionText: ['jsOptionText29', 'jsOptionText30'] },
        { id: 8, optionKey: 'jsOptionKey16', optionText: ['jsOptionText31', 'jsOptionText32'] },
      ],
    },
  },
  {
    id: 9,
    title: 'JavaScript',
    level: 'Advanced',
    titleId: 3,
    levelId: 3,
    allLevels: ['begginer', 'Intermediate', 'Advanced'],
    description: 'jsDescription',
    content: {
      level: 'Advanced',
      levelDescription: 'jsLevelDescription3',
      end: 'jsContextEnd3',
      enroll: ['jsEnrollInfo7', 'jsEnrollInfo8', 'jsEnrollInfo9'],
      price: '',
    },

    objectives: {
      option: [
        { id: 1, optionKey: 'jsOptionKey17', optionText: ['jsOptionText33', 'jsOptionText34'] },
        { id: 2, optionKey: 'jsOptionKey18', optionText: ['jsOptionText35', 'jsOptionText36'] },
        { id: 3, optionKey: 'jsOptionKey19', optionText: ['jsOptionText37', 'jsOptionText38'] },
        { id: 4, optionKey: 'jsOptionKey20', optionText: ['jsOptionText39', 'jsOptionText40'] },
        { id: 5, optionKey: 'jsOptionKey21', optionText: ['jsOptionText41', 'jsOptionText42'] },
        { id: 6, optionKey: 'jsOptionKey22', optionText: ['jsOptionText43', 'jsOptionText44'] },
        { id: 7, optionKey: 'jsOptionKey23', optionText: ['jsOptionText45', 'jsOptionText46'] },
        { id: 8, optionKey: 'jsOptionKey24', optionText: ['jsOptionText47', 'jsOptionText48'] },
      ],
    },
  },
];

interface TermsOfUseList {
  listTitle?: string;
  list?: string;
}
interface TermsOfUseInterface {
  preTitle?: string;
  title: string;
  content?: string;
  list?: TermsOfUseList[];
}
export const TermsOfUseData: TermsOfUseInterface[] = [
  {
    title: 'termsOfuseTitle_1',
    content: 'termsOfuseContent_1',
    list: [
      { listTitle: 'termsOfuseListTitle_1', list: 'termsOfuseList_1' },
      { listTitle: 'termsOfuseListTitle_2', list: 'termsOfuseList_2' },
      { listTitle: 'termsOfuseListTitle_3', list: 'termsOfuseList_3' },
      { listTitle: 'termsOfuseListTitle_4', list: 'termsOfuseList_4' },
    ],
  },
  {
    title: 'termsOfuseTitle_2',
    content: 'termsOfuseContent_2',
  },
  {
    title: 'termsOfuseTitle_3',
    content: 'termsOfuseContent_3',
  },
  {
    title: 'termsOfuseTitle_4',
    content: 'termsOfuseContent_4',
  },
  {
    title: 'termsOfuseTitle_5',
    content: 'termsOfuseContent_5',
  },
  {
    title: 'termsOfuseTitle_6',
    content: 'termsOfuseContent_6',
    list: [
      { list: 'termsOfuseList_5' },
      { list: 'termsOfuseList_6' },
      { list: 'termsOfuseList_7' },
      { list: 'termsOfuseList_8' },
      { list: 'termsOfuseList_9' },
    ],
  },
  {
    title: 'termsOfuseTitle_7',
    content: 'termsOfuseContent_7',
  },
  {
    title: 'termsOfuseTitle_8',
    content: 'termsOfuseContent_8',
  },
  {
    title: 'termsOfuseTitle_9',
    content: 'termsOfuseContent_9',
  },
  {
    title: 'termsOfuseTitle_10',
    content: 'termsOfuseContent_10',
  },
  {
    title: 'termsOfuseTitle_11',
    content: 'termsOfuseContent_11',
  },
  {
    title: 'termsOfuseTitle_12',
    content: 'termsOfuseContent_12',
  },
  {
    title: 'termsOfuseTitle_13',
    content: 'termsOfuseContent_13',
  },
];

type Position = {
  id: number;
  name: string;
};

export const positions: Position[] = [
  { id: 1, name: 'Intern' },
  { id: 2, name: 'System admin' },
  { id: 3, name: 'Technical admin' },
];

type Page = {
  id: number;
  name: string;
};

export const pages: Page[] = [
  { id: 1, name: 'Intern' },
  { id: 2, name: 'System administration' },
  { id: 3, name: 'CMS translation' },
  { id: 4, name: 'User permissions' },
];

type uiSelectItem = {
  key: string;
  value: boolean | '';
};

export const uiSelectItems: uiSelectItem[] = [
  { key: 'all', value: '' },
  { key: 'activited', value: false },
  { key: 'deleted', value: true },
];

interface purchaseModalItem {
  status: boolean;
}

export const purchaseModalItems: purchaseModalItem[] = [
  { status: false },
  { status: true },
  { status: false },
  { status: false },
  { status: false },
  { status: false },
  { status: false },
  { status: false },
  { status: false },
];

interface testStatusItem {
  progres: string;
  name: string;
  status: boolean;
}

export const testStatus: testStatusItem[] = [
  { progres: 'notStarted', name: 'react', status: false },
  { progres: 'inProgress', name: 'C#', status: false },
  { progres: 'completedTest', name: 'javascript', status: true },
  { progres: 'completedTest', name: 'python', status: true },
];
interface languagesProps {
  label: string;
  value: string;
}
export const languages: languagesProps[] = [
  { label: 'Uzbek', value: 'Uzbek' },
  { label: 'Russian', value: 'Russian' },
  { label: 'English', value: 'English' },
];

export const defaultImageUrl =
  'data:image/png;base64,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';

interface employeesCountInterface {
  count: string;
}

export const employees: employeesCountInterface[] = [
  { count: '1-10' },
  { count: '11-49' },
  { count: '50-249' },
  { count: '>250' },
];
