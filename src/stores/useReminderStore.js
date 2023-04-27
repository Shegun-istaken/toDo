import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './useUserStore'

export const useReminderStore = defineStore('reminder', () => {
  const user = useUserStore()
  const userToken = ref('')
  const reminderList = ref([])

  function setUserToken(token) {
    userToken.value = token
  }

  async function getAllTodos() {
    const response = await fetch('https://reminder-service.onrender.com/api/v1/todo', {
      method: 'GET',
      headers: {
        Authorization: `bearer ${user.user.idToken}`
      }
    })
    const res = await response.json()
    reminderList.value = res
  }

  async function handleTodos(type, id) {
    const response = await fetch(`https://reminder-service.onrender.com/api/v1/todo/${id}`, {
      method: `${type}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${user.user.idToken}`,
      }
    })

    const res = await response.json()
    console.log(await res)
    getAllTodos()
    return res
  }

  async function addTodo(form) {
    const response = await fetch('https://reminder-service.onrender.com/api/v1/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${user.user.idToken}`,
      },
      body: JSON.stringify(form)
    })

    const res = await response.json()
    console.log(await res)
    getAllTodos()
    return res
  }

  return { reminderList, setUserToken, getAllTodos, handleTodos, addTodo }
})
