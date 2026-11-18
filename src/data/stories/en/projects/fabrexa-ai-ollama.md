I started building Fabrexa AI in May 2026.

I've always really liked websites and services where you can chat with fictional characters, from Character.AI to other similar platforms.

I liked being able to get to know the character I was talking to and understand them. These characters existed in a safe environment, and some of them were even from games or movies I really loved. Being able to talk with them was something I genuinely enjoyed.

After a while, I started wondering if I could build something like that myself. A chatbot where I could define different characters, and each one would talk, think, and behave according to the personality I'd given them.

I'd already built something somewhat similar in my CS Club Bot project. That bot used a fairly long and restrictive system prompt that told the model how to respond and what to consider when generating its answers.

Of course, CS Club Bot was built to review interns' technical posts and give them feedback, but that experience had already introduced me to defining an LLM's behavior through prompts.

So I decided to start building the project.

At the time, I had access to a free Perplexity API key through someone I knew, which helped a lot with getting the project started and keeping it going.

I named the project Fabrexa.

There's a little story behind the name. At one point, I jokingly talked with one of my friends about an imaginary company called Fabrexa and introduced myself as its CEO! The name stuck with me, and I really liked it. It had a distinctive, technology-focused feel to it.

So I called the project Fabrexa AI and got started.

The first version was a lightweight Telegram bot with a few different characters. I could switch between them using Telegram's buttons and have separate conversations with each one.

Every character had its own system prompt, and the bot used the Perplexity API to send messages to the model and get responses.

I built this project at a time when I personally needed something like it, too. Like many of my other projects, Fabrexa started from a personal need and interest.

I used the bot for several months and really liked it.

During that time, I started learning about memory systems for LLMs. I wanted the character I was talking to to remember things from our previous conversations, rather than only having access to the last few messages.

So I started by building a short-term memory system.

Here's how it worked: after the bot generated a response, while the user was reading it, the system would send the user's message and the newly generated response back to the API.

This time, it used a separate prompt asking the model to check whether there was anything in the conversation worth saving to memory.

If it found something, the model would return a few JSON items, which were then added to the short-term memory object.

When generating future responses, the contents of that memory would be included alongside the other information sent to the model.

After building that part, I moved on to long-term memory.

I created a cron job that ran every night at midnight. It would take all the items stored in short-term memory, send them to the model with another prompt, and ask it to decide which information was worth keeping for a longer period.

Each long-term memory also received an expiration date. Some information could stay forever, while other things would be removed after a certain amount of time.

For example, imagine the user said their name was Ali and that they'd eaten pasta that day.

Both pieces of information could be added to short-term memory and used throughout that day's conversations.

But when the long-term memory system ran at midnight, it would recognize that the user's name was important information worth keeping without an expiration date, while the fact that they'd eaten pasta that day didn't need to be remembered forever.

Eventually, whenever the bot generated a response, it would send several pieces of information to the LLM: the bot's general instructions, the selected character's prompt, short-term memory, long-term memories that hadn't expired, around four previous conversation messages, and finally the user's latest message.

It had turned into a pretty cool system, and I really enjoyed using it.

For a while, I even moved the bot from my laptop to services like Railway and Render so it could run on a server and stay online all the time.

But after some time, Perplexity changed its API access system, and I could no longer use that API key the way I had before.

That caused problems for my bot, and I needed to find another solution.

I started researching different options, and that's when I discovered Ollama.

I learned that I could download different LLMs, run them on my own computer, and send messages to them through Ollama's local API to generate responses!

I found that really interesting.

My computer was fairly capable. I had an RTX 4060 with 8 GB of VRAM, which was enough to run some pretty good local models.

I started learning about Ollama, exploring the models I could download, and figuring out which ones would work best for what I wanted.

In total, I downloaded and tested six different models.

What mattered most to me was how well a model could roleplay, stay in character, be creative, and keep the story and world of a conversation moving forward.

Eventually, the best one I found was a custom, modified version of Gemma that had been optimized for storytelling and roleplay.

It was a 9B model, which was a little heavy for my GPU, but the quality of its responses was much better than the other models I'd tested.

It was more creative when building worlds and stories, stayed in character better, and made conversations more interesting.

So I decided to use it as the bot's main model.

At that point, I moved Fabrexa away from cloud servers and started running it entirely on my own computer.

The overall structure stayed the same. The user's message, along with the character prompts and memory information, was sent to the model. The only difference was that instead of using the Perplexity API, my own local model generated the response through Ollama.

I also tried some free models available through OpenRouter during this period, but they weren't very reliable. A model could change the next day, or its free access could disappear completely.

That's why running a local model felt like a more reliable and interesting choice to me.

I also added another feature to control the length of the bot's responses.

Sometimes the model would generate a relatively short answer, maybe around 400 characters, while I wanted the story to move forward a little more and the responses to have a certain minimum length.

So I built a system for extending the generated responses.

If the model's response was shorter than the minimum length I'd set, the generated text would be sent back to the model, asking it to continue until it reached the length I wanted.

This let me keep responses within a certain range. Not so short that the story barely moved forward, and not so long that they became difficult to read.

After a while, I decided to add something completely new to Fabrexa: image generation.

I wanted to be able to see images of the events and worlds we were creating, rather than only chatting with the characters and reading the story.

So I started learning about text-to-image models.

That's when I discovered ComfyUI and started downloading and testing different models.

In total, I tried four image-generation models.

The first model I downloaded was one I'd read a lot of good things about. It could produce nice results, but it needed quite a few steps to generate a high-quality image, usually around 25 to 30.

Sometimes the results also had problems. Faces didn't always look natural, and fingers or hands weren't always generated correctly.

So in the first workflow I built, after the initial image was generated, it went through another stage that detected the face and worked on it again for around 25 steps to improve it.

Then the image went through another stage that detected the hands and spent around eight steps trying to make them look better and more natural.

Generating an image and going through all these stages took around 50 seconds in total.

This was my first serious experience working with image-generation models, and I found it really interesting.

Giving a model some text and watching it create a complete image with so much detail and creativity was a pretty fascinating experience.

Then I downloaded another model that Grok had recommended to me.

This one was a relatively new model specifically designed to generate realistic images of people.

When I tested it, I was genuinely surprised!

With just eight steps and around ten seconds, it could generate images with really impressive quality. The details of the faces, skin, and expressions looked much more natural, and the images didn't have that doll-like appearance I'd seen in some of the earlier models.

I really liked it. It was fast, produced high-quality results, and had far fewer problems.

Now that I had a good setup for image generation, I decided to add it to Fabrexa AI.

But I ran into a hardware limitation.

The image-generation model used around 7.5 GB of my system's VRAM.

Meanwhile, the text model I was using for conversations was fairly heavy too, and I couldn't run both of them on the GPU at the same time.

So I decided to test image generation in a separate project first.

I built another Telegram bot called Fabrexa Canvas, which also has its own repository on my GitHub.

The initial goal was pretty simple. I wanted to send some text to the bot on Telegram, have it pass that text to ComfyUI, generate an image, and then send the finished image back to me on Telegram.

Building that first version took around a day or two, and it worked really well.

Then I started thinking about taking it one step further.

Image-generation models work differently from storytelling models. You can't just give them a piece of narrative text and expect them to generate exactly the scene described in the story.

These models need an actual description of the image: who's in it, what they're doing, what the environment looks like, the camera angle, and other details.

So I decided to put a text model before the image-generation stage.

Its job was to take the story text and, using a specific prompt, turn it into a prompt suitable for the image-generation model.

Basically, it would act as an image director.

It would examine what happened in the story, decide what should appear in the image, and prepare a detailed image prompt using the tags and structure that the image model understood best.

But this brought me back to the same 8 GB VRAM limitation.

Both the image director and the image-generation model needed to run on the GPU, and I couldn't keep them loaded at the same time.

To solve that, I started working on loading and unloading the models.

I designed the system so the text model would first load in Ollama and receive the story text. Then, using the prompt I'd prepared for it, it would generate a description suitable for image generation.

Once it finished, the text model would be unloaded from Ollama to free up the GPU's memory.

Then the image-generation model would load in ComfyUI, take the prompt generated by the previous model, and create the image.

Once the image was ready, it would be sent to the bot, which would then send it through Telegram.

Finally, the image model would be unloaded, and the text model would load again so the system would be ready for the next message.

Building this part took another day or two.

The quality of the generated images had improved a lot, but there was a new problem: generating each image took much longer.

Each image now took around 2.5 minutes.

About 80 seconds were spent just on the image director, because I insisted on using that same heavy, high-quality Gemma model for this part too.

Loading and unloading the models took around eight seconds, generating the image itself took about 15 seconds, and the remaining time went into preparing and uploading the image.

I was really happy with the result. Testing the system in Fabrexa Canvas had gone well, and now it was time to add it to the main bot.

I went back to Fabrexa AI and created a new branch.

The difficult part, building the image direction and generation system, had already been done in the experimental bot. Now I just needed to integrate it into Fabrexa's existing structure.

After adding this feature, here's how the bot worked:

First, the user selected a character and sent a message.

The message, along with the character information and memory, was sent to the text model, which started generating a response.

The response was sent through streaming. Instead of waiting for the entire response to be generated, the user received it piece by piece as the model was writing it and could start reading immediately.

Once the response was complete, the same text model received another request.

This time, instead of writing the next part of the story, it had to act as the image director.

For that, I had a separate system prompt explaining how it should design the image. It also received the user's latest message and the response it had generated just a few seconds earlier.

Using that information, the model prepared the image-generation prompt.

Once the prompt was ready, the bot unloaded the text model to free up GPU memory and loaded the image-generation model in ComfyUI.

The generated prompt was passed to the image model, which created the image using the settings I'd configured.

Once the image was finished, it was uploaded and sent to the user.

Finally, the image model was unloaded, and the text model was loaded again, ready for the next message.

At this point, I also spent some time improving the bot's performance.

If I'd used a lighter text model, the entire process of generating a response and an image could have taken around 45 seconds to a minute.

But I insisted on using the same heavy, high-quality model because the difference in quality was very noticeable for what I wanted.

So generating both the text and image took around 150 to 180 seconds.

Probably around 75% of that time was spent on the two runs of the text model alone.

But there was something interesting about this that made the long generation time much less of a problem.

The story responses generated by the bot were fairly long, and reading them took around 2.5 minutes anyway.

Since the response was streamed, the user could start reading almost immediately after sending their message.

By the time they finished reading, the image for that part of the story would also be ready and sent to them.

So even though the whole process took a while, the timing worked pretty well with the reading experience, and I was happy with how it felt.

I used this setup for a while, but eventually noticed another problem.

The image director didn't know enough about what had happened earlier in the story.

For example, I might have mentioned a few messages earlier that we were in a park or that a character was wearing red clothes. But several messages later, when the model tried to generate a new image, it no longer had that information and might get the location or clothing wrong.

That's when I realized that having a memory system for the storytelling model wasn't enough. The image director needed to remember previous events too.

So I started reviewing the bot's memory system.

The previous short-term and long-term memory approach, no matter how well it had been designed, wasn't really suitable for this kind of use anymore.

I didn't just want the bot to remember a few general facts about the user. I wanted the events of a story to be recorded in order, so both the storytelling model and the image director could use them.

So I decided to completely replace the previous system with a new memory approach: Session Memory.

In the new system, every session had its own memory.

Important events from that session were stored in order, and unlike the previous system, there was no longer a need to assign expiration dates to individual memory items.

I also added a separate step at the end of the process to update the memory.

After the image was generated and sent to the user, the image model would be unloaded and the text model would load again.

The bot would then send the user's latest message and the model's response to a prompt specifically designed for memory extraction.

The model would examine those two messages and add the important events and information to that session's memory, keeping everything in order.

Then the contents of Session Memory would be included both when generating story responses and when directing images.

Adding this system made a huge difference to the consistency of the stories and images.

For example, if a character had said six messages earlier that they were going to wear blue clothes, that event would be recorded in memory.

Now the storytelling model would remember that the character was wearing blue, and the image director would use that same information when creating later images.

Story events were also kept in order and carried through into future messages and images.

This change had a really noticeable effect on the experience of using the bot.

It no longer felt like you were talking to an AI model that could only see the last four messages, with images that barely had anything to do with the previous ones.

The story and images were much more connected, and the world being created felt more believable.

Later, I also defined two separate prompts for each character.

The first was the character's main prompt, which described who they were, their backstory, how they thought, how they spoke, and their personality traits.

The second prompt was specifically for their appearance.

The appearance prompt was given to the image director so it could maintain the character's visual identity across different images without me having to describe their appearance again in every message.

Eventually, the information sent to each model looked like this:

For the storytelling model, I provided the general instructions about its behavior and staying in character, the selected character's specific prompt, around six previous conversation messages, Session Memory containing earlier events in order, and finally the user's latest message.

For the image director, I provided the image direction instructions, Session Memory, the character's appearance prompt, the latest response generated by the storytelling model, and the user's latest message.

This structure gave me a complete loop connecting the conversation, memory, image direction, and image generation.

The user would send a message, the story would continue, an image of that part of the story would be generated, and the important events would be saved in Session Memory for future messages.

After a while, I started thinking that realistic image-generation models might not be the best choice for this kind of bot.

So I began exploring models that generated cartoon, animated, and anime-style images.

I downloaded and tested two more models, and one of them was noticeably better in terms of quality, detail, and overall results.

It could generate really good images with only around 14 steps.

One thing I liked about this visual style was how it handled characters' emotions.

With cartoon and anime-style images, facial expressions and emotions could be shown much more clearly and with more detail. For the kind of storytelling Fabrexa was doing, I found this style more interesting than completely realistic images.

And that's the story of how I built Fabrexa AI.

A project that started from a personal interest and curiosity to try an idea. At first, it was just a simple Telegram bot that could respond as a few different characters, but over time, I added memory systems, local models, image generation, image direction, and all kinds of other features.

Every time I used it and noticed something that could be improved, I'd go learn about it and build that part.

In the end, the project became something I'm really happy with, from the quality of its stories and characters to its memory system and generated images.

I really enjoyed building it, and it's one of the projects I'm genuinely proud of. :)
