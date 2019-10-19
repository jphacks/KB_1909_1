<template>
  <div>
    <v-app-bar>
      <h1>monu</h1>
    </v-app-bar>
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

<style lang="scss">
h1 {
  text-align: center;
}
</style>
