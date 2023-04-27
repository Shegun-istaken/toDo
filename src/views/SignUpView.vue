<script setup>
import { useRouter } from 'vue-router'
// import { useUserStore } from '@/stores/useUserStore.js'
import { reactive, ref } from 'vue'
import { useUserStore } from '../stores/useUserStore'

const errors = ref()
const userStore = useUserStore()
const formData = reactive({
  username: '',
  email: '',
  password: '',
  avatar: ''
})
const router = useRouter()
async function handleClick(e) {
  const response = await fetch('https://authman-api.onrender.com/users/signup', {
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

function handleLogin() {
  router.push('/login')
}
</script>

<template>
  <main className="auth signUp">
    <h2>Sign Up to Get Started</h2>
    <form>
      <div v-if="errors">
        <div v-if="typeof errors == 'object'">
          <p :key="index" v-for="(error, index) in errors" className="errorText">
            {{ error }}
          </p>
        </div>
        <p v-else className="errorText">{{ errors }}</p>
      </div>
      <label
        >Username
        <input v-model="formData.username" type="text" />
      </label>
      <label>
        Your Email Address
        <input v-model="formData.email" type="email" />
      </label>
      <label>
        Password
        <input v-model="formData.password" type="password" />
      </label>

      <button className="authButton" type="submit" @click.prevent="handleClick">Sign Up</button>
      <button className="otherButton" @click.prevent="handleLogin">
        Do you have an account already? Login here
      </button>
    </form>
  </main>
</template>
