Then I spent a lot of time improving the performance of both the desktop and mobile versions.

I separated how the two layouts were rendered, reduced some box-shadows, and tried to improve my Lighthouse scores.

One thing I really loved was building an automatic image optimization system. I could just put the high-quality original image in a folder, and it would generate two versions for me: a thumbnail and a full-size image.

The thumbnail was resized to match the box where it would appear, cropped to remove anything outside the visible area, and compressed.
The full-size version, used in the lightbox, was just a slightly compressed version of the original.

This system made a huge difference in my site's performance. My Lighthouse Performance score went from 76 to 98 on desktop, and from 53 to 85 on mobile!
