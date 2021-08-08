<template>
    <v-container>
        <v-card>
            <v-card-title>
                <div class="text-h4 text--primary">{{ name }}</div>
            </v-card-title>
            <v-card-text>
                <div>
                    Type: <b>{{ type }}</b>
                </div>
                <div>
                    Dimension: <b>{{ dimension }}</b>
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
            dimension: '',
            type: '',
            characters: [],
            characterIDs: [],
            id: this.$route.params.id,
        };
    },

    methods: {
        getLocationsById(id) {
            api.getLocationsById(id)
                .then((response) => {
                    const data = response.data;
                    this.name = data.name;
                    this.dimension = data.dimension;
                    this.type = data.type;
                    this.characterIDs = data.residents.map((item) => item.split('/').reverse()[0]);
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
                    this.characters = response.data.results || response.data.length ? response.data : [response.data];
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    created() {
        this.getLocationsById(this.id);
    },
};
</script>

<style lang="scss" scoped></style>
