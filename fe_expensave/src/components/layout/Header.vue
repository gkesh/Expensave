<!--suppress ALL -->
<template>
    <header class="header">
        <div>
            <h1>{{ title }}</h1>
        </div>
        <div>
            <input type="date" name="expense-date" id="expense-date" @change="changeData" />
        </div>
    </header>
</template>

<script>
    export default {
        name: "navBar",
        props: {
            title: String
        },
        methods: {
          changeData: function (event) {
              // Testing the date - Filter future dates
              try {
                  let selectedDate = new Date(event.target.value),
                      today = new Date();

                  if (selectedDate > today)
                      throw new Error("Date Exceeded Present");

                  let date = event.target.value.replace(new RegExp('-', 'g'), '/');
                  this.$emit('date-change', date);
              } catch(e) {
                  setCurrentDate();
                  alert(`Error:: ${e.message}`);
              }
          }
        },
        mounted: function () {
            setCurrentDate();
        }
    }

    const setCurrentDate = () => {
        let today = new Date();
        document.querySelector("input[type=date]").value = today.getFullYear() + '-' +
            ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    };
</script>

<style scoped>
    .header {
        background: #333;
        color: #fff;
        display: flex;
        padding: 10px;
    }
    .header div {
        flex: 1;
    }
    .header:first-child {
        text-align: left;
    }
    .header:last-child {
        text-align: right;
    }
    input[type=date], input[type=text]{
        padding: 10px;
        border: 1px solid #fcfcfc;
        border-radius: 5px;
        font-size: 1em;
        font-weight: bold;
        margin-top: 5px;
        float: right;
    }
</style>