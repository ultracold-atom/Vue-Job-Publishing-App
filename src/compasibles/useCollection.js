import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "@/firebase/config";

const useCollection =(collect)=>{
  const errorCollection = ref(null)

  const uploadDoc = async(document)=>{
    errorCollection.value = null
    try{
      const res = await addDoc(collection(db,collect),document)
      //console.log(res.id)
      return res
    }catch(err){errorCollection.value = "Document didnt upload"}
  }  
  return {errorCollection,uploadDoc}
}

export default useCollection