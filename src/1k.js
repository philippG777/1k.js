/*! https://github.com/philippG777/1k.js | Copyright (c) philippG777 */

'use strict';

/*
This are the methods that are added by the select or $
function.
*/
var _1kExt = {
    on: function(event, callback)
    {
        this.each(function(element)
        {
            element.addEventListener(event, callback);
        });
        return this;
    },

    each: function(callback)
    {
        if(!isset(this.length))
        {
            callback(this);
        }
        else
        {
            this.forEach(callback);
        }

        return this;
    },

    toggleClass: function(className)
    {
        this.each(function(element)
        {
            var classes = element.className.split(' ');
            var index = classes.indexOf(className);
            if(index != -1)
            {
                classes.splice(index, 1);
            }
            else
            {
                classes.push(className);
            }
            element.className = classes.join(' ');
        });
        return this;
    }
};

var _1kGetExt = {
    json: function(resp)
    {
        return JSON.parse(resp.responseText);
    }
};


/*
The select method returns a list of selected elements or a single selected
element.

Arguments:

A css-query like "#id .class p" -> returns a list of all p-elements
in a the classes "class" that are located in the element with the id = "id".
If it's only a single element, it wont return a list.

Or an element. The methods will get applied to this element.
*/
function $(query)
{
    if(typeof query == 'string')
    {
        var res = document.querySelectorAll(query);
    }
    else
    {
        // make normal elements useable
        res = [query];
    }

    /*
    This function creates the extension-methods on both: list and elements.
    */
    var createExtensions = function(res)
    {
        // add on parent obj
        forEach(_1kExt, function(extension, fname)
        {
            res[fname] = extension;
        });
        res.data = {};
        return res;
    }

    // add extensions
    createExtensions(res);

    res.forEach(function(value)
    {
        createExtensions(value);
    });

    if(res.length == 1)
        res = res[0];

    return res; 
}


/*
This function simplifies looping throught an array or map,
The callback will get called for every item with the following arguments:
key and value.
*/
function forEach(arg, callback)
{
    if(arg == Object(arg))
    {
        for(var i in arg)
        {
            callback(arg[i], i);
        }
    }
    else
    {
        arg.forEach(callback);
    }
}

/*
This method sends a get-request.
Arguments:

1, url
2, callback when the request has finished
3, type: if set to true the argument of the callback function will
    allready be parsed as json object.
    If this type is not set to "json" it will give the raw data as
    argument.
*/
function get(url, callback, type)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var extension = _1kGetExt[type];
            if(isset(type) && isset(extension))
            {
                callback(extension(this));
            }
            else
            {
                callback(this);
            }
        }
    };

    xhr.open('GET', url, true);
    xhr.send();
}

function isset(arg)
{
    if(arg != undefined)
        return true;
    return false;
}