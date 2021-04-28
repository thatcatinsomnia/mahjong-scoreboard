<template>
  <div class="mb-16">
    <h2 class="py-5 text-center text-2xl text-gray-500">遊戲玩家</h2>
    <div class="mx-auto max-w-2xl rounded">
      <div class="mb-6 flex">
        <div class="flex-1 relative">
          <input type="text" class="w-full px-2 py-2 h-full text-xl rounded border border-gray-300 block outline-none focus:ring-2 focus:ring-green-500" placeholder="新增玩家..." 
            v-model="newPlayerName" 
            @keydown.enter="addGamePlayer"
            @focus="isShowFriends = true"
            @blur="isShowFriends = false"
          >
            <ul class="py-2 absolute top-full left-0 w-full h-44 border border-gray-300 bg-gray-100 rounded z-10 overflow-y-scroll" v-show="isShowFriends">
              <li v-for="friend in filterFriends" :key="friend.name" class="p-3 cursor-pointer hover:bg-gray-300" 
                @mousedown="addGamePlayerFromFriend(friend)"
              >
                {{ friend.name }}
              </li>
            </ul>
        </div>
        <button class="ml-2 px-4 py-2 bg-green-500 text-white rounded" @click="addGamePlayer">Create</button>
      </div>

      <div class="divide-y rounded shadow">
        <div class="text-lg flex bg-green-300 text-green-700 rounded-tl rounded-tr">
          <span class="p-3 flex-1">玩家名稱</span>
          <span class="p-3 flex-1">玩家分數</span>
        </div>

        <PlayerRowData v-for="player in players" 
          :key="player.name"
          :player="player"
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
import { ref, computed, onBeforeMount } from 'vue';
import PlayerRowData from '/@/components/Player/PlayerRowData.vue';
import { usePlayerContext } from '/@/composables/player';

export default {
  name: 'PlayerList',
  components: {
    PlayerRowData
  },
  setup() {
    const { initFriends, userFriends, players, addPlayer } = usePlayerContext();
    const isShowFriends = ref(false);
    const newPlayerName = ref('');

    const addGamePlayer = event => {
      const duplicatePlayer = players.value.find(player => player.name === newPlayerName.value);

      if (duplicatePlayer || !newPlayerName.value) {
        newPlayerName.value = '';
        return
      };

      addPlayer(newPlayerName.value);

      newPlayerName.value = '';
    };


    const filterFriends = computed(() => {
      return userFriends.value.filter(friend => friend.name.includes(newPlayerName.value));
    });

    const totalScore = computed(() => {
      let total = 0;

      players.value.forEach(player => {
        total += parseInt(player.score);
      });

      return total;
    });

    const addGamePlayerFromFriend = friend => {
      newPlayerName.value = friend.name;
      addGamePlayer();
      isShowFriends.value = false;
    };

    onBeforeMount(() => {
      initFriends();
    });

    return {
      newPlayerName,
      players,
      userFriends,
      addGamePlayer,
      totalScore,
      isShowFriends,
      addGamePlayerFromFriend,
      filterFriends
    }
  }
}
</script>