<template>
  <div>
    <h2>周辺のmonu</h2>
    <v-card v-for="(post, i) in posts" :key="i" class="post-card">
      <v-card-text>
        <p>現在地から{{ Math.round(post.distance) }}m</p>
        <v-img :src="post.url" max-height="200"></v-img>
        <p class="text--primary">{{ post.body }}</p>
        <p class="created-at">{{ formatDate(post.created_at) }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import * as dayjs from 'dayjs'
import Coords from '../models/Coords'
import Post from '../models/Post'

@Component({})
class PostListContainer extends Vue {
  @Prop() readonly position?: Coords
  @Prop() readonly posts?: Post[]

  formatDate(date: number): string {
    return dayjs(date).format('YYYY-MM-DD HH:mm')
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
