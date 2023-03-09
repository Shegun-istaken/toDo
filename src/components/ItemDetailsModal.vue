<script setup>
import SideButtons from './SideButtons.vue'
import { tags } from '@/assets/data/listItems.js'
import { reactive, onBeforeMount } from 'vue'
import { useModalStore } from '@/stores/useModalStore.js'
import { useListItems } from '@/stores/useListItems.js'

const tasks = useListItems()
const modal = useModalStore()

const props = defineProps({
  edit: { required: false }
})

onBeforeMount(() => {
  if (props.edit) {
    state.id = tasks.listItems[modal.indexStore].id
    state.title = tasks.listItems[modal.indexStore].title
    state.description = tasks.listItems[modal.indexStore].description
    state.tags = tasks.listItems[modal.indexStore].tags
    state.done = tasks.listItems[modal.indexStore].done
    state.dropDown = tasks.listItems[modal.indexStore].dropDown
  }
})

const state = reactive({
  id: '',
  title: '',
  description: '',
  tags: [],
  done: false,
  dropDown: false
})

function handleClick(tag) {
  if (state.tags.includes(tag)) {
    state.tags.splice(state.tags.indexOf(`${tag}`), 1)
  } else {
    state.tags.push(`${tag}`)
  }
}

function clearState() {
  state.id = ''
  state.title = ''
  state.description = ''
  state.tags = []
}

function submit() {
  if (props.edit) {
    tasks.updateItem(modal.indexStore, state)
    // tasks.listItems[modal.indexStore] = {...state};
    clearState()
    modal.changeEdit('off')
    modal.toggleIsModal()
    tasks.addtoLocalStorage()
  } else {
    state.id = tasks.lastIndex + 1
    tasks.lastIndex = tasks.lastIndex + 1
    tasks.addToList({ ...state })
    clearState()
    modal.toggleIsModal()
    tasks.addtoLocalStorage()
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
      <button @click="submit" className="add" :disabled="!state.title && !state.description">
        Add
      </button>
    </div>
    <main>
      <label>
        <h3>Title</h3>
        <input v-model="state.title" type="text" placeholder="add a title..." />
      </label>
      <label>
        <h3>Description</h3>
        <textarea
          v-model="state.description"
          name=""
          id=""
          cols="80"
          rows="5"
          placeholder="add a description..."
        ></textarea>
      </label>
      <h3>Tags</h3>
      <ul>
        <li
          :name="tag"
          @click="handleClick(tag, $event)"
          v-for="(tag, index) in tags"
          :key="`${tag}${index}`"
        >
          <SideButtons :type="tag" :select="true" :tags="props.edit && state.tags" />
        </li>
      </ul>
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
  gap: 8px;
  margin: 24px 0px;
}

input[type|='text'] {
  border-radius: 8px;
  padding: 16px 8px;
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
