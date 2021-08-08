<template>
    <v-container>
        <h1>Locations</h1>

        <v-row align="center">
            <v-col cols="12" sm="6">
                <v-text-field
                    v-model="filter"
                    label="Search by Name"
                    @input="getLocationsByFilter"
                    clearable
                    outlined
                ></v-text-field>
            </v-col>
        </v-row>

        <v-pagination
            :disabled="!locations.length"
            v-model="page"
            :length="totalPages"
            @input="getLocationsByFilter"
        ></v-pagination>

        <v-card>
            <v-list v-if="locations.length > 0">
                <v-list-item-group>
                    <template v-for="location in locations">
                        <v-list-item three-line :key="location.id" @click="openLocation(location.id)">
                            <v-list-item-content>
                                <v-list-item-title v-text="location.name"></v-list-item-title>
                                <v-list-item-subtitle
                                    class="text--primary"
                                    v-text="location.type"
                                ></v-list-item-subtitle>
                                <v-list-item-subtitle v-text="location.dimension"></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list>

            <v-card-text v-else>
                <v-row>
                    <v-col>
                        <div>The list of locations is empty</div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import api from '@/services/api';

export default {
    data() {
        return {
            filter: '',
            page: 1,
            totalPages: 1,
            locations: [],
        };
    },

    methods: {
        openLocation(id) {
            this.$router.push(`/location/${id}`);
        },

        getLocations() {
            api.getLocations()
                .then((response) => {
                    this.totalPages = response.data.info.pages;
                    this.locations = response.data.results;
                })
                .catch((error) => {
                    console.log(error);
                    this.locations = [];
                    this.totalPages = 1;
                });
        },

        getLocationsByFilter() {
            api.getLocationsByFilter({
                name: this.filter ? this.filter.trim() : null,
                type: null,
                dimension: null,
            })
                .then((response) => {
                    if (this.page > response.data.info.pages) {
                        this.page = response.data.info.pages;
                    }
                })
                .then(() => {
                    api.getLocationsByFilter({
                        name: this.filter ? this.filter.trim() : null,
                        type: null,
                        dimension: null,
                        page: this.page,
                    })
                        .then((response) => {
                            this.totalPages = response.data.info.pages;
                            this.locations = response.data.results;
                        })
                        .catch((error) => {
                            console.log(error);
                            this.locations = [];
                            this.page = 1;
                            this.totalPages = 1;
                        });
                });
        },
    },

    created() {
        this.getLocations();
    },
};
</script>

<style lang="scss" scoped></style>
