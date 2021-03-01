import { createApp } from 'vue';
import App from '@/App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';

function getBrowserLocale(options = {}) {
    const defaultOptions = { countryCodeOnly: false }
  
    const opt = { ...defaultOptions, ...options }
  
    const navigatorLocale =
      navigator.languages !== undefined
        ? navigator.languages[0]
        : navigator.language
  
    if (!navigatorLocale) {
      return undefined
    }
  
    const trimmedLocale = opt.countryCodeOnly
      ? navigatorLocale.trim().split(/-|_/)[0]
      : navigatorLocale.trim()
  
    return trimmedLocale
}

const i18n = createI18n({
    locale: getBrowserLocale(),
    fallbackLocale: 'en',
    messages: {
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
    },
});

import LocaleChanger from './components/LocaleChanger.vue';

createApp(App)
    .use(router)
    .use(i18n)
    .component('locale-changer', LocaleChanger)
    .mount('#app');
