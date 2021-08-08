<template>
    <v-container>
        <h1>{{ character.name }}</h1>

        <v-card class="overflow-hidden">
            <v-row>
                <v-col cols="12" lg="4" sm="4">
                    <v-img :src="character.image" class="ma-4"></v-img>
                </v-col>
                <v-col cols="12" lg="4" sm="4">
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <p>
                                        Species: <b>{{ character.species }}</b>
                                    </p>
                                </v-list-item-title>
                                <v-list-item-title>
                                    <p>
                                        Type: <b>{{ character.type || '-' }}</b>
                                    </p>
                                </v-list-item-title>
                                <v-list-item-title>
                                    <p>
                                        Gender: <b>{{ character.gender }}</b>
                                    </p>
                                </v-list-item-title>
                                <v-list-item-title>
                                    <p>
                                        Status: <b>{{ character.status }}</b>
                                    </p>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>

                <v-col cols="12" lg="4" sm="4">
                    <v-list>
                        <v-list-item two-line v-if="character.origin">
                            <v-list-item-content>
                                <v-list-item-title> Origin: </v-list-item-title>
                                <v-list-item-subtitle>
                                    <router-link :to="`/location/${character.origin.url.split('/').reverse()[0]}`">
                                        {{ character.origin.name }}
                                    </router-link>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item two-line v-if="character.location">
                            <v-list-item-content>
                                <v-list-item-title> Location: </v-list-item-title>
                                <v-list-item-subtitle>
                                    <router-link :to="`/location/${character.location.url.split('/').reverse()[0]}`">
                                        {{ character.location.name }}
                                    </router-link>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-card-actions>
                        <v-btn color="green lighten-2" @click="show = !show" block text>
                            <div>Episodes</div>
                            <v-spacer></v-spacer>
                            <div icon>
                                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </div>
                        </v-btn>
                    </v-card-actions>
                    <v-expand-transition>
                        <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                                <v-btn
                                    plain
                                    text
                                    v-for="episode in episodes"
                                    :key="episode.id"
                                    :to="`/episode/${episode.id}`"
                                >
                                    {{ episode.id }}
                                </v-btn>
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import api from '@/services/api';

export default {
    data() {
        return {
            id: this.$route.params.id,
            character: {},
            show: false,
        };
    },

    computed: {
        episodes() {
            return this.character.episode.map((item) => {
                return {
                    id: item.split('/').reverse()[0],
                    link: item,
                };
            });
        },
    },

    methods: {
        getCharactersById(id) {
            api.getCharactersById(id)
                .then((response) => {
                    this.character = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    created() {
        this.getCharactersById(this.id);
    },
};
</script>

<style lang="scss" scoped></style>
