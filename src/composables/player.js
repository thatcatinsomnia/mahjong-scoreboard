import { toRefs, reactive, provide, inject } from 'vue';
import FriendServices from '/@/services/friendServices';

const PLAYER_CONTEXT = Symbol();

export function usePlayerProvider() {
  const state = reactive({
    userFriends: [],
    players: []
  });

  const initFriends = async () => {
    const res = await FriendServices.fetchAll();
    state.userFriends = res.data;
  };

  const addPlayer = name => {
    const existPlayer = state.userFriends.find(friend => friend.name === name);

    if (existPlayer) {
      const { id, name } = existPlayer;
      state.players.push({
        id,
        name,
        score: 0
      });
    } else {
      state.players.push({
        name,
        score: 0
      });
    }
  };

  const updateScore = (event, name) => {
    const score = parseInt(event.target.value);
    const player = state.players.find(player => player.name === name);
    player.score = score;
  };

  const deletePlayer = name => {
    
    const index = state.players.findIndex(player => player.name === name);
    state.players.splice(index, 1);
  };

  provide(PLAYER_CONTEXT, {
    ...toRefs(state),
    initFriends,
    addPlayer,
    updateScore,
    deletePlayer
  });
}

export function usePlayerContext() {
  const context = inject(PLAYER_CONTEXT);

  if (!context) {
    throw new Error('usePlayerContext must be used with usePlayerProvider');
  }

  return context;
}