import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import AirportTable from './components/AirportTable.vue';
import AirportCompare from './components/AirportCompare.vue';
import AirportCard from './components/AirportCard.vue';
import AffButton from './components/AffButton.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AirportTable', AirportTable);
    app.component('AirportCompare', AirportCompare);
    app.component('AirportCard', AirportCard);
    app.component('AffButton', AffButton);
  }
} satisfies Theme;
