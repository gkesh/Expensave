export const newExpense = `
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

export const deleteItem = `
query deleteItem($id: ID!) {
    delItem(id: $id) {
        title,
        date
    }
}
`;

export const updateItem = `
mutation updateItem($id: ID!, $status: Boolean!) {
    refItem(id: $id, status: $status){
        status
    }
}
`;