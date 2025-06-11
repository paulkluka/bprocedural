import { createApp, vModelDynamic } from 'vue'
import App from './vue/App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { VCard, VCardTitle, VCardText, VCol, VApp, VMain, VBtn, VDialog, VCardActions, VBanner, VImg} from 'vuetify/components';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    
  },
  components: {
    VCard,
    VCardTitle,
    VCardText,
    VCol,
    VApp,
    VMain,
    VBtn,
    VDialog,
    VCardActions,
    VBanner,
    VImg,
  }
});

createApp(App)
  .use(vuetify)
  .mount('#app')
