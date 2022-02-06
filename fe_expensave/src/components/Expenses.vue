<!--suppress ALL -->
<template>
    <div>
        <div v-bind:key="expense.id" v-for="expense in expenses" class="expense">
            <Expense v-bind:expense="expense" @cancel-expense="$emit('cancel-expense', expense.id)" />
        </div>
    </div>
</template>

<script>
    import Expense from '@/components/Expense';

    export default {
        name: "Expenses",
        components: {
            Expense
        },
        props: {
            expenses: Array
        }
    }
</script>

<style scoped>
div.expense {
    background: var(--background-light);
}
div.expense:nth-of-type(odd) {
    background: var(--background-muted);
}
</style>