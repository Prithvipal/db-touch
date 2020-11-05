const util = require('util')
const {ipcRenderer} = require('electron')
const MongoClient = require('mongodb').MongoClient;

let testConn = document.getElementById("btn_test_conn")
// Connection URL
// const url =  'mongodb://localhost:27016';


testConn.addEventListener("click", e =>{
    e.preventDefault()
    const auth = getAuthDetails()
    const url = getConnURL(auth)
    console.log("Connecting to:::", url)
    MongoClient.connect(url, {useUnifiedTopology: true,useNewUrlParser:true, poolSize: 5, reconnectInterval: 500 },
        function(err, client){
            if (err){
                console.log("EEEEEerr", err)
            }else {
                console.log("Successful")
            }

            //console.log("DATABASE IS BEING LOGGED...." ,client);
            // var dbAdmin=client.db("test").admin();
            // dbAdmin.listDatabases(function (err,databases) {
            //     console.log("before adding databases");
            //     console.log(databases);
            //     client.close();
            // })
        });
    
   // ipcRenderer.send("connection:test", auth)
})

function getAuthDetails(){
    const hostname = document.getElementById('hostname').value
    const port = document.getElementById('port').value
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const auth = {
        hostname,
        port,
        username,
        password
    }
    return auth
}

function getConnURL(auth){
    if(auth.port === ''){
        const url =  util.format('mongodb+srv://%s:%s@%s', auth.username, auth.password, auth.hostname);
        return url
    }
}