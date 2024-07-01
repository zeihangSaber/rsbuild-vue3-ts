import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

export const bootstrap = () => {
  createApp(App).mount('#root');
};
