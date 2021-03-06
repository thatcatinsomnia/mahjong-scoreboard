<template>
  <div class="p-1 flex-1 flex">
    <input class="p-2 flex-1 outline-none focus:ring-2 focus:ring-green-500 hover:bg-gray-200" type="text" v-model="playerName" @input="$emit('updateName', {id: player.id, name: playerName})">
  </div>
  
  <div class="p-1 flex-1 flex">
    <input class="p-2 flex-1 outline-none focus:ring-2 focus:ring-green-500 hover:bg-gray-200" type="text" v-model="playerScore" @input="$emit('updateScore', {id: player.id, score: playerScore})">
  </div>

  <button class="px-4 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 absolute left-full transform translate-x-3" 
    @click="$emit('deletePlayer', player.id)" 
  >
    刪除
  </button>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'PlayerRowData',
  props: {
    player: Object
  },
  emits: ['deletePlayer', 'updateName', 'updateScore'],
  setup(props) {
    const playerName = ref(props.player.name);
    const playerScore = ref(props.player.score);

    return {
      playerName,
      playerScore
    }
  }
}
</script>