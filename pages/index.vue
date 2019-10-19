<template>
  <div>
    <v-app-bar>
      <h1>monu</h1>
    </v-app-bar>
    <v-container>
      <div v-if="loadLocation">
        <post-form :position="position"></post-form>
        <post-list-container :position="position"></post-list-container>
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
  position?: Coords
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
}

export default Index
</script>

<style lang="scss">
h1 {
  text-align: center;
}
</style>
