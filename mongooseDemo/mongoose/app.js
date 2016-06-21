var layer = require("./db/models/layer");
var point = require("./db/models/point");
var path = require("./db/models/path");
var _ = require('lodash');
var Promise = require("bluebird");

var createOneLayer = function(oneLayer){
	return new Promise(function(resolve,reject){
		layer.create(oneLayer,function(err,data){
			if(err) reject(err);
			resolve(data);
		})
	});
};

var createOnePoint = function(onePoint) {
	return new Promise(function(resolve,reject){
		point.create(onePoint,function(err,data){
			if(err) reject(err);
			resolve(data);
		});
	});
};

var createOnePath = function(onePath) {
	return new Promise(function(resolve,reject){
		path.create(onePath,function(err,data){
			if(err) reject(err);
			resolve(data);

		})
	});	
};

var createLayers = function(layers){
	var tasks = [];
	layers.forEach(function(oneLayer){
		tasks.push(createOneLayer(oneLayer))
	})
	return Promise.all(tasks);
};

var layers = [];
layers.push({name:'25号楼1楼',url:'1.shgbit.png'});
layers.push({name:'25号楼电梯',url:'2.shgbit.png'});
layers.push({name:'25号楼3楼',url:'3.shgbit.png'});
// createLayers(layers).then(function(data){
// 	console.log(data);
// });

var points = [];
var points1 = [];
var points2 = [];
var points3 = [];
points1.push({name:'维修部',x:0,y:0,floor:{from:1,to:1}});
points1.push({name:'市场部',x:50,y:50,floor:{from:1,to:1}});
points1.push({name:'电梯口1',x:100,y:100,floor:{from:1,to:1}});

points2.push({name:'电梯1到3楼',x:0,y:0,floor:{from:1,to:3}});

points3.push({name:'电梯口3',x:100,y:100,floor:{from:3,to:3}});
points3.push({name:'市场部',x:50,y:50,floor:{from:3,to:3}});
points3.push({name:'技术中心',x:0,y:0,floor:{from:3,to:3}});

points.push(points1);
points.push(points2);
points.push(points3);


var formatPoints = function(points,layers){
	var allPoints = [];
	layers.forEach(function(layer,index){
		points[index].forEach(function(tmpPoint){
			tmpPoint.layer = layer._id;
			allPoints.push(tmpPoint);
		});
	});
	return Promise.resolve(allPoints);
};

var oneArgformatPoints = formatPoints.bind(null,points);

var createPoints = function(points) {
	var tasks = [];
	points.forEach(function(onePoint){
			tasks.push(createOnePoint(onePoint));
	});
	return Promise.all(tasks);
};

var formatPath = function(points) {
	var dataPath = {};
	dataPath.from = points[0]._id;
    dataPath.to = points[points.length-1]._id;
    var tmplayers = [];
    dataPath.path = [];
    points.forEach(function(onePoint){
    	dataPath.path.push(onePoint._id);
    	tmplayers.push(onePoint.layer);
    }); 	
    dataPath.layers = _.uniq(tmplayers);
    return Promise.resolve(dataPath);
};

createLayers(layers)
	.then(oneArgformatPoints)
	.then(createPoints)
	.then(formatPath)
	.then(createOnePath)
	.then(function(data){
		console.log(data);
	})



// path.find({from:'56e22a04ef1635e95fff8298',to:'56e22a04ef1635e95fff829e'},function(err,data){
// 	if(err) console.log(err);
// 	data[0].populate('from').populate('to').populate('layers').populate('path',function(err, user){
// 		console.log(user.from)
// 		console.log(user.to)
// 		console.log(user.path)
// 		console.log(user.layers)
// 		console.log('-----------------------')
// 		// console.log(user)
// 		console.log(user.path[0].type);
// 		var fs = require('fs')
// 		fs.writeFile('test.json', JSON.stringify(user,null,2), function(err,data){
// 			console.log('success');
// 		});
// 	});
// });

var fs = require('fs');

fs.open('test.json','r',function(err,fd){
	console.log(err)
	console.log(fd)
	// fs.open('test.json','r',function(err,fd){
	// 	console.log(err)
	// 	console.log(fd)
	// })
	// fs.open('test.json','r',function(err,fd){
	// 	console.log(err)
	// 	console.log(fd)
	// })
})

// layer.create({name:'25号楼1楼',url:'1.shgbit.png'},function(err,data){
// 	if(err) console.log(err);
// 	console.log(data)

// })

// layer.create({name:'25号楼2楼',url:'2.shgbit.png'},function(err,data){
// 	if(err) console.log(err);
// 	console.log(data)

// })

// layer.create({name:'25号楼2楼',url:'3.shgbit.png'},function(err,data){
// 	if(err) console.log(err);
// 	console.log(data)

// })

// point.create({name:'厕所',x:100,y:100,layer:'56dfcc35a94309c55a8d0f6e'},function(err,data){
// 	if(err) console.log(err);
// 	console.log(data)

// })


// path.create({from:'56dfd1c6054165ee5a8e40c3',to:'56dfd3edf25ff4045b314280',path:['56dfd1c6054165ee5a8e40c3','56dfd252c00d02f55aa0bd93','56dfd3edf25ff4045b314280']},function(err,data){
// 	if(err) console.log(err);
// 	console.log(data)

// })

// path.find({from:'56dfd1c6054165ee5a8e40c3',to:'56dfd3edf25ff4045b314280'},function(err,data){
// 	if(err) console.log(err);
// 	data[0].populate('from').populate('to').populate('path',function(err, user){
// 		console.log(user.from)
// 		console.log(user.to)
// 		console.log(user.path)
// 	});

// 	// console.log(data.populate('from'))
// 	// console.log(data.populate('to'))
// 	// console.log(data.populate('path'))
// 	// console.log(data)
// });