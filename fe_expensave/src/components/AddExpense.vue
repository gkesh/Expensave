<!--suppress ALL -->
<template>
    <div class="background">
        <article class="modal">
            <h3>Add Expense <a @click="hideModal">&times;</a></h3>
            <section class="form">
                <form @submit="postExpense">
                    <input type="text" name="title" v-model="title" placeholder="Title" />
                    <input type="text" name="category" v-model="category" placeholder="Category" />
                    <div class="dual">
                        <input type="number" name="quantity" v-model="quantity" placeholder="Qty." />
                        <input type="number" name="price" v-model="price" placeholder="Price" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </section>
        </article>
    </div>
</template>

<script>
    import Item from '@/components/models/Item';
    import uuid from 'uuid';

    export default {
        name: "AddExpense",
        data() {
            return {
                title: '',
                category: '',
                quantity: undefined,
                price: undefined
            }
        },
        methods: {
            hideModal: function () {
                document.querySelector(".background").style.display = 'none';
            },
            postExpense: function (event) {
                event.preventDefault();
                try {
                    if (this.title === '' || this.category === '' ||
                        this.quantity === undefined || this.price === undefined)
                        throw new Error("Form incomplete");

                    if (/\d/.test(this.title) || /\d/.test(this.category) || this.quantity <= 0 || this.price <= 0)
                        throw new Error("Invalid Value");

                    let expense = new Item(
                        uuid.v4(),
                        this.title,
                        this.category,
                        false,
                        this.quantity,
                        this.price
                    );
                    // Emit to transmit to parent
                    this.$emit('new-expense', expense);
                } catch(e) {
                    alert(`${e.message}! Expense not added.`);
                } finally {
                    // Clear the form
                    this.title = '';
                    this.category = '';
                    this.quantity = undefined;
                    this.price = undefined;
                    document.querySelector(".background").style.display = 'none';
                }
            }
        },
        created: function () {
            this.$parent.$on('add-expense', () => {
                document.querySelector(".background").style.display = 'flex';
            });
        }
    }
</script>

<style scoped>
    .background {
        background: rgba(100, 100, 100, 0.75);
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: 998;
        display: none;
        justify-content: center;
    }
    .modal {
        background: #fff;
        padding: 0;
        margin: 5px;
        border-radius: 10px;
        z-index: 999 !important;
        align-self: center;
        height: auto;
        max-height: 80vh;
        flex-basis: 20em;
        overflow: hidden;
    }
    h3 {
        padding: 10px 30px;
        background: #333;
        color: #fff;
        border-bottom: 1px #fff dashed;
    }
    a {
        float: right;
        cursor: pointer;
    }
    a:hover {
        color: #d14748;
    }
    .form {
        margin: 10px 0 0 0;
    }
    input {
        border: 1px solid #b4b4b4;
        padding: 10px;
        border-radius: 5px;
        width: 90%;
        margin: 5px 5%;
        font-size: 0.75em;
    }
    .dual {
        display: flex;
    }
    .dual input:last-child {
        margin-left: 0;
    }
    button {
        padding: 10px;
        margin-top: 10px;
        font-size: 1em;
        font-weight: 600;
        background: #333;
        width: 100%;
        border: none;
        color: #fff;
        transition: all 0.25s linear;
        -o-transition: all 0.25s linear;
        -moz-transition: all 0.25s linear;
        -webkit-transition: all 0.25s linear;
    }
    button:hover {
        background: #007705;
        cursor: pointer;
    }
</style>