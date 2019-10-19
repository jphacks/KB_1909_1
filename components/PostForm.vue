<template>
  <div>
    <p>
      何でも投稿してください！
    </p>
    <p>(現在地: {{ `${position.latitude}  ${position.longitude}` }})</p>
    <div class="form-container">
      <v-textarea v-model="postBody" outlined auto-grow></v-textarea>
      <v-btn class="mx-2" fab dark small color="primary">
        <v-icon dark>mdi-minus</v-icon> </v-btn
      ><v-btn outlined @click="onSubmit">投稿</v-btn>
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
  imageUrl = ''

  @Emit()
  onSubmit() {
    return { postBody: this.postBody, imageUrl: this.imageUrl }
  }

  resetPostBody() {
    this.postBody = ''
  }
}

export default PostForm
</script>

<style lang="scss" scoped>
.form-container {
  text-align: right;
}
</style>
