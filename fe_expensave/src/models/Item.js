"use strict";

// eslint-disable-next-line no-unused-vars
export default class Item {
    constructor(id, title, category, status, quantity, price, date) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.status = status;
        this.quantity = quantity;
        this.price = price;
        this.date = date;
    }

    get subtotal() {
        return this.quantity * this.price;
    }
}