<script setup>
import { onMounted, reactive } from 'vue'

const props = defineProps({
  type: {
    required: true,
    type: String,
  }
})

const state = reactive({
  color: '',
})

onMounted(() => {
  switch (props.type) {
    case 'work':
      state.color = 'var(--verdigris)';
      break;
    case 'study':
        state.color = "var(--raisin-black)";
        break;
    case 'entertainment':
        state.color = "var(--golden-brown)";
        break;
    case 'family' :
        state.color = "var(--ultra-violet)";
        break;
    default:
      state.color = "white";
  }
})
</script>

<template>
  <span :style="{ backgroundColor: state.color }" className="circle"></span>
</template>

<style>
.circle {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
}
</style>
