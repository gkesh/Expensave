import {
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLObjectType
} from 'graphql';

const ExpenseType = new GraphQLObjectType({
    name: "Expense",
    fields: {
        id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        category: {
            type: GraphQLString
        },
        status: {
            type: GraphQLBoolean
        },
        quantity: {
            type: GraphQLInt
        },
        price: {
            type: GraphQLInt
        },
        date: {
            type: GraphQLString
        }
    }
});

export {
    ExpenseType
};