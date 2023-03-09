<script setup>
import CircleTag from './CircleTag.vue'
import { reactive, onBeforeMount } from 'vue'

const state = reactive({
  selected: false
})

onBeforeMount(() => {
  if (props.tags) {
    if (props.tags.includes(props.type)) {
      state.selected = true
    }
  }
})

function handleClick() {
  state.selected = !state.selected
}

const props = defineProps({
  type: {
    required: true,
    type: String
  },
  select: {
    required: false,
    default: false
  },
  tags: {
    required: false
  }
})
</script>

<template>
  <button
    @click="handleClick"
    :className="`${props.select ? 'select' : 'side'} ${state.selected && 'selected'} `"
  >
    <CircleTag :type="props.type" />
    <h3>{{ props.type }}</h3>
  </button>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  gap: 8px;
}

button.side {
  padding: 4px 4px;
  border-radius: 8px;
  width: 100%;
  gap: 4px;
}

button.side h3{
  font-size: 14px;
}

button.side:hover {
  opacity: 0.8;
}

button.select {
  padding: 8px 16px;
  border-radius: 8px;
}

h3 {
  font-weight: 200;
}

button.select.selected {
  border: 1px solid hsla(340, 7%, 17%, 0.3);
}

@media only screen and (max-width: 960px) {
  button.side {
    width: auto;
  }
}

@media only screen and (max-width: 690px) {
  button.side h3 {
    display: none;
  }

  button.select{
    padding: 8px 8px;
  }
  button.select h3{
    font-size: 14px;
  }
}
</style>
