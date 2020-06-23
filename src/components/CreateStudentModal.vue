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
      <v-toolbar dark color="#FF8F00" tile>
        <v-btn icon dark @click="hideModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Tambah murid</v-toolbar-title>
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
              hint="Masukkan username murid"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="password"
              :rules="rulesPassword"
              label="Password*"
              hint="Masukkan kata sandi murid"
              type="password"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-select
              :items="classes"
              v-model="classRoom"
              label="Kelas*"
              single-line
              item-text="name"
              item-value="id"
            >
            </v-select>
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
  name: 'CreateStudentModal',
  components: {
  },
  data: () => ({
    showModal: false,
    username: null,
    password: null,
    classRoom: null,
    classes: [
      { id: 1, name: '7A' },
      { id: 2, name: '7B' },
      { id: 3, name: '7C' },
      { id: 4, name: '8A' },
      { id: 5, name: '8B' },
      { id: 6, name: '8c' },
      { id: 7, name: '9A' },
      { id: 8, name: '9B' },
      { id: 9, name: '9C' },
    ],
    rulesUsername: [
      (v) => !!v || 'Username murid wajib diisi',
      (v) => (v || '').indexOf(' ') < 0 || 'Tidak boleh pakai spasi',
    ],
    rulesPassword: [
      (v) => !!v || 'Password murid wajib diisi',
      (v) => (v || '').indexOf(' ') < 0 || 'Tidak boleh pakai spasi',
    ],
    isSaveButtonDisable: true,
  }),
  watch: {
    username() {
      let isDisabled = this.username && this.username.length > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      isDisabled = this.password && this.password.length > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      isDisabled = this.classRoom && this.classRoom > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      this.isSaveButtonDisable = isDisabled;
    },
    password() {
      let isDisabled = this.username && this.username.length > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      isDisabled = this.password && this.password.length > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      isDisabled = this.classRoom && this.classRoom > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      this.isSaveButtonDisable = isDisabled;
    },
    classRoom() {
      let isDisabled = this.username && this.username.length > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      isDisabled = this.password && this.password.length > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      isDisabled = this.classRoom && this.classRoom > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      this.isSaveButtonDisable = isDisabled;
    },
  },
  methods: {
    async submitData() {
      const dataToSend = {
        nama: this.username,
        password: this.password,
        kelas: this.classRoom,
      };
      await axios({
        method: 'post',
        url: 'http://localhost:8081/murid/create',
        data: dataToSend,
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal menambahkan murid baru. Silahkan coba lagi';
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
