<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'

const userStore = useUserStore()
const router = useRouter()

function handleClick() {
  router.push('/signup')
}

function handleJump() {
  router.push('/todo')
}
</script>

<template>
  <main className="homePage">
    <div>
      <h1>Welcome to Todos</h1>
      <h2>Register to get Started</h2>
    </div>
    <button @click.prevent="handleClick" v-if="!userStore.isLoggedIn" className="cta">
      Get Started
    </button>
    <button v-else @click.prevent="handleJump" className="cta">Jump to Tasks Page</button>
  </main>
</template>

<style scoped>
main.homePage {
  margin: 64px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--raisin-black);
  gap:32px;
}

main.homePage button {
  padding: 16px 32px;
  border-radius: 8px;
}
</style>
