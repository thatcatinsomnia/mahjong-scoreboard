<template>
  <div v-if="!isSubmit">
    <Title>{{ title }}</Title>
    
    <div class="mx-auto p-6 mb-12 max-w-3xl rounded shadow-lg border-t-4 border-green-500 text-gray-600 ">
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
            <div class="mb-6 flex flex-col" v-for="hand in hands" :key="hand.id">
              <label class="text-lg mb-2">{{ isEdit ? hand.hand.name : hand.name }}:</label>
              <input type="text" class="px-3 py-2 border border-gray-300 focus:ring focus:ring-green-500 outline-none rounded" 
                :value="hand.points" 
                @input="updateHandPoints($event, hand.id)" 
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

  <div class="py-20 text-center" v-else>Creating...</div>
</template>

<script>
import { ref, reactive, onBeforeMount, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Title from '/@/components/UI/Title.vue';
import HandServices from '/@/services/handServices';
import PrefServices from '/@/services/prefServices';

export default {
  name: 'PreferenceDetail',
  props: {
    isEdit: Boolean // pass from router
  },
  components: {
    Title
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    const hands = ref([]);
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
      const hand = hands.value.find(hand => hand.id === handId);
      hand.points = parseInt(event.target.value);
    };

    const onSubmit = async () => {
      isSubmit.value = true;
      let res;
      if (!props.isEdit) {
        // update value when submit for creation
        pref.handPoints = [];
        updateHandPointsValue();

        res = await PrefServices.create(pref);
      } else {
        res = await PrefServices.patchById(route.params.id, pref);
      }
      
      if (`${res.status}`.startsWith(2)) {
        return router.push({ path: '/preferences' });
      }

      // todo: do something when error
    };

    const updateHandPointsValue = () => {
      for (let hand of hands.value) {
        pref.handPoints.push({
          hand_id: hand.id,
          points: hand.points || 0
        });
      }
    }

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
      const handList = ;

      pref.name = name;
      pref.rate = rate;
      pref.price = price;
      pref.times = times;
      hands.value = res[1].data;
      
      // todo: handle user hand point data in both create and update
    };

    const initCreatePage = async () => {
      const res = await HandServices.fetchAll();

      if (res.status === 200) {
        hands.value = res.data;

        // fill all hands with points 0
        for (let data of res.data) {
          pref.handPoints.push({
            'hand_id': data.id,
            'points': 0,
          });
        }
      }
    };

    return {
      title,
      isSubmit,
      pref,
      hands,
      updateHandPoints,
      onSubmit,
      onCancel
    }
  }
}
</script>