const Express = require("express");
const ExpressGraphQL = require("express-graphql");
const Mongoose = require("mongoose");
const Cors = require("cors");
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull
} = require("graphql");

let app = Express();

Mongoose.set('useFindAndModify', false);
Mongoose.set('useNewUrlParser', true);
Mongoose.set('useUnifiedTopology', true);
Mongoose.connect("mongodb://localhost/expensave").then(() => {

    // noinspection JSCheckFunctionSignatures
    const ExpenseModel = Mongoose.model("items", {
        title: String,
        category: String,
        status: Boolean,
        quantity: Number,
        price: Number,
        date: String
    });

    const ExpenseType = new GraphQLObjectType({
       name: "Expense",
       fields: {
           id: { type: GraphQLID },
           title: { type: GraphQLString },
           category: { type: GraphQLString },
           status: { type: GraphQLBoolean },
           quantity: { type: GraphQLInt },
           price: { type: GraphQLInt },
           date: { type: GraphQLString }
       }
    });

    // noinspection JSUnusedLocalSymbols
    const schema = new GraphQLSchema({
       query: new GraphQLObjectType({
         name: "Query",
         fields: {
             items: {
                 type: GraphQLList(ExpenseType),
                 resolve: (root, args, context, info) => {
                     return ExpenseModel.find().exec();
                 }
             },
             item: {
                 type: ExpenseType,
                 args: {
                     id: { type: GraphQLNonNull(GraphQLID) }
                 },
                 resolve: (root, args, context, info) => {
                     // noinspection JSUnresolvedFunction
                     return ExpenseModel.findById(args.id).exec();
                 }
             },
             dayItems: {
                 type: GraphQLList(ExpenseType),
                 args: {
                     date: { type: GraphQLNonNull(GraphQLString) }
                 },
                 resolve: (root, args, context, info) => {
                     return ExpenseModel.find({date: args.date}).exec();
                 }
             },
             delItem: {
                 type: ExpenseType,
                 args: {
                     id: { type: GraphQLNonNull(GraphQLID) }
                 },
                 resolve: (root, args, context, info) => {
                     // noinspection JSUnresolvedFunction
                     return ExpenseModel.findByIdAndRemove(args.id).exec();
                 }
             }
         }
       }),
        mutation: new GraphQLObjectType({
            name: "Mutation",
            fields: {
                expense: {
                    type: ExpenseType,
                    args: {
                        title: { type: GraphQLNonNull(GraphQLString) },
                        category: { type: GraphQLString },
                        status: { type: GraphQLNonNull(GraphQLBoolean) },
                        quantity: { type: GraphQLNonNull(GraphQLInt) },
                        price: { type: GraphQLNonNull(GraphQLInt) },
                        date: { type: GraphQLNonNull(GraphQLString) }
                    },
                    resolve: (root, args, context, info) => {
                        let expense = new ExpenseModel(args);
                        return expense.save();
                    }
                },
                refItem: {
                    type: ExpenseType,
                    args: {
                        id: { type: GraphQLNonNull(GraphQLID) },
                        status: { type: GraphQLNonNull(GraphQLBoolean) }
                    },
                    resolve: (root, args, context, info) => {
                        // noinspection JSUnresolvedFunction
                        return ExpenseModel.findByIdAndUpdate(args.id, { status: args.status }).exec();
                    }
                }
            }
        })
    });

    app.use(Cors());

    app.use("/expensave", ExpressGraphQL({
        schema: schema,
        graphiql: true
    }));

    app.listen(3000, () => {
        console.log("Listening at 3000");
    });
}).catch(e => {
    console.error(e);
});
