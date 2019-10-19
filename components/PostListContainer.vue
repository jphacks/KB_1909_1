<template>
  <div v-if="loaded">
    <h2>周辺のソート</h2>
    <v-card v-for="(post, i) in posts" :key="i" class="post-card">
      <v-card-text>
        <p>現在地から{{ Math.round(post.distance) }}m</p>
        <p class="text--primary">{{ post.body }}</p>
        <p class="created-at">{{ formatDate(post.created_at) }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import * as dayjs from 'dayjs'
import ApiV1 from '../util/apiv1'
import Post from '../models/Post'
import Coords from '../models/Coords'

@Component({})
class PostListContainer extends Vue {
  @Prop() readonly position?: Coords

  posts: Post[] = []
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
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  formatDate(date: number): string {
    return dayjs.unix(date).format('YYYY-MM-DD HH:MM')
  }
}

export default PostListContainer
</script>

<style lang="scss" scoped>
.post-card {
  margin: 10px 0;
}

.created-at {
  text-align: right;
  margin-bottom: 0;
}
</style>
