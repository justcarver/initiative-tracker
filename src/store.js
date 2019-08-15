import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(state, JSON.parse(localStorage.getItem("store")));
      }
    }
  },
  actions: {}
});

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
