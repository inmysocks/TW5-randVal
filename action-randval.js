/*\
title: $:/plugins/inmysocks/randVal/action-randval.js
type: application/javascript
module-type: widget

Action widget to set a single field or index on a tiddler to a random number.

<$action-randval $tiddler=someTiddler $field=store_field $lower=1 $upper=6 $step=1/>

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var RandValWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
RandValWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
RandValWidget.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
RandValWidget.prototype.execute = function() {
	this.actionTiddler = this.getAttribute("$tiddler",this.getVariable("currentTiddler"));
	this.actionField = this.getAttribute("$field","store_field");
	this.actionIndex = this.getAttribute("$index");
	this.padLength = this.getAttribute("$length","0");
	this.prefixValue = this.getAttribute("$prefix")

	var numrolls = this.getAttribute("$numrolls",1);	
	var lower = this.getAttribute("$lower",1);
	var upper = this.getAttribute("$upper",6);
	var step = this.getAttribute("$step",1);
	var randValue;
	var output;
	
	if(numrolls===0) {
		randValue = 0;
	} else {
		var numpts = ((upper)-(lower))/(step)+1;
		var size = (upper)-(lower);
		if(numpts <= 1) {
		  randValue = Number(numrolls*lower);
		} else {
			var randValue = 0;
			for (var i = 0; i < Number(numrolls); i++) {
			  randValue = Number(randValue) + (Math.floor(Math.random()*numpts)*(step)+Number(lower));
			}
		  if(Number(randValue) > Number(numrolls)*Number(upper)) {
		    randValue = Number(numrolls*upper);
		  }
		} 
	}

	if(this.prefixValue) {
		if(this.padLength) {
			output = this.prefixValue+$tw.utils.pad(randValue,this.padLength);
		} else {
			output = this.prefixValue+randValue;
		}
	} else if(this.padLength) {
			output = $tw.utils.pad(randValue,this.padLength);
	} else {
			output = randValue;
	}

	this.actionValue = String(output);
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
RandValWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes["$tiddler"] || changedAttributes["$field"] || changedAttributes["$index"] || changedAttributes["$lower"] || changedAttributes["$upper"] || changedAttributes["$step"] || changedAttributes["$numrolls"]) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

/*
Invoke the action associated with this widget
*/
RandValWidget.prototype.invokeAction = function(triggeringWidget,event) {
	var self = this;
	if(typeof this.actionValue === "string") {
		this.wiki.setText(this.actionTiddler,this.actionField,this.actionIndex,this.actionValue);		
	}
	return true; // Action was invoked
};

exports["action-randval"] = RandValWidget;

})();
