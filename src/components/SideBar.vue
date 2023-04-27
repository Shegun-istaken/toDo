<script setup>
import menu from '@/assets/icons/menu.svg'
// import { isLoggedIn } from '../composables/isLoggedIn'
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from '../stores/useUserStore';

const userStore = useUserStore()
const closeMenu = ref(false)
const router = useRouter()

function toggleMenu() {
  closeMenu.value = !closeMenu.value
}

const isLoggedIn = ref(false)

function handleSignOut() {
  router.push('/')
  userStore.signUserOut()
}

const closeModal = (event) => {
  if (!event.target.closest('.menu')) {
    closeMenu.value = false
  }
}
</script>

<template>
  <div className="modalMain">
    <div v-if="userStore.isLoggedIn" className="userInfo">
      <p>Welcome Segun</p>
      <!-- <p>
        <small>{{ user.userData.email }}</small>
      </p> -->
    </div>
    <img className="menu" :src="menu" alt="menu icon" @click="toggleMenu" />
  </div>

  <main v-if="closeMenu" id="menuModal" @click="closeModal">
    <nav className="mobileNav">
      <RouterLink to="/"><button className="homeButton">Home</button></RouterLink>
      <RouterLink to="login" v-if="!isLoggedIn">
        <button>Login</button>
      </RouterLink>
      <RouterLink to="/signup" v-if="!isLoggedIn">
        <button>Sign Up</button>
      </RouterLink>
      <div v-else className="access">
        <!-- <button className="mobileCart">Cart <img :src="cart" alt="cartIcon" /></button> -->
        <button @click="handleSignOut">Sign Out</button>
      </div>
    </nav>
  </main>
</template>

<style scoped>
div.modalMain {
  display: flex;
  gap: 32px;
}

main#menuModal {
  background-color: transparent;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
div.menuModal {
  z-index: 2;
}
img.menu {
  width: 48px;
}

a {
  color: black;
  text-decoration: none;
  font-size: 14px;
  margin: 0px;
  padding: 0px;
}

nav.mobileNav {
  position: absolute;
  top: 56px;
  right: 64px;
  background-color: var(--platinum);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
}

nav.mobileNav button {
  padding: 16px 0px;
  background-color: var(--ultra-violet);
  width: 128px;
  margin-top: 2px;
}

nav.mobileNav button.homeButton {
  margin-top: 0;
}

/* div.access button{
    border-
} */

button.mobileCart {
  display: flex;
  align-items: center;
  justify-content: center;
}
button.mobileCart img {
  width: 16px;
}

@media only screen and (max-width: 470px) {
  div.userInfo {
    display: none;
  }
}

@media only screen and (max-width: 400px) {
  nav.mobileNav {
    top: 106px;
    right: 0;
    left: 0;
    margin: auto;
    width: 256px;
  }

  nav.mobileNav button {
    width: 256px;
  }
}
</style>
