<template>
  <div v-for="job in jobs" :key="job.id">
    <router-link :to="{name:'JobDetails',params:{id:job.id}}">
      <div class="single">
        <div class="thumbnail">
          <img :src="job.imageUrl" /> 
        </div>  
        <div class="info">
          <h3>{{job.title}}</h3>
          <p>Created by: {{job.userName}}</p>
        </div> 
        <div class="work-number">
          <p>There are {{job.jobSteps.length}} job steps</p>  
        </div>
      </div>
    </router-link>
  </div>  
</template>


<script>
export default {
  props:['jobs']  
}
</script>


<style>


</style>