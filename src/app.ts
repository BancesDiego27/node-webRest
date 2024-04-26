import { envs } from "./config/envs"
import { Server } from "./presentation/server"


(async()=>{
    main()
})()


function main(){
    console.log('hello main')
    const server = new Server({
        port : envs.PORT,
        publicPath : envs.PUBLIC_PATH
    })
    server.start()
}