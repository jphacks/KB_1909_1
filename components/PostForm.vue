<template>
  <v-container>
    <p>何でも投稿してください！</p>
    <v-textarea v-model="postBody"></v-textarea>
    <v-btn right absolute outlined>投稿</v-btn>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({})
class PostForm extends Vue {
  postBody = ''
}

export default PostForm
</script>
