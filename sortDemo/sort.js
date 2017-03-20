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
	{id:10,sortNumber:4,parentId:3},
	{id:11,sortNumber:1,parentId:10},
	{id:12,sortNumber:3,parentId:null},
	{id:13,sortNumber:1,parentId:12}
];

let sortArray = function(toBeSortArrayArg,parentId){
	let tmpLevelArrays = _.filter(toBeSortArrayArg,{parentId:parentId})
		let result = _.cloneDeep(tmpLevelArrays)
		_.each(tmpLevelArrays,function(oneArray,index){
			let sortResult = sortArray(toBeSortArrayArg,oneArray.id);
			// 2*n+1为当前要补充的位置
			// 假设数组为[1,2,3]则补充成[1,x,2,x,3,x]x为对应的子数组
		    result.splice(2*index+1,0,sortResult)
		})
		return result;
}

let sortedArray= sortArray(toBeSortArray,null)
console.log('sortedArray==========================================')
console.log(JSON.stringify(sortedArray,null,2))
console.log(JSON.stringify(sortedArray))
let flattenedArray = _.flattenDeep(sortedArray);
console.log(flattenedArray)

