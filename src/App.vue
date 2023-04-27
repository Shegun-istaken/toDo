<script setup>
import {  RouterView } from 'vue-router' 
import NavLinks from './components/NavLinks.vue';
</script>

<template>
  <NavLinks />
  <RouterView></RouterView>
  <footer>
    <small>ToDo App</small>
  </footer>
</template>

<style scoped>
  footer{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 64px 0px;
  }
</style>


