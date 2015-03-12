# Bombsheller Look Lab
An in-browser "batteries included" place to code vector graphics Bombsheller leggings designs.
You have to install *nothing* to get hacking!

The graphics format we use is SVG.
There are tons of resources online for SVG.
Here's one: http://www.learnsvg.com/.
Mozilla's SVG docs are excellent: https://developer.mozilla.org/en-US/docs/Web/SVG.
The W3C SVG spec lives here: http://www.w3.org/TR/SVG.

The SVG generation library we use is [Snap.svg](snapsvg.io).
Here are its docs: http://snapsvg.io/docs.
If you're an expert in [D3](d3js.org) or some other SVG-generating library, please use it!

If you haven't yet, please read our Designing for Bodies page here:
http://bombsheller.com/designing-for-bodies.html.

## How to start coding your design:
1. Open a shell (Terminal on Mac).
2. `cd` to the look-labs folder.
3. Type `python -m SimpleHTTPServer`.
4. Open localhost:8000 in your web browser of choice.
5. Change the code below.
6. Refresh your browser.
7. `goto 5`.

A note about sizing: The height of the XS template (what's presented to you
right now) is ~37 inches. That makes the whole template svg ~40 inches.
The height in SVG units is ~2880. (I intentionally don't put a unit
denomination because SVGs are scalable. The assumed unit when putting SVGs
in a browser is the browser's px unit, which does NOT correspond to pixels.)
2880 units / 40 in = 72 units / inch ~ 28 units / cm. Your pattern is smallest
in the XS size. That is, a circle with diameter 72 units will be one inch
across on an XS print of your design, but more like 1.3 inches in an M.

## When you are ready to save your design:
1. Click the "Make SVG" button to the right.
2. Click the "Download SVG" link that just appeared.
3. Test your design by dragging it directly into Artemix.bombsheller.com!
   NOTE: If your design uses SVG filter effects (gaussian blur, shadow, etc)
   or has lots and lots of elements you may need to rasterize it first. Read
   about rasterization in step 5.
4. Tweak some variables for some variants, repeat 1-3.
   Make sure you keep a copy of the draw() method somehow! We like git
   branches. Copy-pasting this file into a folder with the design works, too.
5. Import design into Bombsheller's Adobe Illustrator template found at
   http://bombsheller.com/download-the-template.html one .ai file per variant.
   Hopefully you won't have to do this soon, but rigt now it's a necessary evil.
   If you use any of SVGs filter effects in your design you'll have to use a
   rasterizer to render your SVG to an image format to import. We've seen
   success with webkit2png, found here: https://github.com/paulhammond/webkit2png.
   We're exploring other rasterizers and are open to suggestions!
6. Submit @ http://bombsheller.com/submit-designs.html

Happy designing!