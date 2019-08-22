import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import store from "./store";
import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.commit("initializeStore");
  }
}).$mount("#app");
