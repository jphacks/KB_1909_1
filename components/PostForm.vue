<template>
  <div>
    <p>
      何でも投稿してください！
    </p>
    <p>(現在地: {{ `${position.latitude}  ${position.longitude}` }})</p>
    <div class="form-container">
      <v-textarea v-model="postBody" outlined auto-grow></v-textarea>
      <input
        id="fileElem"
        type="file"
        accept="image/*"
        @change="selectedFile"
        hidden
      />
      <v-img v-if="imageUrl" :src="imageUrl" max-height="200" contain></v-img>
      <v-btn class="mx-2" fab dark small color="primary" @click="openFileInput">
        <v-icon dark>mdi-image</v-icon> </v-btn
      ><v-btn outlined @click="onSubmit" type="submit">投稿</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import Coords from '../models/Coords'

@Component({})
class PostForm extends Vue {
  @Prop() readonly position?: Coords

  postBody = ''
  imageUrl: string | ArrayBuffer = ''

  @Emit()
  onSubmit() {
    return { postBody: this.postBody, imageUrl: this.imageUrl }
  }

  resetPostBody() {
    this.postBody = ''
    this.imageUrl = ''
  }

  openFileInput() {
    document.getElementById('fileElem').click()
  }

  selectedFile(e) {
    e.preventDefault()
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.addEventListener(
      'load',
      () => {
        this.imageUrl = reader.result
      },
      false
    )
  }
}

export default PostForm
</script>

<style lang="scss" scoped>
.form-container {
  text-align: right;
}
</style>
