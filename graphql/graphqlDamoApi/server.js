const express = require("express");
const graphqlHttp = require("express-graphql");
const {buildSchema} = require('graphql');

let schema = buildSchema(`
	type Query{
		hello:String
	}
`);

let schemaVar = buildSchema(`
type Query {
	rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

let root = {
	hello:()=>{
		return 'Hello World';
	}
};

let app = express();

app.use('/graphql', graphqlHttp({
	schema:schema,
	rootValue:root,
	graphiql:true
}));

app.use('/graphqlvar', graphqlHttp({
	schema:schemaVar,
	rootValue:root,
	graphiql:true
}));

app.listen(4000);
console.log("server is running at port 4000")