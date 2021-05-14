<template>
  <div class="mb-12 flex flex-col items-center border-t-4 border-green-500 rounded shadow-lg overflow-hidden">
    <div class="p-3 bg-green-500 w-full flex items-center text-white justify-start relative">
      ID: {{pref.id}}
      <button class="px-3 py-1 absolute right-3 bg-yellow-500" @click="goEditPage(pref.id)">編輯</button>
    </div>
    <div class="w-full grid grid-cols-8 text-gray-700">
      <PrefColumn>
        <template v-slot:label>名稱：</template>
        <template v-slot:value>{{ pref.name }}</template>
      </PrefColumn>
      <PrefColumn>
        <template v-slot:label>面額/積分：</template>
        <template v-slot:value>{{ pref.rate }}</template>
      </PrefColumn>
      <PrefColumn>
        <template v-slot:label>單次東錢：</template>
        <template v-slot:value>{{ pref.price }}</template>
      </PrefColumn>
      <PrefColumn>
        <template v-slot:label>次數：</template>
        <template v-slot:value>{{ pref.times }}</template>
      </PrefColumn>
      <PrefColumn>
        <template v-slot:label>回合/降：</template>
        <template v-slot:value>{{ pref.rounds }}</template>
      </PrefColumn>
      
      <PrefHands :handPoints="pref.handPoints" />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import Hashids from 'hashids';
import PrefColumn from '/@/components/Pref/PrefColumn.vue';
import PrefHands from '/@/components/Pref/PrefHands.vue';

export default {
  name: 'PrefCard',
  props: {
    pref: Object
  },
  components: {
    PrefColumn,
    PrefHands
  },
  setup() {
    const router = useRouter();
    const goEditPage = id => {
      const hashids = new Hashids()

      router.push({
        name: 'EditPreference',
        params: { id: hashids.encode(id) }
      });
    };

    return {
      goEditPage
    }
  }
}
</script>