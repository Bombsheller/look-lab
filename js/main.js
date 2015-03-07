// Hello!
// Welcome to Bombsheller's Look Labs. You can design leggings with code here.
// The graphics format we use is SVG. There are tons of resources online for SVG.
// Here's one: http://www.learnsvg.com/
// If you haven't yet, please read our Designing for Bodies page here:
// http://bombsheller.com/designing-for-bodies.html.

// How to start coding your design:
// 1) Open a shell (Terminal on Mac).
// 2) cd to the look-labs folder.
// 3) Type python -m SimpleHTTPServer.
// 4) Open localhost:8000.
// 5) Change the code below.
// 6) Refresh.
// 7) goto 5.

// When you are ready to save your design:
// 1) Click the "Make SVG" button to the right.
// 2) Click the "Download SVG" link that just appeared.
// 3) Test your design by dragging it directly into Artemix.bombsheller.com!
//    NOTE: If your design uses SVG filter effects (gaussian blur, shadow, etc)
//    or has lots and lots of elements you may need to rasterize it first. Read
//    about rasterization in step 5.
// 4) Tweak some variables for some variants, repeat 1-3.
//    Make sure you keep a copy of the draw() method somehow! We like git
//    branches. Copy-pasting this file into a folder with the design works, too.
// 5) Import design into Bombsheller's Adobe Illustrator template found at
//    http://bombsheller.com/download-the-template.html one .ai file per variant.
//    Hopefully you won't have to do this soon, but rigt now it's a necessary evil.
//    If you use any of SVGs filter effects in your design you'll have to use a
//    rasterizer to render your SVG to an image format to import. We've seen
//    success with webkit2png, found here: https://github.com/paulhammond/webkit2png.
//    We're exploring other rasterizers and are open to suggestions!
// 6) Submit @ http://bombsheller.com/submit-designs.html

// A NOTE ABOUT SIZING: The height of the XS template (what's presented to you
// right now) is ~37 inches. That makes the whole template svg ~40 inches.
// The height in SVG units is ~2880. (I intentionally don't put a unit
// denomination because SVGs are scalable. The assumed unit when putting SVGs
// in a browser is the browser's px unit, which does NOT correspond to pixels.)
// 2880 units / 40 in = 72 units / inch ~ 28 units / cm. Your pattern is smallest
// in the XS size. That is, a circle with diameter 72 units will be one inch
// across on an XS print of your design, but more like 1.3 inches in an M.
function draw (brush, width, height) {

    // Here's where we get to play with the artboard! We use the snap.svg.js
    // library to draw. Here are its docs: http://snapsvg.io/docs.
    // If you're an expert in d3 or some other SVG-generating library, feel free
    // to use that! You also will likely want to know about SVG. Mozilla's SVG
    // docs are excellent: https://developer.mozilla.org/en-US/docs/Web/SVG.
    // The W3C SVG spec lives here: http://www.w3.org/TR/SVG. There are tons of
    // tutorials online.

    // Since a lot of fun things come out of pseudorandom numbers, being able
    // to control the random number generator is important. We use the randomseed
    // library found here to do so: https://github.com/davidbau/seedrandom. If
    // you use Math.random() in your design, changing the input here will change
    // your design subtly.
    Math.seedrandom('bombsheller');

    // We start by making a couple of gradients because vector gradients rock.
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
    // You can type stripes into the console to add more shapes to the group.
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
// Plumbing is below. If you're curious about how Look Labs works, read on!
//
////////////////////////////////////////////////////////////////////////////////

function setup () {
    // Artboad setup:
    // This works by layering two <svg>s on top of each other. One is the
    // artboard (painted on with the brush variable), the other is the template.
    // In SVG, every node is a layer with conflicts resolved from bottom to top.
    // That is, things painted last are on top, just like in RL!
    // SVG's <g> node can be useful to create layers, but isn't always necessary.

    // We load the template SVG and set up our environment once we get its width
    // and height.
    Snap.load('assets/S12-01.svg', function (fragment) {

        var getDimension = function (fragment, dimensionName) {
            var value = fragment.node.firstElementChild.attributes.getNamedItem(dimensionName).value;
            return parseFloat(value);
        };
        width = getDimension(fragment, "width");
        height = getDimension(fragment, "height");

        var ratio = 0.30;
        style = Snap.format("position: absolute; left: 0; transform: scale({ratio}, {ratio}); margin-left: -{margin}; margin-top: -{margin}", {
            ratio: ratio,
            margin: Math.floor(width * (1 - ratio) / 2)
        });

        // Artboard creation.
        // This layer appears below the template because the brush variable is
        // added to the DOM before the template SVG.
        // You can even use brush in your console for some REPL painting action!
        // You will have access to any variables not proceeded with the var
        // declaration (i.e. almost all of them right now).
        brush = Snap(width, height)
            .attr({
                id: 'draw',
                style: style
            });

        // Now we add template <svg> to the DOM.
        s = Snap(width, height)
            .attr({ style: style })
            .append(fragment);

        // Positioning of download button and link.
        var margin = Math.floor(width * ratio);
        makeButton = document.getElementById('make');
        makeButton.style.marginLeft = margin + 'px';
        makeButton.style.fontSize = '30px';
        downloadLink = document.getElementById('download');
        downloadLink.style.marginLeft = margin + 'px';
        downloadLink.style.fontSize = '30px';

        draw(brush, width, height);

        function getSVGString () {
            var HTMLString = brush.toString();
            var styleIndex = HTMLString.indexOf('style');
            var styleLength = style.length + 8;
            console.log(styleLength);
            return HTMLString.slice(0, styleIndex) + HTMLString.slice(styleIndex + styleLength);
        }

        // Download helpers.
        function makeSVG () {
            var art = new Blob([getSVGString()], {type: 'text/svg'});
            var artURL = window.URL.createObjectURL(art);
            downloadLink.href = artURL;
            downloadLink.style.display = 'block';
        }

        document.getElementById('make').addEventListener('click', makeSVG, false);
    });
}

window.onload = setup;

////////////////////////////////////////////////////////////////////////////////
//
// Random notes
//
////////////////////////////////////////////////////////////////////////////////

// Could be made into a full-blown webapp by using http://ace.c9.io/#nav=about
// and http://repl.it/.