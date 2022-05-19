<template>
  <div class="home">
    <div class="home">
      <div v-if="errorCollection" class="error">{{errorCollection}}</div>
      <div v-if="docs">
        <JobList :jobs="docs"/>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "@/compasibles/getCollection"
import JobList from "../components/Job-List.vue"

export default {

  components:{ JobList},

  setup(){
    const {errorCollection,docs} = getCollection('jobs')
    return {errorCollection,docs}
  }
}
</script>
