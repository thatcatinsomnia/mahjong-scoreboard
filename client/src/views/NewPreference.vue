<template>
  <div v-if="!isSubmit">
    <Title>新增設定檔</Title>
    <div class="mx-auto p-6 mb-12 max-w-3xl rounded shadow-lg border-t-4 border-green-500 text-gray-600 ">
      <div class="mb-6 flex flex-col">
        <label class="text-lg mb-2">設定檔名稱：</label>
        <input type="text" class="px-3 py-2 border border-gray-300 focus:ring focus:ring-green-500 outline-none rounded" v-model="preference.name">
      </div>

      <div class="mb-6 flex flex-col">
        <label class="text-lg mb-2">面額/積分：</label>
        <input type="text" class="px-3 py-2 border border-gray-300 focus:ring focus:ring-green-500 outline-none rounded" v-model="preference.rate">
      </div>

      <div class="mb-6 flex flex-col">
        <label class="text-lg mb-2">單次東錢：</label>
        <input type="text" class="px-3 py-2 border border-gray-300 focus:ring focus:ring-green-500 outline-none rounded" v-model="preference.price">
      </div>

      <div class="mb-6 flex flex-col">
        <label class="text-lg mb-2">次數：</label>
        <input type="text" class="px-3 py-2 border border-gray-300 focus:ring focus:ring-green-500 outline-none rounded" v-model="preference.times">
      </div>

      <div>
        <p class="mb-2 text-lg">台數設定：</p> 

        <div class="p-4 border border-gray-700 border-opacity-10 rounded">
          <div class="mb-6 flex flex-col" v-for="hand in hands.list" :key="hand.id">
            <label class="text-lg mb-2">{{ hand.name }}:</label>
            <input type="text" class="px-3 py-2 border border-gray-300 focus:ring focus:ring-green-500 outline-none rounded" @input="updatePreference($event, hand)">
          </div>
        </div>
      </div>

      <div class="mt-4 flex flex-col">
        <button class="py-2 bg-green-500 hover:bg-green-600 text-white text-lg rounded transition-colors duration-300" @click="createNewPreference">新增</button>
        <button class="mt-2 py-2 bg-gray-600 hover:bg-gray-500 text-white text-lg rounded transition-colors duration-300" @click="cancel">取消</button>
      </div>
    </div>
  </div>

  <div class="py-20 text-center" v-else>Creating...</div>
</template>

<script>
import { ref, reactive, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'
import Title from '/@/components/UI/Title.vue';

export default {
  name: 'NewPreference',
  components: {
    Title
  },
  setup() {
    const router = useRouter();
    const preference = reactive({
      name: '',
      rate: null,
      price: null,
      times: null,
      hands: []
    });
    const hands = reactive({ list: [] });
    const isSubmit = ref(false);

    const db = firebase.firestore();
    
    const updatePreference = (event, currentHand) => {
      let existHand = preference.hands.find(hand => hand.id === currentHand.id);

      if(!existHand) {
        existHand = {
          id: currentHand.id,
          name: '',
          value: 0
        }

        console.log(existHand);

        preference.hands.push(existHand);
      }

      existHand.name = currentHand.name;
      existHand.value = event.target.value;
    };

    const createNewPreference = async () => {
      isSubmit.value = true;
      
      await db.collection('preferences').add(preference);

      isSubmit.value = false;

      router.push({ name: 'Preferences' });
    };

    const cancel = () => {
      router.push({ name: 'Preferences' });
    }

    onBeforeMount(async () => {
      const collection = db.collection('card-type');
      const snapshot = await collection.get('card-type');
      
      hands.list = snapshot.docs.map(doc => {
        return {
          id: doc.id, 
          name: doc.data().name
        };
      });
    });

    return {
      isSubmit,
      preference,
      hands,
      updatePreference,
      createNewPreference,
      cancel
    }
  }
}
</script>