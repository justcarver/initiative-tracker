<template>
  <div class="combat-list">
    <div class="flex justify-around">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        v-if="inCombat === false"
        v-on:click="toggleCombat"
      >
        Start Combat
      </button>
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        v-if="inCombat"
        v-on:click="toggleCombat"
      >
        End Combat
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        v-if="inCombat"
        v-on:click="nextTurn()"
      >
        Next Turn
      </button>
    </div>
    <div v-if="inCombat">
      <div class="text-xl font-bold">
        Round {{ roundNumber }} : Turn {{ turnNumber }}
      </div>
      <div class="flex flex-col items-center">
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
