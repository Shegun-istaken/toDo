<script setup>
import SideButtons from './SideButtons.vue'
import {tags} from "@/assets/data/listItems.js"
import { useListItems } from '../stores/uselistItems';

const tasks = useListItems();
const props = defineProps({
  sideButtonClick : {
    required: false,
    type: Function,
  }
})

</script>

<template>
  <div className="sideBar">
    <div className="sideButtons">
      <SideButtons type="all" @click="props.sideButtonClick('All Tasks', $event)" />
      <SideButtons v-for="(tag, index) in tags" :key="`${tag}${index}`" :type="tag" @click="props.sideButtonClick(tag, $event)" />
    </div>
    <div className="hideDone">
      <input id="hideDone" @change="tasks.toggleHideDone" :checked="tasks.hideDone" type="checkbox" />
      <label for="hideDone">Hide Done Tasks</label>
    </div>
  </div>
</template>

<style scoped>
div.sideBar {
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

button {
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
}

label {
  font-weight: 400;
  font-size: 16px;
}

div.sideButtons {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
div.hideDone {
  display: flex;
  align-items: center;
}

@media only screen and (max-width: 960px){

  div.sideBar{
    width: 100%;;
    align-items: center;
    row-gap: 8px;
    /* justify-content: space-between; */
  }

  div.sideBar div.hideDone{
    padding: 5px 0px;
  }
  div.sideButtons{
    flex-flow: row wrap;
    gap: 10px;
    width: 80%;
    justify-content: space-between;
  }

  div.hideDone{
    /* background-color: var(--raisin-black); */
    /* border-radius: 8px; */
    /* color: white; */
  }

}

@media only screen and (max-width: 690px){
  div.sideButtons h3 {
    visibility: hidden;
    color: red;
  }

  div.sideButtons{
    margin-top: 8px;
  }
  div.sideBar{
    margin: 0px;
    padding: 0px;
  }

}
</style>
