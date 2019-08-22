<template>
  <div class="mt-2">
    <form class="add-form">
      <div class="flex flex-col items-center" v-if="adding">
        <div class="flex items-center mb-6">
          <div class="w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right pr-4"
              for="type"
            >
              Type:
            </label>
          </div>
          <div class="w-2/3">
            <select
              class="w-full relative appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="type"
              v-model="entity.type"
            >
              <option value="player">Player</option>
              <option value="monster">Monster</option>
              <option value="npc">NPC</option>
              <option value="impotant-npc">Important NPC</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="flex items-center mb-6">
          <div class="w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="name"
            >
              Name:
            </label>
          </div>
          <div class="w-2/3">
            <input
              id="name"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              v-model="entity.name"
            />
          </div>
        </div>
        <div class="flex items-center mb-6">
          <div class="w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="dex"
            >
              Dex:
            </label>
          </div>
          <div class="w-2/3">
            <input
              id="dex"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="number"
              v-model.number="entity.dexterity"
            />
          </div>
        </div>
        <div class="flex items-center mb-6" v-if="inCombat">
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
              id="initiative"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="number"
              v-model.number="entity.initiative"
            />
          </div>
        </div>
        <div class="flex items-center mb-6" v-if="entity.type !== 'player'">
          <div class="w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="creature-count"
            >
              No. of Creatures:
            </label>
          </div>
          <div class="w-2/3">
            <input
              id="creature-count"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="number"
              v-model.number="count"
            />
          </div>
        </div>
      </div>
      <div>
        <button
          class="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          v-on:click="saveEntity"
          v-if="adding"
        >
          Save {{ entity.type }}
        </button>
        <button
          class="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          v-if="adding"
          v-on:click="toggleAdding"
        >
          Cancel Adding
        </button>
        <button
          class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          v-else
          v-on:click="toggleAdding"
        >
          Add New Entity
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import uuidv4 from "uuid/v4";
export default {
  name: "AddWindow",
  props: {},
  data: function() {
    return {
      adding: false,
      count: 1,
      entity: {
        type: "monster"
      }
    };
  },
  computed: {
    inCombat() {
      return this.$store.state.combat.isactive;
    }
  },
  methods: {
    resetEntity: function() {
      this.entity = {
        name: undefined,
        type: "monster",
        dexterity: 10,
        initiative: undefined,
        statuses: {
          blinded: false,
          charmed: false,
          dead: false,
          deafended: false,
          dying: false,
          exhaustion: false,
          fled: false,
          fatigued: false,
          grappled: false,
          hidden: false,
          incapacitated: false,
          invisible: false,
          paralyzed: false,
          petrified: false,
          poisoned: false,
          prone: false,
          restrained: false,
          stunned: false,
          unconcious: false
        }
      };
      this.count = 1;
    },
    saveEntity: function() {
      if (
        this.count > 0 &&
        this.entity.name !== "" &&
        this.entity.type !== ""
      ) {
        let tempArray = [];
        for (let i = 1; i <= this.count; i++) {
          let name;
          if (this.count > 1) {
            name = this.entity.name + " " + i;
          } else {
            name = this.entity.name;
          }
          let tempObj = {
            id: uuidv4(),
            name: name,
            type: this.entity.type,
            dexterity: this.entity.dexterity,
            initiative: this.entity.initiative,
            statuses: this.entity.statuses
          };
          tempArray.push(tempObj);
        }
        this.$store.commit("addEntity", tempArray);
        this.resetEntity();
      } else {
        console.log("Not Saving...");
      }
    },
    toggleAdding: function() {
      this.resetEntity();
      this.adding = !this.adding;
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: red;
}
</style>
