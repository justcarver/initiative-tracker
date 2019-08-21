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
    currentOrder: [],
    combat: {
      isactive: false,
      turn: 1,
      round: 1
    }
  },
  mutations: {
    addEntity(state, n) {
      n.forEach(entity => {
        state.entities.push(entity);
      });
    },
    initializeStore(state) {
      if (localStorage.getItem("store")) {
        Object.assign(state, JSON.parse(localStorage.getItem("store")));
      }
    },
    nextTurn(state) {
      if (state.combat.turn >= state.entities.length) {
        state.combat.turn = 1;
        state.combat.round++;
      } else {
        state.combat.turn++;
      }
      const entity = state.currentOrder.shift();
      state.currentOrder.push(entity);
    },
    removeDeadEntities(state) {
      state.entities = state.entities.filter(
        entity => entity.type === "player" || !entity.statuses.dead
      );
    },
    removeEntity(state, n) {
      state.entities = state.entities.filter(entity => entity.id !== n.id);
    },
    resetCombat(state) {
      state.combat = {
        isactive: false,
        turn: 1,
        round: 1
      };
    },
    sortCurrentOrder(state) {
      state.currentOrder = state.entities;
      state.currentOrder.sort(compareValues("random", "desc"));
      state.currentOrder.sort(compareValues("dexterity", "desc"));
      state.currentOrder.sort(compareValues("initiative", "desc"));
    },
    toggleCombat(state) {
      state.combat.isactive = !state.combat.isactive;
    },
    updateInitiative(state, n) {
      state.entities.forEach(entity => {
        if (entity.id == n.id) {
          entity.initiative = n.initiative;
        }
      });
    },
    updateRandomization(state) {
      state.entities.forEach(entity => {
        if (entity.type !== "player") {
          const initiative = Math.floor(Math.random() * 20) + 1;
          const bonus = Math.floor((entity.dexterity - 10) / 2);
          entity.initiative = initiative + bonus;
        }
        entity.random = Math.random();
      });
    },
    updateStatuses(state, n) {
      state.entities.forEach(entity => {
        if (entity.id == n.id) {
          entity.statuses = n.statuses;
        }
      });
    },
    updateTurns(state) {
      const turnNo = state.combat.turn - 1;
      const roundNo = (state.combat.round - 1) * state.entities.length;
      const total = roundNo + turnNo;
      for (let i = 0; i < total; i++) {
        const entity = state.currentOrder.shift();
        state.currentOrder.push(entity);
      }
    }
  },
  actions: {
    addEntity(context, obj) {
      obj.forEach(entity => {
        context.commit("addEntity", entity);
      });
      context.commit("sortCurrentOrder");
      context.commit("updateTurns");
    },
    nextTurn(context) {
      context.commit("nextTurn");
    },
    removeDeadEntities(context) {
      context.commit("removeDeadEntities");
    },
    removeEntity(context, obj) {
      context.commit("removeEntity", obj);
    },
    resetCombat(context) {
      context.commit("resetCombat");
    },
    toggleCombat(context) {
      if (!context.state.combat.isActive) {
        context.commit("updateRandomization");
        context.commit("sortCurrentOrder");
      }
      context.commit("toggleCombat");
    },
    updateInitiative(context, obj) {
      context.commit("updateInitiative", obj);
    },
    updateStatuses(context, obj) {
      context.commit("updateStatuses", obj);
    }
  },
  getters: {
    playerArray: state => {
      return state.entities.filter(entity => entity.type === "player");
    },
    npcArray: state => {
      return state.entities.filter(entity => entity.type !== "player");
    },
    combatOrder: state => {
      return state.currentOrder;
    }
  }
});

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
