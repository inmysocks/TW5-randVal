/*\
title: $:/plugins/inmysocks/randVal/action-randval.js
type: application/javascript
module-type: widget

Action widget to set a single field or index on a tiddler to a random number.

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
	this.actionField = this.getAttribute("$field");
	this.actionIndex = this.getAttribute("$index");
	
	var lower = this.getAttribute("$lower");
	var upper = this.getAttribute("$upper");
	var step = this.getAttribute("$step",1);
	
	var numpts = ((upper)-(lower))/(step);
	var size = (upper)-(lower);
	if ( numpts <= 1 ) {
	  var output = lower;
	} else {
	  var output = String(Math.floor(Math.random()*numpts)*(step)+Number(lower));
	  if ( Number(output) > Number(upper) ) {
	    var output = (upper);
	  }
	} 
	this.actionValue = output;
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
RandValWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes["$tiddler"] || changedAttributes["$field"] || changedAttributes["$index"] || changedAttributes["$lower"] || changedAttributes["$upper"] || changedAttributes["$step"]) {
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