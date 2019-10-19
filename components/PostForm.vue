<template>
  <v-container>
    <p>
      何でも投稿してください！
    </p>
    <p>(現在地: {{ `${position.latitude}  ${position.longitude}` }})</p>
    <div class="form-container">
      <v-textarea v-model="postBody" outlined auto-grow></v-textarea>
      <v-btn outlined @click="createPost">投稿</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Coords from '../models/Coords'
import ApiV1 from '../util/apiv1'

@Component({})
class PostForm extends Vue {
  @Prop() readonly position?: Coords

  postBody = ''

  async createPost() {
    try {
      const res = await ApiV1.posts.createPost({
        // TODO: 実際の値を入れる
        longitude: this.position.longitude,
        latitude: this.position.latitude,
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

<style lang="scss" scoped>
.form-container {
  text-align: right;
}
</style>
