<template>
  <v-app>
    <v-app-bar app class="red lighten-1 text-center">
      <h3 class="white--text">Aplikasi Rapor</h3>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
    <v-footer app class="red lighten-1 text-center">
      <v-card-text class="white--text">
        &copy; {{ new Date().getFullYear() }} — <strong>Kelvin</strong>
      </v-card-text>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
  }),
};
</script>
