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
    
    <Title>新增遊戲紀錄</Title>

    <main class="mx-auto mb-16 max-w-2xl">
      <h2 class="py-5 text-center text-2xl text-gray-500">遊戲時間</h2>

      <div class="flex mb-4">
        <div class="m-1 flex flex-col flex-1">
          <label>遊戲開始時間</label>
          <input type="datetime-local" name="start_at" class="border border-radius-500 rounded" ref="startAtInput">
        </div>
        <div class="m-1 flex flex-col flex-1">
          <label>遊戲結束時間</label>
          <input type="datetime-local" name="end_at" class="border border-radius-500 rounded" ref="endAtInput">
        </div>
      </div>

      <h2 class="py-5 text-center text-2xl text-gray-500">基本設定</h2>
      <div class="mb-4">
        <div class="mb-2">
          <label class="py-2 mr-2 block">快速讀取設定檔</label>
          <select class="p-1 border border-gray-400 rounded" @change="updateConfig">
            <option value="null" selected>請選擇設定檔</option>
            <option :value="pref.id" v-for="pref in prefs" :key="pref.id">{{ pref.name }}</option>
          </select>
        </div>
      </div>

      <div class="flex mb-2">
        <div class="flex-1">
          <label class="block mb-1">面額/積分</label>
          <input class="px-1 py-2 w-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500" type="text" v-model="formData.pref.rate">
        </div>

        <div class="flex-1">
          <label class="block mb-1">單次東錢：</label>
          <input class="ml-2 px-1 py-2 w-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500" type="text" v-model="formData.pref.price">
        </div>
      </div>

      <div class="flex mb-2">
        <div class="flex-1">
          <label class="block mb-1">次數：</label>
          <input class="px-1 py-2 w-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500" type="text" v-model="formData.pref.times">
        </div>

        <div class="flex-1">
          <label class="block mb-1">回合/降：</label>
          <input class="ml-2 px-1 py-2 w-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500" type="text"  v-model="formData.pref.rounds">
        </div>
      </div>

      <span class="py-4 block">東錢總額：{{ totalPrice }}</span>
    </main>

    <PlayerList />
    <CostList />

    <div class="mb-8 mx-auto max-w-2xl flex items-center text-white">
      <button class="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600" @click="createGameRecord">submit</button>
      <button class="ml-2 flex-1 py-2 px-4 bg-gray-400 hover:bg-gray-500" @click="onCancelCreate">cancel</button>
    </div>
  </div>
</template>


<script>
import { ref, reactive, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import Title from '/@/components/UI/Title.vue';
import PlayerList from '/@/components/Player/PlayerList.vue';
import CostList from '/@/components/Cost/CostList.vue';
import PrefServices from '/@/services/prefServices';
import GameServices from '/@/services/gameServices';

import { usePlayerContext } from '/@/composables/player';
import { useCostContext } from '/@/composables/cost';

export default {
  name: 'NewGame',
  components: {
    Title,
    PlayerList,
    CostList
  },
  setup() {
    const router = useRouter();
    const startAtInput = ref();
    const endAtInput = ref();
    const { players, clearPlayers } = usePlayerContext();
    const { costs, clearCosts } = useCostContext();
    const prefs = ref([]);

    const formData = reactive({
      pref: {
        id: '',
        name: '',
        rate: '',
        price: '',
        times: '',
        rounds: ''
      }
    });

    const totalPrice = computed(() => {
      if (!formData.pref.price || !formData.pref.times) {
        return 0;
      }
      
      return formData.pref.price * formData.pref.times;
    });
    
    const totalCosts = computed(() => {
      let total = 0;
      costs.value.map(cost => total += cost.value);
      return total;
    });

    const updateConfig = event => {
      const pickedId = event.target.value;
      const picked = prefs.value.find(pref => pref.id.toString() === pickedId);

      if (picked) {
        formData.pref = picked;
      } else {
        formData.pref = {
          id: '',
          name: '',
          rate: '',
          price: '',
          times: '',
          rounds: ''
        };
      }
    };

    const createGameRecord = async () => {
      const { rate, price, times, rounds } = formData.pref;

      const startAt = parseZuluTime(startAtInput.value);
      const endAt = parseZuluTime(endAtInput.value);

      const gameRecord = {
        start_at:  startAt,
        end_at: endAt,
        rate,
        price,
        times,
        rounds,
        players: players.value,
        costs: costs.value
      };

      console.log(gameRecord.start_at);
      console.log(gameRecord.end_at);
    return;
      
      const res = await GameServices.create(gameRecord);

      if (res.status === 201) {
        clearPlayers();
        clearCosts();
        clearFormData();
        alert('success');
      }
    };

    const parseZuluTime = timeElement => {
      return timeElement.value ? moment(timeElement.value).utc().format() : moment().utc().format();
    };

    const clearFormData = () => {
      formData.startAt = moment();
      formData.endAt = moment();
      formData.pref = {
        id: '',
        name: '',
        rate: '',
        price: '',
        times: '',
        rounds: ''
      };
    };

    const onCancelCreate = () => {
      router.push({ name: 'Home'});
    };

    onBeforeMount(async () => {
      const userPrefs = await PrefServices.fetchAll();
      prefs.value = userPrefs.data;
    });

    return {
      moment,
      prefs,
      formData,
      totalPrice,
      updateConfig,
      createGameRecord,
      totalCosts,
      onCancelCreate,
      startAtInput,
      endAtInput
    }
  }

}
</script>