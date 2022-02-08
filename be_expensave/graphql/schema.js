import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import {
    getExpenseByIdResolver,
    getExpensesResolver,
    getExpensesByDayResolver
} from './queries.js';
import {
    addExpenseResolver,
    updateExpenseResolver,
    deleteExpenseResolver
} from './mutations.js';

const queries = new GraphQLObjectType({
    name: "Query",
    fields: {
        item: getExpenseByIdResolver,
        items: getExpensesResolver,
        dayItems: getExpensesByDayResolver
    }
});

const mutations = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        expense: addExpenseResolver,
        refItem: updateExpenseResolver,
        delItem: deleteExpenseResolver
    }
});

const schema = new GraphQLSchema({
    query: queries,
    mutation: mutations
});

export default schema;