I started working seriously with GitHub Actions in early 2025 while building CS Queue Calendar.

The project lived inside the CS Internship organization, and I didn't see it as just another small project. It was something that was supposed to stay around after I left and continue being developed and maintained by the program for years.

Because of that, I wanted to build it as professionally and cleanly as I could. I wanted to leave behind something that didn't just work today, but would also be easy to maintain and develop later.

CI/CD was one of the things I discovered while working toward that goal.

My first CI/CD setup was already fairly complete.

Whenever new code was pushed, it would first run the tests I had defined for the project. If everything passed, the workflow would determine the next version through Semantic Release, create a new release, build the application, and deploy the new version to GitHub Pages.

Once I got the whole flow working, I fell in love with how automated it was.

It felt like building a well-oiled machine. I would push my code on one side, and on the other side the system would test it, create the version, publish the release, build the project, and deploy it automatically.

Later, I even added Telegram notifications. After each workflow run, it would send a message to the program's mentors group and report whether the CI/CD process had succeeded or failed.

I later built similar workflows for two other major CS Internship projects, CS Queue Bot and CS Club Bot.

At that point, CI/CD wasn't just a cool feature anymore. It had become part of how we protected the live versions of those projects. Changes were checked before reaching production, and if something went wrong, the people responsible were notified.

Gradually, this way of working became one of my own standards.

For almost every serious project I built after that, I tried to set up the right CI/CD workflow early so repetitive work in the future could be automated and releasing a project wouldn't depend on manually following a long list of steps.

I also built CI/CD workflows for projects I developed for companies, depending on what each project needed.

One of my favorite setups was in Health Data Relay.

GitHub Actions could build the Android application, sign the APK using my own developer signing setup, and publish the finished version as a release.

Even this portfolio you're looking at has its own CI/CD workflow. Semantic Release handles versioning, releases and changelogs are generated automatically, and the project is built and deployed without me having to manually go through the release process.

GitHub Actions is one of those tools I genuinely enjoy working with.

I like the automation itself, but I especially like spending time designing a process once and then knowing the project can repeat that process cleanly and predictably without depending on me doing everything by hand.

I think I have a strong understanding of GitHub Actions at this point, and it's definitely one of the first things I'll consider adding to serious projects in the future.
