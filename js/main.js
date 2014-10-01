window.onload = function () {
    Snap.load('assets/template-v11.1.svg', function (fragment) {

        var getDimension = function (fragment, dimensionName) {
            var value = fragment.node.firstElementChild.attributes.getNamedItem(dimensionName).value;
            return parseFloat(value);
        };
        w = getDimension(fragment, "width");
        h = getDimension(fragment, "height");

        // First SVG. Needs to be declared first to be below template.
        art = Snap(w, h)
            .attr({
                id: 'draw',
                style:"position: absolute;left: 0;"
            });

        // Now we add template SVG to DOM.
        s = Snap(w, h)
            .attr({ style:"position: absolute;left: 0;" })
            .append(fragment);

        draw(art, w, h);
    });

    function draw (b, w, h) {
        // Background: a square that covers the whole area with a gradient fill.
        // Notice that we can now edit this after we've loaded the template. Sweet!
        // You can even do stuff in your console! You have access to any variables
        // not proceeded with the var declaration (i.e. almost all of them right now).
        square = b.rect(0, 0, w, h);
        topToBottom = b.gradient(Snap.format("L({x1}, {y1}, {x2}, {y2}){c1}-{c2}", {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: h,
            c1: "#e6ab5a",
            c2: "#51388F"
        }));
        square.attr({fill: topToBottom});

        bottomToTop = b.gradient(Snap.format("L({x1}, {y1}, {x2}, {y2}){c1}-{c2}", {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: h,
            c1: "#000",
            c2: "#fff"
        }));

        // Various things on top of the gradient.

        // for (var i = 200; i >= 0; i--) {
        //     var c = b.circle(Math.random() * w, Math.random() * h, Math.random() * 100);
        //     var greyVal = Math.random() * 255;
        //     var color = Snap.rgb(greyVal, greyVal, greyVal);
        //     c.attr({ fill: bottomToTop, class: 'circly'});
        // };

        var width = 20;
        for (var i = 0; i < 30; i++) {
            var y = (i / 31) * h;
            b.line(0, y, w, y).
                attr({
                    strokeWidth: width,
                    stroke: bottomToTop
                });
        };

        // var twentieth = w / 24;
        // for (var i = 0; i < 24; i++) {
        //     var x = i * twentieth;
        //     var width = twentieth / 2;
        //     b.rect(x, 0, width, h);
        // };
    }
};