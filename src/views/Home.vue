<template>
  <div class="home">
    <AddWindow />
    <OutOfCombatList v-if="inCombat === false" />
    <CombatList />
  </div>
</template>

<script>
// @ is an alias to /src
// import InitiativeCard from "@/components/InitiativeCard.vue";
import AddWindow from "@/components/AddWindow.vue";
import OutOfCombatList from "@/components/OutOfCombatList.vue";
import CombatList from "@/components/CombatList.vue";

export default {
  name: "home",
  components: {
    AddWindow,
    CombatList,
    OutOfCombatList
  },
  computed: {
    inCombat() {
      return this.$store.state.combat.isactive;
    }
  }
};
</script>
