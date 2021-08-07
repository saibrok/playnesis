<template>
  <v-app>
    <div class="toolbar-wrapper">
      <v-toolbar app>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">
            {{ appTitle }}
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            flat
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path"
          >
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appTitle: "The Rick and Morty API",
      menuItems: [
        { title: "Episodes", path: "/episodes", icon: "video_library" },
        { title: "Characters", path: "/characters", icon: "face" },
        { title: "Locations", path: "/locations", icon: "location_on" },
      ],
    };
  },
};
</script>

<style></style>
