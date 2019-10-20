<template>
  <div>
    <v-app-bar>
      <h1>RE:Site</h1>
    </v-app-bar>

    <create-user-dialog
      v-model="isOpenCreateUserDialog"
      @submit="submitNewUser"
    ></create-user-dialog>

    <v-container>
      <div v-if="loadLocation">
        <post-form
          ref="post-form"
          :position="position"
          @on-submit="onSubmitPost"
        ></post-form>
        <post-list-container
          ref="post-list"
          :position="position"
          :posts="posts"
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
import Post from '../models/Post'
import uploadImage, { ImgurResponse } from '../util/imgur/postImage'
import CreateUserDialog from '../components/CreateUserDialog.vue'
import createUser, { CreateUserResponse } from '../util/apiV2/users/createUser'
import getUser, { GetUserResponse } from '../util/apiV2/users/getUser'
import LoginDialog from '../components/LoginDialog.vue'
import PostForm from '@/components/PostForm'
import PostListContainer from '@/components/PostListContainer'

@Component({
  components: {
    PostForm,
    PostListContainer,
    CreateUserDialog,
    LoginDialog
  }
})
class Index extends Vue {
  isOpenCreateUserDialog = true
  userToken = ''
  loadLocation = false
  position: Coords = { latitude: 0, longitude: 0 }
  status = '現在地を取得しています'
  posts: Post[] = []
  me?: GetUserResponse

  async afterLogin() {
    if (!this.userToken) return
    this.me = (await getUser(this.userToken)) as GetUserResponse

    navigator.geolocation.watchPosition(
      this.getLocationSuccessfully,
      this.getLocationError
    )
    this.fetchPosts()
    setInterval(this.fetchPosts, 1000 * 10)
  }

  getLocationSuccessfully(position) {
    if (!position) return
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

  async onSubmitPost(payload) {
    const postBody = payload.postBody
    const imageUrl = payload.imageUrl

    try {
      this.$refs['post-form'].resetPostBody()

      let imgurUrl = ''

      if (imageUrl) {
        imgurUrl = ((await uploadImage(imageUrl)) as ImgurResponse).data.link
      }

      const res = await ApiV1.posts.createPost({
        longitude: this.position.longitude,
        latitude: this.position.latitude,
        url: imgurUrl,
        body: postBody
      })

      console.log(res)
      this.fetchPosts()
    } catch (err) {
      console.log(err)
    }
  }

  async fetchPosts() {
    try {
      const res = (await ApiV1.posts.getPosts({
        longitude: this.position.longitude,
        latitude: this.position.latitude,
        delta: 0.001
      })) as Post[]

      this.posts = res
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  async submitNewUser(newUser) {
    const createdUser = (await createUser(newUser)) as CreateUserResponse
    this.userToken = createdUser.token
    console.log(this.userToken)
    this.afterLogin()
  }
}

export default Index
</script>

<style lang="scss">
h1 {
  text-align: center;
}
</style>
