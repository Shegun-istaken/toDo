import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useListItems = defineStore('useList', () => {
  const listItems = reactive([
    // {
    //   id: 1,
    //   title: 'The first Task Title',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quas quisquam tempore dolorum, explicabo sed quidem cumque consequatur. Quia non consequatur enim esse et perferendis, qui corrupti sit libero doloribus.',
    //   tags: ['work', 'entertainment'],
    //   done: false,
    //   dropDown: false
    // }
  ])
  const hideDone = ref(false)
  const lastIndex = ref(0)

  function toggleDropDown(id) {
    listItems.forEach((item, index) => {
      if (item.id == id) {
        listItems[index].dropDown = !listItems[index].dropDown
      } else {
        listItems[index].dropDown = false
      }
    })
  }

  function noDropDown() {
    listItems.forEach((item, index) => {
      listItems[index].dropDown = false
    })
  }

  function updateItem(index, { ...value }) {
    listItems[index] = value
  }

  function addToList(values) {
    listItems.push(values)
  }

  function removeItem(id) {
    listItems.forEach((item, index) => {
      if (item.id == id) {
        listItems.splice(index, 1)
      }
    })
    addtoLocalStorage()
  }

  function toggleDone(id) {
    listItems.forEach((item, index) => {
      if (item.id == id) {
        listItems[index].done = !listItems[index].done
      }
    })
  }

  function toggleHideDone() {
    hideDone.value = !hideDone.value
  }

  function addtoLocalStorage() {
    localStorage.setItem('todoTasks', JSON.stringify(listItems))
  }

  function clearAll() {
    listItems.length = 0
    addtoLocalStorage()
  }

  return {
    listItems,
    hideDone,
    lastIndex,
    addToList,
    removeItem,
    toggleDone,
    toggleHideDone,
    updateItem,
    toggleDropDown,
    noDropDown,
    addtoLocalStorage,
    clearAll
  }
})
