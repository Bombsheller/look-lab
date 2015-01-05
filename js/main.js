function setup () {
    // Artboad setup:
    // This works by layering two <svg>s on top of each other. One is the
    // artboard, the other is the template. In SVG, every node is a layer with
    // conflicts resolved from top to bottom. If you want that to be useful, you
    // have to get good at using SVG's <g> node to create layers, or use them as
    // masks or fills or other fun things. Or lay down your shapes in the right
    // order ;-)

    // We load the template SVG and set up our environment once we get its width
    // and height.
    Snap.load('assets/S12-01.svg', function (fragment) {

        var getDimension = function (fragment, dimensionName) {
            var value = fragment.node.firstElementChild.attributes.getNamedItem(dimensionName).value;
            return parseFloat(value);
        };
        width = getDimension(fragment, "width");
        height = getDimension(fragment, "height");

        makeButton = document.getElementById('make');
        makeButton.style.marginLeft = width + 'px';
        makeButton.style.fontSize = '100px';
        downloadLink = document.getElementById('download');
        downloadLink.style.marginLeft = width + 'px';
        downloadLink.style.fontSize = '100px';

        // First <svg>. Needs to be added to the DOM first to be below the template.
        brush = Snap(width, height)
            .attr({
                id: 'draw',
                style:"position: absolute;left: 0;"
            });

        // Now we add template <svg> to the DOM.
        s = Snap(width, height)
            .attr({ style:"position: absolute;left: 0;" })
            .append(fragment);

        draw(brush, width, height);
    });

    // Download helpers.
    function makeSVG () {
        var art = new Blob([brush.toString()], {type: 'text/svg'});
        var artURL = window.URL.createObjectURL(art);
        downloadLink.href = artURL;
        downloadLink.style.display = 'block';
    }

    document.getElementById('make').addEventListener('click', makeSVG, false);
}

window.onload = setup;

// Here's where you get to play with the artboard! We use snap.svg.js to
// make these shapes (for now; the library could be substituted provided it
// generates an SVG). Here are its docs: http://snapsvg.io/docs. You also
// will likely want to know about SVG. Normally when I want to know I just
// Google or cmd + F on http://www.w3.org/TR/SVG/paths.html or other SVG docs
// (Mozilla's are nice).
// Maybe D3 could be fun to use: http://d3js.org/.

// WHEN YOU ARE READY TO SAVE YOUR DESIGN:
// 1) Click the "Make SVG" button to the right.
// 2) Click the "Download SVG" link that just appeared.
// 3) Test your design by dragging it directly into Artemix.bombsheller.com
// 4) Tweak some variables for some variants (or something), repeat 1-3.
//    Make sure you keep a copy of the draw() method somehow! I use git
//    branches. Copy-pasting this file into a folder with the design works, too.
// 5) Submit @ http://bombsheller.com/submit-designs.html

// A NOTE ABOUT SIZING: The height of the XS template (what's presented to you
// right now) is ~37 inches. That makes the whole template svg ~40 inches.
// The height in SVG units is ~2880. (I intentionally don't put a unit
// denomination because SVGs are scalable. The assumed unit when putting SVGs
// in a browser is the browser's px unit, which does NOT correspond to pixels.)
// 2880 units / 40 in = 72 units / inch ~ 28 units / cm.
function draw (brush, width, height) {

    // Since a lot of fun things come out of pseudorandom numbers, being able
    // to control the random seed is important. We use the randomseed library
    // found here to do so: https://github.com/davidbau/seedrandom.
    Math.seedrandom('bombsheller');

    // Start by making a couple of gradients because vector gradients rock.
    // This layer appears below the template because the brush variable was
    // added to the DOM before the template SVG (see above method).
    // You can even do stuff in your console for some REPL action using the
    // using the brush variable to draw things!
    // You will have access to any variables not proceeded with the var
    // declaration (i.e. almost all of them right now).
    topToBottom = brush.gradient(
        Snap.format("L({x1}, {y1}, {x2}, {y2}){c1}-{c2}", {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: height,
                    c1: "#e6ab5a",
                    c2: "#51388F"
    }));

    bottomToTop = brush.gradient(
        Snap.format("L({x1}, {y1}, {x2}, {y2}){c1}-{c2}", {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: height,
                    c1: "#fff",
                    c2: "#222"
    }));

    // Background gradient
    square = brush.rect(0, 0, width, height);
    square.attr({fill: topToBottom});

    // Path string for the XS leggings template outline. Helps remove paths
    // that aren't completely on the leggings (so seams are less noticable).
    xsPath = s.select("#Sew_Lines #Sew_Lines_1_").toString();

    // Other layers on top of the background. Uncomment to see what they do.

    // Stripes.
    // // You can type stripes into the console to add more shapes to the group.
    // stripes = brush.g();
    // var fraction = width / 24;
    // for (var i = 0; i < 24; i++) {
    //     var x = i * fraction;
    //     var lineWidth = fraction / 2;
    //     stripes.rect(x, 0, lineWidth, height);
    // };

    // Text.
    // shells = brush.text(500, 500, "#SHELLS")
    //     .attr({
    //         fontSize: "100"
    //     });

}

////////////////////////////////////////////////////////////////////////////////
//
// Random notes
//
////////////////////////////////////////////////////////////////////////////////

// Could be made into a full-blown webapp by using http://ace.c9.io/#nav=about
// and http://repl.it/.