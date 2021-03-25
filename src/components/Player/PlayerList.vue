<template>
  <div class="mb-16">
    <h2 class="py-5 text-center text-2xl text-gray-500">遊戲玩家</h2>
    <div class="mx-auto max-w-2xl rounded">
      <div class="mb-6 flex">
        <input type="text" class="px-2 py-2 h-full text-xl rounded border border-gray-300 block flex-1 outline-none focus:ring-2 focus:ring-green-500" placeholder="新增玩家..." v-model="newPlayerName" @keydown.enter="addPlayer">
        <button class="ml-2 px-4 py-2 bg-green-500 text-white rounded" @click="addPlayer">Create</button>
      </div>

      <div class="divide-y rounded shadow">
        <div class="text-lg flex bg-green-300 text-green-700 rounded-tl rounded-tr">
          <span class="p-3 flex-1">玩家名稱</span>
          <span class="p-3 flex-1">玩家分數</span>
        </div>

          <PlayerRowData v-for="player in state.players" 
            :key="player.id"
            :player="player"
            @deletePlayer="deletePlayer"
            @updateName="updateName"
            @updateScore="updateScore"
          />
      </div>
      
      <div class="mt-4 flex">
        <span class="p-3 flex-1 text-lg">總計：</span>
        <span class="p-3 flex-1 text-lg" :class="{'text-red-500': totalScore < 0, 'text-green-500': totalScore >= 0}">{{ totalScore }}</span>
      </div>
     
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import PlayerRowData from '/@/components/Player/PlayerRowData.vue';

export default {
  name: 'PlayerList',
  components: {
    PlayerRowData
  },
  setup() {
    const newPlayerName = ref('');

    const state = reactive({
      players: [
        {
          id: Math.random().toString(36).substring(2),
          name: '小華',
          score: 500
        },
        {
          id: Math.random().toString(36).substring(2),
          name: '小明',
          score: -6500
        },
        {
          id: Math.random().toString(36).substring(2),
          name: 'JOE',
          score: -500
        },
        {
          id: Math.random().toString(36).substring(2),
          name: 'TOM',
          score: -200
        }
      ]
    });

    const addPlayer = () => {
      if (!newPlayerName.value) return;

      state.players.push({
        id: Math.random().toString(36).substring(2),
        name: newPlayerName.value,
        score: 0
      });

      newPlayerName.value = '';
    };

    const deletePlayer = id => {
      const index = state.players.findIndex(player => player.id === id);
      state.players.splice(index, 1);
    };

    const updateName = ({id, name}) => {
      const player = state.players.find(player => player.id === id);
      player.name = name;
    };

    const updateScore = ({id, score}) => {
      const player = state.players.find(player => player.id === id);
      player.score = score;
    };

    const totalScore = computed(() => {
      let total = 0;

      state.players.forEach(player => {
        total += parseInt(player.score);
      });

      return total;
    });

    return {
      newPlayerName,
      state,
      addPlayer,
      deletePlayer,
      updateName,
      updateScore,
      totalScore
    }
  }
}
</script>