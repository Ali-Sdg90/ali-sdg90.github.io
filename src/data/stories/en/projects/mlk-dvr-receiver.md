Building MLK DVR Receiver was one of the most enjoyable and rewarding programming experiences I have had.

Previously, the process of receiving login codes for Divar accounts was completely manual. When someone needed a code, they would ask in the group who was online. The person who was available would send their phone number in the group, the requester would enter that number on the website, an SMS would be sent to the phone owner, and they would then have to send the code back into the group so the requester could enter it.

The whole process was manual, time-consuming, and inconvenient for everyone involved.

When I saw how the process worked, I felt it could be made much simpler.

I shared my idea in the group and mentioned the CEO and CTO. My proposal was to build a separate app that could be installed on the phones. The app would stay active in the background, detect incoming Divar SMS messages, automatically extract the verification code, and send it to the group through the Telegram API.

After getting initial approval, I built the first version only for my own phone. It was a simple app that stayed active in the background and automatically sent the code to the group whenever a Divar SMS arrived.

Requesters would enter my phone number, and a few moments later they could receive the code directly in the group.

After only one day of using this version and receiving very positive feedback from the requesters, the CEO suggested that the other people in the group install the app as well. Within a short time, around 6 or 7 people had installed it on their phones, and getting login codes had become significantly easier for the requesters.

But this was only the MVP, and it had one important problem: security and traceability.

In the first version, there was no clear record of who had requested a code. The app simply extracted the code from the SMS and sent it into the group. If a problem later happened with one of the accounts, there was no reliable way to determine who had received its login code and at what time.

Because of that, I decided to design a more complete and professional version.

The new version included a backend for managing requests, authentication, and event logging. In about three days, I implemented the first version of this architecture and introduced it in the group for testing.

In the new version, the requester first sent a command such as /code 09901234567 inside the group. The bot recorded who had requested a code for which phone number and created a temporary two-minute request for that number.

If a Divar SMS containing a login code arrived on the phone associated with that number during those two minutes, the app sent the code to the backend. The backend found the active request, and the Telegram bot sent the code privately to the exact person who had requested it. The group only received a message confirming that the code had been received and delivered to the requester.

This meant that login codes were no longer exposed directly inside the group and were only delivered to the person who had an active and valid request.

At the same time, the system created a traceable history of the requests: who requested a code, when they requested it, which phone number the request was for, and whether the code was received successfully. If something later went wrong with an account, the request history could be reviewed.

During the testing phase, the backend ran on my own system for about two days. After we became confident that the system was working properly, we moved it to MelkRadar's servers.

Later, I realized that some Android devices required additional settings and permissions to prevent the operating system from stopping the app in the background. I investigated that part as well, improved the app setup process, and tested it with several people across different devices.

Eventually, the system reached a point where the app, backend, and bot could operate independently without requiring my supervision.

To make sure using the system would not depend on me either, I recorded a roughly 10-minute video explaining installation, setup, and how to use the bot. I also prepared full documentation and a Quick Guide and shared them in the group.

After that, more people installed the app and the requesters started using the bot as part of their normal workflow.

In its first 14 days, the system automatically delivered 212 Divar verification codes directly to the people who requested them. During the preceding 14-day period, only 74 codes had been shared manually in the group. That meant 2.86 times as many codes were delivered, a 186% increase, while removing the need for people to follow up manually.

What makes this experience even more interesting to me is that the entire process, from identifying the problem and proposing the idea, to building the MVP and getting real user feedback, designing a more secure version, building the backend and bot, testing across different devices, moving the system to the company servers, and finally preparing the video and documentation, all happened within about seven days.

For me, MLK DVR Receiver was not just about building an app or a bot. It was an experience where I saw a manual and inconvenient process, built a solution for it, discovered the weaknesses of the first version through real usage, and gradually turned it into a more secure, reliable, and independent system.

That is why it is still one of my favorite and most rewarding programming experiences.
