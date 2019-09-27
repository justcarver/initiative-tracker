<template>
  <div class="max-w-sm w-3/4 rounded overflow-hidden shadow m-2">
    <div class="px-6 py-4">
      <div class="font-bold text-lg mb-2">{{ entity.name }}</div>
      <div
        class="flex items-center mb-6"
        v-if="editable && entity.type === 'player' && !combat"
      >
        <div class="w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="initiative"
          >
            Initiative:
          </label>
        </div>
        <div class="w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="number"
            id="initiative"
            v-model.number="entity.initiative"
            v-on:keyup.enter="updateInitiative"
            placeholder="Enter Initiative Rolled"
          />
        </div>
      </div>
      <span class="text-md mb-2" v-if="combat">
        Initiative: {{ entity.initiative }}
      </span>
      <div class="currentStatus" v-if="!statusOpen">
        <span
          class="text-grey-300"
          v-for="(status, index) in currentStatus"
          v-bind:key="index"
        >
          {{ status }}
        </span>
      </div>
      <div class="flex justify-between">
        <button
          v-on:click="toggleStatus"
          class="relative bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
        >
          <!--
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Statuses</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          -->
          Statuses
        </button>
        <button
          class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded"
          v-if="!combat"
          v-on:click="removeEntity"
        >
          Remove
        </button>
      </div>
      <div
        class="absolute bg-white z-50 max-w-sm rounded overflow-hidden shadow m-2 p-2"
        v-if="statusOpen"
      >
        <ul>
          <li
            class="m-1 flex w-full"
            v-for="(status, index) in statusList"
            v-bind:key="index"
          >
            <input
              class="mr-2"
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
      this.statusOpen = false;
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
