<template>
  <div>
    <h2>周辺のmonu</h2>
    <v-card v-for="(post, i) in posts" :key="i" class="post-card">
      <v-card-text>
        <p>現在地から{{ Math.round(post.distance) }}m</p>
        <h2 v-if="users[post.user_id]">
          {{ users[post.user_id] }}
        </h2>
        <v-img :src="post.url" max-height="200" contain></v-img>
        <p class="post-body">{{ post.body }}</p>
        <p class="created-at">{{ formatDate(post.created_at) }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as dayjs from 'dayjs'
import Coords from '../models/Coords'
import Post from '../models/Post'
import ApiV2 from '../util/apiV2'
import { GetUsersIdResponse } from '../util/apiV2/users/getUsersId'

@Component({})
class PostListContainer extends Vue {
  @Prop() readonly position?: Coords
  @Prop() readonly posts?: Post[]
  users = {}

  formatDate(date: number): string {
    console.log(date)
    return dayjs.unix(date).format('YYYY-MM-DD HH:mm')
  }

  @Watch('posts')
  onChangePosts() {
    for (const post of this.posts) {
      if (!post.user_id) return
      if (this.users[post.user_id]) return
      ApiV2.users.getUsersId(post.user_id).then((user: GetUsersIdResponse) => {
        this.users[post.user_id] = user.name
        console.log(this.users)
      })
    }
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

h2 {
  color: black;
  margin-bottom: 10px;
  font-weight: normal;
}

p {
  color: #000;
}

.post-body {
  font-size: 1.2rem;
  color: black;
}
</style>
