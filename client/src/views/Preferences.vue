<template>
  <div>
    <Title>設定檔列表</Title>
    <PreferenceList />
  </div>
</template>

<script>
import Title from '/@/components/UI/Title.vue';
import PreferenceList from '/@/components/Preference/PreferenceList.vue';

export default {
  name: 'Preferences',
  components: {
    Title,
    PreferenceList
  }
}
</script>
