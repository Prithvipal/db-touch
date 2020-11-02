const {ipcRenderer} = require('electron')
const MongoClient = require('mongodb').MongoClient;
testConn = document.getElementById("btn_test_conn")
// Connection URL
const url = 'mongodb://localhost:27016';

testConn.addEventListener("click", e =>{
     e.preventDefault()
    auth = getAuthDetails()

    MongoClient.connect(url, {useUnifiedTopology: true,useNewUrlParser:true, poolSize: 5, reconnectInterval: 500 },
        function(err,client){
            //console.log("DATABASE IS BEING LOGGED...." ,client);
            var dbAdmin=client.db("test").admin();
        dbAdmin.listDatabases(function (err,databases) {
            console.log("before adding databases");
            console.log(databases);
            client.close();
        })
        });
    
   // ipcRenderer.send("connection:test", auth)
})
function getAuthDetails(){
    hostname = document.getElementById('hostname').value
    port = document.getElementById('port').value
    username = document.getElementById('username').value
    password = document.getElementById('password').value
    auth = {
        hostname,
        port,
        username,
        password
    }
    return auth
}