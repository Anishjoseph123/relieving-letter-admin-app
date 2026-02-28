<template>
  <div>
    <SnackBar :SnackBarComponent="SnackBarComponent" />
    <v-card flat width="100%" class="main_card">
      <v-toolbar
        dense
        elevation="0"
        height="auto"
        width="100%"
        dark
        color="#119489"
        class="pa-2"
      >
        <v-toolbar-title>
          <v-img
            height="50"
            width="50"
            src="../../assets/Relieving Letter Logo.png"
            style="border-radius: 50%"
          ></v-img>
        </v-toolbar-title>
        <span class="ml-2 font-weight-bold">Relieving Letter.com</span>
      </v-toolbar>
      <v-row dense align="center" justify="center">
        <v-col cols="12" lg="12" md="12" sm="12" xl="12" xs="12">
          <v-row dense align="center" justify="center">
            <!-- <v-col cols="12" lg="4" md="4" sm="12" xl="4" xs="12">
              <v-card flat height="auto" max-width="auto">
                <v-img
                  alt="img"
                  src="https://cdn.pixabay.com/photo/2016/03/31/18/26/computer-1294359_1280.png"
                  height="400"
                  width="700"
                  class="mt-12 ml-4"
                ></v-img>
              </v-card>
            </v-col> -->
            <v-col cols="12" lg="8" md="8" sm="12" xl="8" xs="12">
              <v-card
                height="auto"
                max-width="444"
                class="mx-auto pa-2"
                rounded="xl"
                style="margin-top: 150px"
              >
                <v-img
                  src="../../assets/Relieving Letter Logo.png"
                  alt="img"
                  height="100"
                  width="100"
                  class="mx-auto"
                  contain
                ></v-img>
                <v-card-title>
                  <v-row class="text-center">
                    <v-col cols="12" lg="12" md="12" sm="12" xl="12" xs="12">
                      <span class="text-uppercase subtitle-1"
                        >bms - sign in</span
                      >
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-row dense align="center" justify="center">
                      <v-col cols="12" lg="12" md="12" sm="12" xl="12" xs="12">
                        <!-- <v-col
                          cols="12"
                          lg="12"
                          md="12"
                          sm="12"
                          xl="12"
                          xs="12"
                        > -->
                        <v-text-field
                          dense
                          label="Email ID*"
                          outlined
                          rounded
                          color="#000"
                          :rules="rules.email"
                          v-model="userEmail"
                        >
                          <template v-slot:prepend-inner>
                            <v-icon color="black">mdi-email</v-icon>
                          </template>
                        </v-text-field>
                        <!-- </v-col> -->
                      </v-col>
                      <div
                        class="ma-auto"
                        style="max-width: 400px"
                        v-if="otpVisible == 1"
                      >
                        <v-otp-input v-model="otpInput"></v-otp-input>
                        <v-btn
                          text
                          small
                          color="teal"
                          depressed
                          dark
                          @click="validate_sign_in('otp')"
                        >
                          <!-- <v-icon> mdi-refresh</v-icon> -->
                          Resend OTP
                        </v-btn>
                      </div>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-layout align-center justify-center>
                    <v-btn
                      block
                      rounded
                      dark
                      v-if="otpVisible == 0"
                      class="mt-n4"
                      :loading="loading"
                      @click="validate_sign_in('otp')"
                      >Send Otp</v-btn
                    >
                    <v-btn
                      block
                      rounded
                      dark
                      v-if="otpVisible == 1"
                      class="mt-4"
                      :loading="loading1"
                      @click="validate_sign_in('login')"
                      >Login</v-btn
                    >
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import SnackBar from "@/components/Extras/SnackBar";

import { Auth } from "aws-amplify";
export default {
  components: {
    SnackBar,
  },
  data: () => ({
    userDetails: {},
    loading1: false,
    SnackBarComponent: {},
    // renderComp: true,
    otpVisible: 0,
    loading: false,
    userEmail: "",
    otpInput: "",
    click: false,
    rules: {
      email: [
        (v) => !!v || "E-mail is required.",
        (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail";
        },
      ],
    },
  }),
  methods: {
    async login_with_otp() {
      this.loading1 = true;

      try {
        await Auth.sendCustomChallengeAnswer(this.userDetails, this.otpInput);
        await Auth.currentAuthenticatedUser()
          .then(() => {
            this.$store.commit("SetAuth", true);
            this.$store.commit("SetUserEmail", this.userEmail);
            // this.$nextTick(() => {
            this.SnackBarComponent = {
              SnackbarVmodel: true,
              SnackbarColor: "success",
              Top: true,
              timeout: 3000,
              renderComp: true,
              SnackbarText: "Logged In Successfully.",
            };
            // this.renderComp = true;
            // });
            setTimeout(() => {
              this.$router.push("/Organizations");
              this.loading1 = false;
            }, 1000);
          })
          .catch(() => {
            this.SnackBarComponent = {
              SnackbarVmodel: true,
              SnackbarColor: "red",
              SnackbarText: "Invalid OTP,",
              renderComp: true,
              timeout: 5000,
              Top: true,
            };
            this.loading1 = false;
          });
      } catch (error) {
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "red",
          SnackbarText: error.message,
          renderComp: true,
          timeout: 5000,
          Top: true,
        };
        this.loading1 = false;
      }
    },
    validate_sign_in(val) {
      var valid = true;

      if (this.userEmail == "") {
        valid = false;
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "red",
          SnackbarText: "Email  Is Required",
          renderComp: true,
          timeout: 5000,
          Top: true,
        };
      }
      if (valid) {
        if (val == "otp") {
          this.generate_otp();
        } else {
          this.login_with_otp();
        }
      }
    },
    async generate_otp() {
      this.loading = true;
      try {
        const user = await Auth.signIn(this.userEmail)
          .then((user) => {
            this.userDetails = user;
            this.SnackBarComponent = {
              SnackbarVmodel: true,
              SnackbarColor: "green",
              SnackbarText: "OTP Sent Successfully.",
              timeout: 5000,
              renderComp: true,
              Top: true,
            };
            this.otpVisible = 1;
            this.loading = false;
          })
          .catch(() => {
            this.SnackBarComponent = {
              SnackbarVmodel: true,
              SnackbarColor: "red",
              SnackbarText: "Invalid Email",
              timeout: 5000,
              renderComp: true,
              Top: true,
            };
            this.loading1 = false;
            console.log("User", user);
          });
      } catch (error) {
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "red",
          SnackbarText: error.message,
          timeout: 5000,
          renderComp: true,
          Top: true,
        };
        this.loading1 = false;
      }
    },
  },
};
</script>

<style>
.main_card {
  /* background-image: url("../../assets/Relieving\ Letter\ Logo.png"); */
  /* background: linear-gradient(to right, #119489, #efefef) !important; */
  height: 100vh;
  width: 100%;
  /* background-position: left;
  background-repeat: no-repeat; */
}
</style>
