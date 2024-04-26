import fs from 'fs'
import http from 'http'

const server = http.createServer((req,res)=>{
    console.log(req.url)

    //res.writeHead(200,{'Content-type': 'text/html'})
    //res.write(`<h1>url ${req.url} </h1>`)

 /*   const data = {
    name : 'John Doe',
    age : 30,
    city: 'Guatemala'
    }

    res.writeHead(200,{'Content-type': 'application/json'})
    res.end(JSON.stringify(data))*/

    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200,{'Content-type': 'text/html'})
        res.end(htmlFile)
        return
    }
    if(req.url?.endsWith('.js')){
        res.writeHead(200,{'Content-type': 'application/javascript'})
    }else if(req.url?.endsWith('.css')){
        res.writeHead(200,{'Content-type': 'text/css'})
    }
    const responseContent = fs.readFileSync(`./public/${req.url}`,'utf-8')
    res.end(responseContent)

})

const port = 8080
server.listen(port, ()=>{
    console.log(`Server running on port ${port}` )
})