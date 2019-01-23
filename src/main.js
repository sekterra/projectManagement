// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
import router from './router';
import 'font-awesome/css/font-awesome.css';  
import './theme/default.styl';
import VeeValidate from 'vee-validate';
// import colors from 'vuetify/es5/util/colors';
import Truncate from 'lodash.truncate';

/** import npm module **/
import axios from 'axios';  // Promise based HTTP client for the browser and node.js
import lodash from 'lodash';  // A modern JavaScript utility library delivering modularity, performance & extras
import format from 'string-format'; // string-format is a small JavaScript library for formatting strings, based on Python's 
/** /import npm module **/

/** import custom vue component **/
import YDataTable from '@/components/YDataTable';
import YText from '@/components/YText';
import YSelect from '@/components/YSelect';
import YBtn from '@/components/YBtn';
import YDatepicker from '@/components/YDatepicker';
/** /import custom vue component **/

/** import js **/
import backendConfig from '@/js/backendConfig.js';
import comm from '@/js/common.js';
/** /import js **/

Vue.config.productionTip = false;

// Helpers
// Global filters
Vue.filter('truncate', Truncate);
Vue.use(VeeValidate, { fieldsBagName: 'formFields' });
Vue.use(Vuetify, {
  // theme: {
  //   primary: colors.indigo.base, // #E53935
  //   secondary: colors.indigo.lighten4, // #FFCDD2
  //   accent: colors.indigo.base // #3F51B5
  // },
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary',
      },
      sideToolbar: {
      },
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: '',
    }
  }
});
// Bootstrap application components

/** Global Custom Component **/
Vue.component(YDataTable.name, YDataTable);
Vue.component(YText.name, YText);
Vue.component(YSelect.name, YSelect);
Vue.component(YBtn.name, YBtn);
Vue.component(YDatepicker.name, YDatepicker);

/** /Global Custom Component **/

/** global variable in Vue app **/
Vue.prototype.$http = axios;
Vue.prototype.$backend = backendConfig;
Vue.prototype.$_ = lodash;
Vue.prototype.$format = format;
Vue.prototype.$comm = comm;
/** /global variable in Vue app **/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
