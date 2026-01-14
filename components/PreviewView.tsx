import React from 'react';
import { AppState, Language } from '../types';
import { TRANSLATIONS, ZODIAC_OPTIONS } from '../constants';

interface PreviewViewProps {
    appState: AppState;
    onEdit: () => void;
    setLanguage: (lang: Language) => void;
}

const PreviewView: React.FC<PreviewViewProps> = ({ appState, onEdit, setLanguage }) => {
    const { userData, generatedBlessing, language } = appState;
    const t = TRANSLATIONS[language];

    if (!generatedBlessing) return null;

    const currentZodiacCn = ZODIAC_OPTIONS.find(z => z.value === userData.zodiac)?.labelCn || '';
    const currentZodiacEn = userData.zodiac;

    const renderTitle = () => {
        const title = language === 'en' ? generatedBlessing.titleEn : generatedBlessing.titleCn;
        return title;
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'cn' : 'en');
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-b from-rich-red to-background-dark overflow-y-auto overflow-x-hidden font-display">
            {/* Background Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[10%] h-2 w-2 rounded-full bg-gold-accent blur-[2px] animate-float-slow"></div>
                <div className="absolute top-[30%] right-[15%] h-3 w-3 rounded-full bg-primary blur-[4px] opacity-40 animate-float-medium" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-[40%] left-[20%] h-4 w-4 rounded-full bg-gold-accent blur-[8px] opacity-30 animate-float-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-[15%] right-[30%] h-1.5 w-1.5 rounded-full bg-white blur-[1px] opacity-50 animate-float-medium"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[300px] bg-primary/20 blur-[100px] rounded-full"></div>
            </div>

            {/* Header */}
            <div className="relative z-20 flex w-full items-center justify-between p-4 pt-6 md:p-6 max-w-md mx-auto flex-shrink-0">
                <button 
                    onClick={onEdit}
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 text-white"
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
                </button>
                <h2 className="text-white/90 text-lg font-bold tracking-wide">{t.previewTitle}</h2>
                <button 
                    onClick={onEdit}
                    className="h-10 px-5 rounded-full bg-white/10 backdrop-blur-md text-sm font-semibold text-white transition-all hover:bg-white/20 hover:text-gold-accent"
                >
                    {t.editBtn}
                </button>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-start px-6 pb-8 w-full max-w-md mx-auto overflow-y-visible">
                {/* Language Toggle */}
                <div className="mb-6 flex items-center justify-center flex-shrink-0">
                    <div className="relative flex items-center rounded-full bg-black/20 p-1 backdrop-blur-xl border border-white/10 shadow-lg">
                        <button 
                            onClick={() => setLanguage('en')}
                            className={`relative z-10 rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${language === 'en' ? 'bg-primary text-white shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            English
                        </button>
                        <button 
                            onClick={() => setLanguage('cn')}
                            className={`relative z-10 rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${language === 'cn' ? 'bg-primary text-white shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            中文
                        </button>
                    </div>
                </div>

                {/* The Card - Height is now adaptive (h-auto) with a min-height */}
                <div className="relative w-full max-w-[340px] transition-transform duration-700 hover:scale-[1.005] shadow-2xl mb-8">
                    <div className="relative flex flex-col overflow-hidden rounded-xl bg-background-light shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] bg-paper-pattern min-h-[600px]">
                        {/* Border Decoration */}
                        <div className="absolute inset-3 border border-background-dark/10 rounded-lg pointer-events-none z-20"></div>
                        
                        {/* Hero Image - Fixed Height */}
                        <div className="relative h-72 w-full overflow-hidden bg-gray-200 shrink-0">
                             {/* Loading/Placeholder state handled by bg color, actual image renders on top */}
                            <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105" 
                                style={{ backgroundImage: `url('${generatedBlessing.imageUrl}')` }}
                                aria-label={`Illustration of ${userData.zodiac}`}
                            >
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background-light to-transparent"></div>
                            
                            {/* Year of Tag */}
                             <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-stone-100 shadow-sm z-10">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                                    {language === 'en' ? currentZodiacEn : currentZodiacCn} {language === 'en' ? 'Year' : '年'}
                                </span>
                            </div>
                        </div>

                        {/* Card Text Content - Flexible Height with Spacing */}
                        <div className="relative flex flex-1 flex-col px-8 py-6 z-10 justify-between">
                            
                            {/* Top Section: Recipient */}
                            <div className="w-full flex justify-start pl-1">
                                <div className="flex flex-row items-baseline gap-2.5">
                                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">{t.cardTo}</span>
                                    <span className={`text-2xl text-primary leading-none ${language === 'cn' ? 'font-festive' : 'font-signature'} transform -rotate-1`}>
                                        {userData.name}
                                    </span>
                                </div>
                            </div>

                            {/* Middle Section: Main Body - Increased Spacing */}
                            <div className="flex flex-col gap-5 w-full justify-center items-center text-center px-1 my-6">
                                <h1 className={`text-xl font-extrabold text-background-dark leading-snug tracking-tight ${language === 'cn' ? 'font-festive text-3xl' : ''}`}>
                                    {renderTitle()}
                                </h1>
                                
                                <div className="w-10 h-[1px] bg-primary/20"></div>
                                
                                <p className={`text-sm font-medium leading-relaxed text-background-dark/70 italic ${language === 'cn' ? 'font-festive text-xl not-italic text-background-dark/80 leading-relaxed' : 'font-serif'}`}>
                                    "{language === 'en' ? generatedBlessing.quoteEn : generatedBlessing.quoteCn}"
                                </p>
                            </div>

                            {/* Bottom Section: Sender */}
                            <div className="w-full flex justify-end pr-1 mt-auto">
                                <div className="flex flex-row items-center gap-2.5">
                                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">{t.cardFrom}</span>
                                    <div className="flex items-center gap-1.5">
                                         <div className="relative size-5 rotate-3 shadow-sm opacity-80">
                                            <div className="absolute inset-0 bg-primary rounded-[3px] opacity-90 shadow-inner"></div>
                                            <div className="absolute inset-[1px] border border-white/20 rounded-[2px]"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="font-serif-cn text-white text-[10px] font-medium select-none">福</span>
                                            </div>
                                        </div>
                                        <span className={`text-xl text-text-main leading-none ${language === 'cn' ? 'font-festive' : 'font-signature'} transform -rotate-2`}>
                                            {userData.senderName}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Actions - Sticky-ish behavior relative to scroll if content is long */}
            <div className="relative z-20 w-full rounded-t-3xl border-t border-white/5 bg-background-dark/80 px-6 pt-5 pb-8 backdrop-blur-xl max-w-md mx-auto flex-shrink-0">
                <div className="mx-auto flex max-w-md flex-col gap-3">
                    <button className="relative flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-primary text-white shadow-lg shadow-primary/25 transition-all hover:bg-[#a91223] active:scale-[0.98]">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                        <span className="material-symbols-outlined mr-2">send</span>
                        <span className="font-bold tracking-wide">{t.sendBtn}</span>
                    </button>
                    <button className="flex h-14 w-full items-center justify-center rounded-full border border-gold-accent/50 bg-transparent text-gold-accent transition-all hover:bg-gold-accent/10 active:scale-[0.98]">
                        <span className="material-symbols-outlined mr-2">download</span>
                        <span className="font-bold tracking-wide">{t.saveBtn}</span>
                    </button>
                </div>
                <div className="mt-6 flex flex-col items-center justify-center gap-2 opacity-60">
                    <div className="flex items-center gap-2">
                        <div className="flex size-6 items-center justify-center rounded bg-white p-0.5" data-alt="Miniature QR code for sharing">
                            <span className="material-symbols-outlined text-background-dark text-[18px]">qr_code_2</span>
                        </div>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-white">{t.createdVia}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewView;