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
      <v-toolbar dark color="#009688" tile>
        <v-btn icon dark @click="hideModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Tambah nilai</v-toolbar-title>
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
          <v-col cols="12" sm="12" md="12">
            <v-select
              :items="students"
              v-model="student"
              label="Siswa*"
              single-line
              item-text="nama"
              item-value="id"
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="ps1"
              :rules="rulesPS1"
              label="Nilai PS1*"
              hint="Masukkan nilai PS1"
              type="number"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="ps2"
              :rules="rulesPS2"
              label="Nilai PS2*"
              hint="Masukkan nilai PS2"
              type="number"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="ps3"
              :rules="rulesPS3"
              label="Nilai PS3*"
              hint="Masukkan nilai PS3"
              type="number"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="pr1"
              :rules="rulesPR1"
              label="Nilai PR1*"
              hint="Masukkan nilai PR1"
              type="number"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="pr2"
              :rules="rulesPR2"
              label="Nilai PR2*"
              hint="Masukkan nilai PR2"
              type="number"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="pr3"
              :rules="rulesPR3"
              label="Nilai PR3*"
              hint="Masukkan nilai PR3"
              type="number"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="uh1"
              :rules="rulesUH1"
              label="Nilai UH1*"
              hint="Masukkan nilai UH1"
              type="number"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="uh2"
              :rules="rulesUH2"
              label="Nilai UH2*"
              hint="Masukkan nilai UH2"
              type="number"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="uts"
              :rules="rulesUTS"
              label="Nilai UTS*"
              hint="Masukkan nilai UTS"
              type="number"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="uas"
              :rules="rulesUAS"
              label="Nilai UAS*"
              hint="Masukkan nilai UAS"
              type="number"
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
  name: 'CreateScoreModal',
  components: {
  },
  data: () => ({
    showModal: false,
    students: [],
    student: null,
    rootStudents: null,
    isSaveButtonDisable: true,
    classRoom: null,
    ps1: null,
    ps2: null,
    ps3: null,
    pr1: null,
    pr2: null,
    pr3: null,
    uh1: null,
    uh2: null,
    uts: null,
    uas: null,
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
    rulesPS1: [
      (v) => !!v || 'Nilai PS1 wajib diisi',
    ],
    rulesPS2: [
      (v) => !!v || 'Nilai PS2 wajib diisi',
    ],
    rulesPS3: [
      (v) => !!v || 'Nilai PS3 wajib diisi',
    ],
    rulesPR1: [
      (v) => !!v || 'Nilai PR1 wajib diisi',
    ],
    rulesPR2: [
      (v) => !!v || 'Nilai PR2 wajib diisi',
    ],
    rulesPR3: [
      (v) => !!v || 'Nilai PR3 wajib diisi',
    ],
    rulesUH1: [
      (v) => !!v || 'Nilai UH1 wajib diisi',
    ],
    rulesUH2: [
      (v) => !!v || 'Nilai UH2 wajib diisi',
    ],
    rulesUTS: [
      (v) => !!v || 'Nilai UTS wajib diisi',
    ],
    rulesUAS: [
      (v) => !!v || 'Nilai UAS wajib diisi',
    ],
  }),
  watch: {
    classRoom() {
      this.students = this.rootStudents.filter((it) => Number(it.kelas) === this.classRoom);
    },
    student() {
      this.checkButton();
    },
    ps1() {
      this.checkButton();
    },
    ps2() {
      this.checkButton();
    },
    ps3() {
      this.checkButton();
    },
    pr1() {
      this.checkButton();
    },
    pr2() {
      this.checkButton();
    },
    pr3() {
      this.checkButton();
    },
    uh1() {
      this.checkButton();
    },
    uh2() {
      this.checkButton();
    },
    uts() {
      this.checkButton();
    },
    uas() {
      this.checkButton();
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    async submitData() {
      const dataToSend = {
        nilai1: Number(this.ps1),
        nilai2: Number(this.ps2),
        nilai3: Number(this.ps3),
        nilai4: Number(this.pr1),
        nilai5: Number(this.pr2),
        nilai6: Number(this.pr3),
        nilai7: Number(this.uh1),
        nilai8: Number(this.uh2),
        nilai9: Number(this.uts),
        nilai10: Number(this.uas),
        idSiswa: Number(this.student),
        idMataPelajaran: Number(this.$store.getters.getMatpel),
      };
      await axios({
        method: 'post',
        url: 'http://localhost:8081/nilai/create',
        data: dataToSend,
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal menambahkan nilai baru. Silahkan coba lagi';
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
    async getData() {
      await axios({
        method: 'get',
        url: 'http://localhost:8081/murid/read',
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal mendapat daftar siswa. Silahkan coba lagi';
            alert(message);
            return;
          }
          this.rootStudents = res.data.data.data;
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
    checkButton() {
      if (this.student && this.ps1 && this.ps2 && this.ps3 && this.pr1
      && this.pr2 && this.pr3 && this.uh1 && this.uh2 && this.uts && this.uas) {
        this.isSaveButtonDisable = false;
      } else {
        this.isSaveButtonDisable = true;
      }
    },
  },
};
</script>
