At CS Internship, we'd been working on redesigning the program's admission process for several months. During that time, I suggested replacing one of the program's old, manual processes with a fully automated system.

CS Internship had a Telegram group called the Waiting Queue, where people interested in joining the program would gather and gradually get their turn for an admission interview.

For years, the process had worked like this: anyone who wanted to join the Waiting Queue had to contact the person managing it that week, who would then manually add them to the group. After that, the queue manager would explain what they needed to do to prepare for their interview and go through the admission process.

I came up with an idea to make this entire process automated and much easier.

My suggestion was to make the Waiting Queue's invitation link publicly available on the program's introduction page, which was hosted on Virgool at the time. Anyone interested in joining could first read that page and, if they wanted to continue, join the Waiting Queue through the link.

Then we'd have a Telegram bot that would detect whenever someone new joined the group, welcome them, and explain what they needed to do to go through the admission and interview process.

This change could make a huge difference for the program. One of the major bottlenecks in the admission process would be completely removed and replaced with an automated system. People could start their own admission journey without having to wait for the queue manager or anyone else.

I proposed the idea, and once it was approved, I started building the Telegram bot.

This was the second Telegram bot I'd ever built, and the first one I was creating for CS Internship. I'd really started enjoying building Telegram bots, and I remember working on this project with a lot of excitement.

I built the first version, which could welcome new applicants and guide them through the steps needed to begin their interview process.

Then I started adding a few more features to take care of the Waiting Queue and keep the group organized.

For example, I didn't want people to be able to add other bots to the group. So I built a feature that automatically removed any bot that joined and recorded information about that bot and the person who had added it in the group.

I also added a spam detection system. If someone sent more than a certain number of messages within a very short period, like a single second, they'd be identified as a spammer and automatically removed from the group.

I even added a feature for situations where someone tried to add my bot to another group. The bot would explain that it was built specifically for CS Internship and send a custom-generated link that the person could use to join the program's official Waiting Queue. Information about the person who tried to add the bot, along with details about that group, would also be recorded in the system logs.

But one of the most important features I added was integrating the bot with the program's Azure DevOps.

For this part, I designed a new Board, a Feature, and a Backlog template.

The idea was that whenever a new applicant joined the Waiting Queue, the bot would immediately create a Backlog for them in a specific location on the program's Azure DevOps board.

The Backlog would be filled with the person's name and Telegram username. Its Description would also include a link to the welcome message the bot had sent when they joined the group.

These Backlogs were going to be used throughout the interview process. From then on, every applicant who joined the Waiting Queue and started the admission process would have their own Backlog.

Whenever someone completed an interview stage and moved on to the next one, the person responsible for that interview would update their Backlog to reflect their current status in the admission process.

The idea behind this system, designing the board, creating the templates, and implementing the integration with the bot were all my work. :)

It's one of the parts of this project I'm especially proud of.

There was another issue, too. We needed a unique identifier for each applicant so we could identify them and track their progress through the different stages.

I decided to use each person's Telegram username for this and store it in the title of their Backlog.

But what if someone joined the group without having a Telegram username?

So I added another feature that would detect when a new member didn't have a username and send them a message explaining that they needed to set one up before they could enter the registration and interview process.

I even included a YouTube video showing them how to do it. Once they'd created their username, they had to let us know in the group so they could continue with the interview process.

The first version of the bot worked really well. I introduced it, and as the new admission process went live, the bot started doing its job too.

About a month later, another need came up.

We needed people attending online sessions to share their Telegram usernames with the session organizers before the session started.

So I added another feature to the bot.

This time, applicants would open a private chat with the bot. It would welcome them and explain how to submit their Telegram username to the program.

Once they sent their username, they'd receive a confirmation message. At the same time, their information would be forwarded to the mentors' group so the mentor hosting the session could access the usernames of the participants.

I also added a banning feature for this part. If someone tried to abuse the ability to send messages to the mentors' group, the mentors could ban that person so none of their future messages would be forwarded to the group.

The interesting thing was that during the roughly 1.5 years I was still part of the program and the bot was running, we never actually needed to use that feature. Nobody abused the messaging system, there were no spam incidents, and nobody tried to add another bot to the group.

I'm glad none of those things happened, but if they had, the system was ready to handle them. :)

So, in short, what looked like a bot that simply said hello to new members was actually taking care of all kinds of things in the background!

From welcoming and guiding applicants to preventing spam, controlling other bots joining the group, automatically creating Backlogs in Azure DevOps, and helping session organizers.

All of this was meant to keep the group organized and make the admission and interview process easier for applicants.

Just like the other two projects I'd built for CS, I also set up a complete testing and CI/CD system for this bot.

From the beginning, I knew this wasn't going to be a bot I'd simply build and hand over to the program. It might still be in use years after I left, and it could need changes and updates along the way.

So I wrote thorough, detailed test cases using Jest and also used Husky and Semantic Release.

Here's how it worked: whenever someone tried to make a commit, Husky would first check whether the commit message followed the Semantic Release conventions.

Then all the test cases would run through Jest, and the commit would only be allowed if every test passed and everything was working correctly.

After the commit was made, the CI/CD pipeline would build and test the project again. If every step succeeded, it would create a new version and release it.

The new version would then be updated automatically. Finally, a Telegram bot would announce in the program's mentors group who had made the commit and which project it was made to.

I'd put a lot of work into this part because it mattered to me that maintaining and developing the bot would remain easy and reliable even after I left.

In the end, I'd built a system to take care of the program's admission process, and that system had its own collection of tools to take care of its operation and maintenance.

A system built by someone who cared about making something that could do its job professionally, completely, and even go beyond what it was originally supposed to do.

The bot became one of the program's most important tools and continued doing its job even after I left CS Internship.

It's still there, doing what it was built to do, taking care of the Waiting Queue and helping new applicants begin their journey into the program.

I'm proud of what it is :)
