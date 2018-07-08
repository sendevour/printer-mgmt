const Printer = require("./../printer-mgmt");
const printer = new Printer();

const printerOptions = {
  //Queue configuration
  printerName: "test",

  //Driver configuration - windows only
  infAbsPath: "c:\\Windows\\Drivers\\Printers\\Xerox_GPD_PS\\x2UNIVP.inf",
  driverName: "Xerox Global Print Driver PS",
  driverOverwrite: 1,

  //ppd file path - mac and Linux only. Linux or mac specific absolute ppd file path
  /* ppdAbsPath:
    "/System/Library/Frameworks/ApplicationServices.framework/Versions/A/Frameworks/PrintCore.framework/Versions/A/Resources/Generic.ppd",*/

  ppdAbsPath: "/usr/share/cups/model/postscript.ppd",
  //Port configuration, IP Address or Hostname - adds ports only with IP Adress or hostname.
  portName: "10.123.145.64"
};

printer.listPrintQueues();

printer.addPrintQueue(printerOptions);

printer.setDefaultPrintQueue("test");

printer.getDefaultPrintQueue();

printer.deletePrintQueue("test");

//printer.setDefaultPrintQueue("Send To OneNote 16");

printer.listPrintQueues();
