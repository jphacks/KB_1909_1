<template>
  <div>
    <v-app-bar>
      <h1>monu</h1>
    </v-app-bar>
    <v-container>
      <div v-if="loadLocation">
        <post-form :position="position" @on-submit="onSubmitPost"></post-form>
        <post-list-container
          ref="post-list"
          :position="position"
        ></post-list-container>
      </div>
      <div v-else>
        <p>{{ status }}</p>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Coords from '../models/Coords'
import ApiV1 from '../util/apiv1'
import PostForm from '@/components/PostForm'
import PostListContainer from '@/components/PostListContainer'

@Component({
  components: {
    PostForm,
    PostListContainer
  }
})
class Index extends Vue {
  loadLocation = false
  position: Coords | null = null
  status = '現在地を取得しています'

  mounted() {
    navigator.geolocation.watchPosition(
      this.getLocationSuccessfully,
      this.getLocationError
    )
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
    this.status = '位置情報を取得できませんでした'
  }

  async onSubmitPost(postBody) {
    try {
      const res = await ApiV1.posts.createPost({
        longitude: this.position.longitude,
        latitude: this.position.latitude,
        url: '',
        body: postBody
      })

      console.log(res)
      this.$refs['post-list'].fetchPosts()
    } catch (err) {
      console.log(err)
    }
  }
}

export default Index
</script>

<style lang="scss">
h1 {
  text-align: center;
}
</style>
