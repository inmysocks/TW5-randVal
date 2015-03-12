TW5-randVal
===========

A random value generator plugin for tiddlywiki

This plugin contains a widget that generates a random number and stores it in a specified field.

The Widget will take the following inputs

|$lower |The lower bound of the random numbers generated, defaults to 1. |
|$upper |The upper bound on the random numbers generated, defaults to 6. |
|$step |The step size of the random numbers generated (that is all random numbers will be in the form rand = lowerBound+n*stepSize where n is an integer and lowerBound <= rand <= upperBound) stepSize defaults to 1 (so integer outputs). If stepSize > upperBound-lowerBound than the output will always be lowerBound |
|$numrolls |The number of times to roll a random number and sum the results, defaults to 1 if no value is given. |
|$tiddler |The tiddler that will contain the random value, defaults to `<<currentTiddler>>` |
|$field |The field of the specified tiddler that will hold the random value, defaults to `store_field`. |
|$prefix |An optional prefix to the appended to the front of the output number. No default. |
|$length |The minimum length of the output, if the output would be shorter than this than zero padding is used. This will not shorten the output. |

The code will put a random number in the field `fieldName` of the tiddler `tiddlerName`. The number will be the sum of numberOfRolls numbers between `lowerBound` and `upperBound` inclusive.

!Example:

```
<$button>Roll Dice!
<$action-randval $field=fieldName/>
</$button>
```

When the button is pressed, the code will generate a random integer between 1 and 6 inclusive and store it in the field fieldName. So it is equivalent to rolling a normal 6 sided dice.

!How randVal is generated (pseudocode):

num_steps = (upperBound-lowerBound)/stepSize+1

output = 0

for i=1 to num_rolls

  n = floor(num_steps*random())
  
  output = output + lowerBound+n*stepSize
  
end

return output
  