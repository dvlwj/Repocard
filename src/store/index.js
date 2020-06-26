import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: null,
      password: null,
      level: null,
      matpel: null,
    },
    siswa: null,
    siswa_id: null,
    siswa_kelas: null,
  },
  mutations: {
    ADD_USERNAME(state, data) {
      state.user.username = data;
    },
    ADD_PASSWORD(state, data) {
      state.user.password = data;
    },
    ADD_LEVEL(state, data) {
      state.user.level = data;
    },
    ADD_MATPEL(state, data) {
      state.user.matpel = data;
    },
    ADD_SISWA(state, data) {
      state.siswa = data;
    },
    ADD_SISWA_ID(state, data) {
      state.siswa_id = data;
    },
    ADD_SISWA_KELAS(state, data) {
      state.siswa_kelas = data;
    },
  },
  actions: {
    setUsername({ commit }, data) {
      commit('ADD_USERNAME', data);
    },
    setPassword({ commit }, data) {
      commit('ADD_PASSWORD', data);
    },
    setLevel({ commit }, data) {
      commit('ADD_LEVEL', data);
    },
    setMatpel({ commit }, data) {
      commit('ADD_MATPEL', data);
    },
    setSiswa({ commit }, data) {
      commit('ADD_SISWA', data);
    },
    setSiswaID({ commit }, data) {
      commit('ADD_SISWA_ID', data);
    },
    setSiswaKelas({ commit }, data) {
      commit('ADD_SISWA_KELAS', data);
    },
  },
  getters: {
    getUsername: (state) => state.user.username,
    getPassword: (state) => state.user.password,
    getLevel: (state) => state.user.level,
    getMatpel: (state) => state.user.matpel,
    getSiswa: (state) => state.siswa,
    getSiswaID: (state) => state.siswa_id,
    getSiswaKelas: (state) => state.siswa_kelas,
  },
  modules: {
  },
});
