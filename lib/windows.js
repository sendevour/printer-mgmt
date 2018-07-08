const ffi = require("ffi");
const fs = require("fs");

const MyLibrary = ffi.Library("printermgmt", {
  GetDefPrinter: ["string", []],
  GetLocalPrinters: ["string", []],
  SetDefPrinter: ["int", ["string"]],
  DelPrinter: ["int", ["string"]],
  PrinterHasJob: ["int", ["string"]],
  EnumDrivers: ["string", []],
  AddPrintDriver: ["int", ["string", "string", "string"]],
  AddMyPrinter: ["int", ["string", "string", "string"]],
  CreatePort: ["int", ["string"]]
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
  if (MyLibrary.SetDefPrinter(name)) {
    console.log(`Printer "${name}" is set as default`);
  } else {
    console.log(`Error: can't set as default. Printer "${name}" is not added`);
  }
}

function deletePrinter(name) {
  if (printerHasJob(name) === 0) {
    if (MyLibrary.DelPrinter(name) === 0) {
      console.log(`Printer "${name}" is deleted`);
    } else {
      console.log(`Error: Printer "${name}" is in use or not found.`);
    }
  } else {
    console.log(
      `Error: Printer ${name} has pending jobs. clear the jobs and retry`
    );
  }
}

function addTCPIPPort(portName) {
  var args = `-a -r ${portName} -h ${portName} -o raw -n 9100 -me -y public`;

  const { execSync } = require("child_process");
  try {
    execSync(
      `c:\\windows\\system32\\cscript.exe ${__dirname}\\prnport.vbs ${args}`
    );
  } catch (error) {
    console.log(error.message);
    return;
  }

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

function addDriver(printerOptions, osArch) {
  if (fs.existsSync(printerOptions.infAbsPath)) {
    var arch = osArch === "x64" ? "Windows x64" : "Windows NT x86";
    return MyLibrary.AddPrintDriver(
      printerOptions.infAbsPath,
      printerOptions.driverName,
      arch
    );
  } else {
    return -1;
  }
}

function addPrintDriver(printerOptions, osArch) {
  //console.log(printerOptions.infAbsPath, printerOptions.driverName,osArch);
  var retVal = -2;

  if (printerOptions.overWrite === 1) {
    //console.log("overwrite");
    retVal = addDriver(printerOptions, osArch);
  } else {
    if (driverInstalled(printerOptions.driverName) !== 1) {
      retVal = addDriver(printerOptions, osArch);
    } else {
      //driver installed and no overwrite
      //console.log("now addPrintDriver");
      retVal = 1;
    }
  }
  return retVal;
}

function addPrinter(printerOptions, osArch) {
  var drvChk = addPrintDriver(printerOptions, osArch);
  if (drvChk !== -1 || drvChk !== -2) {
    if (addTCPIPPort(printerOptions.portName) === 1) {
      if (
        MyLibrary.AddMyPrinter(
          printerOptions.printerName,
          printerOptions.portName,
          printerOptions.driverName
        ) === 1
      ) {
        console.log(`Printer "${printerOptions.printerName}" is added`);
      } else {
        console.log(
          `Error: Printer "${printerOptions.printerName}" could not be added`
        );
      }
    } else
      console.log(
        `Error: Port "${printerOptions.portName}" could not be added`
      );
  }
}

module.exports.listPrinters = listPrinters;
module.exports.getDefaultPrinter = getDefaultPrinter;
module.exports.setDefaultPrinter = setDefaultPrinter;
module.exports.deletePrinter = deletePrinter;
module.exports.addPrinter = addPrinter;
