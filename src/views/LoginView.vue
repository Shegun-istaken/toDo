<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { useUserStore } from '../stores/useUserStore'

const router = useRouter()
const errors = ref()
const userStore = useUserStore()
const formData = reactive({
  username: '',
  password: ''
})

async function handleSubmit() {
  const response = await fetch('https://authman-api.onrender.com/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  const res = await response.json()
  if ((await res.message) == 'success') {
    userStore.setUser(res.body)
    router.push('/todo')
  } else {
    errors.value = res.message
  }
}

function handleSignUp() {
  router.push('/signup')
}
</script>

<template>
  <main className="auth login">
    <h2>Login to access your tasks</h2>
    <form>
      <div v-if="errors">
        <div v-if="typeof errors == 'object'">
          <p :key="index" v-for="(error, index) in errors" className="errorText">
            {{ error }}
          </p>
        </div>
        <p v-else className="errorText">{{ errors }}</p>
      </div>
      <label>
        Your Username
        <input v-model="formData.username" type="text" />
      </label>
      <label>
        Your Password
        <input v-model="formData.password" type="password" />
      </label>
      <button @click.prevent="handleSubmit" className="authButton">Login</button>
      <button className="otherButton" @click.prevent="handleSignUp">
        Don't have an account? Sign Up here
      </button>
    </form>
  </main>
</template>
