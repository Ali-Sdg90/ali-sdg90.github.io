Health Data Relay started from a very simple personal need.

For a while, I had been building a system for myself that used AI to write my daily reports. Things like my commits, how I felt during the day, activity from my phone and laptop, and a few other signals were collected automatically, and the final report was saved to my Google Calendar.

I really liked that system, and at some point I thought it would be great if my health and sleep data could be part of it too.

So I started looking for an app that could take information like my steps, sleep, and workout activity from my phone and make it available in the exact way I needed.

I couldn't find anything that really did that.

Around the same time, I had recently built an internal Android app for a company, so Android development was still fresh in my mind.

I thought: why not build it myself?

And that's where Health Data Relay started.

The idea was simple. Read health data from Health Connect and, every day at a time chosen by the user, save a compact report of that day's data to their own Google Drive.

The implementation was not nearly as simple.

Along the way, I ran into a lot of things I had never worked with before. Health Connect APIs, permission management, reliable background backups with WorkManager, Google Drive API, OAuth, application signing, and CI/CD with GitHub Actions.

A few times, I also had to completely change the approach I had chosen and find another way forward.

One of the hardest parts was getting the Google Drive access the app needed. For the app to be able to write files to a user's Drive, I had to go through Google's application and review process.

That became one of the darkest parts of the entire project. :)

But little by little, all the pieces started working together.

Eventually, I reached the point where the app could do exactly what I originally built it for, completely automatically and without me having to think about it.

That was the point where I felt genuinely proud of what I had built.

Then I thought: I've already come this far. Why not publish it?

That way, I could learn the full process of releasing a real application and also turn the project from a personal tool into something I could actually share with other people.

That opened another completely new part of the journey.

Testing on different devices, app signing, releases, Google Play Protect verification, marketing images, a Privacy Policy, the project website, and finally publishing the app on Cafe Bazaar and APKPure.

From the start of development to release, the whole journey took around a month and a half.

Health Data Relay is a very niche app, and I know it isn't something everyone needs.

But for me, it became one of my favorite projects because it started from a real problem I had, forced me to learn a lot of things I didn't know, and eventually became a complete product that actually worked, was open source, and could be released publicly.

It was one of those projects where every time I moved forward, another layer of something I didn't know opened up in front of me.

And I think that's exactly why I love it so much.
