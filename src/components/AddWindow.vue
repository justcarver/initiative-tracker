<template>
  <div class="add-window">
    <form class="add-form">
      <div v-if="adding">
        <div>
          <label for="type">Type:</label>
          <select name="type" v-model="entity.type">
            <option value="player">Player</option>
            <option value="monster">Monster</option>
            <option value="npc">NPC</option>
            <option value="impotant-npc">Important NPC</option>
          </select>
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="entity.name" />
        </div>
        <div>
          <label for="name">Dex:</label>
          <input type="text" v-model="entity.dexterity" />
        </div>
        <div>
          <label for="creature-count">No. of Creatures:</label>
          <input id="creature-count" type="number" v-model.number="count" />
        </div>
      </div>
      <div>
        <button type="button" v-on:click="saveEntity" v-if="adding">
          Save
        </button>
        <button type="button" v-on:click="toggleAdding">
          <span v-if="adding">Cancel</span>
          <span v-else>Add</span>
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
      entity: {}
    };
  },
  methods: {
    resetEntity: function() {
      this.entity = {
        name: "",
        type: "",
        dexterity: 10,
        initiative: 0,
        statuses: {
          blinded: false,
          charmed: false,
          dead: false,
          deafended: false,
          dying: false,
          exhaustion: false,
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
        for (let i = 1; i <= this.count; i++) {
          this.entity.id = uuidv4();
          if (this.count > 1) {
            this.entity.name = this.entity.name + " " + i;
          }
          this.$store.commit("addEntity", this.entity);
        }
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
