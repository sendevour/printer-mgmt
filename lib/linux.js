const common = require("./common");
const fs = require("fs");

function listPrinters() {
  common.listPrinters();
}

function printerHasJob(name) {
  console.log("yet to be implemeneted");
}

function getDefaultPrinter() {
  var args = `-d`;

  const { execSync } = require("child_process");
  var def = execSync(`/usr/bin/lpstat ${args}`);
  def = def
    .toString()
    .split(" ")[3]
    .trim();
  console.log(`"${def}"`);
}

function setDefaultPrinter(name) {
  common.setDefaultPrinter(name);
}

function deletePrinter(name) {
  common.deletePrinter(name);
}

function driverInstalled(driverName) {
  console.log("yet to be implemeneted");
}

function addDriver(printerOptions, osArch) {
  console.log("yet to be implemeneted");
}

function addPrintDriver(printerOptions, osArch) {
  console.log("yet to be implemeneted");
}

function addPrinter(printerOptions, osArch) {
  if (fs.existsSync(printerOptions.ppdAbsPath)) {
    var args = `-p ${
      printerOptions.printerName
    } -E -o printer-is-shared=false -v 'socket://${
      printerOptions.portName
    }:9100' -P ${printerOptions.ppdAbsPath}`;
    var output = "";
    const { execSync } = require("child_process");
    try {
      output = execSync(`/usr/sbin/lpadmin ${args}`);
    } catch (error) {
      console.log(
        `Error: Printer "${printerOptions.printerName}" can't be added`
      );
      return;
    }
    console.log(
      output.toString() !== ""
        ? `Error: Printer "${printerOptions.printerName}" can't be added`
        : `Printer "${printerOptions.printerName}" is added`
    );
  } else {
    console.log(
      `Error: "${printerOptions.ppdAbsPath}" is not found. Printer "${
        printerOptions.printerName
      }" can't be added`
    );
    return;
  }
}

module.exports.listPrinters = listPrinters;
module.exports.getDefaultPrinter = getDefaultPrinter;
module.exports.setDefaultPrinter = setDefaultPrinter;
module.exports.deletePrinter = deletePrinter;
module.exports.addPrinter = addPrinter;
