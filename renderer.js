const ipc = require('electron').ipcRenderer

const button = document.getElementById("upload")

button.addEventListener('click',function(Event){
    ipc.send('open-file-dialog')
})

ipc.on('selected-file',function(Event,paths){
    console.log(Event)

    console.log(paths)
})