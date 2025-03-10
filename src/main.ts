import { createApp } from 'vue'
import App from './vue/App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify()

createApp(App)
  .use(vuetify)
  .mount('#app')
