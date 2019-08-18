<template>
  <div class="combat-list">
    <button v-on:click="toggleCombat">
      <span v-if="inCombat === false">Start Combat</span>
      <span v-if="inCombat">End Combat</span>
    </button>
    <div v-if="inCombat">
      <InitiativeCard
        v-for="entity in combatArray"
        v-bind:key="entity.id"
        v-bind:entity="entity"
        combat
      />
    </div>
  </div>
</template>

<script>
import InitiativeCard from "@/components/InitiativeCard.vue";
export default {
  name: "CombatList",
  props: {},
  data: function() {
    return {};
  },
  computed: {
    combatArray() {
      return this.$store.getters.combatOrder;
    },
    inCombat() {
      return this.$store.state.combat.isactive;
    }
  },
  methods: {
    toggleCombat() {
      this.$store.dispatch("toggleCombat");
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
