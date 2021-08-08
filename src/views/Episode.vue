<template>
    <v-container>
        <v-card>
            <v-card-title>
                <div class="text-h4 text--primary">{{ name }}</div>
            </v-card-title>
            <v-card-text>
                <div>
                    Season: <b>{{ season }}</b> Episode: <b>{{ episode }}</b>
                </div>
                <div>
                    Sequence number of the episode: <b>{{ id }}</b>
                </div>
                <div>
                    Date: <b>{{ date }}</b>
                </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text>
                <v-row>
                    <v-col v-for="character in characters" :key="character.id" cols="12" lg="3" md="4" sm="6">
                        <character-card :character="character"></character-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import api from '@/services/api';
import CharacterCard from '@/components/CharacterCard.vue';

export default {
    components: {
        CharacterCard,
    },

    data() {
        return {
            name: '',
            date: '',
            season: '',
            episode: '',
            characterIDs: [],
            characters: [],
            id: this.$route.params.id,
        };
    },

    methods: {
        getEpisodesById(id) {
            api.getEpisodesById(id)
                .then((response) => {
                    const data = response.data;
                    this.name = data.name;
                    this.date = data.air_date;
                    this.season = data.episode[1] === '0' ? data.episode[2] : data.episode[1] + data.episode[2];
                    this.episode = data.episode[4] === '0' ? data.episode[5] : data.episode[4] + data.episode[5];
                    this.characterIDs = data.characters.map((item) => item.split('/').reverse()[0]);
                })
                .then(() => {
                    this.getCharactersById(this.characterIDs);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        getCharactersById(id) {
            api.getCharactersById(id)
                .then((response) => {
                    this.characters = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    created() {
        this.getEpisodesById(this.id);
    },
};
</script>

<style lang="scss" scoped></style>
