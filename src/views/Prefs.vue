<template>
  <div>
    <Title>設定檔列表</Title>
    <PrefsList />
  </div>
</template>

<script>
import Title from '/@/components/UI/Title.vue';
import PrefsList from '/@/components/Preference/PrefsList.vue';

export default {
  name: 'Preferences',
  components: {
    Title,
    PrefsList
  }
}
</script>
