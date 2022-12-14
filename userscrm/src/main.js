import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.config.productionTip = false;

import "./assets/scss/main.scss";

new Vue({
    router,
    store,
    render: function(h) {
        return h(App);
    },
}).$mount("#app");