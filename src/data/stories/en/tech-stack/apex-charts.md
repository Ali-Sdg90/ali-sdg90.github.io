I first used ApexCharts in one of my earliest React projects, React Dice Distribution.

At the time I was still learning React itself, so I slowly learned ApexCharts through its documentation and demos other people had built with it. This was before ChatGPT and AI became part of my development workflow, so most of the process was documentation, searching, testing, and figuring things out myself.

I really liked how powerful and flexible the library was.

I also learned one of its limitations the painful way in React Dice Distribution. ApexCharts renders SVG, and when you're trying to update and redraw charts extremely frequently, like every half second, the browser isn't particularly happy about constantly creating and removing all of that SVG.

Years later I came back to ApexCharts in Spotify Taste Timeline, this time in a much more modern project built with help from Codex.

I needed several different kinds of charts and visualizations, and because the project was already React-based, ApexCharts was an easy choice. A huge part of the experience of that project comes from the charts the library helped me build.

It's a really powerful and versatile library. Maybe not what I'd choose for extremely high-frequency updates, but for almost everything else, I really like it.
