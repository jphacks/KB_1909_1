<template>
  <v-dialog :value="value" width="500" persistent @input="input">
    <v-card>
      <v-card-title>ログイン</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="loginReq.email"
            label="E-mail"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="loginReq.password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn outlined @click="submit">ログイン</v-btn>
          <v-btn outlined @click="openCreateUserDialog">アカウントを作る</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { LoginRequest } from '../util/apiV2/users/login'

@Component({})
class LoginDialog extends Vue {
  @Prop({ default: false }) readonly value!: boolean

  loginReq: LoginRequest = {
    email: '',
    password: ''
  }

  @Emit()
  input(isOpen: boolean) {
    return isOpen
  }

  @Emit()
  submit() {
    this.input(false)
    return this.loginReq
  }

  @Emit()
  openCreateUserDialog() {
    this.input(false)
    return true
  }
}

export default LoginDialog
</script>

<style lang="scss" scoped></style>
