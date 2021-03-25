<template>
  <main class="mx-auto mb-16 px-2 max-w-2xl">
    <div class="mb-3 flex justify-end">
      <router-link class="px-8 py-2 bg-green-500 text-white rounded hover:bg-green-600" to='/preferences/new'>新增</router-link>
    </div>

    <template v-if="preferences.length">
      <PreferenceCard v-for="preference in preferences" :key="preference.name" :preference="preference"/>
    </template>
  </main>
</template>

<script>
import { onBeforeMount, reactive } from 'vue';
import PreferenceCard from '/@/components/Preference/PreferenceCard.vue';

export default {
  name: 'PreferenceList',
  components: {
    PreferenceCard
  },
  setup() {
    const preferences = reactive([]);
    const db = firebase.firestore();
    const collection = db.collection('preferences');

    const fetchPreferences = async () => {
      const snapshot = await collection.get()
      snapshot.docs.forEach(doc => {
        preferences.push(doc.data());
      });
    };
 
    onBeforeMount(() => fetchPreferences());

    return {
      preferences
    }
  }
}
</script>
