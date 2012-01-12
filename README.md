## deeplink

[deeplink](http://draeton.github.com/deeplink/) is a small utility for working with deeplinks.
The current version is `0.1.7`. Documentation is available
[here](http://draeton.github.com/deeplink/deeplink/docs/deeplink.html).


## Implementation

    <script src="js/jquery-1.7.1.min.js"></script>
    <script src="js/deeplink-0.1.7-min.js"></script>


## Usage

Each new Deeplink instance is a new object monitoring the window.onhashchange event (or a custom monitoring function for older browsers). This is the simplest way to call the constructor:

    var d = new Deeplink();

You may also specify strings for the hash equality and separator values:

    var d = new Deeplink(":", ",");

### .hashchange

Every "hashchange" event triggers a "deeplink" event on the Deeplink instance. Any functions that need information from this event should be bound to the instance. These functions receive two arguments: a jQuery Event, and a data object with the data.hash string and a data.map key-value object:

    var d = new Deeplink();

    var goto = function (e, data) {
        var hash = data.hash;
        var map = data.map;
    };

    $(d).bind("deeplink", goto);

### .hashupdate

One other method to note is "hashupdate". If your code updates the state of the page in a way that needs to be referenced by a deeplink, you may pass a key-value object into this method to update the page URL. This method has three parameters:

* **map**: The key-value object that updates the hash parameters
* **replace**: A boolean that specifies whether the entire hash should be replaced
* **fire**: A boolean that specifies whether this update should trigger a deeplink event on this instance

Sample usage:

    var d = new Deeplink();

    var changePanel = function (id) {

        // do stuff to change the panel

        d.hashupdate({"panel", id});
    };

    changePanel(4);

### Deeplink.setDelay

A final method to review is Deeplink.setDelay, which allows you to modify the timeout length between hash checks in
browsers that don't support the window.onhashchange event:

    Deeplink.setDelay(500); // in milliseconds


## Dependencies

jQuery 1.7+


## License

(The MIT License)

Copyright (c) 2012, <[Matthew Cobbs](mailto:draeton@gmail.com)>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.