---
layout: default
title: Deeplink - Easy-peasy deeplinking manager
---

<section id="main" role="main">

[Deeplink](http://github.com/draeton/deeplink/) is a small utility for working with deeplinks.


## Implementation

{% highlight html %}
<script src="js/jquery-1.7.1.min.js"></script>
<script src="js/deeplink-0.1.10-min.js"></script>
{% endhighlight %}

Documentation is available [here.](http://draeton.github.com/deeplink/deeplink/docs/deeplink.html)


## Usage

Each new Deeplink instance is a new object monitoring the window.onhashchange event (or a custom monitoring function for older browsers). This is the simplest way to call the constructor:

{% highlight js %}
var d = new Deeplink();
{% endhighlight %}

You may also specify strings for the hash equality and separator values:

{% highlight js %}
var d = new Deeplink(":", ",");
{% endhighlight %}

Every "hashchange" event triggers a "deeplink" event on the Deeplink instance. Any functions that need information from this event should be bound to the instance. These functions receive two arguments: a jQuery Event, and a data object with the data.hash string and a data.map key-value object:

{% highlight js %}
var d = new Deeplink();

var goto = function (e, data) {
    var hash = data.hash;
    var map = data.map;
};

$(d).bind("deeplink", goto);
{% endhighlight %}

One other method to note is "hashupdate". If your code updates the state of the page in a way that needs to be referenced by a deeplink, you may pass a key-value object into this method to update the page URL. This method has three parameters:

* map: The key-value object that updates the hash parameters
* replace: A boolean that specifies whether the entire hash should be replaced
* fire: A boolean that specifies whether this update should trigger a deeplink event on this instance

Sample usage:

{% highlight js %}
var d = new Deeplink();

var changePanel = function (id) {

    // do stuff to change the panel

    d.hashupdate({"panel", id});
};

changePanel(4);
{% endhighlight %}


## Dependencies

jQuery 1.7+


## Contributing

* [Fork the project.](https://github.com/draeton/deeplink)
* Read through the [outstanding issues or report new ones.](https://github.com/draeton/deeplink/issues)
* Write some tests to make sure we don't accidentally break each other's code.
* Send a pull request.


## License

[MIT](https://raw.github.com/draeton/deeplink/master/LICENSE)


## Download

The latest release, **0.1.10 is [available here](http://draeton.github.com/deeplink/deeplink/dist/deeplink-0.1.10.zip).**

You can download this project in either [zip](https://github.com/draeton/deeplink/zipball/master)
or [tar](https://github.com/draeton/deeplink/tarball/master) formats.

You can also clone the project with [Git](http://git-scm.com) by running:

    $ git clone git://github.com/draeton/deeplink

</section>