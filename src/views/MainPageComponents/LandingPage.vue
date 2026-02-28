<template>
  <v-app>
    <OverLay :overlay="overlay" />
    <v-app-bar dense app clipped-left color="white" elevation="1">
      <v-app-bar-nav-icon
        color="#000"
        v-if="
          $vuetify.breakpoint.name == 'sm' ||
          $vuetify.breakpoint.name == 'md' ||
          $vuetify.breakpoint.name == 'xs'
        "
        @click="navDraw = !navDraw"
      ></v-app-bar-nav-icon>
      <div class="d-flex">
        <v-img
          src="../../assets/Relieving Letter Logo.png"
          height="40"
          width="40"
          contain
          :class="$vuetify.breakpoint.xs ? 'mx-auto ml-n2' : 'ml-2'"
        ></v-img>
        <h3
          :class="
            $vuetify.breakpoint.xs
              ? 'mt-4 ml-1 subtitle-2 font-weight-bold'
              : 'ml-2 mt-1'
          "
        >
          Relieving Letter - BMS
        </h3>
      </div>
      <v-spacer />
      <span
        :class="
          $vuetify.breakpoint.xs
            ? 'caption mb-2 mr-n2 primary--text'
            : 'subtitle-2'
        "
      >
        {{ $store.getters.GetUserEmail }}
      </span>

      <v-tooltip bottom color="#474747">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            depressed
            v-bind="attrs"
            v-on="on"
            color="error"
            :class="$vuetify.breakpoint.xs ? 'mb-2 mr-n6' : ''"
            @click="logoutUser"
          >
            <v-icon dark>mdi-exit-to-app</v-icon>
          </v-btn>
        </template>
        <span class="font-weight-bold font-italic">Logout?</span>
      </v-tooltip>
    </v-app-bar>
    <v-navigation-drawer
      v-model="navDraw"
      app
      clipped
      width="185px"
      color="#119489"
      class="pa-2 pr-2"
    >
      <v-list dark dense rounded>
        <v-list-group
          dark
          link
          v-for="(item, idx) in RouterList"
          :key="idx"
          :append-icon="item.has_child_routes == true ? 'mdi-chevron-down' : ''"
          @click="
            $route.name != item.MenuRoute && item.has_child_routes == false
              ? $router.push(item.MenuRoute)
              : ''
          "
          v-model="item.active"
          :active-class="
            item.has_child_routes == false
              ? 'black white--text'
              : ' white--text '
          "
        >
          <template v-slot:activator>
            <v-list-item-action class="mr-0 ml-n1">
              <v-icon small class="mr-1 mb-1">{{ item.MenuICon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content :to="item.MenuRoute" link>
              <v-list-item-title>
                {{ !item.has_child_routes ? item.MenuName : item.MenuName }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item-group dark link>
            <v-list-item
              dark
              v-for="(sitem, i) in item.SubMenu"
              :key="i"
              link
              :to="sitem.MenuRoute"
            >
              <v-icon color="white" class="mx-2" small>{{
                sitem.MenuICon
              }}</v-icon>
              <v-list-item-title class="white--text mt-1"
                >{{ sitem.MenuName }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import RouterList from "@/JsonFiles/RouterList.json";
import OverLay from "@/components/Extras/OverLay";
// import SnackBar from '@/components/Extras/SnackBar'
// import { GetCurrentUser } from "@/mixins/GetCurrentUser.js";
// import LogoutDialog from "../../components/LogoutDialog/LogoutDialog.vue";

export default {
  components: {
    OverLay,
  },
  //   mixins: [GetCurrentUser],
  data: () => ({
    overlay: false,
    navDraw: true,
    RouterList: [],
  }),
  watch: {
    "$route.name"() {
      this.overlay = false;
    },
  },
  mounted() {
    this.RouterList = RouterList;
  },
  methods: {
    logoutUser() {
      this.$router.push("/");
    },
  },
};
</script>
