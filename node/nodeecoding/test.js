// net use \\file1\上海秀店-研发一部1
let child_process = require("child_process");
var iconv = require('iconv-lite');
// console.log(iconv.encodingExists("gbk"))
child_process.exec("net use \\file1\上海秀店-研发一部1",{encoding:null},(error, stdout, stderr )=>{
	console.log("stdout")
	console.log(stdout)
	console.log("stderr")
	str = iconv.decode(Buffer.from(stderr), 'gbk');

	console.log(str)
	// console.log(stderr.toString("GBK"))
	// console.log(error)

})