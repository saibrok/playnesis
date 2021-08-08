<template>
    <v-container>
        <h1>Episodes</h1>

        <v-row align="center">
            <v-col cols="12" sm="6">
                <v-text-field v-model="filter" label="Search by Name" clearable outlined></v-text-field>
            </v-col>
        </v-row>

        <v-card>
            <v-tabs v-model="tab" grow>
                <v-tab v-for="number in numberOfSeasons" :key="number" @click="getEpisodes">
                    Season {{ number }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item v-for="number in numberOfSeasons" :key="number">
                    <v-list v-if="filteredEpisodes.length > 0">
                        <v-list-item-group>
                            <template v-for="episode in filteredEpisodes">
                                <v-list-item three-line :key="episode.id" @click="openEpisode(episode.id)">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="episode.name"></v-list-item-title>
                                        <v-list-item-subtitle
                                            class="text--primary"
                                            v-text="episode.episode"
                                        ></v-list-item-subtitle>
                                        <v-list-item-subtitle v-text="episode.date"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list-item-group>
                    </v-list>

                    <v-card-text v-else>
                        <v-row>
                            <v-col>
                                <div>The list of episodes is empty</div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
import api from '@/services/api';

export default {
    data() {
        return {
            tab: 0,
            numberOfSeasons: 4,
            allEpisodes: {},
            filter: '',
        };
    },

    computed: {
        episodeCode() {
            return `S0${this.tab + 1}`;
        },

        filteredEpisodes() {
            if (this.allEpisodes[this.episodeCode]) {
                return this.allEpisodes[this.episodeCode].filter((episode) =>
                    episode.name.toLowerCase().includes(this.filter ? this.filter.trim() : ''),
                );
            }

            return [];
        },
    },

    methods: {
        async getEpisodes() {
            await this.$nextTick();
            if (!this.allEpisodes[this.episodeCode]) {
                api.getEpisodesByFilter({
                    episodeName: null,
                    episodeCode: this.episodeCode,
                })
                    .then((response) => {
                        const currentEpisode = response.data.results.map((item) => {
                            return {
                                id: item.id,
                                name: item.name,
                                episode: item.episode,
                                date: item.air_date,
                            };
                        });
                        this.$set(this.allEpisodes, this.episodeCode, currentEpisode);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },

        openEpisode(id) {
            this.$router.push(`/episode/${id}`);
        },
    },

    created() {
        this.getEpisodes();
    },
};
</script>
