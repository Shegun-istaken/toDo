import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { isLoggedInEx } from '../composables/isLoggedIn'

export const useUserStore = defineStore('useUser', () => {
  // const userToken = ref('')
  const user = ref({})
  const isLoggedIn = ref(false)

  function setUser(value) {
    user.value = value
  }

  watch(
    () => user.value,
    () => {
      if (user.value) {
        isLoggedIn.value = true
        isLoggedInEx.value = true
      } else {
        isLoggedIn.value = false
        isLoggedInEx.value = false
      }
    }
  )

  function signUserOut() {
    user.value = null
  }

  return { user, isLoggedIn, setUser, signUserOut }
})
