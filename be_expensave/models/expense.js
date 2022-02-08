import mongoose from "mongoose";

const { model } = mongoose;

const Expenses = model("expenses", {
    title: String,
    category: String,
    status: Boolean,
    quantity: Number,
    price: Number,
    date: String
});

export {
    Expenses
}