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
          v-for="entity in currentList"
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
    combatArray() {
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
      const entity = this.currentList.shift();
      this.currentList.push(entity);
      this.$store.dispatch("nextTurn");
    },
    toggleCombat() {
      this.currentList = this.$store.getters.combatOrder;
      this.$store.dispatch("toggleCombat");
    }
  },
  created: function() {
    this.currentList = this.$store.getters.combatOrder;
    if (
      this.$store.state.combat.turn > 1 ||
      this.$store.state.combat.round > 1
    ) {
      const currentTurn = this.$store.state.combat.turn - 1;
      const currentRound = this.$store.state.combat.round - 1;
      const times = currentRound * this.currentList.length + currentTurn;
      for (let i = 0; i < times; i++) {
        const entity = this.currentList.shift();
        this.currentList.push(entity);
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
