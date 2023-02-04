export const customLocalesMapToDateFns: Record<string, string> = {
    en: 'en-GB',
    ee: 'et', // Estonian
    dk: 'da', // Danish
    gr: 'el', // Greek
    ge: 'ka', // Georgian
    xr: 'ar', // Arabic
    bh: 'bg', // Bulgarian
    cg: 'fr', // French (Congo)
    xl: 'es', // Spanish (Latin America)
    il: 'he', // Hebrew (he-IL)
    zh: 'zh-TW', // Chinese
    zh_hant: 'zh-TW', // Chinese
    ar: 'ar-MA',
    ru: 'ru',
    fa: 'fa-IR', // Irish
    no: 'nn', // Norwegian
    'pt-br': 'pt-BR', // Portuguese
    tr: 'tr', // Turkish
    pl: 'pl', // Polish
};

let iFrameLocale: Locale;

export const setupDateFnsLocale = (locale: string): Promise<void> => {
    const code = customLocalesMapToDateFns[locale] ?? locale;

    return import(`date-fns/locale/${code}/index.js`)
        .catch(() => import('date-fns/locale/en-GB/index.js'))
        .then((value) => {
            iFrameLocale = value.default;
        });
};

export const getDateFnsLocale = (): Locale => {
    if (!iFrameLocale) {
        throw new Error('You probably forgot to use "setupDateFnsLocale" and provide locale');
    }

    return iFrameLocale;
};
