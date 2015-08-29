# Creating Node Modules

## Create package.json Manifest

Create a file in project root named `package.json`.

**Essential for publishing via npm**

The following may be specified:

* Name, version, description, keywords describing program
* Homepage where users can learn more about the module
* Packages the module depends on

* `npm init` to get started
* `npm help json` for lots of info about what can go in the file

## README and Other Docs

Basic entry-level documentation about the program should go in a 
README.md.

*Consider adding a `./docs` folder*

## Testing

Very import if you intend others to use your program. package.json
includes a field to launch default test runners.

## What Type of Module?

Node modules tend to fall into one of the following rough categories:

* A binding to a C or C++ library
* A library of functionality to be used in other node programs
* A command-line program
* A website or server

### Writing a Binding

Typically, C++ source code is put in a subdirectory of your project called ./src. C++ files usually have the extension .cc. C files usually have the extension .c.

Generally, the simplest and best approach is to put the minimum necessary effort into the C++ layer, and then make the functions "nice" by wrapping a JavaScript layer around the raw binding.

Node programs use the included node-waf program to compile. Create a wscript file with the appropriate rules in it, and then run node-waf configure build to build your module.

Use the eio thread pool to do any actions that perform synchronous I/O. Note that v8 constructs may not be used on the thread pool, so data types must be passed into the sync code blocks as eio_request structs.

See these examples to get started building a binding that leverages eio and node-waf:

Example hello-world-ish programs:

    https://github.com/pkrumins/node-async
    https://github.com/isaacs/node-async-simple

Examples:

    https://github.com/pkrumins/node-png
    https://github.com/mranney/node_pcap
    https://github.com/ry/node_postgres
    https://github.com/isaacs/node-glob

### Writing a Library

* Customary for lib code to be placed in a folder `/lib`
* Specify a main module in `package.json`
    * This is the lib that users will load when they `require('lib')`
    * This module should expose all functionality

#### Examples

* https://github.com/learnboost/Socket.IO-node
* http://documentcloud.github.com/underscore
* https://github.com/senchalabs/connect
* https://github.com/mikeal/request
* http://github.com/tmpvar/jsdom

### Writing a Command Line Program

* The only feature that differentiates a cmdln program from a lib
is the bin field in the `package.json` file.

* When installed with npm, the bin field in a `package.json` file tells
npm to create an executable in the PATH that runs your program

* Variety of option parsing libs on npm

* Current working directory can be found by calling
    `process.cwd()`
* CWD can be changed with
    `process.chdir(new_path)`

#### Examples

* http://npmjs.org/
* https://github.com/zpoley/json-command
* https://github.com/cloudhead/vows
* https://github.com/LearnBoost/cluster

