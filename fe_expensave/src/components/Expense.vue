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
    import axios from "axios";
    import QueryHolder from "@/components/models/QueryHolder";

    export default {
        name: "Expense",
        props: ["expense"],
        methods: {
            updateStatus: async function() {
                try {
                    let result = await axios({
                        method: "POST",
                        url: QueryHolder.url,
                        data: {
                            query: QueryHolder.updateItem,
                            variables: {
                                id: this.expense.id,
                                status: !this.expense.status
                            }
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
        background: #f4f4f4;
        padding: 15px 30px;
        border-bottom: 1px #ccc dashed;
        display: flex;
    }
    .paid {
        text-decoration: line-through;
    }
    .cancel {
        background: #d14748;
        color: #ffffff;
        border: none;
        padding: 2px 8px;
        font-weight: bold;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1em;
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