window.onload = function () {
    // Artboad setup:
    // This works by layering two <svg>s on top of each other. One is the
    // artboard, the other is the template. In SVG, every node is a layer with
    // conflicts resolved from top to bottom. If you want that to be useful, you
    // have to get good at using svg's <g> node.
    Snap.load('assets/template-v11.1.svg', function (fragment) {

        var getDimension = function (fragment, dimensionName) {
            var value = fragment.node.firstElementChild.attributes.getNamedItem(dimensionName).value;
            return parseFloat(value);
        };
        width = getDimension(fragment, "width");
        height = getDimension(fragment, "height");

        // First SVG. Needs to be added to the DOM first to be below the template.
        art = Snap(width, height)
            .attr({
                id: 'draw',
                style:"position: absolute;left: 0;"
            });

        // Now we add template SVG to the DOM.
        s = Snap(width, height)
            .attr({ style:"position: absolute;left: 0;" })
            .append(fragment);

        draw(art, width, height);
    });

    // Here's where you get to play with the artboard! We use snap.svg.js to
    // make these  shapes (for now; the library could be substituted provided it
    // generates an SVG). Here are its docs: http://snapsvg.io/docs. You also
    // will likely want to know about SVG. Normally when I want to know I just
    // Google or cmd + F on http://www.w3.org/TR/SVG/paths.html or other SVG docs.
    // Maybe D3 could be fun to use http://d3js.org/.

    // Could be made into a full-blown webapp by using http://ace.c9.io/#nav=about
    // and http://repl.it/ and getting SVGs from post data...?

    // WHEN YOU ARE READY TO SAVE YOUR DESIGN:
    // 1) Click the "Download SVG" button waaaaay out to the right.
    // 2) Cmd + S that sucker. Change the filename end to .svg. Accept the prompt.
    // 3) (Optional) Test your design by dragging it directly into Artemix. If
    //    it looks wonky you might have to add a white background.
    // 4) Tweak some variables for some variants (or something), repeat 1-3.
    //    Make sure you save a copy of the draw() method in the folder with your
    //    design! Wouldn't want to lose that ;-)
    // 5) Submit @ http://bombsheller.com/submit-designs.html
    function draw (svg, width, height) {

        // Start by making a couple of gradients because vector gradients rock.
        // Notice that we can now edit this after we've loaded the template.
        // You can even do stuff in your console for some REPL action. (Use the
        // art variable instead of svg, though.)
        // You have access to any variables not proceeded with the var
        // declaration (i.e. almost all of them right now).
        topToBottom = svg.gradient(
            Snap.format("L({x1}, {y1}, {x2}, {y2}){c1}-{c2}", {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: height,
                        c1: "#e6ab5a",
                        c2: "#51388F"
        }));

        bottomToTop = svg.gradient(
            Snap.format("L({x1}, {y1}, {x2}, {y2}){c1}-{c2}", {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: height,
                        c1: "#fff",
                        c2: "#222"
        }));

        // Background gradient
        square = svg.rect(0, 0, width, height);
        square.attr({fill: topToBottom});

        // Path string for the XS leggings template outline. Helps remove paths
        // that aren't completely on the leggings (so seams are less noticable).
        xsPath = s.select("#Guides #Sew_Lines").toString();

        // Other layers on top of the background. Uncomment to see what they do.

        // Stripes.
        // // You can type stripes into the console to add more shapes to the group.
        // stripes = svg.g();
        // var fraction = width / 24;
        // for (var i = 0; i < 24; i++) {
        //     var x = i * fraction;
        //     var lineWidth = fraction / 2;
        //     stripes.rect(x, 0, lineWidth, height);
        // };

        // Text.
        // shells = svg.text(500, 500, "#SHELLS")
        //     .attr({
        //         fontSize: "100"
        //     });

    }

    // Download helpers.
    function downloadSVG () {
        window.open('data:text/xml;charset=utf-8,' + escape(art.toString()));
    }

    document.getElementById('download').addEventListener('click', downloadSVG);
};