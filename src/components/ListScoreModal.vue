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
          <v-toolbar-title>Submit Nilai</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="getList"
            >
              <v-icon>
                mdi-refresh
              </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container v-model="listMurid" color="primary">
          <v-row
            v-for="(person, i) in listMurid"
            :key="i"
            class="d-flex teacher-list"
          >
            <v-col :cols="2" class="align-self-center">
              <v-icon class="align-self-center">
                mdi-school
              </v-icon>
            </v-col>
            <v-col :cols="4" class="align-self-center">
              <p class="align-self-center">
                {{person.nama}}
              </p>
            </v-col>
            <v-col :cols="2" class="align-self-center">
              <p class="align-self-center text-center">
                {{returnClassName(person.kelas)}}
              </p>
            </v-col>
            <v-col :cols="2" class="align-self-center">
              <v-btn
                class="ma-2 align-self-center"
                color="primary"
                @click="submitData(person.id)"
              >
                Submit
                <v-icon right>mdi-check-all</v-icon>
              </v-btn>
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
  name: 'ListScoreModal',
  components: {
  },
  data: () => ({
    showModal: false,
    listMurid: null,
    disabled: false,
    dense: false,
    twoLine: false,
    threeLine: true,
    shaped: false,
    flat: false,
    subheader: false,
    inactive: false,
    subGroup: false,
    nav: false,
    rounded: false,
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
  mounted() {
    this.getList();
  },
  watch: {
  },
  methods: {
    async getList() {
      const dataToSend = {
        idMatpel: this.$store.getters.getMatpel,
      };
      await axios({
        method: 'post',
        url: 'http://54.160.24.52:8081/nilai/readBySubject',
        data: dataToSend,
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal mendapatkan daftar nilai siswa, silahkan coba lagi';
            alert(message);
            return;
          }
          // alert(JSON.stringify(res.data));
          const responsePayload = res.data;
          const dataFromResponse = responsePayload;
          this.listMurid = dataFromResponse.data;
          console.log('List murid', JSON.stringify(this.listMurid));
        })
        .catch((error) => {
          console.log(error);
          this.listMurid = null;
        });
    },
    async submitData(id) {
      const dataToSend = {
        idSiswa: id,
        idMataPelajaran: this.$store.getters.getMatpel,
      };
      await axios({
        method: 'post',
        data: dataToSend,
        url: 'http://54.160.24.52:8081/nilai/update/submit',
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal mengsubmit nilai, silahkan coba lagi';
            alert(message);
            return;
          }
          this.getList();
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
    doNothing() {
      // do nothing
    },
    async resyncParent() {
      await this.getList();
    },
    returnClassName(kelas) {
      let classRoom = this.classes.findIndex((o) => o.id === Number(kelas));
      classRoom = classRoom === -1 ? 0 : classRoom;
      return this.classes[classRoom].name;
    },
  },
};
</script>
<style lang="less" scoped>
  p {
    margin-bottom: 0;
  }
  .teacher-list {
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
