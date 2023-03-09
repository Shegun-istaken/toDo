<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore.js'
import { ref } from 'vue'

const userName = ref('')
const router = useRouter()
const user = useUserStore()

function handleChange(e) {
  userName.value = e.target.value
}
function handleClick() {
  user.setUserName(userName.value)
  router.push('/todo')
}
</script>

<template>
  <RouterView></RouterView>
  <h1>Welcome to Todos</h1>
  <label
    >What's your name?
    <input @change="handleChange" type="text" />
  </label>
  <button @click="handleClick">Get Started</button>
</template>
