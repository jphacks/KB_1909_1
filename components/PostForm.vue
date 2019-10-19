<template>
  <v-container>
    <p>
      何でも投稿してください！
    </p>
    <p v-if="loadLocation">
      (現在地: {{ `${position.latitude}  ${position.longitude}` }})
    </p>
    <div class="form-container">
      <v-textarea v-model="postBody" outlined auto-grow></v-textarea>
      <v-btn outlined @click="createPost">投稿</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Coords from '../models/Coords'
import ApiV1 from '../util/apiv1'

@Component({})
class PostForm extends Vue {
  postBody = ''
  position?: Coords
  loadLocation = false

  mounted() {
    navigator.geolocation.watchPosition(
      this.getLocationSuccessfully,
      this.getLocationError
    )
  }

  async createPost() {
    if (!this.loadLocation) return
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

  getLocationSuccessfully(position) {
    this.position = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    console.log(this.position)
    this.loadLocation = true
  }

  getLocationError() {
    console.log('位置情報を取得できませんでした')
  }
}

export default PostForm
</script>

<style lang="scss" scoped>
.form-container {
  text-align: right;
}
</style>
