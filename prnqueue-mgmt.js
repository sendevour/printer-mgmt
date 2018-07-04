const os = require('os');
const fs = require('fs');
const process  = require('process');
const windows = require('./lib/windows');

class Prnqueue{

  constructor(osName,osArch) {
    this.osName = identifyOS(os.platform());
    this.osArch = identifyArch(os.arch());
  }

  log(message) {
    console.log(message);
    console.log(this.osName);
    console.log(this.osArch);

  }

  listPrintQueues() {
    //list the printers
    if(this.osName === 'windows') {
      windows.listPrinters();
    } else if(this.osName === 'mac') {
      //lpstat -p
    }
    else if(this.osName === 'linux') {
      //lpstat -p
    }
    else {
      console.log('un-supported environment')
    }
  }
  addTCPIPPort() {

  }
  addPrintQueue(queueName,portName,driverName) {
    //adds the printer
    if(this.osName === 'windows') {
      windows.addPrinter(queueName,portName,driverName);
    } else if(this.osName === 'mac') {
      //lpstat -p
    }
    else if(this.osName === 'linux') {
      //lpstat -p
    }
    else {
      console.log('un-supported environment')
    }
  }
  addPrintDriver(infPath, driverName, overWrite) {

    if(overWrite === 1) {
      //call add driver
      addDriver(infPath, driverName);
    } else {
      //check and call
      if(driverInstalled(driverName) !== 1){
        //add driver
        addDriver(infPath, driverName);
      }
    }
  }

  deletePrintQueue(queueName) {
    //deletes the printer
    if(this.osName === 'windows') {
      windows.deletePrinter(queueName);
    } else if(this.osName === 'mac') {
      //lpadmin -d
    }
    else if(this.osName === 'linux') {
      //lpadmin -d
    }
    else {
      console.log('un-supported environment')
    }
  }
  setDefaultPrintQueue(queueName) {
    if(this.osName === 'windows') {
      windows.setDefaultPrinter(queueName);
    } else if(this.osName === 'mac') {
      //lpadmin -d
    }
    else if(this.osName === 'linux') {
      //lpadmin -d
    }
    else {
      console.log('un-supported environment')
    }
  }

  getDefaultPrintQueue() {
    if(this.osName === 'windows') {
      windows.getDefaultPrinter();
    } else if(this.osName === 'mac') {
      //lpstat -d
    }
    else if(this.osName === 'linux') {
      //lpstat -d
    }
    else {
      console.log('un-supported environment')
    }
  }

}
function addDriver(infPath, driverName) {
  if(fs.existsSync(infPath)) {
    var arch = '';
    if (this.osArch === 'x64') {
      arch = "Windows x64";
    }  else {
       arch = "Windows NT x86";
    }
      windows.addDriver(infPath, driverName, arch);
  }

}

function driverInstalled(driverName) {
  var installed = 0;
  var driverList = MyLibrary.EnumDrivers();
  if (driverList.toLowerCase().indexOf(driverName.toLowerCase()) !== -1) {
    installed = 1;
    console.log("Driver already installed");
  }
}

function identifyArch(osArch){

 /*Supported architectures: 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32', and 'x64'*/
  var value = 'un-supported';

  if(osArch === 'x64') {
    value = osArch;
  } else if(osArch==='x32') {
    value = 'x86';
  }
  return value;
}

function identifyOS(osName) {
   /*'aix'
    'darwin'
    'freebsd'
    'linux'
    'openbsd'
    'sunos'
    'win32'*/
  var value = 'un-supported';

  if(osName === 'darwin') {
    value = 'mac';
  } else if(osName === 'win32'){
    value = 'windows';
  } else if( osName === 'aix' || osName === 'freebsd' || osName === 'linux' || osName === 'openbsd' || osName === 'sunos') {
    value = 'linux';
  }
  return value;
}

module.exports = Prnqueue;
