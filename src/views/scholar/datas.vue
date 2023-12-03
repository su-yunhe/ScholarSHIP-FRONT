<template>
    <div class="datasContent"></div>
</template>

<script>
import {useScholarStore} from '../../stores/scholar'

export default {
    name: 'datas',
    components: {
    },
    data() {
        return {
            store: useScholarStore(),
        }
    },
    methods:{

    }
}
</script>

<style>
.datasContent{
    width: 100%;
    height: 100px;
    margin-top: 20px;
    background-color: blueviolet;
}
</style>