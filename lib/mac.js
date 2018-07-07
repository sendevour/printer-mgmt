function listPrinters() {
  var args = `-p`;
  var stdout = new Array();
  const { execSync } = require("child_process");
  stdout = execSync(`/usr/bin/lpstat ${args}`);
  processOutput(stdout);
}

function processOutput(data) {
  var retVal = "";
  const os = require("os");
  var list = data.toString().split(os.EOL);
  list.forEach(function(element) {
    if (element.includes("printer")) {
      retVal = retVal
        .toString()
        .concat('"')
        .concat(element.split(" ")[1])
        .concat('"')
        .concat(",");
    }
  });
  console.log(retVal.toString().replace(/,\s*$/, ""));
}

function printerHasJob(name) {
  console.log("yet to be implemeneted");
}

function getDefaultPrinter() {
  var args = `-d`;

  const { execSync } = require("child_process");
  var def = execSync(`SOFTWARE= LANG=C /usr/bin/lpstat ${args}`);
  def = def
    .toString()
    .split(" ")[3]
    .trim();
  console.log(`"${def}"`);
}

function setDefaultPrinter(name) {
  var args = `-d ${name}`;

  const { execSync } = require("child_process");
  var op1 = execSync(`/usr/sbin/lpadmin ${args}`);
  //this works
  var op2 = execSync(`/usr/bin/lpoptions ${args}`);
  if (op1 !== "" || op2 !== "")
    console.log(`Print queue "${name}" is set as default`);
}

function deletePrinter(name) {
  var args = `-x ${name}`;
  var output = "";
  const { execSync } = require("child_process");
  try {
    output = execSync(`/usr/sbin/lpadmin ${args}`);
  } catch (error) {
    console.log(`Print queue "${name}" could not be deleted`);
    return;
  }
  console.log(
    output.toString() !== ""
      ? "printer not deleted"
      : `Print queue "${name}" is deleted`
  );
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
  }' -P ${prnQueueOptions.ppdAbsPath}`;
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
