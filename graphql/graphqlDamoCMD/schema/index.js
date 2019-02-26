const {graphql, buildSchema} = require('graphql');
let schema = buildSchema(`
type Query {
  hello: String
}
`);

let root = {
	hello:()=>{
		return 'Hello world';
	}
};


let testQuery = async function(){
	let one = await graphql(schema, '{ hello }', root)
	console.log(one.data.hello)
	console.log(typeof one)
};

testQuery();