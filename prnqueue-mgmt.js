const os = require('os');
const process  = require('process');

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
    console.log('listPrintQueues');
  }

  addPrintQueue(queueName) {
    //adds the printer
    console.log('addPrintQueue');
  }

  deletePrintQueue(queueName) {
    //deletes the printer
    console.log('deletePrintQueue');
  }
  setDefaultPrintQueue(queueName) {
    console.log('setDefaultPrintQueue');
  }

  getDefaultPrintQueue() {
    return 'myprinter';
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
