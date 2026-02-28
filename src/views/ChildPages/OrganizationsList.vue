<template>
  <div>
    <v-card class="elevation-0">
      <IssueRelievingLetterDialog
        :issueRelievingLetterDialog="issueRelievingLetterDialog"
        @clicked="IssueRelievingLetterDialogEmit"
        :storeObj="storeObj"
      />
      <v-toolbar class="elevation-0">
        <div
          :class="
            $vuetify.breakpoint.xs ? 'font-weight-bold' : 'text-uppercase '
          "
          class="subtitle-2"
        >
          Organizations
        </div>
        <v-spacer></v-spacer>
        <v-col cols="12" lg="4" md="4" sm="6" xl="4" xs="6">
          <v-text-field dense label="Search" outlined class="mt-9">
            <template v-slot:prepend-inner>
              <v-icon small color="black" class="mt-1 mr-1">mdi-magnify</v-icon>
            </template></v-text-field
          >
        </v-col>
        <v-btn
          depressed
          dark
          color="#119489"
          class="mt-2 pa-2"
          @click="issueRelievingLetterDialog = true"
        >
          <v-icon small>mdi-plus</v-icon> issue relieving letter</v-btn
        >
      </v-toolbar>
      <v-card-text>
        <v-data-table
          fixed-header
          dense
          :headers="organizationHeaders"
          :items="organizationsList"
          :hide-default-footer="organizationsList.length == 0"
          height="height"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon color="success" depressed @click="view(item)">
              <v-icon small>mdi-eye</v-icon></v-btn
            >
            <v-btn icon color="teal" depressed>
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon depressed color="error">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import IssueRelievingLetterDialog from "@/components/IssueRelievingLetter/IssueRelievingLetterDialog.vue";
export default {
  components: {
    IssueRelievingLetterDialog,
  },
  data: () => ({
    issueRelievingLetterDialog: false,
    storeObj: {},
    height: 0,
    organizationHeaders: [
      { text: "Organization ID", value: "orgId" },
      {
        text: "Organization Name",
        value: "orgName",
      },
      { text: "Organization Location", value: "orgLocation" },
      { text: "Actions", value: "actions" },
    ],
    organizationsList: [
      { orgId: "12548", orgName: "Mobil80", orgLocation: "Vidyaranyapura" },
      { orgId: "12558", orgName: "Accenture", orgLocation: "Hebbal" },
      { orgId: "12528", orgName: "Prezence", orgLocation: "BTM" },
      { orgId: "12148", orgName: "Wrktop", orgLocation: "HSR" },
      { orgId: "32548", orgName: "Stichh", orgLocation: "KRP" },
      { orgId: "13548", orgName: "Skilter", orgLocation: "CST" },
    ],
  }),
  mounted() {
    this.height = window.innerHeight - 220;
  },
  methods: {
    IssueRelievingLetterDialogEmit() {
      this.issueRelievingLetterDialog = false;
    },
  },
};
</script>

<style scoped>
.v-data-table tr td {
  white-space: nowrap;
}
</style>
