<!--suppress ALL -->
<template>
    <header>
        <div>
            <img src="@/assets/expensave.svg" alt="logo" />
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
    header {
        background: var(--background-light);
        color: var(--text-dark);
        display: flex;
        justify-content: space-between;
        padding: var(--padding-full);
        border-bottom: var(--border-solid);
    }
    header div {
        display: flex;
        align-items: center;
    }
    header img {
        height: 40px;
        width: 40px;
        margin-right: 16px;
    }
    input[type=date], input[type=text]{
        padding: var(--input-padding);
        background: var(--background-muted);
        border: var(--border-solid);
        border-radius: var(--input-radius);
        font-size: var(--input-font-size);
        font-weight: bold;
        margin-top: 5px;
        float: right;
    }
    @media (prefers-color-scheme: dark) {
        header {
            background: var(--background-dark);
            color: var(--text-light);
        }
    }
</style>