<template>
  <form @submit="handleSubmit">
    <h3>Login Page</h3>
    <input type="email" placeholder="Please enter your e-mail"
    v-model="email" />
    <input type="password" placeholder="Please enter your password"
    v-model="password" />
    <button>Enter</button> 
    <div v-if="error" class="error">{{error}}</div> 
  </form>  
</template>


<script>
import useLogin from "@/compasibles/useLogin"
import { ref } from "vue"

export default {
  setup(){
    const {error,login} = useLogin() 
    const email = ref('')
    const password = ref('')
    const handleSubmit = async()=>{
      await login(email.value,password.value) 
      if(!error.value){console.log("User has been login")} 
    } 
    return {email,password,handleSubmit,error}
  }  

}
</script>


<style>

</style>