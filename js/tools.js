// Here's where you can store utility methods (things that draw certain shapes,
// for example) and colors. It's useful to keep adding to this file and treating
// it as your personal artist's pallette!

// Here are some flat grey tones.
var greys = ['#222', '#666', '#aaa', '#ddd'];

// Get the points for a hexagon centered at an inputted point.
function hexagonPoints (center, radius, angle) {
    var points = [];
    for (var i = 0; i < 6; i++) {
        points.push({
            x: center.x + radius * Math.cos(angle),
            y: center.y + radius * Math.sin(angle)
        });
        angle += Math.PI / 3;
    }
    return points;
}

// Get some random points (use these as the centers for the hexagons!).
function randomPoints (number, width, height) {
  var points = [];
  for (var i = number - 1; i >= 0; i--) {
    points.push({
      x: width * Math.random(),
      y: height * Math.random()
    });
  }
  return points;
}

// Utility function to turn points [ { x: n, y: m }, ... ] into [n, m, ...] for
// snap's drawing methods.
function pointsToSnapArray (points) {
    var toReturn = [];
    for (var i = 0; i < points.length; i++) {
        toReturn[2 * i] = points[i].x;
        toReturn[2 * i + 1] = points[i].y;
    }
    return toReturn;
}