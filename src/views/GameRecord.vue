<template>
  <div class="mx-auto max-w-3xl" >
    <Title>遊戲紀錄查詢</Title>

    <!-- action bar -->
    <div class="flex mb-2">
      <select class="px-4 py-2 border border-gray-500 rounded" @change="onChangeSelect">
        <option value="all">所有</option>
        <option value="monthly">當前月份</option>
        <option value="seasonly">近三個月</option>
        <option value="half-yearly">近半年</option>
        <option value="yearly">近一年</option>
        <option value="custom">自訂搜尋</option>
      </select>

      <div class="ml-auto flex" v-if="isCustom">
        <div class="mr-2">
          <label class="mr-1">起始時間</label>
          <input type="date" class="py-1 px-4 border border-gray-500 rounded" ref="startAtInput">  
        </div>

        <div class="mr-2">
          <label class="mr-1">結束時間</label>
          <input type="date" class="py-1 px-4 border border-gray-500 rounded" ref="endAtInput"> 
        </div>

      </div>
      <button class="ml-auto px-8 py-1 bg-green-500 text-white rounded" @click="searchGameRecord">搜尋</button>
    </div>

    <div class="mx-auto mb-16 shadow-lg rounded overflow-hidden">
      <div class="flex bg-green-500 text-white">
        <div class="flex-1 p-4">開始時間</div>
        <div class="flex-1 p-4">結束時間</div>
        <div class="flex-1 p-4">玩家分數</div>
        <div class="flex-1 p-4">成本花費</div>
        <div class="flex-1 p-4">結算</div>
        <div class="flex-1 p-4"></div>
      </div>
      
      <template v-if="!isLoading">
        <GameRecordList :gameRecords="gameRecords"></GameRecordList>
      </template>
      <template v-else>
        <h2 class="py-12 text-center">data is loading...</h2>
      </template>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref, reactive } from 'vue';
import moment from 'moment';
import GameServices from '/@/services/GameServices';
import Title from '/@/components/UI/Title.vue';
import GameRecordList from '/@/components/GameRecord/GameRecordList.vue';

export default {
  name: 'GameRecord',
  components: {
    Title,
    GameRecordList
  },
  setup() {
    const isLoading = ref(false);
    const gameRecords = ref([]);
    const startAtInput = ref();
    const endAtInput = ref();
    const isCustom = ref(false);
    const searchCondition = ref('');
    const search = reactive({
      start_at: '',
      end_at: ''
    });

    const onChangeSelect = event => {
      const condition = event.target.value;

      if (condition === 'custom') {
        isCustom.value = true;
      } else {
        isCustom.value = false;
      }

      searchCondition.value = condition;
    };

    const searchGameRecord = async () => {
      if (!searchCondition.value) return;

      if (searchCondition.value === 'monthly') {
        search.start_at = moment().startOf('month').format();
        search.end_at = moment().endOf('month').format();
      } else if (searchCondition.value === 'seasonly') {
        search.start_at = moment().subtract(2, 'M').startOf('month').format();
        search.end_at = moment().endOf('month').format();
      } else if (searchCondition.value === 'half-yearly') {
        search.start_at = moment().subtract(5, 'M').startOf('month').format();
        search.end_at = moment().endOf('month').format();
      } else if (searchCondition.value === 'yearly') {
        search.start_at = moment().subtract(11, 'M').startOf('month').format();
        search.end_at = moment().endOf('month').format();
      } else if (searchCondition.value === 'custom') {
        search.start_at = startAtInput.value.value ? moment(startAtInput.value.value).format() : '';
        search.end_at = endAtInput.value.value ? moment(endAtInput.value.value).format() : '';
      }

      let params = {};

      if (search.start_at || search.end_at) {
        params = { 
          start_at: search.start_at ? moment(search.start_at).utc().format() : '',
          end_at: search.end_at ? moment(search.end_at).utc().format() : ''
        };
      }

      try {
        isLoading.value = true;
        const res = await GameServices.fetchAll(params);
        gameRecords.value = res.data;
        isLoading.value = false;
      } catch (error) {
        console.log(error);
      }

      search.start_at = '';
      search.end_at = '';
    };

    onBeforeMount(async () => {
      try {
        isLoading.value = true;
        const res = await GameServices.fetchAll();
        gameRecords.value = res.data;
        isLoading.value = false
      } catch (error) {
        console.log(error);
      }
    });

    return {
      gameRecords,
      onChangeSelect,
      isCustom,
      searchGameRecord,
      startAtInput,
      endAtInput,
      isLoading
    }
  }
}
</script>
