<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useModalStore } from '@/stores/useModalStore.js'
import { useReminderStore } from '@/stores/useReminderStore.js'

const modal = useModalStore()
const reminderStore = useReminderStore()

const props = defineProps({
  view: {
    required: false
  }
})

onBeforeMount(() => {
  if (props.view) {
    Object.assign(state, {
      ...props.view,
      due: props.view.due.slice(0, -4),
      remindMe: props.view.remindMe.slice(0, -4)
    })
  }
})
const error = ref('')
const state = reactive({
  due: '',
  recurring: true,
  remindMe: '',
  todo: ''
})

function clearState() {
  ;(state.due = ''), (state.recurring = true), (state.remindMe = ''), (state.todo = '')
}

async function submit() {
  const form = {
    ...state,
    remindMe: state.remindMe + ':00Z',
    due: state.due + ':00Z'
  }

  const res = await reminderStore.addTodo(form)

  if ((await res) == 'success') {
    clearState()
    modal.toggleIsModal()
  } else {
    error.value = res.error
  }
}

function handleCancel() {
  modal.changeEdit('off')
  modal.toggleIsModal()
}
</script>

<template>
  <div v-if="modal.isModal" className="modal">
    <div className="topButtons">
      <button @click="handleCancel">Cancel</button>
      <button
        @click="submit"
        className="add"
        :disabled="!state.todo || !state.due || !state.recurring || !state.remindMe || props.view"
      >
        Add
      </button>
    </div>
    <main>
      <p v-if="error">{{ error }}</p>
      <label>
        <h3>Title</h3>
        <input v-model="state.todo" type="text" placeholder="add a title..." />
      </label>
      <label>
        <h3>When is it Due?</h3>
        <input v-model="state.due" type="datetime-local" />
      </label>
      <label className="recurring">
        <h3>Recurring:</h3>
        <input v-model="state.recurring" type="checkbox" />
      </label>
      <label>
        <h3>Set an Reminder</h3>
        <input v-model="state.remindMe" type="datetime-local" />
      </label>
    </main>
  </div>
</template>

<style scoped>
div.modal {
  position: absolute;
  z-index: 1;
  width: 896px;
  left: 50%;
  margin: 0 0 48px -448px;
  background-color: white;
  border-radius: 8px;
}
div.topButtons {
  display: flex;
  justify-content: space-between;
  margin: 48px 48px 0px 48px;
}

div.topButtons button:first-child {
  background-color: rgb(170, 4, 4);
  color: white;
  padding: 12px 48px;
  border: none;
  border-radius: 8px;
}
div.topButtons button:first-child:hover {
  background-color: rgba(170, 4, 4, 0.7);
  transition: ease-in-out 0.5s;
}

div.topButtons button:last-child {
  background-color: var(--golden-brown);
  color: white;
  padding: 12px 48px;
  border: none;
  border-radius: 8px;
}
div.topButtons button:last-child:hover {
  background-color: rgba(137, 91, 30, 0.7);
  transition: ease-in-out 0.5s;
}

main {
  margin: 16px 48px 48px 48px;
}

label {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  margin: 24px 0px;
}

label.recurring {
  flex-direction: row;
  align-items: center;
  column-gap: 16px;
}

input[type|='text'] {
  width: 100%;
  border-radius: 8px;
  padding: 16px 8px;
  border: 1px solid var(--raisin-black);
}

input {
  padding: 8px 8px;
  border-radius: 8px;
  border: 1px solid var(--raisin-black);
}

textarea {
  border-radius: 8px;
  padding: 16px 8px;
  border: 1px solid var(--raisin-black);
}

ul {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  padding-right: 128px;
}

li {
  list-style: none;
  margin: 0px;
  padding: 0px;
  outline: none;
}

li button {
  background-color: transparent;
  border: none;
}

p.error {
  color: red;
  font-size: 14px;
}

div.topButtons > button:disabled {
  color: var(--buff);
}

div.topButtons > button:disabled:hover {
  background-color: var(--golden-brown);
}

@media only screen and (max-width: 960px) {
  div.modal {
    width: 640px;
    margin-left: -320px;
  }
}

@media only screen and (max-width: 768px) {
  div.modal {
    width: 480px;
    margin-left: -240px;
  }

  ul {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}

@media only screen and (max-width: 560px) {
  div.topButtons {
    flex-direction: column;
    row-gap: 8px;
  }

  div.modal {
    width: 320px;
    margin-left: -160px;
  }

  ul {
    flex-direction: row;
    flex-wrap: wrap;
  }

  li {
    display: inline;
  }
}

@media only screen and (max-width: 480px) {
  div.modal {
    margin-left: -180px;
  }
}

@media only screen and (max-width: 320px) {
  div.modal {
    width: 240px;
    margin-left: -120px;
  }
}
</style>
