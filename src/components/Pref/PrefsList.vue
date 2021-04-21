<template>
  <main class="mx-auto mb-16 px-2 max-w-2xl">
    <div class="mb-3 flex justify-end">
      <button class="px-8 py-2 bg-green-500 text-white rounded hover:bg-green-600" @click="goCreation">新增</button>
    </div>

    <template v-if="prefs.length">
      <PrefCard v-for="pref in prefs" :key="pref.id" :pref="pref"/>
    </template>
  </main>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import PrefCard from '/@/components/Pref/PrefCard.vue';
import prefServices from '/@/services/prefServices';

export default {
  name: 'PreList',
  components: {
    PrefCard
  },
  setup() {
    const router = useRouter();
    const prefs = ref([]);

    const goCreation = () => {
      router.push({ name: 'NewPreference' });
    };

    onBeforeMount(async () => {
      const res = await prefServices.fetchAll();
      if (res.status === 200) {
        prefs.value = res.data;
      }
    });

    return {
      prefs,
      goCreation
    }
  }
}
</script>
