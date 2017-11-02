# 1k.js
A tiny JavaScript-library for solving everyday problems.

## API-Documentation

### $(`query`)
Selects elements in jQuery-style: the `query`-argument is a css selector.
You can use all classic methods and maps on the resulting elements like `.innerHTML` ant `.style.color`. 
It will add methods to the selected element, this extensions are in the `_1kExt`-map defined.


### get(`url`, `callback` [, `type`])
This function performs a get-request to the given `url`.
The `type`-argument can call a function from the `_1kGetExt`-map to change the response in a specific way.
```Javascript
get('https://api.github.com', function(response){
        console.log(response);
    }, 'json'
);

/*
This get-request-callback will get the response allready as js-object.
The response will allready be parsed from
JSON-text to an object.
*/

```


## Default extensions
### Select-extensions
* `.on(event, callback)` will add an eventlistener on the specific object(s)
* `.each(callback(object))` will loop over all objects
* `.toggleClass(class)` will toggle a class of the specific object(s)


### Get-extensions
* `json` will return the response as object, parsed from the original response