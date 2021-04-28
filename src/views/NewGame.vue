<template>
  <div>
    <Title>新增遊戲紀錄</Title>
    
    <main class="mx-auto mb-16 max-w-2xl">
      <h2 class="py-5 text-center text-2xl text-gray-500">基本設定</h2>

      <div class="mb-4">
        <div class="mb-2">
          <label class="py-2 mr-2 block">選擇設定檔</label>
          <select class="p-1 border border-gray-400" @change="updateConfig">
            <option value="null" selected>請選擇設定檔</option>
            <option :value="pref.id" v-for="pref in state.prefs" :key="pref.id">{{ pref.name }}</option>
          </select>
        </div>
      </div>

      <div class="flex mb-2">
        <div class="flex-1">
          <label class="block mb-1">面額/積分</label>
          <input class="px-1 py-2 w-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500" type="text" v-model="pickedPref.rate">
        </div>

        <div class="flex-1">
          <label class="block mb-1">單次東錢：</label>
          <input class="ml-2 px-1 py-2 w-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500" type="text" v-model="pickedPref.price">
        </div>
      </div>

      <div class="flex mb-2">
        <div class="flex-1">
          <label class="block mb-1">次數：</label>
          <input class="px-1 py-2 w-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500" type="text" v-model="pickedPref.times">
        </div>

        <div class="flex-1">
          <label class="block mb-1">回合/降：</label>
          <input class="ml-2 px-1 py-2 w-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500" type="text"  v-model="pickedPref.rounds">
        </div>
      </div>

      <span class="py-4 block">東錢總額：{{ totalOfAdmissionFee }}</span>
    </main>

    <PlayerList />
    <CostList />

    <div class="mb-8 mx-auto max-w-2xl flex items-center text-white">
      <button class="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600" @click="createGameRecord">submit</button>
      <button class="ml-2 flex-1 py-2 px-4 bg-gray-400 hover:bg-gray-500">cancel</button>
    </div>
  </div>
</template>


<script>
import { reactive, computed, onBeforeMount } from 'vue';
import Title from '/@/components/UI/Title.vue';
import PlayerList from '/@/components/Player/PlayerList.vue';
import CostList from '/@/components/Cost/CostList.vue';
import PrefServices from '/@/services/prefServices';

export default {
  name: 'NewGame',
  components: {
    Title,
    PlayerList,
    CostList
  },
  setup() {
    const state = reactive({
      prefs: [],
    });

    const pickedPref = reactive({
      name: '',
      rate: '',
      price: '',
      times: '',
      rounds: ''
    });

    const totalOfAdmissionFee = computed(() => {
      return 'price * times * player-count'
    });
    
    const updateConfig = event => {
      const pickedId = event.target.value;
      const picked = state.prefs.find(pref => pref.id.toString() === pickedId);

      pickedPref.name = picked ? picked.name : '';
      pickedPref.rate = picked ? picked.rate : '';
      pickedPref.price = picked ? picked.price : 0;
      pickedPref.times = picked ? picked.times : 0;
      pickedPref.rounds = picked ? picked.rounds : 0;
    };

    const createGameRecord = () => {
      console.log('create');
    };

    onBeforeMount(async () => {
      const prefs = await PrefServices.fetchAll();
      state.prefs = prefs.data;
    });

    return {
      state,
      totalOfAdmissionFee,
      updateConfig,
      pickedPref
    }
  }

}
</script>