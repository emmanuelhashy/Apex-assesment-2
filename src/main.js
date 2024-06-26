import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

// createApp(App)
// .mount('#app')

const app = createApp(App);
app.use(ToastPlugin);
app.mount('#app');
