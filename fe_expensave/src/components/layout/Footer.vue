<template>
    <footer>
        <p>Total</p>
        <p>{{ total }}</p>
    </footer>
</template>

<script>
    export default {
        name: "bottomBar",
        props: {
            total: Number
        }
    }
</script>

<style scoped>
    footer {
        display: flex;
        background: var(--background-muted);
        padding: var(--padding-full);
        border-bottom: var(--border-dashed);
    }
    p {
        font-size: 1.2em;
        font-weight: bold;
        flex: 5;
    }
    p:nth-child(2) {
        flex: 40;
    }
    p:last-child {
        flex: 10;
        text-align: right;
    }
</style>