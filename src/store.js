import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function compareValues(key, order = "asc") {
  return function(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }
    const varA = a[key];
    const varB = b[key];
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order == "desc" ? comparison * -1 : comparison;
  };
}

const store = new Vuex.Store({
  state: {
    entities: [],
    combat: {
      isactive: false,
      turn: 1,
      round: 1
    }
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("store")) {
        Object.assign(state, JSON.parse(localStorage.getItem("store")));
      }
    },
    addEntity(state, n) {
      state.entities.push(n);
    },
    setCombat(state, n) {
      state.combat.isactive = n;
    },
    setOrder(state, n) {
      state.initiativeOrder = n;
    },
    nextEntity(state) {
      const currentPlayer = state.initiativeOrder.shift();
      state.initiativeOrder.push(currentPlayer);
    },
    nextTurn(state) {
      if (state.combat.turn >= state.initiativeOrder.length) {
        state.combat.turn = 1;
        state.combat.round++;
      } else {
        state.combat.turn++;
      }
    }
  },
  actions: {
    addEntity(context, obj) {
      context.commit("addEntity", obj);
    }
  },
  getters: {
    outOfCombatOrder: state => {
      let playerArray = state.entities.filter(
        entity => entity.type === "player"
      );
      let importantNpcs = state.entities.filter(
        entity => entity.type === "importantNpc"
      );
      let npcs = state.entities.filter(
        entity => entity.type !== "importantNpc" && entity.type !== "player"
      );
      return playerArray.concat(importantNpcs, npcs);
    },
    combatOrder: state => {
      let combatArray = [];
      state.entities.forEach(x => combatArray.push(x));
      combatArray.sort(compareValues("random", "desc"));
      combatArray.sort(compareValues("dexterity", "desc"));
      combatArray.sort(compareValues("initiative", "desc"));
      return combatArray;
    }
  }
});

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
