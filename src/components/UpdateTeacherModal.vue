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
              :items="subjects"
              v-model="subject"
              label="Mata Pelajaran*"
              single-line
              item-text="name"
              item-value="id"
              prepend-icon="mdi-teach"
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
  name: 'UpdateTeacherModal',
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
      (v) => !!v || 'Password guru wajib diisi',
      (v) => (v || '').indexOf(' ') < 0 || 'Tidak boleh pakai spasi',
    ],
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
        userID: this.id,
        username: this.username,
        password: this.password,
        idMatpel: this.subject,
      };
      await axios({
        method: 'post',
        url: 'http://54.160.24.52:8081/guru/update',
        data: dataToSend,
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal mengubdah data guru. Silahkan coba lagi';
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
    returnSubjectName(id) {
      const subject = this.subjects.findIndex((o) => o.id === id);
      // const subjectInObject = JSON.parse(subject);
      // const subjectIndex = this.subjects.indexOf(subject);
      // return this.subject[subject].name;
      // subject = subject === -1 ? 0 : subject+1;
      this.subject = subject + 1;
      // this.subject = this.subjects[subject].name;
    },
    showModalFunction(id, username, password, subject) {
      this.id = id;
      this.username = username;
      this.subject = subject;
      this.returnSubjectName(subject);
      this.password = '';
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
  },
};
</script>
