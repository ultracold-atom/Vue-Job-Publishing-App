import { ref } from "vue";
import { db } from "@/firebase/config";
import { doc,deleteDoc,updateDoc } from "firebase/firestore";


const useDocument = (collection,id)=>{
  const error = ref(null)  
  
  let docRef = doc(db,collection,id)

  const deleteDocument = async()=>{
    error.value = null
    try{
      let res = deleteDoc(docRef)
      return res    
    }catch(error){error.value = "Document didnt delete"}
    
  }

  const updateDocument = async (jobStep)=>{
    error.value = null
    try{
      const res = await updateDoc(docRef,jobStep)
      return res
    }catch(err){error.value = "Document didnt update"}
  }

  return{error,deleteDocument,updateDocument}
}


export default useDocument