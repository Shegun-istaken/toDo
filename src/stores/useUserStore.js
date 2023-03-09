import { defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore('useUser', ()=>{
    const userName = ref ("");

    function setUserName(value){
        userName.value = value;
    }

    return {userName, setUserName}
})