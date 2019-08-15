<template>
  <div class="home">
    <InitiativeCard type="player" name="Skylan" initiative="15" />
    <InitiativeCard type="player" name="Alexander" initiative="13" />
    <InitiativeCard type="player" name="Ilara" initiative="12" dead />
    <InitiativeCard type="player" name="Davis" initiative="5" dying />
    <InitiativeCard type="monster" name="Strahd" initiative="3" />
  </div>
</template>

<script>
// @ is an alias to /src
import InitiativeCard from "@/components/InitiativeCard.vue";

export default {
  name: "home",
  components: {
    InitiativeCard
  }
};
</script>
