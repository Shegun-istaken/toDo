import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('useModal', () => {
  const isModal = ref(false)
  const editMode = ref(false)

  const indexStore = ref()

  function toggleIsModal() {
    isModal.value = !isModal.value
  }

  function changeEdit(state) {
    switch (state) {
      case 'on':
        editMode.value = true
        break
      case 'off':
        editMode.value = false
        break
    }
  }

  function setIndexStore(value) {
    indexStore.value = value
  }

  return { isModal, editMode, indexStore, toggleIsModal, changeEdit, setIndexStore }
})
