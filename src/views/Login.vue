<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="red lighten-1" dark flat>
              <v-toolbar-title>Selamat Datang !</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-icon>mdi-login</v-icon>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Nama Akun"
                  name="login"
                  color="red lighten-1"
                  prepend-icon="mdi-account"
                  v-model="loginUsername"
                  type="text"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Kata Sandi"
                  name="password"
                  color="red lighten-1"
                  prepend-icon="mdi-lock"
                  v-model="loginPassword"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red lighten-1" dark @click="login">Masuk</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  components: {
  },
  data: () => ({
    loginUsername: '',
    loginPassword: '',
  }),
  watch: {},
  methods: {
    login() {
      const dataToSend = {
        username: this.loginUsername,
        password: this.loginPassword,
      };
      axios({
        method: 'post',
        url: 'http://54.160.24.52:8081/login',
        data: dataToSend,
        timeout: 10000,
      }).then((res) => {
        if (res.status === 200) {
          const resToSave = res.data.data;
          this.$store.dispatch('setUsername', resToSave.username);
          this.$store.dispatch('setPassword', resToSave.password);
          this.$store.dispatch('setLevel', resToSave.level);
          this.$store.dispatch('setMatpel', resToSave.matpel);
          this.$router.push({ name: 'Dashboard' });
        } else {
          alert('Login gagal');
        }
      }).catch((error) => {
        alert(error);
      });
    },
  },
};
</script>
