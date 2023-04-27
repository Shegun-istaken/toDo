<script setup>
import { onBeforeMount, ref } from 'vue'
import ListItem from '@/components/ListItem.vue'
import ItemDetailsModal from '@/components/ItemDetailsModal.vue'
import { useModalStore } from '@/stores/useModalStore.js'
import { useReminderStore } from '../stores/useReminderStore'

const reminderStore = useReminderStore()
const modal = useModalStore()
const itemData = ref({})

onBeforeMount(async () => {
  await reminderStore.getAllTodos()
})

function handleToggle() {
  if (modal.editMode) {
    modal.changeEdit('off')
  }
  modal.toggleIsModal()
}

async function handleDelete(index) {
  const id = reminderStore.reminderList[index].id
  reminderStore.handleTodos('DELETE', id)
}

async function handleDone(index) {
  const id = reminderStore.reminderList[index].id
  reminderStore.handleTodos('PATCH', id)
}

async function handleItemClick(index) {
  const id = reminderStore.reminderList[index].id
  itemData.value = await reminderStore.handleTodos('GET', id)
  modal.changeEdit('on')
  modal.toggleIsModal()
}
</script>

<template>
  <header>
    <div>
      <h2>All Tasks</h2>
    </div>
    <div>
      <button @click="handleToggle" className="plus"><h1>+</h1></button>
    </div>
  </header>
  <main :style="reminderStore.reminderList?.length < 1 && {justifyContent: 'center'}">
    <!-- <SideBar :sideButtonClick="handleClick" /> -->
    <ItemDetailsModal v-if="!modal.editMode" />
    <ItemDetailsModal v-if="modal.editMode" :view="itemData" />
    <div v-if="reminderStore.reminderList?.length > 0" className="listItems">
      <ListItem
        v-for="(item, index) in reminderStore.reminderList"
        :key="item.id"
        :data="item"
        :index="index"
        :onDelete="(e) => handleDelete(index, e)"
        :onDone="(e) => handleDone(index, e)"
        :onItemClick="(e) => handleItemClick(index, e)"
      />
    </div>
    <div v-else className="createNew">
      <h3 @click="testAPI">You do not have any tasks</h3>
      <button @click="modal.toggleIsModal">Create a New Task</button>
    </div>
  </main>
</template>

<style scoped>
header {
  margin: 20px 64px 20px 64px;
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
  /* margin: 20px 20px 20px 40px; */
  display: flex;
}

div.listItems {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  row-gap: 32px;
  column-gap: 32px;
  margin: 0 64px;
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
