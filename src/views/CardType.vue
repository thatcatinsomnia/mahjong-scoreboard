<template>
  <div>
    <h2>card type</h2>
    <div class="bg-gray-300 flex">
      <input class="px-2 border border-gray-400" type="text" v-model="newType" @keyup.enter="createNewType">
      <button class="ml-4 px-4 py-2 border bg-green-500 text-white" @click="createNewType">create</button>
    </div>
    <div>input: {{ newType }}</div> 
    <div class="mt-12 bg-red-300">
      <h2>所有牌型：</h2>
      <h3 v-for="t in cardType.list" :key="t.id">- {{ t.name }} </h3>

    </div>
  </div>
</template>

<script>
import { ref, reactive, onBeforeMount } from 'vue';

export default {
  name: 'CardType',
  setup() {
    const newType = ref('');
    const cardType = reactive({ list: [] });
    const db = firebase.firestore();
    const collection = db.collection('card-type');
    
    const fetchCardType = async () => {      

      collection.onSnapshot(snapshot => {
        cardType.list = [];

        snapshot.forEach(doc => {
          cardType.list.push(doc.data());
        });
      });
      
    };

    const createNewType = async () => {
      if (!newType.value) return;

      await db.collection("card-type").add({ name: newType.value });

      newType.value = '';
    };

    onBeforeMount(() => fetchCardType());

    return {
      newType,
      cardType,
      createNewType
    }
  }
}
</script>