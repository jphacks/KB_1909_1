<template>
  <v-dialog :value="value" width="500" @input="input">
    <v-card>
      <v-card-title>アカウントを作成</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="newUser.name"
            :counter="20"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="newUser.email"
            label="E-mail"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="newUser.password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn @click="submit">作成</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { CreateUserRequest } from '../util/apiV2/users/createUser'

@Component({})
class CreateUserDialog extends Vue {
  @Prop({ default: false }) readonly value!: boolean

  newUser: CreateUserRequest = {
    name: '',
    email: '',
    password: '',
    // TODO: 画像をアップロード
    image:
      'https://japan.cnet.com/storage/2019/08/07/40fbe8897f436faf72370b5c290295d7/t/584/438/d/large-107244.jpg'
  }

  @Emit()
  input(isOpen: boolean) {
    return isOpen
  }

  @Emit()
  submit() {
    this.input(false)
    return this.newUser
  }
}

export default CreateUserDialog
</script>

<style lang="scss" scoped></style>
