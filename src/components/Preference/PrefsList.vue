<template>
  <main class="mx-auto mb-16 px-2 max-w-2xl">
    <div class="mb-3 flex justify-end">
      <router-link class="px-8 py-2 bg-green-500 text-white rounded hover:bg-green-600" to='/preferences/new'>新增</router-link>
    </div>

    <template v-if="prefs.length">
      <PrefCard v-for="pref in prefs" :key="pref.id" :pref="pref"/>
    </template>
  </main>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import PrefCard from '/@/components/Preference/PrefCard.vue';
import prefServices from '/@/services/prefServices';

export default {
  name: 'PreferenceList',
  components: {
    PrefCard
  },
  setup() {
    const prefs = ref([]);
 
    onBeforeMount(async () => {
      const res = await prefServices.fetchAll();
      if (res.status === 200) {
        prefs.value = res.data;
      }
    });

    return {
      prefs
    }
  }
}
</script>
