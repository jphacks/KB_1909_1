<template>
  <div v-if="loaded">
    <div v-for="(post, i) in posts" :key="i" class="post">
      <p>{{ post.created_at }}</p>
      <p>{{ post.body }}</p>
      <p>{{ post.distance }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ApiV1 from '../util/apiv1'
import Post from '../models/Post'
import Coords from '../models/Coords'

@Component({})
class PostListContainer extends Vue {
  @Prop() readonly position?: Coords

  posts?: Post[]
  loaded = false

  mounted() {
    this.fetchPosts()
  }

  async fetchPosts() {
    try {
      const res = (await ApiV1.posts.getPosts({
        longitude: this.position.longitude,
        latitude: this.position.latitude
      })) as Post[]

      this.posts = res
      this.loaded = true
    } catch (err) {
      console.log(err)
    }
  }
}

export default PostListContainer
</script>
