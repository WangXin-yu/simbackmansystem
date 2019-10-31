import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    article_id: 1,
    article:[],
    userInfo:{username:'', password:''},
  },
  mutations: {},
  actions: {},
  modules: {}
});
