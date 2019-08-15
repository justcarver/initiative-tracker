<template>
  <div class="init-card" v-if="dead === false">
    <p>{{ name }}</p>
    <p v-if="dying">Dying...</p>
    <p v-else>{{ initiative }}</p>
    <button v-if="type === 'player'">Dying</button>
    <button>Dead</button>
  </div>
</template>

<script>
export default {
  name: "InitiatieCard",
  props: {
    type: String,
    name: String,
    initiative: Number,
    dying: {
      type: Boolean,
      default: false
    },
    dead: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.init-card {
  border: 1px grey solid;
}
h1 {
  color: red;
}
</style>
