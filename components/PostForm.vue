<template>
  <v-container>
    <p>何でも投稿してください！</p>
    <v-textarea></v-textarea>
    <v-btn right absolute outlined></v-btn>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({})
class PostForm extends Vue {}

export default PostForm
</script>
