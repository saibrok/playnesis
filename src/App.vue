<template>
    <v-app>
        <div class="toolbar-wrapper">
            <v-app-bar app>
                <v-toolbar-title>
                    <v-btn text to="/">
                        {{ appTitle }}
                    </v-btn>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                        text
                        v-for="item in menuItems"
                        :key="item.title"
                        :to="item.path"
                    >
                        <v-icon left dark>{{ item.icon }}</v-icon>
                        {{ item.title }}
                    </v-btn>
                </v-toolbar-items>
            </v-app-bar>
        </div>

        <v-main>
            <keep-alive>
                <router-view :key="$route.path"></router-view>
            </keep-alive>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            appTitle: 'The Rick and Morty API',
            menuItems: [
                { title: 'Episodes', path: '/episodes', icon: 'video_library' },
                { title: 'Characters', path: '/characters', icon: 'face' },
                { title: 'Locations', path: '/locations', icon: 'location_on' },
            ],
        };
    },
};
</script>

<style></style>
