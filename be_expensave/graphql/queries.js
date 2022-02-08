import {
    GraphQLID,
    GraphQLList, 
    GraphQLNonNull,
    GraphQLString
} from "graphql";
import { ExpenseType } from "./types.js";
import { Expenses } from "../models/expense.js";

const getExpensesResolver = {
    type: GraphQLList(ExpenseType),
    resolve: (_0, _1, _2, _3) => {
        return Expenses.find().exec();
    }
};

const getExpenseByIdResolver = {
    type: ExpenseType,
    args: {
        id: {
            type: GraphQLNonNull(GraphQLID)
        }
    },
    resolve: (_0, args, _1, _2) => {
        return Expenses.findById(args.id).exec();
    }
};

const getExpensesByDayResolver = {
    type: GraphQLList(ExpenseType),
    args: {
        date: {
            type: GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (_0, args, _1, _2) => {
        return Expenses.find({
            date: args.date
        }).exec()
    }
};

export {
    getExpensesResolver,
    getExpenseByIdResolver,
    getExpensesByDayResolver
};