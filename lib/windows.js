const ffi = require('ffi');
const fs = require('fs');

const MyLibrary = ffi.Library('winspool', {
  "GetDefPrinter": [ 'string', [ ] ],
  "GetLocalPrinters": [ 'string', [ ] ],
  "SetDefPrinter": [ 'int', [ 'string' ]],
  "DelPrinter": [ 'int', [ 'string' ]],
  "PrinterHasJob": [ 'int', [ 'string' ]],
  "EnumDrivers": [ 'string', [ ] ],
  "AddPrintDriver": ['int', [ 'string', 'string', 'string'] ],
  "AddMyPrinter": ['int', ['string','string','string']],
  "CreatePort": ['int', ['string']]
});

function listPrinters() {
  console.log(MyLibrary.GetLocalPrinters());
}

function printerHasJob(name) {
  return MyLibrary.PrinterHasJob(name);
}

function getDefaultPrinter() {
  console.log(MyLibrary.GetDefPrinter());
}

function setDefaultPrinter(name) {
  if(MyLibrary.SetDefPrinter(name)){
    console.log(`Print queue "${name}" is set as default`);
  }
  else {
    console.log(`Error: Print queue "${name}" is not added`);
  }
}

function deletePrinter(name) {
  if(printerHasJob(name) === 0) {
    if(MyLibrary.DelPrinter(name) === 0) {
      console.log(`Print queue "${name}" is deleted`);
    }
    else {
      console.log(`Error: Print queue "${name}" is in use or not found.`);
    }
  }  else {
    console.log(`Error: Print queue ${name} has pending jobs. clear the jobs and retry`);
  }
}

function addTCPIPPort(portName) {

  var args = `-a -r ${portName} -h ${portName} -o raw -n 9100 -me -y public`;

  const { exec } = require('child_process');
  exec(`c:\\windows\\system32\\cscript.exe ./lib/prnport.vbs ${args}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  //console.log(`stdout: ${stdout}`);
  //console.log(`stderr: ${stderr}`);
});
return 1;
}

function driverInstalled(driverName) {
  var installed = 0;
  var driverList = MyLibrary.EnumDrivers();
  if (driverList.toLowerCase().indexOf(driverName.toLowerCase()) !== -1) {
    installed = 1;
    //console.log("Driver already installed");
  }
  return installed;
}

function addDriver(prnQueueOptions, osArch) {
  if(fs.existsSync(prnQueueOptions.infAbsPath)) {
      var arch = (osArch === 'x64') ? 'Windows x64' : 'Windows NT x86';
      return MyLibrary.AddPrintDriver(prnQueueOptions.infAbsPath, prnQueueOptions.driverName, arch);
  }
  else
  {
    return -1;
  }
}

function addPrintDriver(prnQueueOptions, osArch) {

  //console.log(prnQueueOptions.infAbsPath, prnQueueOptions.driverName,osArch);
  var retVal = -2;

  if(prnQueueOptions.overWrite === 1) {
    //console.log("overwrite");
    retVal = addDriver(prnQueueOptions, osArch);
  } else {
    if(driverInstalled(prnQueueOptions.driverName) !== 1){
      retVal = addDriver(prnQueueOptions, osArch);
    }
    else {
      //driver installed and no overwrite
      //console.log("now addPrintDriver");
      retVal=1;
    }
  }
  return retVal;
}

function addPrinter(prnQueueOptions, osArch) {
  var drvChk = addPrintDriver(prnQueueOptions, osArch);
  if(drvChk !== -1 || drvChk !== -2) {
    if(addTCPIPPort(prnQueueOptions.portName) === 1) {
      if(MyLibrary.AddMyPrinter(prnQueueOptions.queueName, prnQueueOptions.portName, prnQueueOptions.driverName) === 1) {
        console.log(`Print queue "${prnQueueOptions.queueName}" is added`);
      } else {
      console.log(`Error: Print queue "${prnQueueOptions.queueName}" could not be added`);
      }
    }
    else console.log(`Error: Port "${prnQueueOptions.portName}" could not be added`);
  }

}

module.exports.listPrinters = listPrinters;
module.exports.getDefaultPrinter = getDefaultPrinter;
module.exports.setDefaultPrinter = setDefaultPrinter;
module.exports.deletePrinter = deletePrinter;
module.exports.addPrinter = addPrinter;
//module.exports.addDriver = addDriver;
