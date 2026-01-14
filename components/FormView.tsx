import React from 'react';
import { UserData, ZodiacSign, Language } from '../types';
import { ZODIAC_OPTIONS, TRANSLATIONS } from '../constants';

interface FormViewProps {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    onGenerate: () => void;
    isGenerating: boolean;
    language: Language;
    setLanguage: (lang: Language) => void;
}

const FormView: React.FC<FormViewProps> = ({ userData, setUserData, onGenerate, isGenerating, language, setLanguage }) => {
    const t = TRANSLATIONS[language];

    const handleChange = (field: keyof UserData, value: any) => {
        setUserData(prev => ({ ...prev, [field]: value }));
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'cn' : 'en');
    };

    return (
        <div className="flex flex-col min-h-screen w-full max-w-md mx-auto relative z-10">
            {/* Header */}
            <header className="relative pt-6 pb-2 px-6">
                <div className="absolute top-0 right-4 w-16 h-24 bg-[url('https://images.unsplash.com/photo-1548434771-55c2f5756c07?q=80&w=200&auto=format&fit=crop')] bg-contain bg-no-repeat opacity-80 pointer-events-none" aria-hidden="true"></div>
                <div className="absolute top-0 left-0 w-32 h-32 -translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined text-9xl text-primary">cloud</span>
                </div>
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-light dark:bg-surface-dark border border-stone-200 dark:border-stone-700 shadow-sm active:scale-95 transition-transform text-text-main dark:text-white opacity-0 cursor-default">
                        {/* Hidden button for spacing balance */}
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <button 
                        onClick={toggleLanguage}
                        className="flex items-center justify-center w-16 h-10 rounded-full bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm border border-stone-200 dark:border-stone-700 shadow-sm active:scale-95 transition-transform text-primary font-bold hover:bg-white mr-2 sm:mr-0"
                    >
                        {t.toggleBtn}
                    </button>
                </div>

                <div className="relative z-10 mt-4">
                    <span className="text-primary font-bold text-sm tracking-widest uppercase mb-1 block">{t.appTitle}</span>
                    <h1 className="text-text-main dark:text-white text-3xl font-bold leading-tight tracking-tight font-display whitespace-pre-wrap">
                        {t.mainTitle}
                    </h1>
                </div>
            </header>

            {/* Main Form Area */}
            <main className="flex-1 px-4 py-6 pb-32">
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl shadow-primary/5 dark:shadow-black/20 p-6 border border-stone-100 dark:border-stone-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <span className="material-symbols-outlined text-6xl text-primary">local_florist</span>
                    </div>

                    <div className="space-y-8 relative z-10">
                        {/* Recipient Name Input */}
                        <div className="space-y-3">
                            <label htmlFor="fullName" className="block text-text-main dark:text-gray-200 text-base font-bold">
                                {t.nameLabel}
                            </label>
                            <div className="relative group">
                                <input
                                    id="fullName"
                                    type="text"
                                    value={userData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder={t.namePlaceholder}
                                    className="w-full bg-background-light dark:bg-black/20 border-0 border-b-2 border-stone-200 dark:border-stone-600 focus:border-accent focus:ring-0 px-0 py-3 text-lg text-text-main dark:text-white placeholder:text-text-muted transition-colors font-medium bg-transparent rounded-none"
                                />
                                <span className="material-symbols-outlined absolute right-0 top-3 text-text-muted pointer-events-none group-focus-within:text-accent transition-colors">person</span>
                            </div>
                        </div>

                        {/* Sender Name Input */}
                        <div className="space-y-3">
                            <label htmlFor="senderName" className="block text-text-main dark:text-gray-200 text-base font-bold">
                                {t.senderLabel}
                            </label>
                            <div className="relative group">
                                <input
                                    id="senderName"
                                    type="text"
                                    value={userData.senderName}
                                    onChange={(e) => handleChange('senderName', e.target.value)}
                                    placeholder={t.senderPlaceholder}
                                    className="w-full bg-background-light dark:bg-black/20 border-0 border-b-2 border-stone-200 dark:border-stone-600 focus:border-accent focus:ring-0 px-0 py-3 text-lg text-text-main dark:text-white placeholder:text-text-muted transition-colors font-medium bg-transparent rounded-none"
                                />
                                <span className="material-symbols-outlined absolute right-0 top-3 text-text-muted pointer-events-none group-focus-within:text-accent transition-colors">edit_square</span>
                            </div>
                        </div>

                        {/* Profession Input */}
                        <div className="space-y-3">
                            <label htmlFor="profession" className="block text-text-main dark:text-gray-200 text-base font-bold">
                                {t.professionLabel}
                            </label>
                            <div className="relative group">
                                <input
                                    id="profession"
                                    type="text"
                                    value={userData.profession}
                                    onChange={(e) => handleChange('profession', e.target.value)}
                                    placeholder={t.professionPlaceholder}
                                    className="w-full bg-background-light dark:bg-black/20 border-0 border-b-2 border-stone-200 dark:border-stone-600 focus:border-accent focus:ring-0 px-0 py-3 text-lg text-text-main dark:text-white placeholder:text-text-muted transition-colors font-medium bg-transparent rounded-none"
                                />
                                <span className="material-symbols-outlined absolute right-0 top-3 text-text-muted pointer-events-none group-focus-within:text-accent transition-colors">work_outline</span>
                            </div>
                        </div>

                        {/* Gender Selection */}
                        <div className="space-y-3">
                            <label className="block text-text-main dark:text-gray-200 text-base font-bold">
                                {t.genderLabel}
                            </label>
                            <div className="flex gap-4">
                                <label className="group relative flex-1 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="male" 
                                        className="peer sr-only" 
                                        checked={userData.gender === 'male'}
                                        onChange={() => handleChange('gender', 'male')}
                                    />
                                    <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-stone-200 dark:border-stone-600 bg-background-light dark:bg-black/20 text-text-muted peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all duration-300 shadow-sm">
                                        <span className="material-symbols-outlined text-xl">male</span>
                                        <span className="font-medium text-sm">{t.male}</span>
                                    </div>
                                </label>
                                <label className="group relative flex-1 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="female" 
                                        className="peer sr-only"
                                        checked={userData.gender === 'female'}
                                        onChange={() => handleChange('gender', 'female')}
                                    />
                                    <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-stone-200 dark:border-stone-600 bg-background-light dark:bg-black/20 text-text-muted peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all duration-300 shadow-sm">
                                        <span className="material-symbols-outlined text-xl">female</span>
                                        <span className="font-medium text-sm">{t.female}</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Zodiac Selection */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <label className="block text-text-main dark:text-gray-200 text-base font-bold">
                                    {t.zodiacLabel}
                                </label>
                            </div>
                            <div className="py-2">
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-2">
                                    {ZODIAC_OPTIONS.map((option) => (
                                        <label key={option.value} className="cursor-pointer group flex flex-col items-center">
                                            <input 
                                                type="radio" 
                                                name="zodiac" 
                                                value={option.value} 
                                                className="peer sr-only"
                                                checked={userData.zodiac === option.value}
                                                onChange={() => handleChange('zodiac', option.value)}
                                            />
                                            <div className="flex flex-col items-center justify-center gap-2 transition-all duration-300 peer-checked:scale-110">
                                                <div className="w-16 h-16 rounded-full bg-white dark:bg-surface-dark border-2 border-stone-200 dark:border-stone-600 flex items-center justify-center group-hover:border-accent peer-checked:border-accent peer-checked:bg-primary peer-checked:text-white text-text-muted shadow-sm peer-checked:shadow-lg peer-checked:shadow-primary/30 transition-all">
                                                    <span className="material-symbols-outlined text-3xl">{option.icon}</span>
                                                </div>
                                                <div className="text-center leading-none">
                                                    <span className={`text-xs block text-text-muted peer-checked:text-primary dark:peer-checked:text-accent ${language === 'cn' ? 'font-bold' : 'font-medium'}`}>
                                                        {language === 'cn' ? option.labelCn : option.label}
                                                    </span>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Footer */}
            <footer className="p-6 pb-8 fixed bottom-0 w-full max-w-md bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark z-20">
                <button 
                    onClick={onGenerate}
                    disabled={isGenerating || !userData.name}
                    className="w-full h-14 bg-gold-gradient rounded-full shadow-lg shadow-accent/40 hover:shadow-accent/60 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    {isGenerating ? (
                         <span className="material-symbols-outlined text-white animate-spin">progress_activity</span>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-white drop-shadow-sm">auto_awesome</span>
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-white font-bold text-lg tracking-wide drop-shadow-sm">{isGenerating ? t.generating : t.generateBtn}</span>
                            </div>
                        </>
                    )}
                </button>
                <p className="text-center text-[10px] text-text-muted mt-3 uppercase tracking-widest opacity-60">{t.footerMsg}</p>
            </footer>
        </div>
    );
};

export default FormView;