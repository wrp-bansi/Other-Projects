


const http=require('http')
const fs=require('fs')
const url =require('url')


const myserver=http.createServer((req,res)=>{

    const log=`${Date.now()} : ${req.url} new request \n`
    const myurl=url.parse(req.url, true)
    console.log(myurl)
    fs.appendFile("test.txt",log,(err,data)=>{

        switch(myurl.pathname){
            case "/":
                res.end("home page");
                break;
                case "/about" :

     const username=myurl.query.name;
    res.end(`hi,${username}`);
                break;
                default:
                    res.end("404 page not found");
        }
    })

})

myserver.listen(8000, ()=>{
    console.log("server start")
})