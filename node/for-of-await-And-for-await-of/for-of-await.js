
let arrayOut = [[1,2,3],[4,5,6],[7,8,9]]

async function getOne(one) {
    let time = Math.round(Math.random())*1000
    console.log("time:",time)
    return new Promise((resolve, reject)=>{
        setTimeout( ()=>{
            resolve(one);
  
        },time)
    })
}

async function test(){
    let arrlist = [];
    for(let i of arrayOut) {
        let itemlist = await Promise.all(i.map(one=> getOne(one)));
        console.log(itemlist)//[ 1, 2, 3 ],[ 4, 5, 6 ],[ 7, 8, 9 ]
        arrlist = arrlist.concat(itemlist)
    }
    console.log(arrlist)
}
test()//[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]