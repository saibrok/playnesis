<template>
    <v-container>
        <h1>Characters</h1>

        <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
                <v-text-field v-model="filter" label="Search by Name" outlined clearable></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
                <v-select :items="statusList" v-model="status" label="Outlined style" outlined></v-select>
            </v-col>
        </v-row>

        <v-card>
            <v-card-text>
                <v-row v-if="filteredCharacters.length > 0">
                    <v-col v-for="character in filteredCharacters" :key="character.id" cols="12" lg="3" md="4" sm="6">
                        <character-card :character="character"></character-card>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col>
                        <div>The list of characters is empty</div>
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
            filter: '',
            status: 'All',
            statusList: ['All', 'Alive', 'Dead', 'unknown'],
            allCharacters: [],
        };
    },

    computed: {
        filteredCharacters() {
            let filteredCharacters = [];

            if (this.allCharacters) {
                filteredCharacters = this.allCharacters.filter((character) =>
                    character.name.toLowerCase().includes(this.filter ? this.filter.trim() : ''),
                );

                if (this.status === 'All') return filteredCharacters;

                filteredCharacters = filteredCharacters.filter((character) => character.status === this.status);

                return filteredCharacters;
            }

            return [];
        },
    },

    created() {
        api.getCharacters()
            .then((response) => {
                this.allCharacters = response.data.results;
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
</script>
