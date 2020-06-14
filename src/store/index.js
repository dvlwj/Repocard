import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: null,
      password: null,
      level: null,
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
  },
  getters: {
    getUsername: (state) => state.user.username,
    getPassword: (state) => state.user.password,
    getLevel: (state) => state.user.level,
  },
  modules: {
  },
});
