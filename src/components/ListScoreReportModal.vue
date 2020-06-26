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
        <v-toolbar dark color="#FF7043" tile>
          <v-btn icon dark @click="hideModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Rapor</v-toolbar-title>
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
        <v-container fluid v-model="listReport" color="primary" class="report-page">
            <p class="student-name">Nama: {{this.$store.getters.getUsername}}</p>
            <p class="student-class">
              Kelas:
              {{returnClassName(parseInt(this.$store.getters.getSiswaKelas))}}
            </p>
          <v-simple-table
            :fixed-header="true"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">No</th>
                  <th class="text-center">Nama</th>
                  <th class="text-center">PS1</th>
                  <th class="text-center">PS2</th>
                  <th class="text-center">PS3</th>
                  <th class="text-center bold">PS</th>
                  <th class="text-center">PR1</th>
                  <th class="text-center">PR2</th>
                  <th class="text-center">PR3</th>
                  <th class="text-center bold">PR</th>
                  <th class="text-center">UH1</th>
                  <th class="text-center">UH2</th>
                  <th class="text-center bold">UH</th>
                  <th class="text-center">UTS</th>
                  <th class="text-center">UAS</th>
                  <th class="text-center bold">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(subject, i) in listReport"
                  :key="i"
                >
                  <td class="text-center">{{i+1}}</td>
                  <td class="text-center bold">
                    {{returnSubjectName(subject.id_mata_pelajaran)}}
                  </td>
                  <td class="text-center">{{subject.nilai1}}</td>
                  <td class="text-center">{{subject.nilai2}}</td>
                  <td class="text-center">{{subject.nilai3}}</td>
                  <td class="text-center bold">
                    {{((subject.nilai1+subject.nilai2+subject.nilai3)/3).toFixed(2)}}
                  </td>
                  <td class="text-center">{{subject.nilai4}}</td>
                  <td class="text-center">{{subject.nilai5}}</td>
                  <td class="text-center">{{subject.nilai6}}</td>
                  <td class="text-center bold">
                    {{((subject.nilai4+subject.nilai5+subject.nilai6)/3).toFixed(2)}}
                  </td>
                  <td class="text-center">{{subject.nilai7}}</td>
                  <td class="text-center">{{subject.nilai8}}</td>
                  <td class="text-center bold">
                    {{((subject.nilai7+subject.nilai8)/2).toFixed(2)}}
                  </td>
                  <td class="text-center">{{subject.nilai9}}</td>
                  <td class="text-center">{{subject.nilai10}}</td>
                  <td class="text-center bold">
                    {{
                      (
                        (
                          (
                            (
                              ((subject.nilai1+subject.nilai2+subject.nilai3)/3)
                              +
                              ((subject.nilai4+subject.nilai5+subject.nilai6)/3)
                              +
                              ((subject.nilai7+subject.nilai8)/2)
                            )/3
                          )
                          +subject.nilai9
                          +subject.nilai10
                        )/3
                      ).toFixed(2)
                    }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListScoreReportModal',
  components: {
  },
  data: () => ({
    showModal: false,
    listReport: null,
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
  mounted() {
    this.getList();
  },
  watch: {
  },
  methods: {
    async getList() {
      const dataToSend = {
        idSiswa: this.$store.getters.getSiswaID,
      };
      await axios({
        method: 'post',
        url: 'http://54.160.24.52:8081/nilai/readByStudent',
        data: dataToSend,
        timeout: 10000,
      })
        .then((res) => {
          if (res.status !== 200) {
            const message = 'Gagal mendapatkan nilai rapor siswa, silahkan coba lagi';
            alert(message);
            return;
          }
          // alert(JSON.stringify(res.data));
          const responsePayload = res.data;
          const dataFromResponse = responsePayload;
          this.listReport = dataFromResponse.data;
          console.log('list report', JSON.stringify(this.listReport));
        })
        .catch((error) => {
          console.log(error);
          this.listReport = null;
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
    returnSubjectName(subject) {
      let subjectName = this.subjects.findIndex((o) => o.id === Number(subject));
      subjectName = subjectName === -1 ? 0 : subjectName;
      return this.subjects[subjectName].name;
    },
  },
};
</script>
<style lang="less" scoped>
  .bold {
    font-weight: bold;
  }
  .report-page {
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    border: 3px solid #FF7043;
    border-radius: 0.25em;
  }
  .student-name {
    font-weight: bold;
    text-transform: capitalize;
  }
  .teacher-list {
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
