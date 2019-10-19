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
import { Component, Vue } from 'vue-property-decorator'
import ApiV1 from '../util/apiv1'
import Post from '../models/Post'
import { GetPostsResponse } from '../util/apiv1/posts/getPosts'

@Component({})
class PostListContainer extends Vue {
  posts?: Post[]
  loaded = false

  mounted() {
    this.fetchPosts()
  }

  async fetchPosts() {
    try {
      const res = (await ApiV1.posts.getPosts({
        // TODO: 実際の値を入れる
        longitude: 34.68486,
        latitude: 135.1994354
      })) as GetPostsResponse

      this.posts = res.posts
      this.loaded = true
    } catch (err) {
      console.log(err)
    }
  }
}

export default PostListContainer
</script>
