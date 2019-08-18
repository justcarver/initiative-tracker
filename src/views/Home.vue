<template>
  <div class="home">
    <AddWindow />
    <OutOfCombatList />
  </div>
</template>

<script>
// @ is an alias to /src
// import InitiativeCard from "@/components/InitiativeCard.vue";
import AddWindow from "@/components/AddWindow.vue";
import OutOfCombatList from "@/components/OutOfCombatList.vue";

export default {
  name: "home",
  components: {
    AddWindow,
    OutOfCombatList
  }
};
</script>
