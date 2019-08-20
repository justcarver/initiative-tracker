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
    <div class="currentStatus" v-if="!statusOpen">
      <span v-for="(status, index) in currentStatus" v-bind:key="index">
        {{ status }}
      </span>
    </div>
    <button v-on:click="toggleStatus">Statues</button>
    <div class="statuses" v-if="statusOpen">
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
    <button v-if="!combat" v-on:click="removeEntity">Remove</button>
  </div>
</template>

<script>
export default {
  name: "InitiatieCard",
  data: function() {
    return {
      statusOpen: false
    };
  },
  props: {
    combat: Boolean,
    editable: Boolean,
    entity: Object
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
    removeEntity() {
      const obj = {
        id: this.entity.id
      };
      this.$store.dispatch("removeEntity", obj);
    },
    toggleStatus() {
      this.statusOpen = !this.statusOpen;
    },
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
</style>
