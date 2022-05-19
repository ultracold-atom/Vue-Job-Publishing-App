import { ref } from "vue";
import {auth} from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth";

const user = ref(auth.currentUser)

onAuthStateChanged(auth,(User)=>{
  user.value = User
  console.log(User)
})

const getUser = ()=>{
  return {user}  
}

export default getUser