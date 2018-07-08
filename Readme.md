# Printer-mgmt

Node module to Add, delete, get or set default Printer and list added Printers. Supports Windows, Mac and Linux operating systems.

## Prerequisites

Install the required printers driver packages in Mac and Linux environments.

Windows environments requires, Microsoft Visual C++ 2010 Redistributable Package (x64) or Microsoft Visual C++ 2010 Redistributable Package (x86) needs to be installed. Also, copy printermgmt.dll from the module's dist/win32 or dist/win64 to %system32% based on the windows machine's architecture.


## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm](https://www.npmjs.com/) registry.

Before installing, [download and install Node.js](https://nodejs.org/en/download/). Node.js 0.10 or higher is required.

Installation is done using the npm install command:
```
npm install printer-mgmt
```
## Using the module

```
const Printer = require("printer-mgmt");
const printer = new Printer();

printer.listPrintQueues();
printer.addPrintQueue(printerOptions);
printer.setDefaultPrintQueue("test");
printer.getDefaultPrintQueue();
printer.deletePrintQueue("test");
```
Follow, examples for more information.

## Features
Performs printer management on Windows, Mac and Linux environments
Supports 32 bit and 64 bit Operating systems
Easy to Use
Works fast

## Author

* **Sendil Kumar Gurusamy** - [sendevour](https://github.com/sendevour)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
