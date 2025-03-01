import { common } from './common';
import { dashboard } from './dashboard';
import { patients } from './patients';
import { administration } from './administration';
import { appointments } from './appointments';
import { forms } from './forms';
import { menu } from './menu';

export const translations = {
  en: {
    ...common.en,
    ...dashboard.en,
    ...patients.en,
    ...administration.en,
    ...appointments.en,
    ...forms.en,
    ...menu.en,
  },
  fr: {
    ...common.fr,
    ...dashboard.fr,
    ...patients.fr,
    ...administration.fr,
    ...appointments.fr,
    ...forms.fr,
    ...menu.fr,
  }
};