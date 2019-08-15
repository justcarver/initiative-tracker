import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    players: [],
    monsters: [],
    combat: {
      isactive: false,
      turn: 1,
      round: 1
    },
    initiativeOrder: []
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(state, JSON.parse(localStorage.getItem("store")));
      }
    },
    addPlayer(state, n) {
      state.players.push(n);
    },
    addMonster(state, n) {
      state.monsters.push(n);
    },
    startCombat(state) {
      state.combat.isactive = true;
    },
    endCombat(state) {
      state.combat.isactive = false;
    },
    nextTurn(state) {
      const currentPlayer = state.initiativeOrder.shift();
      state.initiativeOrder.push(currentPlayer);
      if (state.combat.turn >= state.initiativeOrder.length) {
        state.combat.turn = 1;
        state.combat.round++;
      } else {
        state.combat.turn++;
      }
    }
  },
  actions: {}
});

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
