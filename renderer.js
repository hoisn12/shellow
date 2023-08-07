var os = require('node:os');
var Terminal = require('xterm').Terminal;
var ipc = require("electron").ipcRenderer;

console.log("here?")
const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';


