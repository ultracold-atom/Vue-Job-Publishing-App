<template>
  <div class="add-work">
    <button v-if="!showForm" @click="showForm=true">Add Job Step</button> 
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>New Job Step</h4>
      <input type="text" placeholder="Job Step" required v-model="jobStep">  
      <button>Add</button>
    </form> 
  </div>  
</template>

<script>
import { ref } from 'vue'
import useDocument from '../compasibles/useDocument'

export default {
  props:['job'],
  setup(props){
    const jobStep = ref(null)
    const showForm = ref(false)

    const {updateDocument} = useDocument('jobs',props.job.id)

    const handleSubmit = async ()=>{
      const newJobStep={
        jobStep:jobStep.value,
        id:Math.floor(Math.random()*100000)
      }

      const res = await updateDocument({
        jobSteps:[...props.job.jobSteps,newJobStep]
      })
      console.log(res)

      jobStep.value = null
      showForm.value = false 
    }
    return {jobStep,showForm,handleSubmit}
  }  
}
</script>

<style scoped>
  .add-work{
    text-align: center;
    margin-top: 40px;
  }

  form{
    max-width: 100%;
    text-align: left;
  }

</style>