<!--suppress ALL -->
<template>
    <div class="background">
        <article class="modal">
            <h3>Add Expense <a @click="hideModal">&times;</a></h3>
            <section class="form">
                <form @submit="postExpense">
                    <div class="fields">
                        <input type="text" name="title" v-model="title" placeholder="Title" />
                        <input type="text" name="category" v-model="category" placeholder="Category" />
                        <div class="dual">
                            <input type="number" name="quantity" v-model="quantity" placeholder="Qty." />
                            <input type="number" name="price" v-model="price" placeholder="Price" />
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </section>
        </article>
    </div>
</template>

<script>
    import Item from '@/models/Item';
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
        border-radius: 28px;
        z-index: 999 !important;
        align-self: center;
        height: auto;
        flex-basis: 25em;
        overflow: hidden;
    }
    div.fields {
        padding: 20px;
    }
    h3 {
        padding: 20px 20px 0px 20px;
        color: #444;
        font-size: 2em;
    }
    a {
        float: right;
        cursor: pointer;
    }
    a:hover {
        color: var(--error);
    }
    input {
        border: var(--border-solid);
        background: var(--background-muted);
        padding: var(--input-padding);
        border-radius: var(--input-radius);
        font-size: var(--font-size-normal);
        font-weight: bold;
        width: 100%;
        margin: 10px 0;
    }
    .dual {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        gap: 10px;
    }
    button {
        padding: 30px 20px;
        font-size: var(--font-size-normal);
        font-weight: bold;
        background: var(--background-dark);
        width: 100%;
        border: none;
        color: var(--text-light);
        transition: all 0.25s linear;
        -o-transition: all 0.25s linear;
        -moz-transition: all 0.25s linear;
        -webkit-transition: all 0.25s linear;
    }
    button:hover {
        background: var(--accent);
        cursor: pointer;
    }
</style>