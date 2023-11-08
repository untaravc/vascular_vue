import {createApp} from 'vue'
import App from './App.vue'
import router from './config/router'
import mixin from './config/mixin'
import filter from './config/filter'
import Axios from 'axios'
import Unicon from 'vue-unicons'
import icons from './config/icons'
import store from './config/store'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import LaravelVuePagination from 'laravel-vue-pagination';
import Form from 'vform'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';

window.form = Form;

// Icons
Unicon.add(icons)

import mitt from 'mitt';
const emitter = mitt();

const app = createApp(App);
app.component('page-loader', Loading)
app.component('laravel-pagination', LaravelVuePagination)

import money from 'v-money3'

import VueSelect from "vue-select";

// Spinner
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
app.component('BounceLoader', BounceLoader);
app.component('PulseLoader', PulseLoader);
app.component('v-select', VueSelect);
app.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

app.use(router)
    .use(Unicon)
    .use(store)
    .use(money)
    .mixin(mixin)

app.config.globalProperties.$filters = filter
app.config.globalProperties.$axios = Axios;
app.config.globalProperties.emitter = emitter;

app.mount('#app')