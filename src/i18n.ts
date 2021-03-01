import { createI18n } from 'vue-i18n';

// TODO: Locale changer should store a cookie.

const messages = {
    de: {
        about: 'Über-Seite',
        birthRateCommoners: 'Geburtenrate der Arbeiter',
        birthRateElites: 'Geburtenrate der Eliten',
        depletionPerWorker: 'Erschöpfung pro Arbeiter',
        inequalityFactor: 'Ungleichheitsfaktor',
        detailPage: 'Ausführliche Simulation',
    },
    en: {
        about: 'About',
        birthRateCommoners: 'Workers birth rate',
        birthRateElites: 'Elites birth rate',
        depletionPerWorker: 'Depletion per worker',
        inequalityFactor: 'Inequality factor',
        detailPage: 'Interactive simulation',
    },
};

function getBrowserLocale(options = {}): string | undefined {
    const defaultOptions = { trimCountryCode: true }
  
    const opt = { ...defaultOptions, ...options }
  
    const navigatorLocale =
      navigator.languages !== undefined
        ? navigator.languages[0]
        : navigator.language
  
    if (!navigatorLocale) {
      return undefined
    }
  
    const trimmedLocale = opt.trimCountryCode
      ? navigatorLocale.trim().split(/-|_/)[0]
      : navigatorLocale.trim()
  
    return trimmedLocale
}

export const i18n = createI18n({
    locale: getBrowserLocale(),
    fallbackLocale: 'en',
    messages,
});