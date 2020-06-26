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
      <v-toolbar dark color="#43A047" tile>
        <v-btn icon dark @click="hideModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Tambah Guru</v-toolbar-title>
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
              hint="Masukkan username guru"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="password"
              :rules="rulesPassword"
              label="Password*"
              hint="Masukkan kata sandi guru"
              type="password"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-select
              :items="subjects"
              v-model="subject"
              label="Mata Pelajaran*"
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
  name: 'CreateTeacherModal',
  components: {
  },
  data: () => ({
    showModal: false,
    username: null,
    password: null,
    subject: null,
    subjects: [
      { id: 1, name: 'Agama' },
      { id: 2, name: 'Bahasa Indonesia' },
      { id: 3, name: 'Pkn' },
      { id: 4, name: 'Bahasa Inggris' },
      { id: 5, name: 'IPA' },
      { id: 6, name: 'IPS' },
      { id: 7, name: 'Matematika' },
      { id: 8, name: 'TIK' },
      { id: 9, name: 'Penjaskes' },
      { id: 10, name: 'Seni Budaya' },
      { id: 11, name: 'Bahasa Mandarin' },
    ],
    rulesUsername: [
      (v) => !!v || 'Username guru wajib diisi',
      (v) => (v || '').indexOf(' ') < 0 || 'Tidak boleh pakai spasi',
    ],
    rulesPassword: [
      (v) => !!v || 'Password guru wajib diisi',
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
      isDisabled = this.subject && this.subject > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      this.isSaveButtonDisable = isDisabled;
    },
    password() {
      let isDisabled = this.username && this.username.length > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      isDisabled = this.password && this.password.length > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      isDisabled = this.subject && this.subject > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      this.isSaveButtonDisable = isDisabled;
    },
    subject() {
      let isDisabled = this.username && this.username.length > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      isDisabled = this.password && this.password.length > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      isDisabled = this.subject && this.subject > 0
        ? this.isSaveButtonDisable = false : this.isSaveButtonDisable = true;
      this.isSaveButtonDisable = isDisabled;
    },
  },
  methods: {
    async submitData() {
      const dataToSend = {
        username: this.username,
        password: this.password,
        idMatpel: this.subject,
      };
      await axios({
        method: 'post',
        url: 'http://54.160.24.52:8081/guru/create',
        data: dataToSend,
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal menambahkan guru baru. Silahkan coba lagi';
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
