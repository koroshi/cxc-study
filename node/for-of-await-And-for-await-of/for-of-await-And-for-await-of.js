let sleep = async function(time){
    return new Promise(function(resolve, reject){
        setTimeout(()=>{
            return resolve(time)
        },time*1000)
    })
}

async function test(){
    //方法一
    let promises = Promise.all([1,2,3].map(sleep))
    console.time("startOne")
    let result = await promises
    console.timeEnd("startOne")//3s near
    console.log(result)

    //方法二
    console.time("start")
    for await(let one of [3,2,1].map(sleep)){
        console.log(one)
    }
    console.timeEnd("start")//3s near

    //方法三
    console.time("startTwo")
    for (let one of [3,2,1].map(sleep)){
        let a =await one
        console.log(a)
    }
    console.timeEnd("startTwo")//3s near

    //方法四【此方法除非上一次结果对下一次异步有用否则建议用方法一、二、三代替】
    console.time("startThree")
    for (let one of [3,2,1]){
        let a =await sleep(one)
        console.log(a)
    }
    console.timeEnd("startThree")//6s near[这样写会await 其中一个结束才开始第二个]

    //方法五 【不建议，尝试效果与方法四结果一致，如果循环同步，内部异步还是方法四可读性高一点】
    console.time("startFour")
    for await (let one of [3,2,1]){
        let a =await sleep(one)
        console.log(a)
    }
    console.timeEnd("startFour")//6s near[这样写会await 其中一个结束才开始第二个]

 
}


async function test2(){
       //例子二
       console.log("test2 start")
       async function* asyncGenerator() {
        var i = 1;
        while (i < 4) {
            await sleep(i)
          yield i++;
        }
      }
      
      console.time("timeExample2")
      for await (num of asyncGenerator()) {
        console.log(num);//1s 1,3s 2, 6s 3
      }
      console.timeEnd("timeExample2") //near 6s

    //   console.time("timeExample3")
    //   for  (num of asyncGenerator()) {
    //     console.log(await num);
    //   }
    //   console.timeEnd("timeExample3")
    // 无法执行
}

//test all
// test().then(test2)

//test one
// test();

//test two
test2()

//结论，
//如果迭代对象是promise数组，异步迭代则for await of，for...of 里面 await【因为运行时间在函数执行的时候确定】
//方法二和方法三时间由[3,2,1].map(sleep)这个决定已经三秒了，如果外部同步，里面异步就不一样了
//如果例子2形式，本身就是异步迭代就必须要for await...of,无法使用for...of await代替，并且时间也根据异步迭代器内部时间，这个例子里为6秒，分段拿到，不是6秒后拿到全部，类似外部同步for。。of内部await
//如果没有依赖关系的，便利同步数据循环内部需要await异步，看看是否能转换成promise.all或者race来节约时间，不然每个互相等待上一个执行完才开始下一个
