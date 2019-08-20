<template>
  <div class="combat-list">
    <div>
      <button v-on:click="toggleCombat">
        <span v-if="inCombat === false">Start Combat</span>
        <span v-if="inCombat">End Combat</span>
      </button>
      <button v-if="inCombat" v-on:click="nextTurn()">Next Turn</button>
    </div>
    <div v-if="inCombat">
      <h3>Round {{ roundNumber }} : Turn {{ turnNumber }}</h3>
      <div class="initiative-cards">
        <InitiativeCard
          v-for="entity in currentOrder"
          v-bind:key="entity.id"
          v-bind:entity="entity"
          combat
        />
      </div>
    </div>
  </div>
</template>

<script>
import InitiativeCard from "@/components/InitiativeCard.vue";
export default {
  name: "CombatList",
  props: {},
  data: function() {
    return {
      currentList: []
    };
  },
  computed: {
    currentOrder() {
      return this.$store.getters.combatOrder;
    },
    inCombat() {
      return this.$store.state.combat.isactive;
    },
    roundNumber() {
      return this.$store.state.combat.round;
    },
    turnNumber() {
      return this.$store.state.combat.turn;
    }
  },
  methods: {
    nextTurn() {
      this.$store.dispatch("nextTurn");
    },
    toggleCombat() {
      this.$store.dispatch("toggleCombat");
      if (!this.inCombat) {
        this.$store.dispatch("removeDeadEntities");
        this.$store.dispatch("resetCombat");
      }
    }
  },
  components: {
    InitiativeCard
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: red;
}
</style>
