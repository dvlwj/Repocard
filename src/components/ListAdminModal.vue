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
          <v-toolbar-title>Daftar admin</v-toolbar-title>
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
        <v-container>
          <v-list>
            <v-container v-model="listAdmin" color="primary">
              <v-row
                v-for="(person, i) in listAdmin"
                :key="i"
                class="d-flex admin-list"
              >
                <v-col :cols="2" class="align-self-center">
                  <v-icon class="align-self-center">
                    {{
                      person.id === 1 ?
                      'mdi-account-tie' : 'mdi-account'
                    }}
                  </v-icon>
                </v-col>
                <v-col :cols="6" class="align-self-center">
                  <p class="align-self-center">
                    {{person.username}}
                  </p>
                </v-col>
                <v-col :cols="2" class="align-self-center">
                  <v-btn
                    cols="2"
                    sm="2"
                    class="ma-2 align-self-center"
                    color="success"
                    @click="showUpdateDataModal(person.id, person.username, person.password)"
                  >
                    Detil
                    <v-icon right>mdi-account-details</v-icon>
                  </v-btn>
                </v-col>
                <v-col :cols="2" class="align-self-center">
                  <v-btn
                    class="ma-2 align-self-center"
                    color="error"
                    @click="deleteData(person.username)"
                    v-if="person.id !== 1"
                  >
                    Hapus
                    <v-icon right>mdi-delete-forever</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-list>
        </v-container>
        </v-card>
    </v-dialog>
    <UpdateAdminModal ref="UpdateAdminModal"></UpdateAdminModal>
  </v-row>
</template>

<script>
import axios from 'axios';
import UpdateAdminModal from '@/components/UpdateAdminModal.vue';

export default {
  name: 'ListAdminModal',
  components: {
    UpdateAdminModal,
  },
  data: () => ({
    showModal: false,
    listAdmin: null,
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
        url: 'http://54.160.24.52:8081/admin/read',
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal mendapatkan daftar admin, silahkan coba lagi';
            alert(message);
            return;
          }
          const responsePayload = res.data;
          const dataFromResponse = responsePayload.data;
          this.listAdmin = dataFromResponse.data;
        })
        .catch((error) => {
          alert(error);
        });
    },
    async showUpdateDataModal(id, username, password) {
      this.$refs.UpdateAdminModal.showModalFunction(id, username, password);
    },
    async deleteData(usernameData) {
      const dataToSend = {
        username: usernameData,
      };
      await axios({
        method: 'post',
        data: dataToSend,
        url: 'http://54.160.24.52:8081/admin/delete',
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal menghapus admin, silahkan coba lagi';
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
  },
};
</script>
<style lang="less" scoped>
  .v-list-item {
    padding-bottom: 1em;
    margin-bottom: 1em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
