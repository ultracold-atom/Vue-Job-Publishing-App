<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/logo.png" alt="">
      <h1>
        <router-link :to="{name:'home'}">Job Tracking</router-link>    
      </h1>  
      <div class="links">
        <div v-if="user">
          <router-link class="btn" :to="{name:'CreateJob'}">Create Job</router-link>
          <button @click="handleClick">Exit</button>
        </div>
        <div v-if="!user">
          <router-link class="btn" :to="{name:'Signup'}">Sign Up</router-link> 
          <router-link class="btn" :to="{name:'Login'}">Login</router-link> 
        </div> 
      </div>  
    </nav>    
  </div>  
</template>

<script>
import useLogout from "@/compasibles/useLogout"
import { useRouter } from "vue-router"
import getUser from '../compasibles/getUser'

export default {
  setup(){
    const {logout} = useLogout()
    const router = useRouter()
    const {user} = getUser()

    const handleClick = async()=>{
      await logout()
      router.push({name:"Login"})
    }
    return {handleClick,user}
  }
}
</script>


<style>

</style>