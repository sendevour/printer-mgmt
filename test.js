const Prnqueue = require('./prnqueue-mgmt');//require the class
const prnqueue = new Prnqueue(); //create the object

const prnQueueOptions = {

  //Queue configuration
  queueName: 'test',

  //Driver configuration - windows only
  infAbsPath: 'c:\\Windows\\Drivers\\Printers\\Xerox_GPD_PS\\x2UNIVP.inf',
  driverName: 'Xerox Global Print Driver PS',
  driverOverwrite: 1,

  //Port configuration, IP Address or Hostname
  portName: '10.123.145.64'
};

prnqueue.listPrintQueues();

prnqueue.addPrintQueue(prnQueueOptions);

prnqueue.setDefaultPrintQueue('test');

prnqueue.getDefaultPrintQueue();

prnqueue.deletePrintQueue('test');

prnqueue.setDefaultPrintQueue('Send To OneNote 16');

prnqueue.listPrintQueues();




