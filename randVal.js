/*\
title: $:/plugins/inmysocks/randVal.js
type: application/javascript
module-type: macro

Usage:
<<randVal lower upper step>>

Returns:
A random number between the number lower and upper in increments of step.
So <<randVal 1 10 0.5>> gives a random value between 1 and 10 (inclusive) and allows values that are multiples of 0.5 so the output would be picked from the set {1, 1.5, 2, ..., 9.5, 10} according to a uniform distribution.

step defaults to 1 so default behaviour with two inputs returns an integer.

Note that the output is always a multiple of the step size plus lower, so <<randVal 1 10 5>> will only return 1 or 6 (1+5*0 and 1+5*1) because 1+5+5=11 (that is 1+5*2) is out of the accepted range of outputs.

When step is larger than upper-lower this returns lower

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.name = "randVal";

exports.params = [
	{ name: "lower" },
	{ name: "upper" },
        { name: "step" }
];

/*
Run the macro
*/
exports.run = function(lower, upper, step) {
        if( !step ) step = 1;
        var numpts = (Number(upper)-Number(lower))/Number(step);
        var size = Number(upper)-Number(lower);
        var output = lower;
        if ( numpts <= 1 ) {
            var ouput = lower;
        } else {
            var output = Math.round((Math.random()*numpts))*Number(step) + Number(lower);
            if ( output > upper) {
                var output = upper;
            }
        }
	return output;
};

})();