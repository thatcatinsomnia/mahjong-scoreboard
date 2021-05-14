<template>
  <div class="flex items-center">
    <div class="flex-1 p-4">{{ parseTimeZone(record.start_at) }}</div>
    <div class="flex-1 p-4">{{ parseTimeZone(record.end_at) }}</div>
    <div class="flex-1 p-4">{{ sumOfPlayerScore }}</div>
    <div class="flex-1 p-4">{{ sumOfCosts }}</div>
    <div class="flex-1 p-4" :class="total > 0 ? 'text-green-500': 'text-red-500'">{{ total }}</div>
     <div class="flex-1 p-4">
       <button class="bg-yellow-400 text-white px-4 py-1 rounded text-sm" @click="goEditPage(record.id)">修改</button>
     </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import Hashids from 'hashids';

export default {
  name: 'GameRecordItem',
  props: {
    record: Object
  },
  setup(props) {
    const router = useRouter();

    const parseTimeZone = computed(() => {
      return time => {
        const tz = moment(time).tz('Asia/Taipei').format('MM/DD HH:mm');
        return tz;
      };
    });

    const sumOfPlayerScore = computed(() => {
      if (!props.record.players) return;

      let sum = 0; 
      props.record.players.map(player => sum += player.score);
      return sum;
    });

    const sumOfCosts = computed(() => {
      if (!props.record.costs) return;

      let sum = 0; 
      props.record.costs.map(cost => sum += cost.value);
      return sum;
    });

    const total = computed(() => {
      if (!props.record.players || !props.record.costs) return;

      let total = 0;
      props.record.players.map(player => total += player.score);
      props.record.costs.map(cost => total -= cost.value);
      return total;
    });

    const goEditPage = id => {
      const hashids = new Hashids()

      router.replace({ 
        name: 'EditGameRecord', 
        params: { id: hashids.encode(id) } 
      });
    };

    return {
      parseTimeZone,
      sumOfPlayerScore,
      sumOfCosts,
      total,
      goEditPage
    }
  },
}
</script>