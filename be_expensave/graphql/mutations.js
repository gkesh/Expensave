import { 
    GraphQLBoolean, 
    GraphQLID, 
    GraphQLInt, 
    GraphQLNonNull, 
    GraphQLString 
} from 'graphql';
import { ExpenseType } from './types.js';
import { Expenses } from '../models/expense.js';

const addExpenseResolver = {
    type: ExpenseType,
    args: {
        title: {
            type: GraphQLNonNull(GraphQLString)
        },
        category: {
            type: GraphQLString
        },
        status: {
            type: GraphQLNonNull(GraphQLBoolean)
        },
        quantity: {
            type: GraphQLNonNull(GraphQLInt)
        },
        price: {
            type: GraphQLNonNull(GraphQLInt)
        },
        date: {
            type: GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (_0, args, _1, _2) => {
        return new Expenses(args).save();
    }
};

const updateExpenseResolver = {
    type: ExpenseType,
    args: {
        id: {
            type: GraphQLNonNull(GraphQLID)
        },
        status: {
            type: GraphQLNonNull(GraphQLBoolean)
        }
    },
    resolve: (_0, args, _1, _2) => {
        return Expenses.findByIdAndUpdate(
            args.id,
            {
                status: args.status
            }
        ).exec();
    }
};

const deleteExpenseResolver = {
    type: ExpenseType,
    args: {
        id: {
            type: GraphQLNonNull(GraphQLID)
        }
    },
    resolve: (_0, args, _1, _2) => {
        return Expenses.findByIdAndRemove(args.id).exec();
    }
}

export {
    addExpenseResolver,
    updateExpenseResolver,
    deleteExpenseResolver
};