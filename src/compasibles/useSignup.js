import { ref } from "vue";
import {auth} from '../firebase/config'
import { createUserWithEmailAndPassword,updateProfile} from "firebase/auth";

const error = ref(null)

const signUp = async (email,password,userName)=>{
  error.value = null
  
  try{
    
    const res = await createUserWithEmailAndPassword(auth,email,password)
    .catch(err=>{console.log(err.message)})
    .then(cred=>{
        updateProfile(cred.user,{displayName:userName})
        console.log('üye oluşturuldu',cred.user) })

    if(!res){throw new Error('There is no Sign-Up')}
    await res.user
    error.value = null
    return res
  }
  catch(err){error.value = err.message}
}

const useLogin = ()=>{
  return {error,signUp}  
}

export default useLogin