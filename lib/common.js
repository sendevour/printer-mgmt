function listPrinters() {
  var args = `-p`;
  var stdout = new Array();
  const { execSync } = require("child_process");
  try {
    stdout = execSync(`/usr/bin/lpstat ${args}`);
    processOutput(stdout);
  } catch (error) {
    console.log("");
  }
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

function setDefaultPrinter(name) {
  var args = `-d ${name}`;
  var op1 = "";
  var op2 = "";
  const { execSync } = require("child_process");
  try {
    op1 = execSync(`/usr/sbin/lpadmin ${args}`);
    //this works
    var fs = require("fs");
    if (fs.existsSync("/usr/bin/lpoptions")) {
      op2 = execSync(`/usr/bin/lpoptions ${args}`);
    }
    if (op1 !== "" || op2 !== "")
      console.log(`Printer "${name}" is set as default`);
  } catch (error) {
    console.log(`Error: can't set as default. Printer "${name}" is not added`);
  }
}

function deletePrinter(name) {
  var args = `-x ${name}`;
  var output = "";
  const { execSync } = require("child_process");
  try {
    output = execSync(`/usr/sbin/lpadmin ${args}`);
  } catch (error) {
    console.log(`Error: Printer "${name}" can't be deleted`);
    return;
  }
  console.log(
    output.toString() !== ""
      ? `Error: Printer "${name}" can't be deleted`
      : `Printer "${name}" is deleted`
  );
}

module.exports.listPrinters = listPrinters;
module.exports.setDefaultPrinter = setDefaultPrinter;
module.exports.deletePrinter = deletePrinter;
