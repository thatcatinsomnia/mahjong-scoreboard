<template>
  <div class="flex relative items-center">

    <div class="p-1 flex-1 flex">
      <span class="p-2 flex-1 outline-none focus:ring-2">{{ player.name }}</span>
    </div>
    
    <div class="p-1 flex-1 flex">
      <input class="p-2 flex-1 outline-none focus:ring-2 focus:ring-green-500 hover:bg-gray-200" type="text" @input="updateScore($event, player.name)" />
    </div>

    <button class="px-4 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 absolute left-full transform translate-x-3 whitespace-nowrap" 
      @click="deletePlayer(player.name)" 
    >
      刪除
    </button>
  </div>
</template>

<script>
import { usePlayerContext } from '/@/composables/player';

export default {
  name: 'PlayerRowData',
  props: {
    player: Object
  },
  setup() {
    const { deletePlayer, updateScore } = usePlayerContext();

    return {
      deletePlayer,
      updateScore
    }
  }
}
</script>