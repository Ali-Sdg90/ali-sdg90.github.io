Android development wasn't something I originally expected to get into.

But both the company I worked with and I had problems that needed an Android app, so I started from zero. I learned Kotlin, how Android apps are built and installed, app signing, permissions, ADB, releases, background processing, and the other parts I needed to actually build and ship what I had in mind.

The first app I built was MLK DVR Receiver for MelkRadar.

It's an internal Android application installed on the phones used by members of the team. The app receives the required information and sends it to the system's backend. The backend stores and processes it and, when needed, sends the result to the team's Telegram group through a bot.

I designed and implemented the entire system myself: the Android app, backend, and Telegram bot.

The result was automating one of the most manual and frustrating workflows in the sales team. In the first month with the system running, the team was able to complete more than 5x the amount of work compared to the previous month.

MLK DVR Receiver is an internal company application, so its source code, downloads, and technical details aren't publicly available.

After that, I built Health Data Relay for myself.

I needed an app that could automatically take my health data and back it up to my own Google Drive at a time I could configure. I looked for something that did exactly what I wanted and couldn't find it, so I decided to build it myself.

I spent around a month and a half building it and eventually published it on both Iranian and international Android platforms including Cafe Bazaar and APKPure.

The app reads health information through Health Connect and can automatically upload the daily data to the user's own Google Drive. Getting the required Google Drive access was a whole journey by itself. I had to go through Google's application and approval process for the required permissions. That was honestly one of the darkest parts of building the whole thing.

The app and my developer signing setup also went through Google Play Protect's verification process. There's a more detailed explanation of Health Data Relay in the Featured Projects section.
