<template>
  <div>
    <v-app-bar>monu</v-app-bar>
    <post-form></post-form>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import PostForm from '@/components/PostForm'

@Component({
  components: {
    PostForm
  }
})
class Index extends Vue {}

export default Index
</script>
