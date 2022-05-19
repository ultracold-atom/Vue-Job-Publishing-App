import { doc,onSnapshot} from "firebase/firestore";
import { ref } from "vue";
import {db} from "@/firebase/config";


const getDocument = (collect,id)=>{
  let document = ref(null)
  let errorDoc = ref(null);
  
  let docRef = doc(db,collect,id)

  onSnapshot(docRef,(doc)=>{
    if(doc.data()){
      document.value = {...doc.data(),id:doc.id}
      console.log(document.value)
      errorDoc.value = null
    }else{
      errorDoc.value = "Document couldnt find"  
    }  
  },err=>{
    errorDoc.value = err.message   
  })
     return {document,errorDoc}
}

export default getDocument