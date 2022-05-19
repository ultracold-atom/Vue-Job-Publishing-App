<template>
  <form @submit="handleSubmit">
    <h3>Sign-Up Page</h3>
    <input type="text" placeholder="Please enter your User Name"
    v-model="userName" />
    <input type="text" placeholder="Please enter your e-mail"
    v-model="email" />
    <input type="password" placeholder="Please enter your password"
    v-model="password" />
    <button>Sign Up</button> 
    <div v-if="error" class="error">{{error}}</div> 
  </form>  
</template>


<script>
import useSignup from "@/compasibles/useSignup"
import { ref } from "vue"

export default {
  setup(){
    const {error,signUp} = useSignup() 
    const email = ref('')
    const password = ref('')
    const userName = ref('')
    const handleSubmit = async()=>{
      await signUp(email.value,password.value,userName.value) 
      if(!error.value){console.log("User has been sign-up")} 
    } 
    return {email,password,userName,handleSubmit,error}
  }  

}
</script>


<style>

</style>