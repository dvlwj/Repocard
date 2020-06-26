<template>
  <v-row justify="center">
    <v-dialog v-model="showModal" v-if="showModal" persistent>
      <v-card>
        <v-card-title class="headline">Details</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Nama Akun"
              name="login"
              prepend-icon="mdi-account"
              v-model="username"
              type="text"
              disabled
            ></v-text-field>
            <v-text-field
              id="password"
              label="Kata Sandi"
              name="password"
              :rules="rulesPassword"
              prepend-icon="mdi-lock"
              v-model="password"
              type="password"
            ></v-text-field>
            <v-select
              :items="classes"
              v-model="classRoom"
              label="Kelas*"
              single-line
              item-text="name"
              item-value="id"
              prepend-icon="mdi-school"
            >
            </v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ma-2"
            color="primary"
            @click="showModal = false"
          >
            close
            <v-icon right>mdi-close</v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            color="warning"
            @click="updateData"
            :disabled="isUpdateButtonDisable"
          >
            Update
            <v-icon right>mdi-check-all</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdateStudentModal',
  components: {
  },
  mounted() {
  },
  data: () => ({
    showModal: false,
    isUpdateButtonDisable: true,
    id: null,
    username: null,
    password: null,
    rulesPassword: [
      (v) => v.length > 5 || 'Password terlalu pendek',
      (v) => !!v || 'Password siswa wajib diisi',
      (v) => (v || '').indexOf(' ') < 0 || 'Tidak boleh pakai spasi',
    ],
    classRoom: null,
    classes: [
      { id: 1, name: '7A' },
      { id: 2, name: '7B' },
      { id: 3, name: '7C' },
      { id: 4, name: '8A' },
      { id: 5, name: '8B' },
      { id: 6, name: '8C' },
      { id: 7, name: '9A' },
      { id: 8, name: '9B' },
      { id: 9, name: '9C' },
    ],
  }),
  watch: {
    password() {
      const isDisabled = (this.password.length > 5)
        ? this.isUpdateButtonDisable = false
        : this.isUpdateButtonDisable = true;
      this.isUpdateButtonDisable = isDisabled;
    },
  },
  methods: {
    async updateData() {
      const dataToSend = {
        id: this.id,
        nama: this.username,
        password: this.password,
        kelas: this.classRoom,
      };
      await axios({
        method: 'post',
        url: 'http://54.160.24.52:8081/murid/update',
        data: dataToSend,
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal mengubdah data siswa. Silahkan coba lagi';
            alert(message);
            return;
          }
          this.username = '';
          this.password = '';
          this.id = '';
          this.hideModal();
        })
        .catch((error) => {
          alert(error);
        });
      // this.$emit('resyncParent');
    },
    returnClassName(kelas) {
      let classRoom = this.classes.findIndex((o) => o.id === Number(kelas));
      classRoom = classRoom === -1 ? 0 : classRoom;
      return this.classes[classRoom].name;
    },
    showModalFunction(id, username, password, kelas) {
      this.id = id;
      this.username = username;
      this.kelas = kelas;
      this.returnClassName(kelas);
      this.password = '';
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
  },
};
</script>
