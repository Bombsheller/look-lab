// Fill out this method to make your design! We use the snap.svg library to
// draw. Here are its docs: http://snapsvg.io/docs. If you're an expert in d3 or
// some other SVG-generating library, feel free to use that.
function draw (brush, width, height) {

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