// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
//
// * Arrow function expressions have a shorter syntax compared to [function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)
// * Arrow function expressions lexically bind the 'this' value
// * Arrow functions are always anonymous
//
// Syntax
// ---------------------------------------------------------------------------
// // Basic syntax:
// (param1, param2, paramN) => { statements }
// (param1, param2, paramN) => expression
//    // equivalent to:  => { return expression; }
//
// // Parentheses are optional when there's only one argument:
// singleParam => { statements }
// singleParam => expression
//
// // A function with no arguments requires parentheses:
// () => { statements }
//
// // Advanced:
// // Parenthesize the body to return an object literal expression:
// params => ({foo: bar})
//
// // Rest parameters are supported
// (param1, param2, ...rest) => { statements }

/*jshint unused:false*/

'use strict';

var log = require('npmlog');

var createGreeting = function(message, name) {
    return message + name;
};

// Long form
var arrowGreeting_1 = (message, name) => {
    return message + name;
};

// Short form
var arrowGreeting_2 = (message, name) => message + name;

// Single-argument short form
var arrowGreeting_3 = message => "Hello" + message;

//----------------------------------------------------------------------------

var deliveryBoy = {
    name: "John",

    handleMessage: function(message, handler) {
        handler(message);
    },

    recieve: function() {
        var that = this;

        this.handleMessage("Hello, ", function(message) {
            //log.info("this.name="+this.name); // Anonymous, so name undefined

            // So we have to store this pointer in outer closure to get the name
            // property that we want
            log.info("that.name="+that.name);

            log.info(message + that.name);
        });
    }
};
deliveryBoy.recieve();

// We can simplify the above by using '=>' arrow function expression (aka, 'fat arrow function')
deliveryBoy = {
    name: "John5",

    handleMessage: function(message, handler) {
        handler(message);
    },

    recieve: function() {
        this.handleMessage("Hello, ", (message) => log.info(message + this.name));   // 'this' now references outer scope 'deliveryBoy2' object, as we intend
    }
};
deliveryBoy.recieve();
