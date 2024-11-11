import { initServer } from "./app";

async function init(){
    const app = initServer();

    (await app).listen(8000,()=>{
        console.log("Backend is listing on port 8000, and graphql is available on localhost:8000/graphql")
    })
}

init();