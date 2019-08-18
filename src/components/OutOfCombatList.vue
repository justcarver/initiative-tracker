<template>
  <div class="out-of-combat-list">
    <div v-for="entity in playerArray" v-bind:key="entity.id">
      <InitiativeCard v-bind:entity="entity" editable />
    </div>
    <div v-for="entity in npcArray" v-bind:key="entity.id">
      <InitiativeCard v-bind:entity="entity" editable />
    </div>
  </div>
</template>

<script>
import InitiativeCard from "@/components/InitiativeCard.vue";
export default {
  name: "OutOfCombatList",
  props: {},
  data: function() {
    return {};
  },
  computed: {
    npcArray() {
      return this.$store.getters.npcArray;
    },
    playerArray() {
      return this.$store.getters.playerArray;
    }
  },
  methods: {},
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
