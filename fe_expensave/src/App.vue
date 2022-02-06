<!--suppress ALL -->
<template>
  <div id="app">
    <Header title="Expensave" @date-change="changeData" />
    <Expenses v-bind:expenses="expenses" @cancel-expense="cancelExpense" />
    <Footer v-bind:total="total" />
    <FloatingActionButton @add-expense="addExpense" />
    <AddExpense @new-expense="newExpense" />
  </div>
</template>

<script>
  import exsave from "@/graphql/client.js";
  import { selectByDate } from "@/graphql/queries.mjs";
  import { deleteItem, newExpense } from "@/graphql/mutations.mjs";
  import Header from "@/components/layout/Header";
  import Expenses from "@/components/Expenses";
  import Footer from "@/components/layout/Footer";
  import FloatingActionButton from "@/components/layout/FloatingActionButton";
  import AddExpense from "@/components/AddExpense";
  import Item from "@/models/Item";

  var dateTime = require("node-datetime"),
      dateStr = dateTime.create().format('Y/m/d');

  export default {
    name: 'app',
    components: {
      AddExpense,
      Header,
      Footer,
      Expenses,
      FloatingActionButton
    },
    data: function () {
      return {
        expenses: [],
        total: 0
      }
    },
    methods: {
      cancelExpense: async function (id)  {
        try {
          let result = await exsave({
            query: deleteItem,
            variables: {
              id: id
            }
          });
          alert(`Item Deleted:: ${result.data.data.delItem.title} purchased on ${result.data.data.delItem.date}`);
          this.expenses = this.expenses.filter(expense => expense.id !== id);
          this.total = this.expenses.reduce((acc, item) => acc + item.price * item.quantity, 0);
        } catch(e) {
          alert(`Error:: ${e.message}`);
        }
      },
      addExpense: function () {
        this.$emit('add-expense');
      },
      newExpense: async function(expense) {
        try {
          let result = await exsave({
            query: newExpense,
            variables: {
              title: expense.title,
              category: expense.category,
              status: false,
              quantity: Number(expense.quantity),
              price: Number(expense.price),
              date: dateStr
            }
          });
          expense.id = result.data.data.expense.id;
          this.expenses = [...this.expenses, expense];
          this.total += expense.price * expense.quantity;
        } catch(e) {
          alert(`Error:: ${e.message}`);
        }
      },
      changeData: async function (date) {
        try {
          let result = await exsave({
            query: selectByDate,
            variables: {
              date: date
            }
          });
          this.expenses = [];
          result.data.data.dayItems.forEach(doc => {
            this.expenses = [...this.expenses,
              new Item(doc.id, doc.title, doc.category, doc.status, doc.quantity, doc.price, doc.date)
            ];
          });
          this.total = this.expenses.reduce((acc, item) => acc + item.price * item.quantity, 0);
        } catch (e) {
          alert(`Error:: ${e.message}`);
        }
      }
    },
    created: async function () {
      try {
        let result = await exsave({
          query: selectByDate,
          variables: {
            date: dateStr
          }
        });
        result.data.data.dayItems.forEach(doc => {
          this.expenses = [...this.expenses,
            new Item(doc.id, doc.title, doc.category, doc.status, doc.quantity, doc.price, doc.date)
          ];
        });
        this.total = this.expenses.reduce((acc, item) => acc + item.price * item.quantity, 0);
      } catch (e) {
        alert(`Error:: ${e.message}.`)
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }
</style>
