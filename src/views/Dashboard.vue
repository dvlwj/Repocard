<template>
  <v-container fluid>
    <v-row class="fill-height">
      <p>Selamat Datang, <span class="username">{{username}}</span>.</p>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col cols="12" v-if="level == 1 && username.toLowerCase() == 'admin'">
          <v-card color="#1E88E5" dark tile>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline">
                  Admin
                </v-card-title>
                <v-card-subtitle>Kelola Admin disini</v-card-subtitle>
                <v-card-actions>
                  <v-btn text @click="showModalAdminCreate">
                    <v-icon>mdi-plus</v-icon>
                    Tambah
                  </v-btn>
                  <v-btn text @click="showModalAdminList">
                    <v-icon>mdi-clipboard-list</v-icon>
                    Lihat Daftar
                  </v-btn>
                </v-card-actions>
              </div>
              <v-icon class="ma-3" size="125" tile>
                mdi-account-tie
              </v-icon>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="level == 1">
          <v-card color="#43A047" dark tile>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline">
                  Guru
                </v-card-title>
                <v-card-subtitle>Kelola Guru disini</v-card-subtitle>
                <v-card-actions>
                  <v-btn text @click="showModalTeacherCreate">
                    <v-icon>mdi-plus</v-icon>
                    Tambah
                  </v-btn>
                  <v-btn text>
                    <v-icon>mdi-clipboard-list</v-icon>
                    Lihat Daftar
                  </v-btn>
                </v-card-actions>
              </div>
              <v-icon class="ma-3" size="125" tile>
                mdi-teach
              </v-icon>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card color="#FF8F00" dark tile>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline">
                  Siswa
                </v-card-title>
                <v-card-subtitle>Kelola Siswa disini</v-card-subtitle>
                <v-card-actions>
                  <v-btn text>
                    <v-icon>mdi-plus</v-icon>
                    Tambah
                  </v-btn>
                  <v-btn text>
                    <v-icon>mdi-clipboard-list</v-icon>
                    Lihat Daftar
                  </v-btn>
                </v-card-actions>
              </div>
              <v-icon class="ma-3" size="125" tile>
                mdi-school
              </v-icon>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-btn class="error" block dark x-large @click="logout()">
            <v-icon>mdi-logout-variant</v-icon>
            Keluar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <CreateAdminModal ref="CreateAdminModal"></CreateAdminModal>
    <ListAdminModal ref="ListAdminModal"></ListAdminModal>
    <CreateTeacherModal ref="CreateTeacherModal"></CreateTeacherModal>
  </v-container>
</template>

<script>
import CreateAdminModal from '@/components/CreateAdminModal.vue';
import ListAdminModal from '@/components/ListAdminModal.vue';
import CreateTeacherModal from '@/components/CreateTeacherModal.vue';

export default {
  name: 'Dashboard',
  components: {
    CreateAdminModal,
    CreateTeacherModal,
    ListAdminModal,
  },
  data: () => ({
    username: null,
    level: null,
  }),
  mounted() {
    this.getCredentials();
  },
  methods: {
    getCredentials() {
      this.level = this.$store.getters.getLevel;
      this.username = this.$store.getters.getUsername;
    },
    logout() {
      this.level = null;
      this.username = null;
      this.$router.push('/');
    },
    showModalAdminCreate() {
      this.$refs.CreateAdminModal.showModalFunction();
    },
    showModalAdminList() {
      this.$refs.ListAdminModal.showModalFunction();
    },
    showModalTeacherCreate() {
      this.$refs.CreateTeacherModal.showModalFunction();
    },
    async resyncParent(modalName) {
      await this.getList();
      if (modalName === 'CreateTeacherModal') {
        this.$refs.CreateTeacherModal.hideModal();
      } else if (modalName === 'DeleteDataModal') {
        this.$refs.DetailsModal.hideModal();
      } else if (modalName === 'UpdateDataModal') {
        this.$refs.DetailsModal.hideModal();
      }
    },
  },
};
</script>

<style>
  v-main{
    padding: 4rem 0 0 0;
  }
  .username {
    font-weight: bold;
    text-transform: capitalize;
  }
</style>
