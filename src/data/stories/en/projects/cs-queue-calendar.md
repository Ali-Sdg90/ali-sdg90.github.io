At CS Internship, we'd been working on redesigning the program's admission process for several months. I'd spent months planning it, and together with the rest of the team, we'd put a lot of work into it. Now the new process was finally getting close to being launched.

In the new system, certain sessions would take place on fixed days and at fixed times every week. But there was a complication. The sessions changed every other week, and their order followed a specific pattern. So you couldn't simply say that these sessions would happen in the first week of the month and those sessions in the second.

Explaining this schedule was difficult, and for someone who was just trying to join the program, figuring out exactly which session would happen on which day could be pretty confusing.

I remember one of the mentors suggested having a long GitHub page listing which sessions would take place on which dates.

I really didn't like that idea.

I tried putting myself in the shoes of someone who had just gathered the courage to join a new program, decided to spend their time getting to know it, and was ready to start something new. And then the first thing they'd see when trying to understand the schedule would be an incredibly long list of dates and session names!

On top of that, the list would need to be constantly updated to keep the information about upcoming sessions accurate.

I didn't think it was a good solution at all.

So I suggested building a calendar. A simple web app where applicants could open the page and see which session would take place on each day and at what time.

Once the idea was approved, I started building it.

At the time, I was also working on a large project at Dadeh Pardazi Azmoudeh Karan using React and Ant Design, so I was already very comfortable working with both.

I went to the Ant Design website and noticed that the library had a really nice Calendar component. I loved it. This library has everything...

The component was pretty general-purpose, though, and wasn't designed for the Persian calendar. So I had to make quite a few changes to get it working the way our program needed.

One of the main challenges was using the Solar Hijri calendar inside a component that worked with the Gregorian calendar by default. I had to make sure the dates and sessions were displayed correctly in the Persian calendar without breaking the scheduling calculations.

The calendar also allowed users to move between different weeks and months. They could navigate forward and even see when the program's sessions would take place the following year.

It was important to me that the calendar wouldn't just show a list of upcoming sessions, but could display the program's schedule for whatever date someone wanted to check.

I think building the first version took around five or six days.

I'd built a clean, minimal, professional-looking calendar that displayed the session information.

From the beginning, I spent a lot of time on the small details, the smoothness of the animations, getting the styling right, and the overall appearance of the app. This page was going to be one of the first things new CS applicants interacted with, and I wanted them to have a good experience.

I'd even added a theme switcher with a custom animation. Like with my other projects, I wanted even the small details to feel polished and work properly.

Around that time, I'd just started learning about TDD, writing test cases, and Jest, so I decided to use them in this project.

I knew this calendar was going to be used by the program for a long time, and I wouldn't always be around to take care of it.

So I wrote a really thorough set of test cases for it. Maybe I even went a little too far with some of the details...

But I wanted anyone who worked on the project later to be able to make changes confidently, run the tests, and make sure nothing had broken.

I'd also recently learned about Husky, so I built an interesting system for handling commits.

Before allowing a commit, the system would first check the commit message using Semantic Release Preview, then run all the test cases. Only if everything was correct and all the tests passed would it allow the commit to go through! I thought that part was really cool.

I also set up a complete CI/CD system for the project. It would build and test the code, create a new version, and handle the release process. Once everything was done, it would announce the result in the program's mentors group through a Telegram bot.

A few months passed, and the program had been using the calendar during that time.

At CS, one of the program members was assigned to manage the waiting queue group each week. One of their tasks was to prepare a message introducing the following week's sessions and post it in the group so applicants would know what was coming up.

I thought, why not handle this part through the calendar too?

The calendar already knew exactly which session would take place on each date and what its meeting link was. So all the information and scheduling calculations needed to generate that message were already there.

I decided to add the feature myself.

I added a modal that automatically generated the message for the upcoming week's sessions, using the proper formatting and Markdown.

From then on, whoever was managing the waiting queue group only needed to open the web app, copy the generated message, and send it to the group.

They no longer had to manually prepare the dates, session order, meeting links, and message formatting every week.

Over time, this project became one of the program's most frequently used tools.

More than 160 people joined the waiting queue group during that period. Through the calendar, they could get familiar with the schedule and admission process, and join the designated sessions if they wanted to.

About a year later, I had a little more free time and decided to return to the project.

When I looked at the calendar again, I felt I could make the UI much better and more professional.

So I started redesigning different parts of it.

I added a section at the top explaining how to use the app. I improved the hover interactions and date display, changed how session details opened, and made the sessions themselves look more minimal.

I also added colored labels to make it easier to tell the different sessions apart.

I redesigned the mobile and tablet layouts too, making sure the app was fully responsive and looked clean and worked properly across different screen sizes.

In the same update, I added another feature I really liked: adding sessions to Google Calendar.

With just one click, users could add an event for their selected session to their own Google Calendar.

The event would have the exact date and time, and even include the full session description in its Description field. I really liked this integration.

It didn't take a huge amount of work to add, but it could make things much easier for applicants who wanted to attend the sessions. I'd build the feature once, and people could keep using it for years. Maybe that one feature would be enough to help someone remember a session and actually attend it.

I thought it was worth it.

During that same redesign, I also added a little something I really love: a hidden Easter egg!

A personal letter for anyone curious enough to explore and learn a little more about how the app was built.

I'm not going to say exactly where it is, but I personally really like that part. :)

Once the changes were finished, I introduced the new update and got some nice feedback from my friends who were using the calendar.

Some time later, I left CS Internship, but the calendar kept doing its job.

New applicants could still open it, check the session schedule, and use it to understand the steps involved in joining the program.

After I left, some of the links in the project needed to be updated.

When I saw that a few interns who had once been part of the web development track had gone into the project and made the necessary changes themselves, it made me feel really good.

My little creation didn't depend on me anymore. Other people could take care of it, and they wanted to.

That was exactly one of the things that had mattered to me from the very beginning: building a tool that could keep working after I left, and that other people could maintain and improve.

CS Queue Calendar was one of my favorite projects. It started from a real need within the program, gradually gained more features, and became one of CS's important tools.

A project I built with so much care, left a little piece of my soul in its heart, and now, even after I've left, it's still alive and helping new applicants.

What more could I ask for? :)
