<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Create Job</h4>    
      <input type="text" placeholder="Job Title" v-model="title">
      <textarea placeholder="Job Description" v-model="description"></textarea>
      <label>Job Photo</label>
      <input type="file" @change="handleChange">
      <input type="datetime-local" v-model="beginDate">
      <div class="error">{{fileError}}</div>
      <button>Create Job</button>
    </form>  
  </div>    
</template>


<script>
import { ref } from "vue"
import useStorage from "@/compasibles/useStorage"
import useCollection from "@/compasibles/useCollection"
import getUser from "@/compasibles/getUser"
import { date } from "@/firebase/config"
import { useRouter } from "vue-router"



export default {
  setup(){
    const router = useRouter()
    const title = ref('')
    const description = ref('')
    const beginDate = ref('')

    const file = ref(null)
    const fileError = ref(null)

    

    const {uploadImg,url,filePath,error} = useStorage()    
    const {errorCollection,uploadDoc} = useCollection('jobs')
    const {user} = getUser()

    const validTypes = ['image/png','image/jpeg']


    const handleSubmit = async ()=>{
  
      if(file.value){
        await uploadImg(file.value)

        console.log(error)
        const res = await uploadDoc({
          title:title.value,
          description:description.value,
          userId:user.value.uid,
          userName:user.value.displayName,
          imageUrl:url.value,
          filePath:filePath.value,
          jobSteps:[],
          jobDate:Date.parse(beginDate.value),
          creationDate:date
        })
        console.log("Image has been uploaded",url.value)

        if(!errorCollection.value){
          console.log("Job has been uploaded" , url)
          router.push({name:'JobDetails',params:{id:res.id}})
        }
        }
    }

    const handleChange = (e)=>{
      let choosen = e.target.files[0]
      if(choosen && validTypes.includes(choosen.type)){
        file.value = choosen
        fileError.value = null  
      }
      else {
        file.value = null
        fileError.value = "Please choose the files with png or jpeg extension"  
      }
    }
    return {title,description,beginDate,handleSubmit,handleChange,fileError}
  }

}
</script>


<style>
    input [type="file"]{
        border:0;
        padding: 0;
    }
    label{
        font-size: 17px;
        display: block;
        margin-top: 30px;
    }

    form {
        margin-top: -30px;
    }
</style>