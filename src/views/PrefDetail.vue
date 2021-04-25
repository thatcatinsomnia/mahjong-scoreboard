<template>
  <div v-if="!isSubmit">
    <Title>{{ title }}</Title>
    <div class="mb-1 mx-auto flex justify-end max-w-3xl" v-if="isEdit">
      <button class="px-6 py-1 bg-red-500 hover:bg-red-600 transition text-white rounded" @click="deletePref($route.params.id)">刪除</button>
    </div>
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
        <button class="py-2  text-white text-lg rounded transition-colors duration-300" 
          :class="{'bg-green-500 hover:bg-green-600': !isEdit, 'bg-yellow-500 hover:bg-yellow-600': isEdit }"
          @click="onSubmit"
        >
          {{ isEdit ? '更新' : '新增' }}
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
import { useRouter, useRoute } from 'vue-router';
import Title from '/@/components/UI/Title.vue';
import HandServices from '/@/services/handServices';
import PrefServices from '/@/services/prefServices';

export default {
  name: 'PrefDetail',
  props: {
    isEdit: Boolean // pass from router
  },
  components: {
    Title
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();

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

    const title = computed(() => {
      return props.isEdit ? '編輯設定檔' : '新增設定檔';
    });

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

      let res;
      if (!props.isEdit) {
        // update value when submit for creation
        res = await PrefServices.create(pref);
      } else {
        // submit for update
        res = await PrefServices.patchById(route.params.id, pref);
      }

      if (`${res.status}`.startsWith(2)) {
        return router.push({ path: '/preferences' });
      } 

      message.error = `FAIL: \n${res.data.message}`;
    };

    const onCancel = () => {
      router.replace({ name: 'Preferences' });
    };

    onBeforeMount(async () => {
      if (props.isEdit) {
        initEditPage();
      } else {
        initCreatePage();
      }
    });

    const initEditPage = async () => {
      const res = await Promise.all([
        PrefServices.fetchById(route.params.id),
        HandServices.fetchAll()
      ]);

      const { name, rate, price, times, handPoints } = {...res[0].data};
      avaiableHands.value = res[1].data;
      pref.name = name;
      pref.rate = rate;
      pref.price = price;
      pref.times = times;
      pref.handPoints = syncHandPoints(avaiableHands.value, handPoints);
    };

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

    // sync the avaiableHands and user pref handPoints
    // situation 1: the handPoints is already exist
    // => push id and it's points for "update"
    // situation 2: current handPoints is missing (in available but not in handPoints)
    // => push the hand_id and set points to 0 for "create" 
    // situation 3: handPoints exist but not exist in hand
    // => do nothing, the api will remove it 
    const syncHandPoints = (avaiableHands, handPoints) => {
      return avaiableHands.map(hand => {
        const exist = handPoints.find(hp => hp.hand_id === hand.id);

        if (exist) {
          const { id, points, hand_id } = exist;
          const name = exist.hand.name;
          
          return {
            id,
            hand_id, 
            name,
            points
          }
        }

        return {
          name: hand.name,
          hand_id: hand.id,
          points: 0
        }
      });
    };

    const deletePref = async id => {
      isSubmit.value = true;
      message.default = 'DELETED...';
      const res = await PrefServices.deleteById(id);

      if (res.status === 204) {
        router.replace({ path: '/preferences' });
      } else {
        message.error = `FAIL: delete pref ${id} failed.`
      }
    };

    return {
      title,
      message,
      isSubmit,
      pref,
      avaiableHands,
      updateHandPoints,
      onSubmit,
      onCancel,
      deletePref
    }
  }
}
</script>