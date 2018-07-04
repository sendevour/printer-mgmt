const ffi = require('ffi');

const MyLibrary = ffi.Library('winspool', {
  "GetDefPrinter": [ 'void', [ ] ],
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
  var val=MyLibrary.GetLocalPrinters();
  console.log(val);
}

function printerHasJob(name) {
  return MyLibrary.PrinterHasJob(name);
}

function getDefaultPrinter() {
  MyLibrary.GetDefPrinter();
  console.log();
}

function setDefaultPrinter(name) {
  if(MyLibrary.SetDefPrinter(name)){
    console.log(`"${name}" is set as default`);
  }
  else {
    console.log(`Error: "${name}" is not added`);
  }
}

function deletePrinter(name) {
  if(printerHasJob(name) === 0) {
    if(MyLibrary.DelPrinter(name)) {
      console.log(`"${name}" is Deleted`);
    }
    else {
      console.log(`Error: "${name}" is in use or not found.`);
    }
  }  else {
    console.log(`Error: ${name} has pending jobs. clear the jobs and retry`);
  }
}

function addPrinter(printerName, portName, driverName) {
 if(MyLibrary.AddMyPrinter(printerName,portName, driverName) === 1) {
   console.log(`"${printerName}" is added successfully`);
 } else {
  console.log(`Error: "${printerName}" could not be added`);
 }
}

function addDriver(infPath, driverName, arch) {
  return MyLibrary.AddPrintDriver(infPath, driverName, arch);
}

module.exports.listPrinters = listPrinters;
module.exports.getDefaultPrinter = getDefaultPrinter;
module.exports.setDefaultPrinter = setDefaultPrinter;
module.exports.deletePrinter = deletePrinter;
module.exports.addPrinter = addPrinter;
module.exports.addDriver = addDriver;
