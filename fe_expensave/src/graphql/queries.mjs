export const selectAll = `
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

export const selectByDate = `
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

export const selectItem = `
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