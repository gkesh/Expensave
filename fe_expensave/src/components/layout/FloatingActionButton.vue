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
    .holder {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
        font-weight: bolder;
        height: 80px;
        width: 80px;
        border-radius: 40px;
        position: absolute;
        bottom: 30px;
        right: 30px;
        color: var(--text-light);
        background: var(--background-dark);
        -webkit-box-shadow: 0 0 10px 0 rgba(50, 50, 50, 0.75);
        -moz-box-shadow:    0 0 10px 0 rgba(50, 50, 50, 0.75);
        box-shadow:         0 0 10px 0 rgba(50, 50, 50, 0.75);
    }
    .holder:hover {
        cursor: pointer;
        color: var(--accent);
    }
</style>