import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login-App.vue'
import Signup from '../views/auth/Sign-Up.vue'
import CreateJob from '../views/jobs/Create-Job.vue'
import JobDetails from '../views/jobs/Job-Details.vue'
import { auth } from '@/firebase/config'


const authLogin=(to,from,next)=>{
  let user = auth.currentUser

  if(!user){
    next({name:'Login'})
  }else{
    next()
  }
}


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: authLogin
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/create-job',
    name: 'CreateJob',
    component: CreateJob,
    beforeEnter: authLogin
  },
  {
    path: '/jobs/:id',
    name: 'JobDetails',
    component: JobDetails,
    beforeEnter: authLogin,
    props:true
  }     
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
