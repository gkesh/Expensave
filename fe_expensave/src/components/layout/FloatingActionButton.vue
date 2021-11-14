<!--suppress ALL -->
<template>
    <div class="holder" @click="$emit('add-expense')">
        &plus;
    </div>
</template>

<script>
    export default {
        name: "FloatingActionButton"
    }
</script>

<style scoped>
    * {
        font-size: 1.5em;
        font-weight: bolder;
    }
    .holder {
        height: 2em;
        width: 2em;
        text-align: center;
        border-radius: 50%;
        position: absolute;
        bottom: 20px;
        right: 20px;
        padding: 8px;
        color: #fff;
        background: #333;
        -webkit-box-shadow: 0 0 10px 0 rgba(50, 50, 50, 0.75);
        -moz-box-shadow:    0 0 10px 0 rgba(50, 50, 50, 0.75);
        box-shadow:         0 0 10px 0 rgba(50, 50, 50, 0.75);
    }
    .holder:hover {
        cursor: pointer;
        color: #007705;
    }
</style>