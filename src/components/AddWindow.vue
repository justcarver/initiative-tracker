<template>
  <div class="add-window">
    <AddForm v-if="adding" />
    <button v-on:click="toggleAdding">
      <span v-if="adding">Cancel Adding</span>
      <span v-else>Add Player</span>
    </button>
  </div>
</template>

<script>
import AddForm from "@/components/AddForm.vue";

export default {
  name: "AddWindow",
  props: {},
  data: function() {
    return {
      adding: false
    };
  },
  methods: {
    toggleAdding: function() {
      this.adding = !this.adding;
    }
  },
  components: {
    AddForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: red;
}
</style>
