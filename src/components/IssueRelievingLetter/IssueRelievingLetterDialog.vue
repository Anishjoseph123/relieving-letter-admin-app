<template>
  <div>
    <SnackBar :SnackBarComponent="SnackBarComponent" v-if="renderComp" />
    <v-dialog
      :value="issueRelievingLetterDialog"
      persistent
      max-width="400"
      :hide-overlay="false"
      :retain-focus="true"
    >
      <v-card elevation="0">
        <v-toolbar dense color="success" dark class="elevation-0">
          <v-toolbar-title>
            <v-icon class="mr-1" small>mdi-information</v-icon>
            Issue Relieving Letter</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogissueRelievingLetterEmit((Toggle = 1))">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-row dense no-gutters>
            <v-col cols="12" lg="12" md="12" sm="12" xl="12" xs="12">
              <v-form class="mt-3">
                <v-row dense>
                  <v-col cols="12" lg="12" md="12" sm="12" xl="12" xs="12">
                    <v-text-field
                      dense
                      label="Employee ID*"
                      outlined
                      maxlength="10"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="12" md="12" sm="12" xl="12" xs="12">
                    <v-text-field
                      dense
                      label="Employee Name*"
                      outlined
                      maxlength="30"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="12" md="12" sm="12" xl="12" xs="12">
                    <v-dialog
                      ref="dialog1"
                      v-model="modal"
                      :return-value.sync="fromDate"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          outlined
                          dense
                          readonly
                          v-model="fromDate"
                          label="Worked From*"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <template v-slot:prepend-inner>
                            <v-icon small color="black" class="mt-1"
                              >mdi-calendar</v-icon
                            >
                          </template>
                        </v-text-field>
                      </template>
                      <v-date-picker
                        v-model="fromDate"
                        scrollable
                        color="primary"
                        :max="new Date().toISOString().substring(0, 10)"
                        @select="validateDates"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="error" @click="modal = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog1.save(fromDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="12" lg="12" md="12" sm="12" xl="12" xs="12">
                    <v-dialog
                      ref="dialog"
                      v-model="modal2"
                      :return-value.sync="toDate"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          outlined
                          dense
                          v-model="toDate"
                          label="Worked Till*"
                          v-bind="attrs"
                          v-on="on"
                          readonly
                        >
                          <template v-slot:prepend-inner>
                            <v-icon small color="black" class="mt-1"
                              >mdi-calendar</v-icon
                            >
                          </template></v-text-field
                        >
                      </template>
                      <v-date-picker
                        v-model="toDate"
                        scrollable
                        :max="new Date().toISOString().substring(0, 10)"
                        color="primary"
                        @select="validateDates"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="error" @click="modal2 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog.save(toDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pt-0 pb-4 mr-2 mt-n8">
          <v-spacer></v-spacer>
          <v-btn
            dark
            color="#119489"
            depressed
            outlined
            @click="dialogissueRelievingLetterEmit"
          >
            <v-icon small class="mr-1">mdi-close</v-icon>
            close</v-btn
          >
          <v-btn dark color="success" depressed>
            <v-icon small class="mr-1">mdi-check</v-icon>
            submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SnackBar from "../Extras/SnackBar.vue";
export default {
  components: {
    SnackBar,
  },
  props: {
    issueRelievingLetterDialog: Boolean,
    storeObj: Object,
  },
  data: () => ({
    modal: false,
    modal2: false,
    fromDate: "",
    toDate: "",
    SnackBarComponent: {},
    renderComp: true,
  }),
  methods: {
    dialogissueRelievingLetterEmit(Toggle) {
      this.$emit("clicked", Toggle);
    },
    validateDates() {
      if (this.toDate && this.fromDate && this.toDate <= this.fromDate) {
        this.renderComp = true;
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "success",
          Top: true,
          timeout: 3000,
          SnackbarText: "Success.",
        };
      } else {
        this.renderComp = true;
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "success",
          Top: true,
          timeout: 3000,
          SnackbarText: "Success.",
        };
      }
    },
  },
};
</script>

<style></style>
