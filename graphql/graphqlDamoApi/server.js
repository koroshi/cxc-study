const express = require("express");
const graphqlHttp = require("express-graphql");
const {buildSchema} = require('graphql');
const graphql = require("graphql")

let app = express();

//demo0
{
	let schema = buildSchema(`
		type Query{
			hello:String
		}
	`);



	let root = {
		hello:()=>{
			return 'Hello World';
		}
	};

	app.use('/graphql', graphqlHttp({
		schema:schema,
		rootValue:root,
		graphiql:true
	}));
}

//demo1
{
	let schemaVar = buildSchema(`
	type Query {
		rollDice(numDice: Int!, numSides: Int): [Int]
	}
	`);
	let root1 = {
		hello:()=>{
			return 'Hello World';
		}
	};
	app.use('/graphqlvar', graphqlHttp({
		schema:schemaVar,
		rootValue:root1,
		graphiql:true
	}));
}

//demo2
{
	let schemaTypes = buildSchema(`
		type Query{
			quoteOfTheDay:String
			random:Float!
			rollThreeDice:[Int]
		}
	`);

	let rootTypes = {
		quoteOfTheDay:()=>{
			return Math.random() < 0.5 ? 'Take it easy' : 'savation lies within';
		},
		random:()=>{
			return Math.random();
		},
		rollThreeDice:()=>{
			return [1,2,3].map(_ => 1+Math.floor(Math.random()*6));
		}
	};

	app.use('/graphqltypes', graphqlHttp({
		schema:schemaTypes,
		rootValue:rootTypes,
		graphiql:true
	}));
}

//demo3
{
	let schemaTypesArg = buildSchema(`
		type Query {
			rollDice(numDice: Int!, numSides: Int): [Int]
		}
	`);

	var rootTypesArg = {
		rollDice: function ({numDice, numSides=6}) {
		var output = [];
		for (var i = 0; i < numDice; i++) {
			output.push(1 + Math.floor(Math.random() * (numSides)));
		}
		return output;
		}
	};


	app.use('/graphqltypesarg', graphqlHttp({
		schema:schemaTypesArg,
		rootValue:rootTypesArg,
		graphiql:true
	}));
}

//demo4
{

	let schemaOjb = buildSchema(`
		type RandomDie {
			numSides: Int!
			rollOnce: Int!
			roll(numRolls:Int!):[Int]
		}
		type Query {
			getDie(numSides:Int):RandomDie
		}
	`)

	class RandomDie{
		constructor(numSides=6){
			this.numSides = numSides;
		}
		rollOnce(){
			return 1+Math.floor(Math.random()*this.numSides);
		}
		roll({numRolls}){
			let output = [];
			for(let i=0;i<numRolls;i++){
				output.push(this.rollOnce())
			}
			return output;
		}
	}

	let rootObj = {
		getDie:function({numSides}){
			return new RandomDie(numSides);
		}
	}

	//demo4
	app.use('/graphqlobj', graphqlHttp({
		schema:schemaOjb,
		rootValue:rootObj,
		graphiql:true
	}));	
}

//demo5
{
	let schemaMutation = buildSchema(`
		type Mutation {
			setMessage(message:String):String
		}

		type Query {
			getMessage:String
		}
	`)
	let fakeDB = {};
	let rootMutaion = {
		setMessage:function({message}){
			fakeDB.message = message;
			return message;
		},
		getMessage:function(){
			return fakeDB.message;
		}
	}
	app.use('/graphqlmutation', graphqlHttp({
		schema:schemaMutation,
		rootValue:rootMutaion,
		graphiql:true
	}));	
}

//demo6
{
	let schemaMutationInput = buildSchema(`
		input MessageInput {
			content:String
			author:String
		}
		type Message {
			id:ID!
			content:String
			author:String
		}

		type Query {
			getMessage(id:ID!):Message
		}

		type Mutation {
			createMessage(input:MessageInput):Message
			updateMessage(id:ID!, input:MessageInput):Message
		}
	`);
	class Message {
		constructor(id,{content, author}={}) {
			this.id = id;
			this.content = content;
			this.author = author;
		}
	};
	let fakeDBS = {};
	let rootMutationInput = {
		getMessage:function({id}){
			if(!fakeDBS[id]) {
				throw new Error(`no message with id:${id}`);
			}
			return new Message(id,fakeDBS[id]);
		},
		createMessage:function({input}){
			var id = require('crypto').randomBytes(10).toString('hex');
			fakeDBS[id] = input;
			return new Message(id, input);
		},
		updateMessage:function({id,input}){
			if(!fakeDBS[id]) {
				throw new Error(`no message with id:${id}`);
			}
			fakeDBS[id] = input;
			return new Message(id, input);
		}
	}
	app.use('/graphqlmutationinput', graphqlHttp({
		schema:schemaMutationInput,
		rootValue:rootMutationInput,
		graphiql:true
	}));	
}

//demo7
{
	let midScehma = buildSchema(`
		type Query{
			ip:String
		}
	`);
	function logginMid (req, res, next) {
		console.log(`ip:${req.ip}`);
		next();
	};
	let midRoot = {
		ip:function(args,request){
			return request.ip
		}
	};
	app.use('/graphqlmid', logginMid, graphqlHttp({
		schema: midScehma,
		rootValue: midRoot,
		graphiql: true,
	  }));
}

//demo8
{
	let fdb = {
		a:{
			id:"a",
			name:"alice"
		},
		b:{
			id:"b",
			name:"bob"
		}
	};
	let userType = new graphql.GraphQLObjectType({
		name:"User",
		fields:{
			id:{type:graphql.GraphQLString},
			name:{type:graphql.GraphQLString}
		}
	});
	let queryType = new graphql.GraphQLObjectType({
		name:"Query",
		fields:{
			user:{
				type:userType,
				args:{
					id:{type:graphql.GraphQLString}
				},
				resolve:function(_,{id}){
					return fdb[id];
				}
			}
		}
	});
	let schemaADVANCED = new graphql.GraphQLSchema({query:queryType});
	app.use('/graphqlad', graphqlHttp({
		schema: schemaADVANCED,
		graphiql: true,
	  }));
}

app.listen(4000);
console.log("server is running at port 4000")

