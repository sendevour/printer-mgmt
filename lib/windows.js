const ffi = require('ffi');

const MyLibrary = ffi.Library('winspool', {
  "GetDefPrinter": [ 'void', [ ] ],
  "GetLocalPrinters": [ 'void', [ ] ],
  "SetDefPrinter": [ 'int', [ 'string' ]],
  "DelPrinter": [ 'int', [ 'string' ]],
  "PrinterHasJob": [ 'int', [ 'string' ]],
  "EnumDrivers": [ 'void', [ ] ],
  "AddPrintDriver": ['int', [ 'string', 'string', 'string'] ],
  "AddMyPrinter": ['int', ['string','string','string']],
  "CreatePort": ['int', ['string']]
});

function listPrinters() {
  MyLibrary.GetLocalPrinters();
  console.log();
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
  }
  else {
    console.log(`Error: ${name} has pending jobs. clear the jobs and retry`);
  }
}

function addPrinter(name, driverpath, port) {

  console.log(`"${name}" is Added`);
}

module.exports.listPrinters = listPrinters;
module.exports.getDefaultPrinter = getDefaultPrinter;
module.exports.setDefaultPrinter = setDefaultPrinter;
module.exports.deletePrinter = deletePrinter;
module.exports.addPrinter = addPrinter;
