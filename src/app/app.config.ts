import { NgcCookieConsentConfig } from 'ngx-cookieconsent';

// export const API_URL = 'http://127.0.0.1:5000';
// export const API_URL = 'http://18.221.175.43';
export const API_URL = '';

export const MAIL_FOR_CLIENTS = 'clients@whitespacerenovation.com';
export const DOMAIN_NAME = 'www.whitespacerenoation.com';
export const CURRENCY = '€';

export enum LoginParam {
  REGISTER,
  LOGIN,
}

export enum ConfirmationDilogType {
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'error',
}

export const MSG_ACTION_SUCCESSFUL = 'Your action was successful!';
export const MSG_ACTION_UNSUCCSSFUL = 'Something went wrong... 🤕';

export const CONFIRMATION_DIALOG_WIDTH = '500px';
export const DOCUMENT_DIALOG_WIDTH = '800px';

export const BREAKING_POINT_PX = 960;

export const MEDIA_QUERY_WIDTH = '(max-width: 960px)';
export const SCROLL_SPEED = 40;

export const SCROLL_BEHAVIOR = 'smooth';

export const SHOW_ADDRESS_INPUT = false;

export const COOKIE_CONFIG: NgcCookieConsentConfig = {
  cookie: {
    domain: 'whitespacerenovation.com/',
  },
  position: 'bottom-left',
  theme: 'classic',
  palette: {
    popup: {
      background: '#000000',
      text: '#ffffff',
      link: '#ffffff',
    },
    button: {
      background: '#ffffff',
      text: '#000000',
      border: 'transparent',
    },
  },
  type: 'opt-in',
  content: {
    message:
      'This website uses cookies which improve  your experience and improve the site. You can find out more about our cookie policy in our privacy policy document.',
    dismiss: 'Got it!',
    allow: 'Accept all cookies',
    deny: 'Only necessary',
    link: '',
    href: '',
    policy: 'Cookie Policy',
  },
  enabled: document.cookie ? false : true,
};

export const IMG_PLACHOLDER = 'assets/images/checkout/image-placeholder.png';
export const IMG_LOADING = 'assets/images/checkout/image-loading.gif';
export const IMG_PDF = 'assets/icons/pdf-icon.png';
export const IMG_DWG = 'assets/icons/dwg-icon.png';
