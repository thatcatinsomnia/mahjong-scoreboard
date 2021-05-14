<template>
  <div>
    <div class="fixed w-full top-0 bg-gray-600 text-white flex justify-center z-10">
      <ul class="flex items-center whitespace-nowrap">
        <li class="mx-4">東錢總額：{{ totalPrice }}</li>
        <li class="mx-4">玩家總分：</li>
        <li class="mx-4">成本總花費：{{ totalCosts }}</li>
        <li class="mx-4">最後結算：</li>
      </ul>
    </div>
    
    <Title>修改遊戲紀錄</Title>

    <main class="mx-auto mb-16 max-w-2xl">
      <h2 class="py-5 text-center text-2xl text-gray-500">遊戲時間</h2>

      <div class="flex mb-4">
        <div class="m-1 flex flex-col flex-1">
          <label>遊戲開始時間</label>
          <input type="text" name="start_at" class="border border-radius-500 rounded" ref="startAtInput" :value="moment(recordDate.start_at).local().format('YYYY/MM/DD HH:mm')">
        </div>
        <div class="m-1 flex flex-col flex-1">
          <label>遊戲結束時間</label>
          <input type="text" name="end_at" class="border border-radius-500 rounded" ref="endAtInput" :value="recordDate.end_at">
        </div>
      </div>

      <h2 class="py-5 text-center text-2xl text-gray-500">基本設定</h2>

      <div class="flex mb-2">
        <div class="flex-1">
          <label class="block mb-1">面額/積分</label>
          <input class="px-1 py-2 w-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500" type="text" v-model.number="pref.rate">
        </div>

        <div class="flex-1">
          <label class="block mb-1">單次東錢：</label>
          <input class="ml-2 px-1 py-2 w-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500" type="text" v-model.number="pref.price">
        </div>
      </div>

      <div class="flex mb-2">
        <div class="flex-1">
          <label class="block mb-1">次數：</label>
          <input class="px-1 py-2 w-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500" type="text" v-model.number="pref.times">
        </div>

        <div class="flex-1">
          <label class="block mb-1">回合/降：</label>
          <input class="ml-2 px-1 py-2 w-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500" type="text" v-model.number="pref.rounds">
        </div>
      </div>

      <span class="py-4 block">東錢總額：{{ totalPrice }}</span>
    </main>

    <PlayerList />
    <CostList />

    <div class="mb-8 mx-auto max-w-2xl flex items-center text-white">
      <button class="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600" 
        :class="isSubmit ? 'pointer-events-none opacity-30' : ''"
        @click="updateGameRecord"
      >
        update
      </button>
      <button class="ml-2 flex-1 py-2 px-4 bg-gray-400 hover:bg-gray-500" 
        :class="isSubmit ? 'pointer-events-none opacity-30' : ''"
        @click="onCancelUpdate"
      >
        cancel
      </button>
    </div>
  </div>
</template>


<script>
import { ref, reactive, computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment-timezone';
import Hashids from 'hashids';
import Title from '/@/components/UI/Title.vue';
import PlayerList from '/@/components/Player/PlayerList.vue';
import CostList from '/@/components/Cost/CostList.vue';
import GameServices from '/@/services/gameServices';

import { usePlayerContext } from '/@/composables/player';
import { useCostContext } from '/@/composables/cost';

export default {
  name: 'EditGameRecord',
  components: {
    Title,
    PlayerList,
    CostList
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const hashids = new Hashids();
    const recordId = hashids.decode(route.params.id);

    const isSubmit = ref(false);

    const { players, initPlayers, clearPlayers } = usePlayerContext();
    const { costs, initCosts, clearCosts } = useCostContext();

    const startAtInput = ref();
    const endAtInput = ref();

    const pref = reactive({
      id: '',
      rate: '',
      price: '',
      times: '',
      rounds: ''
    });

    const recordDate = reactive({
      start_at: '',
      end_at: ''
    });

    const totalPrice = computed(() => {
      if (!pref.price || !pref.times) {
        return 0;
      }
      
      return pref.price * pref.times;
    });
    
    const totalCosts = computed(() => {
      let total = 0;
      costs.value.map(cost => total += cost.value);
      return total;
    });

    const updateGameRecord = async () => {
      isSubmit.value = true;
      const { rate, price, times, rounds } = pref;

      // const startAt = parseZuluTime(startAtInput.value);
      // const endAt = parseZuluTime(endAtInput.value);
      // todo: update start_at and end_at
      const gameRecord = {
        // start_at:  startAt,
        // end_at: endAt,
        rate,
        price,
        times,
        rounds,
        players: players.value,
        costs: costs.value
      };

      
      const res = await GameServices.update(recordId, gameRecord);

      if (res.status === 200) {
        alert('success');
      } else {
        alert('something error!!');
      }

      isSubmit.value = false;
      router.replace({ name: 'GameRecords' });
    };

    // const parseZuluTime = timeElement => {
    //   return timeElement.value ? moment(timeElement.value).utc().format() : moment().utc().format();
    // }

    const onCancelUpdate = () => {
      router.push({ name: 'GameRecords' });
    };

    onBeforeMount(async () => {
      const gameRecord = await GameServices.fetchById(recordId);
      const { start_at, end_at, id, rate, price, rounds, times, costs, players } = gameRecord.data;

      pref.id = id;
      pref.rate = rate;
      pref.price = price;
      pref.rounds = rounds;
      pref.times = times;
      recordDate.start_at = start_at;
      recordDate.end_at = end_at;

      initPlayers(players);
      initCosts(costs);
    });

    return {
      moment,
      isSubmit,
      pref,
      recordDate,
      totalPrice,
      totalCosts,
      updateGameRecord,
      onCancelUpdate,
      startAtInput,
      endAtInput
    }
  }

}
</script>