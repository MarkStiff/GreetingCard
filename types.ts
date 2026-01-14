export enum ZodiacSign {
    Dragon = "Dragon",
    Rabbit = "Rabbit",
    Tiger = "Tiger",
    Snake = "Snake",
    Horse = "Horse",
    Goat = "Goat",
    Monkey = "Monkey",
    Rooster = "Rooster",
    Dog = "Dog",
    Pig = "Pig",
    Rat = "Rat",
    Ox = "Ox"
}

export type Language = 'en' | 'cn';

export interface UserData {
    name: string; // Recipient Name
    senderName: string; // Sender Name
    profession: string;
    gender: 'male' | 'female';
    zodiac: ZodiacSign;
}

export interface GeneratedBlessing {
    titleEn: string;
    titleCn: string;
    quoteEn: string;
    quoteCn: string;
    imageUrl: string;
}

export interface AppState {
    userData: UserData;
    generatedBlessing: GeneratedBlessing | null;
    language: Language;
}

export interface ZodiacOption {
    value: ZodiacSign;
    label: string;
    labelCn: string;
    icon: string;
}