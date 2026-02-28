<template>
  <div>
    <v-card flat height="auto" width="100%">
      <v-toolbar dense flat>
        <v-toolbar-title> Users </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-row dense>
          <v-col cols="12" lg="4" md="4" sm="6" xl="6" xs="6">
            <v-text-field dense label="Search Users" outlined class="mt-9">
              <template v-slot:prepend-inner>
                <v-icon small class="mt-1 mr-1" color="black"
                  >mdi-magnify</v-icon
                >
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-card-text>
        <v-data-table
          dense
          fixed-header
          :headers="userListHeaders"
          :items="usersList"
          :hide-default-footer="usersList.length == 0"
          height="height"
        ></v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    height: 0,
    userListHeaders: [
      { text: "User ID", value: "userId" },
      { text: "User Name", value: "userName" },
    ],
    usersList: [
      { userId: "12122", userName: "Anish" },
      { userId: "45665", userName: "Sashanka" },
      { userId: "45265", userName: "Darshan" },
      { userId: "45965", userName: "Sachin" },
      { userId: "45365", userName: "Niranjan" },
      { userId: "45615", userName: "Nanthagopal" },
    ],
  }),
};
</script>

<style></style>
