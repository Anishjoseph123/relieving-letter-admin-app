import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    pAuth: false,
    pUserEmail: "",
    pCurrentUserObj: {},
  },
  getters: {
    GetAuth: (state) => {
      return state.pAuth || false;
    },

    GetUserEmail: (state) => {
      return state.pUserEmail;
    },
    GetUserObj: (state) => {
      return state.pCurrentUserObj;
    },
  },
  mutations: {
    SetAuth(state, status) {
      state.pAuth = status;
    },
    // To set current user email
    SetUserEmail(state, useremail) {
      state.pUserEmail = useremail;
    },

    SetUserObj(state, userObj) {
      state.pCurrentUserObj = userObj;
    },
  },
  actions: {},
  modules: {},
});
