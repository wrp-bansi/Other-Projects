// function getChhes(){
//     return new Promise((resove,reject)=>{
//         setTimeout(()=>{
//             const chess="bansi"
//             resove("get chess",chess)

//             reject("noo chess",chess)
//         },2000)
//     })

// }
// console.log(getChhes())


// function makedoub(chess){
//     return new Promise((resove,reject)=>{
//         setTimeout(()=>{
//             const doub=chess+"doub"
//             resove("get doub",doub)

//             reject("noo chess",doub)
//         },2000)
//     })

// }
// console.log(makedoub())

// function makepizza(doub){
//     return new Promise((resove,reject)=>{
//         setTimeout(()=>{
//             const pizza=doub+"pizza"
//             resove("get pizza",pizza)

//             reject("noo pizza",pizza)
//         },2000)
//     })

// }
// console.log(makepizza())


// getChhes().then((chess)=>{
//     console.log(chess);
//     return makedoub(chess)
// }).then((doub)=>{
//     console.log(doub)
//     return makepizza(doub)
// }).then((pizza)=>{
//     console.log(pizza)

// })


// const tickiet=new Promise(function(resolve,reject){
//    let istickit=false
//    if(istickit){
//     resolve("finally")
//    }
//    else{
//     reject("rejected")
//    }
// })

// tickiet.then((data)=>{
//     console.log("wow",data)
// }).catch((data)=>{
//     console.log("nooo",data)
// })

// const request = fetch('https://jsonplaceholder.typicode.com/posts')
// console.log(request);



// let lottery = new Promise(function(resolve, reject){
//     console.log("Lottery is happening");

//     setTimeout(() => {
//         if(Math.random() >= 0.5){
//             resolve("You Won!!!")
//         }
//         else{
//             reject(new Error("Better luck next time"))
//         }
//     }, 5000);

// })

// lottery.then((response) =>{
//     console.log(response);
// }).catch((err) =>{
//     console.log(err);
// })


// const fetchAPI = async function(){
//     try{
//         const res = await fetch('https://cat-fact.herokuapp.com/fact')
//         if(!res.ok){
//             throw new Error("Custom Error")
//         }
//         const data = await res.json()
//         console.log(data);
//     } catch(err){
//         console.log(err);
//     }
// }


// fetchAPI()
// console.log("FIRST");

// const fetchAPI = async function(){
//     try{
//         const res = await fetch('https://cat-fact.herokuapp.com/facts')
//         if(!res.ok){
//             throw new Error("Custom Error")
//         }
//         const data = await res.json()
//         console.log(data);
//         return "Done with fetchAPI"
//     } catch(err){
//         console.log(err);
//         throw new Error("Custom Error")
//     }
// }


// fetchAPI().then((msg) =>{
//     console.log(msg);
// }).catch((err) =>{
//     console.log(err);
// })


let promise1 = new Promise((resolve) =>{
    setTimeout(() =>{
       resolve("First Promise")
    }, 2000)
})

let promise2 = Promise.resolve("Second Promise")

let returnedPromises = Promise.all([promise1,promise2]).then((res) =>{
    console.log(res);
})