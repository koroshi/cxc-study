const _ = require('lodash');
const toBeSortArray = [
	{id:1,sortNumber:1,parentId:null},
	{id:2,sortNumber:2,parentId:null},
	{id:3,sortNumber:1,parentId:1},
	{id:4,sortNumber:2,parentId:1},
	{id:5,sortNumber:1,parentId:2},
	{id:6,sortNumber:2,parentId:2},
	{id:7,sortNumber:1,parentId:3},
	{id:8,sortNumber:2,parentId:3},
	{id:9,sortNumber:3,parentId:3},
	{id:10,sortNumber:4,parentId:3}
];

let sortArray = function(toBeSortArrayArg,parentId){
	let tmpLevelArrays = _.filter(toBeSortArrayArg,{parentId:parentId})
	_.each(tmpLevelArrays,function(oneArray,index){
		tmpLevelArrays.splice(index+1,0,sortArray(toBeSortArrayArg,oneArray.id))
	})
	return tmpLevelArrays;
}

var sortedArray= sortArray(toBeSortArray,null)
var flattenedArray = _.flattenDeep(sortedArray);
console.log(flattenedArray)

