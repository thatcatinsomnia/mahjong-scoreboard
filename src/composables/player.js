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

  const initPlayers = players => {
    state.players = players;
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
      // todo: handle user id
      state.players.push({
        name,
        score: 0,
        user_id: 2, 
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

  const clearPlayers = () => {
    state.players = [];
  };

  provide(PLAYER_CONTEXT, {
    ...toRefs(state),
    initFriends,
    initPlayers,
    addPlayer,
    updateScore,
    deletePlayer,
    clearPlayers
  });
}

export function usePlayerContext() {
  const context = inject(PLAYER_CONTEXT);

  if (!context) {
    throw new Error('usePlayerContext must be used with usePlayerProvider');
  }

  return context;
}