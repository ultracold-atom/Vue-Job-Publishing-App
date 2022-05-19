import { ref } from "vue";
import { collection,onSnapshot,orderBy,query } from "firebase/firestore";
import { db } from "@/firebase/config";


const getCollection = (collect)=>{
  const docs = ref(null)
  const errorCollection = ref(null)  

  let colRef = collection(db,collect)
  const q = query(colRef,orderBy('creationDate'))

  onSnapshot(q,(snapshot)=>{
    let results = []
    snapshot.docs.forEach(doc=>{
      results.push({...doc.data(),id:doc.id})  
    })
  docs.value = results
  errorCollection.value = null
  },err=>{
      console.log(err.message);  
      docs.value = null
      errorCollection.value = "Couldnt access the documents"
  })
  return { docs,errorCollection}
}

export default getCollection