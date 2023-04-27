<script setup>
import DisplayTime from './DisplayTime.vue'
</script>

<template>
  <div
    v-if="!data?.done"
    className="item"
    :style="data.done && { backgroundColor: 'rgb(228, 228, 204)' }"
  >
    <div className="itemHeader">
      <h2 :style="data?.done && { textDecoration: 'line-through' }">
        {{ data.todo.length > 10 ? `${data.todo.slice(0, 14)}...` : data.todo }}
      </h2>
      <button @click="onItemClick">See More</button>
    </div>
    <div>
      <DisplayTime :due="data.due" :nextReminder="data.remindMe" />
    </div>
    <div className="buttons">
      <button @click.prevent="onDelete">Delete</button>
      <label>Done<input @click.prevent="onDone" type="checkbox" v-model="data.done" /></label>
    </div>
  </div>
</template>

<style scoped>
div.item {
  position: relative;
  width: 280px;
  background-color: beige;
  padding: 24px;
  border-radius: 16px;
  margin: 0px;
  border: none;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  transition: 0.2s ease-in-out;
  justify-content: space-between;
}

div.itemHeader img {
  width: 32px;
  color: #8b8b8b;
}
div.tags {
  display: flex;
  gap: 8px;
}

div.lowerRow,
div.itemHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

div.itemHeader button {
  background-color: var(--buff);
  padding: 4px;
  border-radius: 4px;
}

div.itemHeader button:hover {
  background-color: #ecb27f;
}

button {
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
}

label.Done {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-direction: row-reverse;
}

div.dropDown {
  position: absolute;
  top: 48px;
  right: 24px;
  display: flex;
  flex-direction: column;
  opacity: 0.95;
  gap: 0.5px;
}

div.dropDown > *:first-child {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

div.dropDown > *:last-child {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}

div.dropDown button {
  padding: 16px 48px;
  background-color: var(--raisin-black);
  color: white;
  border-radius: 8px;
}

div.dropDown button:hover,
div.dropDown button:focus {
  background-color: hsla(340, 7%, 17%, 0.9);
  transition: ease-in-out 0.2s;
}

p.desc {
  width: 98%;
}

div.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

div.buttons button:first-child {
  background-color: rgb(190, 5, 5);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  transition: 0.2s ease-in-out;
}

div.buttons button:first-child:hover {
  opacity: 0.7;
}

div.buttons label {
  display: flex;
  justify-content: center;
  column-gap: 4px;
}

@media only screen and (max-width: 960px) {
  div.item {
    width: 220px;
    row-gap: 16px;
    justify-content: space-between;
  }
}

@media only screen and (max-width: 690px) {
  div.item {
    width: 80%;
  }
}
</style>
