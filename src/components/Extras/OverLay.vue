<template>
  <div>
    <v-overlay :value="overlay" opacity="0.2">
      <v-progress-circular indeterminate color="primary" size="120"
        ><div>Loading</div></v-progress-circular
      >
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: {
    overlay: Boolean,
  },
};
</script>

<style></style>
