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
          <input id="name" type="text" v-model="entity.name" />
        </div>
        <div>
          <label for="dex">Dex:</label>
          <input id="dex" type="number" v-model.number="entity.dexterity" />
        </div>
        <div v-if="inCombat">
          <label for="initiative">Initiative:</label>
          <input
            id="initiative"
            type="number"
            v-model.number="entity.initiative"
          />
        </div>
        <div v-if="entity.type !== 'player'">
          <label for="creature-count">No. of Creatures:</label>
          <input id="creature-count" type="number" v-model.number="count" />
        </div>
      </div>
      <div>
        <button type="button" v-on:click="saveEntity" v-if="adding">
          Save {{ entity.type }}
        </button>
        <button type="button" v-on:click="toggleAdding">
          <span v-if="adding">Cancel Adding</span>
          <span v-else>Add New Entity</span>
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
