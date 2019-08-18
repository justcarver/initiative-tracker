<template>
  <div class="init-card">
    <p>{{ entity.name }}</p>
    <div v-if="editable && entity.type === 'player' && !combat">
      <label for="initiative">Initiative:</label>
      <input
        type="number"
        id="initiative"
        v-model.number="entity.initiative"
        v-on:keyup.enter="updateInitiative"
        placeholder="Enter Initiative Rolled"
      />
    </div>
    <span v-if="combat">Initiative: {{ entity.initiative }}</span>
    <div class="currentStatus">
      <span v-for="(status, index) in currentStatus" v-bind:key="index">
        {{ status }}
      </span>
    </div>
    <div class="statuses">
      <ul>
        <li v-for="(status, index) in statusList" v-bind:key="index">
          <input
            type="checkbox"
            v-bind:id="status"
            v-model="entity.statuses[status]"
            v-on:change="updateStatus"
          />
          <label v-bind:for="status">{{ status }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "InitiatieCard",
  props: {
    entity: Object,
    editable: Boolean,
    combat: Boolean
  },
  computed: {
    statusList() {
      return Object.keys(this.entity.statuses);
    },
    currentStatus() {
      const statues = this.entity.statuses;
      let tempArray = [];
      for (const [key, value] of Object.entries(statues)) {
        if (value) {
          tempArray.push(key);
        }
      }
      return tempArray;
    }
  },
  methods: {
    updateInitiative() {
      const obj = {
        id: this.entity.id,
        initiative: this.entity.initiative
      };
      this.$store.dispatch("updateInitiative", obj);
    },
    updateStatus() {
      const obj = {
        id: this.entity.id,
        statuses: this.entity.statuses
      };
      this.$store.dispatch("updateStatuses", obj);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.init-card {
  border: 1px grey solid;
}
.statuses {
  display: none;
}
</style>
