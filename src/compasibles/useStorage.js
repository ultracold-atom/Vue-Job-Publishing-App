import { ref } from "vue";
import { storage } from "@/firebase/config";
import { getDownloadURL,uploadBytes,deleteObject} from "firebase/storage";
import { ref as stRef } from "firebase/storage";


import getUser from './getUser'


const {user} = getUser()

const useStorage = ()=>{
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null) 
  
  const uploadImg = async (file)=>{
    filePath.value = `jobs/${user.value.uid}/${file.name}`  
    const storageRef = stRef(storage,filePath.value)

    try{
      return uploadBytes(storageRef, file).then(snapshot => {
        return getDownloadURL(snapshot.ref)
        }).then(downloadURL => {
         url.value = downloadURL
        // console.log(url.value)
        })  
    }catch(err){error.value = err}
    
  }

  const deleteImg = async (path)=>{
    const deleteStorage = stRef(storage,path)
    try{
      await deleteObject(deleteStorage)
    }
    catch(err){error.value = err}
  }

  return {uploadImg,url,filePath,error,deleteImg}
}

export default useStorage