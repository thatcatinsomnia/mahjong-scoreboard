<template>
  <div class="mb-12 flex flex-col items-center border-t-4 border-green-500 rounded shadow-lg overflow-hidden">
    <div class="w-full grid grid-cols-8 text-gray-700">
      <PreferenceCol>
        <template v-slot:label>名稱：</template>
        <template v-slot:value>{{ preference.name }}</template>
      </PreferenceCol>
      <PreferenceCol>
        <template v-slot:label>面額/積分：</template>
        <template v-slot:value>{{ preference.rate }}</template>
      </PreferenceCol>
      <PreferenceCol>
        <template v-slot:label>單次東錢：</template>
        <template v-slot:value>{{ preference.price }}</template>
      </PreferenceCol>
      <PreferenceCol>
        <template v-slot:label>次數：</template>
        <template v-slot:value>{{ preference.times }}</template>
      </PreferenceCol>

      <PreferenceHands :hands="preference.hands" />
    </div>
  </div>
</template>

<script>
import PreferenceCol from '/@/components/Preference/PreferenceCol.vue';
import PreferenceHands from '/@/components/Preference/PreferenceHands.vue';

export default {
  name: 'PreferenceCard',
  props: {
    preference: Object
  },
  components: {
    PreferenceCol,
    PreferenceHands
  }
}
</script>