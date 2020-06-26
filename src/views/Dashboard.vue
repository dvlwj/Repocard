<template>
  <v-container fluid>
    <v-row class="fill-height">
      <p>Selamat Datang, <span class="username">{{username}}</span>.</p>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col cols="12" v-if="level == 1 && username.toLowerCase() == 'admin' && !siswa">
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
        <v-col cols="12" v-if="level == 1 && !siswa">
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
                  <v-btn text @click="showModalTeacherList">
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
        <v-col cols="12" v-if="!siswa">
          <v-card color="#FF8F00" dark tile>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline">
                  Siswa
                </v-card-title>
                <v-card-subtitle>Kelola Siswa disini</v-card-subtitle>
                <v-card-actions>
                  <v-btn text @click="showModalStudentCreate">
                    <v-icon>mdi-plus</v-icon>
                    Tambah
                  </v-btn>
                  <v-btn text @click="showModalStudentList">
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
        <v-col cols="12" v-if="level == 2 && !siswa">
          <v-card color="#009688" dark tile>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline">
                  Nilai
                </v-card-title>
                <v-card-subtitle>Kelola Nilai Siswa disini</v-card-subtitle>
                <v-card-actions>
                  <v-btn text @click="showModalScoreCreate()">
                    <v-icon>mdi-plus</v-icon>
                    Tambah
                  </v-btn>
                  <v-btn text @click="showModalScoreList()">
                    <v-icon>mdi-clipboard-list</v-icon>
                    Submit Nilai
                  </v-btn>
                </v-card-actions>
              </div>
              <v-icon class="ma-3" size="125" tile>
                mdi-fountain-pen-tip
              </v-icon>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="siswa">
          <v-card color="#FF7043" dark tile>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline">
                  Rapor
                </v-card-title>
                <v-card-subtitle>Cek Nilai Anda disini</v-card-subtitle>
                <v-card-actions>
                  <v-btn text @click="showModalScoreReport()">
                    <v-icon>mdi-book-open</v-icon>
                    Buka Rapor
                  </v-btn>
                </v-card-actions>
              </div>
              <v-icon class="ma-3" size="125" tile>
                mdi-bookshelf
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
    <ListTeacherModal ref="ListTeacherModal"></ListTeacherModal>
    <CreateStudentModal ref="CreateStudentModal"></CreateStudentModal>
    <ListStudentModal ref="ListStudentModal"></ListStudentModal>
    <CreateScoreModal ref="CreateScoreModal"></CreateScoreModal>
    <ListScoreModal ref="ListScoreModal"></ListScoreModal>
    <ListScoreReportModal ref="ListScoreReportModal"></ListScoreReportModal>
  </v-container>
</template>

<script>
import CreateAdminModal from '@/components/CreateAdminModal.vue';
import ListAdminModal from '@/components/ListAdminModal.vue';
import CreateTeacherModal from '@/components/CreateTeacherModal.vue';
import ListTeacherModal from '@/components/ListTeacherModal.vue';
import CreateStudentModal from '@/components/CreateStudentModal.vue';
import ListStudentModal from '@/components/ListStudentModal.vue';
import CreateScoreModal from '@/components/CreateScoreModal.vue';
import ListScoreModal from '@/components/ListScoreModal.vue';
import ListScoreReportModal from '@/components/ListScoreReportModal.vue';

export default {
  name: 'Dashboard',
  components: {
    CreateAdminModal,
    CreateTeacherModal,
    ListAdminModal,
    ListTeacherModal,
    CreateStudentModal,
    ListStudentModal,
    CreateScoreModal,
    ListScoreModal,
    ListScoreReportModal,
  },
  data: () => ({
    username: null,
    level: null,
    siswa: false,
  }),
  mounted() {
    this.getCredentials();
  },
  methods: {
    getCredentials() {
      this.level = this.$store.getters.getLevel;
      this.username = this.$store.getters.getUsername;
      this.siswa = this.$store.getters.getSiswa;
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
    showModalTeacherList() {
      this.$refs.ListTeacherModal.showModalFunction();
    },
    showModalTeacherCreate() {
      this.$refs.CreateTeacherModal.showModalFunction();
    },
    showModalStudentCreate() {
      this.$refs.CreateStudentModal.showModalFunction();
    },
    showModalStudentList() {
      this.$refs.ListStudentModal.showModalFunction();
    },
    showModalScoreCreate() {
      this.$refs.CreateScoreModal.showModalFunction();
    },
    showModalScoreReport() {
      this.$refs.ListScoreReportModal.showModalFunction();
    },
    showModalScoreList() {
      this.$refs.ListScoreModal.showModalFunction();
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
