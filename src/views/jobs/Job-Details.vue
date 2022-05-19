<template>
  <div v-if="errorDoc" class="error">{{errorDoc}}</div>  
  <div v-if="job" class="work-details">
    <div class="work-info">
      <div class="image"> 
        <img :src="job.imageUrl" />
      </div>
      <h2>{{job.title}}</h2>
      <p class="userName">{{job.userName}}</p>
      <p class="description">{{job.description}}</p>
    </div>
    <div class="work-list">
      <h2>Job Steps</h2>
      <AddJobSteps v-if="userJob" :job="job" />
      <div class="work-list">
        <div v-if="!job.jobSteps.length">Jobs are not uploaded yet</div>
        <div v-for="JobStep in job.jobSteps" :key="JobStep.id" class="single-work">
          <div class="details">
            <h3>{{JobStep.jobStep}}</h3>
          </div>
          <button v-if="userJob" @click="handleClick(JobStep.id)">Delete Job Step</button>
        </div>
      </div>
      <button v-if="userJob" @click="handleDelete">Delete Job</button>
    </div>
  </div>
</template>


<script>
import getDocument from '@/compasibles/getDocument'
import useStorage from '@/compasibles/useStorage'
import useDocument from '@/compasibles/useDocument'
import getUser from '@/compasibles/getUser'
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import AddJobSteps from '@/components/Add-JobSteps.vue'


export default {
  components:{AddJobSteps},
  props: ['id'],
  setup(props){

    const {errorDoc,document:job} = getDocument('jobs',props.id) 

    const {user} = getUser()
    const userJob = computed(()=>{
      return job.value && user.value && user.value.uid == job.value.userId   //Şuraya bi göz at
    })

    const {deleteDocument,updateDocument} = useDocument('jobs',props.id)
    const {deleteImg} = useStorage()
    const router = useRouter()

    const handleDelete=async()=>{
      await deleteImg(job.value.filePath)
      await deleteDocument() 

      router.push({name:'home'})
    } 

    const handleClick = async(id) =>{
      const jobSteps = job.value.jobSteps.filter((step)=>step.id != id)
      console.log(jobSteps)
      await updateDocument({jobSteps})
    }

    return {errorDoc,job,userJob,handleDelete,handleClick}
  }
   }
   

</script>


<style>
img{
  height: 240px;
  width: 240px;
}

</style>
