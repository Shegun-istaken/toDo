<script setup>
import CircleTag from './CircleTag.vue'
import more from '@/assets/icons/more.svg'
// import { reactive } from 'vue'
import { useListItems } from '@/stores/useListItems.js'
// import ItemDetailsModal from './ItemDetailsModal.vue'
import { useModalStore } from '../stores/useModalStore'

const tasks = useListItems()
const modal = useModalStore()

const props = defineProps({
  data: {
    required: true,
    type: Object
  },
  index: {
    required: false
  }
})

// const data = reactive(props.task)
// const state = reactive({
//   dropDown: false
// })

// function dropDown() {
//   state.dropDown = !state.dropDown
// }

function handleEdit() {
  modal.changeEdit('on')
  modal.setIndexStore(props.index)
  modal.toggleIsModal()
}

</script>

<template>
  <div
    v-if="!tasks.hideDone || !data.done "
    className="item"
    :style="data.done && { backgroundColor: 'rgb(228, 228, 204)' }"
  >
    <div className="itemHeader">
      <h2 :style="data.done && { textDecoration: 'line-through' }">
        {{ data.title.length > 15 ? `${data.title.slice(0, 14)}...` : data.title }}
      </h2>
      <button @click="tasks.toggleDropDown(data.id)"><img name="dropDown" :src="more" alt="more icon" /></button>
    </div>
    <p className="desc" :style="data.done && { textDecoration: 'line-through' }">
      {{
        data.description.length > 140 ? `${data.description.slice(0, 139)}...` : data.description
      }}
    </p>
    <div className="lowerRow">
      <div v-if="data.tags" className="tags">
        <CircleTag v-for="tag in data.tags" :key="tag" :type="tag" />
      </div>
      <div>
        <label className="Done"
          >Done
          <input type="checkbox" :checked="data.done" @change="tasks.toggleDone(data.id)" />
        </label>
      </div>
    </div>
    <div v-if="data.dropDown" className="dropDown">
      <button @click="handleEdit">Edit</button>
      <button @click="tasks.removeItem(data.id)">Delete</button>
    </div>
  </div>
</template>

<style scoped>
div.item {
  position: relative;
  width: 320px;
  background-color: beige;
  padding: 24px;
  border-radius: 16px;
  margin: 0px;
  border: none;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  transition: 0.2s ease-in-out;
  justify-content: space-between;
}

div.itemHeader img {
  width: 32px;
  color: #8b8b8b;
}
div.tags {
  display: flex;
  gap: 8px;
}

div.lowerRow,
div.itemHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
}

label.Done {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-direction: row-reverse;
}

div.dropDown {
  position: absolute;
  top: 48px;
  right: 24px;
  display: flex;
  flex-direction: column;
  opacity: 0.95;
  gap: 0.5px;
}

div.dropDown > *:first-child {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

div.dropDown > *:last-child {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}

div.dropDown button {
  padding: 16px 48px;
  background-color: var(--raisin-black);
  color: white;
  border-radius: 8px;
}

div.dropDown button:hover,
div.dropDown button:focus {
  background-color: hsla(340, 7%, 17%, 0.9);
  transition: ease-in-out 0.2s;
}

p.desc {
  width: 98%;
}

@media only screen and (max-width: 960px){

  div.item{
    width: 220px;
    row-gap: 16px;
    justify-content: space-between;
  }

}

@media only screen and (max-width: 690px){

  div.item{
    width: 80%;
  }

}
</style>
