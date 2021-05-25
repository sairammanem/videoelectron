const { app, BrowserWindow } = require('electron')


var ipc = require('electron').ipcMain 


const os = require('os')
var {dialog} = require('electron')

const mainwindow = null


app.on('ready', function(){
    mainwindow = new BrowserWindow({
        resizable: true,
        height:600,
        width:800,
        webPreferences:{
            nodeIntegration: true
        }
    })
    mainwindow.loadURL('file://' + __dirname + '/main.ejs')

    mainwindow.on('closed',function(){
        mainwindow = null
    })
})

ipc.on('open-file-dialog',function(event){
    console.log('button pressed')
})

if(os.platform()=== 'linux' || os.platform === 'win32'){
    dialog.showOpenDialog(null,{
        properties:['openFile']
    }).then((result) => {
        console.log(result.filePaths)
        Event.sender.send('selected-file',result.filePaths[0])
    }).catch((err) => {
        console.log(err)
    })
}else{
    dialog.showOpenDialog(null,{
        properties:['openFile','openDirectory']
    }).then((result) => {
        console.log(result.filePaths)
        Event.sender.send("selected-file",result.filePaths[0])
    }).catch((err) =>{
        console.log(err)
    })
}






const port = process.env.PORT || 5005

app.use(express.json());

app.set('view engine','ejs')

app.get('/',(req,res)=>{
   res.render('main')
})
app.listen(port)

