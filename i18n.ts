// src/i18n.ts

import i18n                 from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales }       from 'expo-localization'

import en from './locales/en.json'
import ru from './locales/ru.json'
import ua from './locales/ua.json'
import pl from './locales/pl.json'

const resources = {
    en: { translation: en },
    ru: { translation: ru },
    ua: { translation: ua },
    pl: { translation: pl },
}

const fallbackLng = 'en'

const locales = getLocales()
const languageTag: string = locales.length > 0
    ? (locales[0].languageCode ?? fallbackLng)
    : fallbackLng

i18n
    .use(initReactI18next)

void i18n.init(
    {
        resources,
        lng: languageTag,
        fallbackLng,
        interpolation: { escapeValue: false },
    }
)

export default i18n
