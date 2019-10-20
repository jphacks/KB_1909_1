<template>
  <div>
    <v-app-bar>
      <h1>RE:Site</h1>
    </v-app-bar>

    <login-dialog
      v-model="isOpenLoginDialog"
      @submit="submitLogin"
      @open-create-user-dialog="openCreateUserDialog"
    ></login-dialog>

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
import Cookies from 'js-cookie'
import Coords from '../models/Coords'
import Post from '../models/Post'
import uploadImage, { ImgurResponse } from '../util/imgur/postImage'
import CreateUserDialog from '../components/CreateUserDialog.vue'
import getUser, { GetUserResponse } from '../util/apiV2/users/getUser'
import LoginDialog from '../components/LoginDialog.vue'
import login, { LoginResponse } from '../util/apiV2/users/login'
import ApiV2 from '../util/apiV2'
import PostForm from '@/components/PostForm'
import PostListContainer from '@/components/PostListContainer'
import { CreateUserResponse } from '../util/apiV2/users/createUser'

@Component({
  components: {
    PostForm,
    PostListContainer,
    CreateUserDialog,
    LoginDialog
  }
})
class Index extends Vue {
  isOpenCreateUserDialog = false
  isOpenLoginDialog = false
  userToken = ''
  loadLocation = false
  position: Coords = { latitude: 0, longitude: 0 }
  status = '現在地を取得しています'
  posts: Post[] = []
  me?: GetUserResponse

  mounted() {
    this.userToken = Cookies.get('usertoken')
    if (!this.userToken) {
      this.isOpenLoginDialog = true
    }
  }

  async afterLogin() {
    if (!this.userToken) return
    Cookies.set('usertoken', this.userToken)
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

      const res = await ApiV2.posts.createPost(
        {
          longitude: this.position.longitude,
          latitude: this.position.latitude,
          url: imgurUrl,
          body: postBody
        },
        this.userToken
      )

      console.log(res)
      this.fetchPosts()
    } catch (err) {
      console.log(err)
    }
  }

  async fetchPosts() {
    try {
      const res = (await ApiV2.posts.getPosts(
        {
          longitude: this.position.longitude,
          latitude: this.position.latitude,
          delta: 0.001
        },
        this.userToken
      )) as Post[]

      this.posts = res
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  async submitNewUser(newUser) {
    const createdUser = (await ApiV2.users.createUser(
      newUser
    )) as CreateUserResponse
    this.userToken = createdUser.token
    console.log(this.userToken)
    this.afterLogin()
  }

  async submitLogin(loginReq) {
    const res = (await login(loginReq)) as LoginResponse
    this.userToken = res.token
    this.afterLogin()
  }

  openCreateUserDialog(shouldOpen) {
    this.isOpenCreateUserDialog = shouldOpen
  }
}

export default Index
</script>

<style lang="scss">
h1 {
  text-align: center;
}
</style>
