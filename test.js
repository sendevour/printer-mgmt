const Prnqueue = require('./prnqueue-mgmt');//require the class
const prnqueue = new Prnqueue(); //create the object

//call the log method
//prnqueue.log('messgae');

prnqueue.listPrintQueues();

//prnqueue.setDefaultPrintQueue('Xerox Global Print Driver PS');

//prnqueue.getDefaultPrintQueue();

//prnqueue.deletePrintQueue('bgl12-00-b1-6-cx');

prnqueue.addPrintQueue('printer',);

