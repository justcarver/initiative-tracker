<template>
  <form class="add-form">
    <select v-model="type">
      <option value="player">Player</option>
      <option value="monster">Monster</option>
    </select>
  </form>
</template>

<script>
export default {
  name: "AddForm",
  props: {},
  data: () => {
    return {
      monster: {},
      player: {},
      type: "player"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: red;
}
</style>
