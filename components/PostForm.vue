<template>
  <v-container>
    <p>何でも投稿してください！</p>
    <v-textarea v-model="postBody"></v-textarea>
    <v-btn right absolute outlined @click="createPost">投稿</v-btn>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import ApiV1 from '@/util/apiv1'

@Component({})
class PostForm extends Vue {
  postBody = ''

  async createPost() {
    try {
      const res = await ApiV1.posts.createPost({
        // TODO: 実際の値を入れる
        longitude: 34.68486,
        latitude: 135.1994354,
        url: '',
        body: this.postBody
      })

      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
}

export default PostForm
</script>
