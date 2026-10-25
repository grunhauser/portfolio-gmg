import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from './i18n';
import { vReveal } from './directives/reveal';
import { vSpotlight } from './directives/spotlight';
import './styles/tokens.css';
import './styles/base.css';

createApp(App)
  .use(i18n)
  .directive('reveal', vReveal)
  .directive('spotlight', vSpotlight)
  .mount('#app');
