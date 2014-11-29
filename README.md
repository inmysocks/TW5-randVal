TW5-randVal
===========

a random value generator for use with tiddlywiki

This plugin contains a widget that generates a random number and stores it in a specified field. It is a modification of the action-setfield widget and acts identically with the exception of the value the field is set to.

This plugin also contains a javascript macro that acts similarly to the widget.

The macro will take the following inputs:<br>
lower - the lower bound of the random numbers generated.
upper - the upper bound on the random numbers generated
step - the step size of the random numbers generated (that is all random numbers will be in the form rand = lowerBound+n*stepSize where n is an integer and lowerBound <= rand <= upperBound) stepSize defaults to 1 (so integer outputs). If stepSize > upperBound-lowerBound than the output will always be lowerBound

The Widget takes these additional inputs:<br>
tiddler- the tiddler that will contain the random value
field - the field of the specified tiddler that will hold the random value.

!Widget example code:

```
<$button>
<$action-randval $tiddler=tiddlerName $field=fieldName $lower=lowerBound $upper=upperBound $step=stepSize/>
Generate Random Value
</$button>
```

The code will put a random number in the field `fieldName` of the tiddler `tiddlerName`. The number will be between `lowerBound` and `upperBound` inclusive.

!Macro example cone:
''Note: The macro is left over from my testing and I just haven't removed it yet. You probably shouldn't use it, use the widget instead.''

```
<<randVal lowerBound upperBound stepSize>>
```

The macro shouldn't be used in normal WikiText since its behavior is unpredictable due to how the wiki refreshes. It can be used to set values on button presses or similar things, or when unpredictable behavior is desired. I don't know when this would be desired.

!How randVal is generated (pseudocode):

num_steps = (upperBound-lowerBound)/stepSize

n = floor(num_steps*random())

output = lowerBound+n*stepSize
