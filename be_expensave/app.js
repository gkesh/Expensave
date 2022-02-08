import Express from "express";
import ExpressGraphQL from "express-graphql";
import Cors from "cors";
import schema from "./graphql/schema.js";
import mongoose from "mongoose";

const { set, connect } = mongoose;

let app = Express();

set('useFindAndModify', false);
set('useNewUrlParser', true);
set('useUnifiedTopology', true);
connect("mongodb://localhost/expensave").then(() => {

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
