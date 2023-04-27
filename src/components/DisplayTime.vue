<script setup>
const props = defineProps({
  due: {
    required: true
  },
  nextReminder: {
    required: true
  }
})

function formatted(data) {
  return [`${data.slice(0, 10)}`, `${data.slice(11, 16)}`]
}
</script>

<template>
  <div className="displayTime">
    <div>
      <h3>Due</h3>
      <p>{{ formatted(props.due)[0] }} - {{ formatted(props.due)[1] }}</p>
    </div>
    <div>
      <h3>Next Reminder</h3>
      <p>{{ formatted(props.nextReminder)[0] }} - {{ formatted(props.nextReminder)[1] }}</p>
    </div>
  </div>
</template>

<style scoped>
div.displayTime {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

div.displayTime div {
  background-color: hsla(0, 0%, 100%, 0.3);
  padding: 4px 0px;
}

div.displayTime h3 {
  font-size: 16px;
}
</style>
