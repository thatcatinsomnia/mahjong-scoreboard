<template>
  <div v-if="!isSubmit">
    <Title>新增設定檔</Title>

    <div class="mx-auto px-6 py-10 mb-12 max-w-3xl rounded shadow-lg border-t-4 border-green-500 text-gray-600 ">
      <div class="mb-6 flex flex-col">
        <label class="text-lg mb-2">設定檔名稱：</label>
        <input type="text" class="px-3 py-2 border border-gray-300 focus:ring focus:ring-green-500 outline-none rounded" v-model="pref.name" />
      </div>

      <div class="mb-6 flex flex-col">
        <label class="text-lg mb-2">面額/積分：</label>
        <input type="text" class="px-3 py-2 border border-gray-300 focus:ring focus:ring-green-500 outline-none rounded" v-model="pref.rate" />
      </div>

      <div class="mb-6 flex flex-col">
        <label class="text-lg mb-2">單次東錢：</label>
        <input type="text" class="px-3 py-2 border border-gray-300 focus:ring focus:ring-green-500 outline-none rounded" v-model.number="pref.price" />
      </div>

      <div class="mb-6 flex flex-col">
        <label class="text-lg mb-2">次數：</label>
        <input type="text" class="px-3 py-2 border border-gray-300 focus:ring focus:ring-green-500 outline-none rounded" v-model.number="pref.times" />
      </div>

      <div class="mb-6 flex flex-col">
        <label class="text-lg mb-2">回合/降：</label>
        <input type="text" class="px-3 py-2 border border-gray-300 focus:ring focus:ring-green-500 outline-none rounded" v-model.number="pref.rounds" />
      </div>

      <div>
        <p class="mb-2 text-lg">台數設定：</p> 

        <div class="p-4 border border-gray-700 border-opacity-10 rounded">
            <div class="mb-6 flex flex-col" v-for="hand in pref.handPoints" :key="hand.id">
              <label class="text-lg mb-2">{{ hand.name }}:</label>
              <input type="text" class="px-3 py-2 border border-gray-300 focus:ring focus:ring-green-500 outline-none rounded" 
                :value="hand.points ? hand.points : ''"
                @input="updateHandPoints($event, hand.hand_id)" 
              />
            </div>  
        </div>
      </div>

      <div class="mt-4 flex flex-col">
        <button class="py-2  text-white text-lg rounded transition-colors duration-300 bg-green-500 hover:bg-green-600" 
          @click="onSubmit"
        >
         新增
        </button>
        <button class="mt-2 py-2 bg-gray-600 hover:bg-gray-500 text-white text-lg rounded transition-colors duration-300" 
          @click="onCancel"
        >
          取消
        </button>
      </div>
    </div>
  </div>

  <div class="py-20 text-center" v-else>{{ message.error ? message.error : message.default }}</div>
</template>

<script>
import { ref, reactive, onBeforeMount, computed } from 'vue';
import { useRouter } from 'vue-router';
import Title from '/@/components/UI/Title.vue';
import HandServices from '/@/services/handServices';
import PrefServices from '/@/services/prefServices';

export default {
  name: 'PrefDetail',
  components: {
    Title
  },
  setup(props) {
    const router = useRouter();

    const message = reactive({
      default: 'CREATING...',
      error: ''
    });
    const avaiableHands = ref([]);
    const pref = reactive({
      name: '',
      rate: null,
      price: null,
      times: null,
      handPoints: []
    });

    const isSubmit = ref(false);

    const updateHandPoints = (event, handId) => {
      let points = parseInt(event.target.value);
      
      if (isNaN(points) || !points) points = 0;

      const hand = pref.handPoints.find(hp => hp.hand_id === handId);
      hand.points = points;
    };

    const onSubmit = async () => {
      isSubmit.value = true;
      message.default = 'CREATING...';
      message.error = '';

      const res = await PrefServices.create(pref);

      if (`${res.status}`.startsWith(2)) {
        return router.push({ path: '/preferences' });
      } 

      message.error = `FAIL: \n${res.data.message}`;
    };

    const onCancel = () => {
      router.push({ name: 'Preferences' });
    };

    onBeforeMount(async () => {
      initCreatePage();
    });

    const initCreatePage = async () => {
      const res = await HandServices.fetchAll();

      if (res.status === 200) {
        avaiableHands.value = res.data;

        // fill all hands with points 0
        for (let data of res.data) {
          pref.handPoints.push({
            'hand_id': data.id,
            'name': data.name,
            'points': 0,
          });
        }
      }
    };

    return {
      message,
      isSubmit,
      pref,
      avaiableHands,
      onSubmit,
      onCancel
    }
  }
}
</script>