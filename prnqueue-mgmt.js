const os = require('os');

const windows = require('./lib/windows');
const mac = require('./lib/mac');
const linux = require('./lib/linux');
const common = require('./lib/common');


class Prnqueue{

  constructor(osName,osArch) {
    this.osName = identifyOS(os.platform());
    this.osArch = identifyArch(os.arch());
  }

  listPrintQueues() {

    if(this.osName === 'windows') {
      windows.listPrinters();
    } else if(this.osName === 'mac') {
      //lpstat -p
    }
    else if(this.osName === 'linux') {
      //lpstat -p
    }
    else {
      console.log('un-supported environment');
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

  deletePrintQueue(queueName) {

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

  addPrintQueue(prnQueueOptions) {

    if(this.osName === 'windows') {
      windows.addPrinter(prnQueueOptions, this.osArch);
    } else if(this.osName === 'mac') {
      //lpstat -p
    }
    else if(this.osName === 'linux') {
      //lpstat -p
    }
    else {
      console.log('un-supported environment');
    }

  }

}

function identifyArch(osArch){
  /*'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32', and 'x64'*/
   return ((osArch === 'x64') ? osArch : ((osArch ==='x32')? 'x86' : 'un-supported'));
}

function identifyOS(osName) {

    /*'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', 'win32'*/
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


