(function (window, undefined) {

    "use strict";


    module("main", {
        teardown: window.moduleTeardown
    });


    test("Dependencies", 1, function () {
        ok(Deeplink, "Deeplink exists.");
    });


}(window));