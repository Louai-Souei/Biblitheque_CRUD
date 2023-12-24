/*const http = require("http")
const app=require("./app")
const port =process.env.PORT || 5000
//createServer accepte un callback qui a comme parametre la requete et la reponse
//const server= http.createServer((req,res)=> {
    //res.end("voilà le reponse du serveur!")
//})
// si pas de var d'env PORT , on va ecouter le port 5000


app.set("port", port)
const server = http.createServer(app)
server.listen(port,()=>{
    console.log("Listening on "+ port)
})*/