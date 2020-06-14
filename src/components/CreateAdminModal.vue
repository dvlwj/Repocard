<template>
  <v-row justify="center">
    <v-dialog
      v-model="showModal"
      v-if="showModal"
      transition="dialog-bottom-transition"
      hide-overlay
      fullscreen
      tile
    >
    <v-card>
      <v-toolbar dark color="#1E88E5" tile>
        <v-btn icon dark @click="hideModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Tambah admin</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="submitData"
            :disabled="isSaveButtonDisable"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="username"
              :rules="rulesUsername"
              label="Username*"
              hint="Masukkan username admin"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="password"
              :rules="rulesPassword"
              label="Password*"
              hint="Masukkan kata sandi admin"
              type="password"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateAdminModal',
  components: {
  },
  data: () => ({
    showModal: false,
    username: null,
    password: null,
    rulesUsername: [
      (v) => !!v || 'Username admin wajib diisi',
      (v) => (v || '').indexOf(' ') < 0 || 'Tidak boleh pakai spasi',
    ],
    rulesPassword: [
      (v) => !!v || 'Password admin wajib diisi',
      (v) => (v || '').indexOf(' ') < 0 || 'Tidak boleh pakai spasi',
    ],
    isSaveButtonDisable: true,
  }),
  watch: {
    username() {
      const isDisabled = (this.username.length > 0)
        ? this.isSaveButtonDisable = false
        : this.isSaveButtonDisable = true;
      this.isSaveButtonDisable = isDisabled;
    },
    password() {
      const isDisabled = (this.password.length > 0)
        ? this.isSaveButtonDisable = false
        : this.isSaveButtonDisable = true;
      this.isSaveButtonDisable = isDisabled;
    },
  },
  methods: {
    async submitData() {
      const dataToSend = {
        username: this.username,
        password: this.password,
      };
      await axios({
        method: 'post',
        url: 'http://localhost:8081/admin/create',
        data: dataToSend,
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal menambahkan admin baru. Silahkan coba lagi';
            alert(message);
            return;
          }
          this.username = null;
          this.password = null;
          this.hideModal();
        })
        .catch((error) => {
          alert(error);
        });
    },
    showModalFunction() {
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
  },
};
</script>
