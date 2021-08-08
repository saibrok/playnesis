<template>
    <v-card class="overflow-hidden">
        <router-link :to="`/character/${character.id}`">
            <v-img :src="character.image"></v-img>
        </router-link>

        <v-card-title>
            {{ character.name }}
        </v-card-title>

        <v-card-text>
            <p>
                Species: <b>{{ character.species }}</b>
            </p>

            <p>
                Status: <b>{{ character.status }}</b>
            </p>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        character: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            show: false,
        };
    },
};
</script>

<style lang="scss" scoped></style>
