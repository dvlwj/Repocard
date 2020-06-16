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
          <v-toolbar-title>Daftar Murid</v-toolbar-title>
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
                cols="2"
                sm="2"
                class="ma-2 align-self-center"
                color="success"
                @click="
                  showUpdateDataModal(person.id, person.nama, person.password, person.kelas)
                "
              >
                Detil
                <v-icon right>mdi-account-details</v-icon>
              </v-btn>
            </v-col>
            <v-col :cols="2" class="align-self-center">
              <v-btn
                class="ma-2 align-self-center"
                color="error"
                @click="deleteData(person.nama)"
                v-if="person.id !== 1"
              >
                Hapus
                <v-icon right>mdi-delete-forever</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <UpdateStudentModal ref="UpdateStudentModal"></UpdateStudentModal>
  </v-row>
</template>

<script>
import axios from 'axios';
import UpdateStudentModal from '@/components/UpdateStudentModal.vue';

export default {
  name: 'ListStudentModal',
  components: {
    UpdateStudentModal,
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
      await axios({
        method: 'get',
        url: 'http://localhost:8081/murid/read',
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal mendapatkan daftar guru, silahkan coba lagi';
            alert(message);
            return;
          }
          const responsePayload = res.data;
          const dataFromResponse = responsePayload.data;
          this.listMurid = dataFromResponse.data;
        })
        .catch((error) => {
          alert(error);
        });
    },
    async showUpdateDataModal(id, nama, password, classRoom) {
      this.$refs.UpdateStudentModal.showModalFunction(id, nama, password, classRoom);
    },
    async deleteData(namaData) {
      const dataToSend = {
        nama: namaData,
      };
      await axios({
        method: 'post',
        data: dataToSend,
        url: 'http://localhost:8081/guru/delete',
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal menghapus guru, silahkan coba lagi';
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
