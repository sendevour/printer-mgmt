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

function setDefaultPrinter(name) {
  var args = `-d ${name}`;
  var op1 = "";
  var op2 = "";
  const { execSync } = require("child_process");
  op1 = execSync(`/usr/sbin/lpadmin ${args}`);
  //this works
  var fs = require("fs");
  if (fs.existsSync("/usr/bin/lpoptions")) {
    op2 = execSync(`/usr/bin/lpoptions ${args}`);
  }
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

module.exports.listPrinters = listPrinters;
module.exports.setDefaultPrinter = setDefaultPrinter;
module.exports.deletePrinter = deletePrinter;
