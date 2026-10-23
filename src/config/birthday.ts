export interface MemoryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
  tag?: string;
}

export interface SpecialQuality {
  id: string;
  title: string;
  message: string;
  iconName: string;
}

export interface BirthdayConfig {
  sisterName: string;
  brotherName: string;
  birthdayDate: string; // Left blank intentionally when date is unspecified
  experienceTitle: string;
  tagline: string;
  
  welcome: {
    eyebrow: string;
    heading: string;
    text: string;
    buttonText: string;
    skipText: string;
  };

  hero: {
    eyebrow: string;
    title: string;
    supportingText: string;
    primaryButton: string;
    secondaryButton: string;
    handwrittenNote: string;
    wishStepPrompt: string;
    wishStepAction: string;
    wishCompletedMessage: string;
    continueAction: string;
    relightAction: string;
  };

  memories: {
    title: string;
    subtitle: string;
    quote: string;
    items: MemoryItem[];
  };

  letter: {
    title: string;
    subtitle: string;
    envelopeNote: string;
    openButtonText: string;
    skipButtonText: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };

  specialQualities: {
    title: string;
    subtitle: string;
    instruction: string;
    items: SpecialQuality[];
  };

  surprise: {
    title: string;
    handwrittenTag: string;
    buttonText: string;
    revealingText: string;
    finalMessageParagraphs: string[];
    signOff: string;
    replayButtonText: string;
    continueButtonText: string;
  };

  finale: {
    heading: string;
    supportingMessage: string;
    signature: string;
    restartButtonText: string;
    backToMemoriesButtonText: string;
    footerText: string;
  };

  settings: {
    musicEnabledByDefault: boolean;
    candleCount: number;
  };
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  sisterName: "Radhee",
  brotherName: "Bhaiya",
  birthdayDate: "", // Keep blank if exact calendar date is unspecified
  experienceTitle: "To My Favourite Bhaiya",
  tagline: "An entire little universe, made with love by Radhee. ♡",

  welcome: {
    eyebrow: "A LITTLE SURPRISE, MADE WITH LOVE",
    heading: "Hey Bhaiya...",
    text: "I made something special for you. A little corner of the internet, filled with lots of love, just for you. ♡",
    buttonText: "Enter Your Little World ✨",
    skipText: "Skip intro",
  },

  hero: {
    eyebrow: "HAPPY BIRTHDAY",
    title: "To My Favourite Bhaiya ♡",
    supportingText: "Duniya mein bohot saare special log hain, but mere liye aapki jagah sabse alag hai. This little world is all yours.",
    primaryButton: "Make a Wish ✨",
    secondaryButton: "Explore Our Memories",
    handwrittenNote: "Made with love, by Radhee ♡",
    wishStepPrompt: "Close your eyes, make a wish, Bhaiya. ♡",
    wishStepAction: "Blow Out the Candles 🎂",
    wishCompletedMessage: "May all your wishes come true. ✨",
    continueAction: "Continue Experience ✨",
    relightAction: "Light them again",
  },

  memories: {
    title: "Our Little Universe",
    subtitle: "Endless memories wrapped in warmth and smiles",
    quote: "Little moments, endless memories. ♡",
    items: [
      {
        id: "memory-1",
        title: "My Favourite Memory",
        caption: "A golden memory of laughter and warmth that I will always cherish.",
        image: "/images/memories/memory-1.svg",
        alt: "Illustration representing Radhee's favourite memory with Bhaiya",
        tag: "Favourite",
      },
      {
        id: "memory-2",
        title: "Our Funniest Moment",
        caption: "Those silly jokes, teasing, and uncontrollable laughs only we understand.",
        image: "/images/memories/memory-2.svg",
        alt: "Illustration representing funny shared moments and banter",
        tag: "Banter & Fun",
      },
      {
        id: "memory-3",
        title: "Little Childhood Memories",
        caption: "Growing up together, innocent fights, and all the childhood mischief.",
        image: "/images/memories/memory-3.svg",
        alt: "Illustration representing childhood nostalgia and sibling adventures",
        tag: "Childhood",
      },
      {
        id: "memory-4",
        title: "Family Moments",
        caption: "Festivals, family dinners, and having you right beside us as our anchor.",
        image: "/images/memories/memory-4.svg",
        alt: "Illustration representing warm family gatherings and togetherness",
        tag: "Family",
      },
      {
        id: "memory-5",
        title: "A Memory I'll Always Keep",
        caption: "A quiet moment of care that reminded me how lucky I am to have you as my Bhaiya.",
        image: "/images/memories/memory-5.svg",
        alt: "Illustration representing a deeply cherished lifelong memory",
        tag: "Forever",
      },
    ],
  },

  letter: {
    title: "A Letter From Radhee",
    subtitle: "Some things are easier to write than to say...",
    envelopeNote: "To my dearest Bhaiya, with all my heart ♡",
    openButtonText: "Open My Letter ♡",
    skipButtonText: "Show full letter",
    salutation: "Dear Bhaiya, ♡",
    paragraphs: [
      "Happy Birthday to the most special bhaiya in my world! ❤️",
      "Pata hai, main shayad har baar express nahi kar paati ki aap mere liye kitne special ho, but aapki presence meri life ko aur beautiful bana deti hai.",
      "Thank you for being you — for the care, the smiles, the little moments, and all those things that make having you as my Bhaiya so special.",
      "Meri wish hai ki aapki life hamesha happiness, success, peace aur endless reasons to smile se bhari rahe. Aap jo bhi dream karo, woh poora ho, aur aapko hamesha woh love mile jo aap deserve karte ho.",
      "Aur haan, chahe hum kitna bhi lad lein ya ek-doosre ko kitna bhi tease karein, you'll always have a special place in my heart. That's never going to change.",
      "Keep smiling, keep shining, and never forget how much you mean to me.",
      "Happy Birthday, Bhaiya! ♡",
      "Lots and lots of love,",
    ],
    closing: "Your Radhee ♡",
    signature: "Radhee",
  },

  specialQualities: {
    title: "Why You're Special, Bhaiya",
    subtitle: "A few of the infinite reasons why you mean the world to me",
    instruction: "Tap any card to reveal the heartfelt thought behind it ✦",
    items: [
      {
        id: "quality-1",
        title: "My Forever Protector",
        message: "No matter how big the world feels, knowing you're there makes things feel a little easier.",
        iconName: "ShieldHeart",
      },
      {
        id: "quality-2",
        title: "My Favourite Person to Tease",
        message: "Life would be a lot less fun without our little fights, silly jokes, and endless teasing.",
        iconName: "Smile",
      },
      {
        id: "quality-3",
        title: "My Biggest Cheerleader",
        message: "I hope life gives you as many reasons to smile as you give to the people around you.",
        iconName: "Sparkles",
      },
      {
        id: "quality-4",
        title: "My Safe Place",
        message: "Some bonds don't need perfect words. They just need love, trust, and the comfort of knowing we're family.",
        iconName: "Home",
      },
      {
        id: "quality-5",
        title: "My Very Own Bhaiya",
        message: "Among all the relationships in this world, getting to call you my Bhaiya will always be something special.",
        iconName: "Heart",
      },
    ],
  },

  surprise: {
    title: "The Secret Birthday Surprise",
    handwrittenTag: "Something just for you...",
    buttonText: "Open Your Surprise ✨",
    revealingText: "Unwrapping something special...",
    finalMessageParagraphs: [
      "Happy Birthday, Bhaiya! ❤️",
      "Aap hamesha khush raho, healthy raho, aur life mein jo bhi achieve karna chaho, woh sab aapko mile.",
      "May your life be filled with happiness, peace, success, beautiful memories, and people who love you just as much as you deserve.",
      "No matter how much life changes, you'll always be my favourite Bhaiya.",
      "This little world was made just for you, with all the love in my heart.",
      "With endless love,",
      "Your Radhee ♡",
    ],
    signOff: "Always your little sister. Always your biggest fan. ♡",
    replayButtonText: "Replay the reveal ↺",
    continueButtonText: "Grand Finale ✨",
  },

  finale: {
    heading: "Happy Birthday, Bhaiya! ♡",
    supportingMessage: "May this new year of your life bring you more happiness, bigger dreams, beautiful memories, and countless reasons to smile.",
    signature: "Made with all my love, Radhee.",
    restartButtonText: "Experience Again ↺",
    backToMemoriesButtonText: "Back to Our Memories",
    footerText: "An entire little universe, made with love by Radhee. ♡",
  },

  settings: {
    musicEnabledByDefault: false,
    candleCount: 5,
  },
};
