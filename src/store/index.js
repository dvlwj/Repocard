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
  },
  getters: {
    getUsername: (state) => state.user.username,
    getPassword: (state) => state.user.password,
    getLevel: (state) => state.user.level,
    getMatpel: (state) => state.user.matpel,
  },
  modules: {
  },
});
