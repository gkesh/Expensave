/* eslint-disable */
export default class QueryHolder {

    static get url() {
        return "http://localhost:3000/expensave";
    }

    // noinspection JSUnusedGlobalSymbols
    static get selectAll() {
        return `
            {
                items {
                    id,
                    title,
                    category,
                    status,
                    quantity,
                    price,
                    date
                }
            }
        `;
    }

    static get selectByDate() {
        return `
            query getByDate($date: String!) {
                dayItems(date: $date) {
                    id,
                    title,
                    category,
                    status,
                    quantity,
                    price,
                    date
                }
            }
        `;
    }

    static get newExpense() {
        return `
            mutation NewExpense($title: String!, $category: String = "Misc.", $status: Boolean!, $quantity: Int!, $price: Int!, $date: String!) {
                expense(title: $title, category: $category, status: $status, quantity: $quantity, price: $price, date: $date) {
                    id,
                    title,
                    category,
                    status,
                    quantity,
                    price,
                    date
                }
            }
        `;
    }

    // noinspection JSUnusedGlobalSymbols
    static get selectItem() {
        return `
            query getItem($id: String!){
                item(id: $id) {
                    id,
                    title,
                    category,
                    status,
                    quantity,
                    price,
                    date
                }
            }
        `;
    }

    static get deleteItem() {
        return `
            query deleteItem($id: ID!) {
                delItem(id: $id) {
                    title,
                    date
                }
            }
        `;
    }

    static get updateItem() {
        return `
            mutation updateItem($id: ID!, $status: Boolean!) {
                refItem(id: $id, status: $status){
                    status
                }
            }
        `;
    }
}