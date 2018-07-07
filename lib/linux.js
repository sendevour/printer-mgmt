const common = require("./common");

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

function addDriver(prnQueueOptions, osArch) {
  console.log("yet to be implemeneted");
}

function addPrintDriver(prnQueueOptions, osArch) {
  console.log("yet to be implemeneted");
}

function addPrinter(prnQueueOptions, osArch) {
  var args = `-p ${
    prnQueueOptions.queueName
  } -E -o printer-is-shared=false -v 'socket://${
    prnQueueOptions.portName
  }:9100' -P ${prnQueueOptions.ppdAbsPath}`;
  var output = "";
  const { execSync } = require("child_process");
  try {
    output = execSync(`/usr/sbin/lpadmin ${args}`);
  } catch (error) {
    console.log(
      `Print queue "${prnQueueOptions.queueName}" could not be added`
    );
    return;
  }
  console.log(
    output.toString() !== ""
      ? `Print queue "${prnQueueOptions.queueName}" could not be added`
      : `Print queue "${prnQueueOptions.queueName}" is added`
  );
}

module.exports.listPrinters = listPrinters;
module.exports.getDefaultPrinter = getDefaultPrinter;
module.exports.setDefaultPrinter = setDefaultPrinter;
module.exports.deletePrinter = deletePrinter;
module.exports.addPrinter = addPrinter;
