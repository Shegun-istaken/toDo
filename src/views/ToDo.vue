<script setup>
import { reactive, onBeforeMount } from 'vue'
import SideBar from '@/components/SideBar.vue'
import ListItem from '@/components/ListItem.vue'
import ItemDetailsModal from '@/components/ItemDetailsModal.vue'
import { useModalStore } from '@/stores/useModalStore.js'
import { useListItems } from '@/stores/useListItems.js'
import { useUserStore } from '../stores/useUserStore'

onBeforeMount(() => {
  if (localStorage.getItem('todoTasks')) {
    let saved = JSON.parse(localStorage.getItem('todoTasks'))
    saved.forEach((element) => {
      tasks.addToList(element)
      if (element.id > tasks.lastIndex) {
        tasks.lastIndex = element.id
      }
    })
  }
  tasks.lastIndex = 0
})

const tasks = useListItems()
const modal = useModalStore()
const user = useUserStore()

const state = reactive({
  filter: '',
  displaying: 'All Tasks'
})

window.onclick = (e) => {
  if (e.target.name != 'dropDown') {
    tasks.noDropDown()
  }
}

function handleClick(tag) {
  if (tag == 'All Tasks') {
    state.filter = ''
  } else {
    state.filter = `${tag}`
  }
  state.displaying = tag
}

function handleToggle() {
  if (modal.editMode) {
    modal.changeEdit('off')
  }
  modal.toggleIsModal()
}
</script>

<template>
  <header>
    <div>
      <h1>todo</h1>
      <h2>{{ state.displaying }}</h2>
    </div>
    <div>
      <h3 v-if="user.userName">{{ `hi ${user.userName}` }}</h3>
      <button v-else className="clear" @click="tasks.clearAll">Clear All</button>
      <button @click="handleToggle" className="plus"><h1>+</h1></button>
    </div>
  </header>
  <main>
    <SideBar :sideButtonClick="handleClick" />
    <ItemDetailsModal v-if="!modal.editMode" />
    <ItemDetailsModal v-if="modal.editMode" :edit="true" />
    <div v-if="tasks.listItems.length > 0" className="listItems">
      <ListItem
        v-for="(item, index) in tasks.listItems.filter(
          state.filter ? (item) => item.tags.includes(`${state.filter}`) : (item) => item
        )"
        :key="item.id"
        :data="item"
        :index="index"
      />
    </div>
    <div v-else className="createNew">
      <h3>You do not have any tasks</h3>
      <button @click="modal.toggleIsModal">Create a New Task</button>
    </div>
  </main>
  <footer>
    <small> ToDo App | Shegun</small>
  </footer>
</template>

<style scoped>
header {
  margin: 20px 80px 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header div:first-child {
  display: flex;
  gap: 192px;
  align-items: center;
}

header div:last-child {
  display: flex;
  align-items: center;
  column-gap: 128px;
}

button.plus {
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
}

button.clear {
  background-color: transparent;
  border: 1px solid hsla(0, 0%, 0%, 0.2);
  padding: 8px 16px;
  border-radius: 8px;
}

button.clear:hover {
  background-color: hsla(0, 0%, 0%, 0.03);
}
button.plus h1 {
  font-size: 40px;
}

button.clear {
  font-size: 18px;
}

main {
  margin: 20px 20px 20px 40px;
  display: flex;
}

div.listItems {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  row-gap: 32px;
  column-gap: 32px;
  margin-right: 24px;
}

div.createNew {
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  row-gap: 24px;
}

div.createNew button {
  width: 320px;
  padding: 20px 10px;
  border: none;
  border-radius: 8px;
  background-color: var(--ultra-violet);
  color: white;
}

footer {
  width: 128px;
  margin: 64px auto;
}

@media only screen and (max-width: 960px) {
  main {
    flex-direction: column;
    align-items: space-between;
  }

  div.listItems {
    margin-top: 48px;
    /* column-gap: 4px; */
    /* justify-content: center; */
  }

  header div:first-child {
    gap: 24px;
  }

  /* header div:last-child {
    gap: 24px;
  } */

  div.createNew {
    width: 600px;
    margin: 48px auto;
  }
}

@media only screen and (max-width: 690px) {
  header {
    flex-direction: column;
    margin: 48px 0px 0px 0px;
    row-gap: 24px;
  }

  header div {
    /* gap: 64px; */
    flex-direction: column;
    row-gap: 8px;
  }

  header div:first-child {
    margin-bottom: 8px;
  }

  div.listItems {
    justify-content: center;
  }

  div.createNew {
    width: 320px;
  }
}

@media only screen and (max-width: 390px) {
  div.createNew {
    width: auto;
    margin: 48px auto;
  }

  div.createNew h3 {
    width: 100%;
    font-size: 16px;
  }

  div.createNew button {
    width: 100%;
  }
}
</style>
