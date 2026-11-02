This was where the most complicated change in the project happened. It is not really visible in the design, but I made all the items inside the shelf use cqw!

Basically, the size of every item inside the shelf became dependent on the size of the shelf parent. This helped me finally implement a feature I was really stressed about, in a very clean way. The project would always look the way it was designed, on any screen, monitor, or zoom level.

Then I made the size of the shelf parent div depend on the width and height of the monitor, so changing the zoom or the screen could no longer break the shelf, or make it and its items too small or too big!

Oh, and yeah, I also filled the left side of the page.
