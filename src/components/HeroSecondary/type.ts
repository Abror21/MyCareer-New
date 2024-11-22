import images from 'assets/images/HeroCardImage.png'

interface HeroCardType  {
    id: number;
    text: string;
    image: {
        src: string;
        alt: string;
    };
    title: string;
    preTitle: string;
}

export const TrainingsItem: HeroCardType = {
    id: 1,
    image: {
        alt: "Image Not Found",
        src: images
    },
    text: "trainingsDescription",
    title: "general",
    preTitle: "trainings"
}

export const AboutItem: HeroCardType = {
    id: 1,
    image: {
        alt: "Image Not Found",
        src: images
    },
    text: "aboutUsDescription",
    title: "heading",
    preTitle: "aboutUs"
}
export interface HeroDataProps {
    heroData?: HeroCardType | undefined;
  }
  