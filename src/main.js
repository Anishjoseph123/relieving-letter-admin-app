import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import { Amplify } from "aws-amplify";

Vue.config.productionTip = false;
Amplify.configure({
  Auth: {
    userPoolId: "ap-south-1_mK51xjEdF",
    region: "ap-south-1",
    userPoolWebClientId: "7kk2mi6sc6lkfp93fg1o2destd",
  },
});
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
