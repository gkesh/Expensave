<!--suppress ALL -->
<template>
    <div v-bind:class="{'paid': expense.status}">
        <p><button class="cancel" @click="$emit('cancel-expense', expense.id)">&times;</button></p>
        <p @click="updateStatus">{{ expense.title }}</p>
        <p>{{ expense.category }}</p>
        <p>{{ expense.quantity }}</p>
        <p>{{ expense.subtotal }}</p>
    </div>
</template>

<script>
    import exsave from "@/graphql/client.js";
    import { updateItem } from "@/graphql/mutations.mjs";

    export default {
        name: "Expense",
        props: ["expense"],
        methods: {
            updateStatus: async function() {
                try {
                    let result = await exsave({
                        query: updateItem,
                        data: {
                            id: this.expense.id,
                            status: !this.expense.status
                        }
                    });
                    this.expense.status = !result.data.data.refItem.status;
                } catch (e) {
                    alert(`Error:: ${e.message}`);
                }
            }
        }
    }
</script>

<style scoped>
    div {
        padding: var(--padding-full);
        border-bottom: var(--border-dashed);
        font-size: var(--font-size-normal);
        display: flex;
    }
    div.paid {
        text-decoration: line-through;
    }
    button.cancel {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 25px;
        width: 25px;
        border-radius: 12px;
        background: var(--error);
        color: var(--text-light);
        border: none;
        padding: 2px 8px;
        font-weight: bold;
        cursor: pointer;
        font-size: var(--font-size-normal);
        float: left;
    }
    p:nth-child(2) {
        flex: 20;
        cursor: pointer;
        text-align: left;
    }
    p:nth-child(4) {
        text-align: center;
    }
    p {
        flex: 10;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    p:first-child {
        cursor: pointer;
        flex: 5;
    }
    p:last-child {
        text-align: end;
    }
</style>