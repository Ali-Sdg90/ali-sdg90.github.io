import antDesignLogoLarge from "../../assets/images/large-images/tech-stack/ant-design_logo.jpg";
import apexChartsLogoLarge from "../../assets/images/large-images/tech-stack/apexcharts_logo.svg";
import azureLogoLarge from "../../assets/images/large-images/tech-stack/azure_logo.jpg";
import chartJsLogoLarge from "../../assets/images/large-images/tech-stack/chart.js_logo.jpg";
import expoLogoLarge from "../../assets/images/large-images/tech-stack/expo_logo.jpg";
import firebaseLogoLarge from "../../assets/images/large-images/tech-stack/firebase_logo.jpg";
import gitLogoLarge from "../../assets/images/large-images/tech-stack/git_logo.jpg";
import githubActionsLogoLarge from "../../assets/images/large-images/tech-stack/github-actions_logo.jpg";
import javascriptLogoLarge from "../../assets/images/large-images/tech-stack/javascript_logo.jpg";
import nodejsLogoLarge from "../../assets/images/large-images/tech-stack/nodejs_logo.jpg";
import ollamaLogoLarge from "../../assets/images/large-images/tech-stack/ollama_logo.jpg";
import reactLogoLarge from "../../assets/images/large-images/tech-stack/react_logo.jpg";
import reactNativeLogoLarge from "../../assets/images/large-images/tech-stack/react-native_logo.jpg";
import restApiLogoLarge from "../../assets/images/large-images/tech-stack/rest-api_logo.jpg";
import scssLogoLarge from "../../assets/images/large-images/tech-stack/scss_logo.jpg";
import tanStackQueryLogoLarge from "../../assets/images/large-images/tech-stack/tanstack-query_logo.jpg";
import viteLogoLarge from "../../assets/images/large-images/tech-stack/vite_logo.jpg";

export const aboutTechStackData = {
    react: {
        id: "react",
        title: "React",
        lightboxImage: reactLogoLarge,
        subtitle: "My Main Frontend Foundation",
        summary:
            "React has been one of the main foundations of my development work, from early self-taught projects to large production systems, internal tools, automation, and AI-assisted product development.",
        featuresTitle: "Where It Helps",
        features: [
            "Building maintainable interfaces from small internal tools to large multi-feature applications",
            "Turning complex workflows, APIs, data, and business requirements into clear interactive products",
            "Creating reusable systems with strong attention to structure, UX, maintainability, and the small details",
        ],
        storyTitle: "Story",
        storyEN: `I started learning React on my own around 2023–2024.

I bought a course, took notes in a notebook whenever I learned something new, and had a separate practice project where I would code along while watching the lessons.

React was really exciting to me. With plain JavaScript, I mostly thought about the page as one thing. React made me see it as a collection of smaller worlds. Each component could have its own behavior and responsibilities, and all of those pieces could live together and build the final page.

I definitely didn't understand everything at the beginning. I remember not really understanding useEffect and using it for almost every small change or check happening on the page.

One of the first bigger projects I built was React Dice Distribution. At the time, it felt visually interesting and pretty complicated for my level. Today I can look at the idea and mentally picture how I would structure the whole thing, but back then I absolutely couldn't. I just went into it anyway and slowly figured out how to build it.

At some point the React course I was following started feeling outdated and too theoretical, so I moved more toward building projects myself.

Around that time I built a Rick and Morty characters project. Someone on Twitter had posted the challenge and said that if someone could build it well in two days, they would consider mentoring them.

I remember spending hours learning how CRUD actually worked while trying to build the project at the same time. I was figuring out things like endless scrolling, requests, state, and the rest of the application as I went.

This was before AI became part of everyday development. Most of the answers came from documentation, Stack Overflow, and a lot of trial and error. It was a harder world, but in some ways a sweeter one too.

I was really proud when I finished the project. I didn't end up being selected for the mentorship, but I learned a lot from trying.

Around the same period I started experimenting with tools like ApexCharts and Ant Design and built small projects just to understand how they worked.

Later I built CS Step0 Message Maker with React for the CS Internship program. By that point, working with React had become much more comfortable for me. The application connected to Firebase, handled CRUD operations, and included things like encryption, read-only states, notifications, and other small systems around the main workflow. I really liked that project.

Then I joined Dadeh Pardazi Azmoudeh Karan.

The hiring process itself was interesting. I showed them CS Step0 Message Maker and explained the logic and structure behind it. I also built a demo project with a Postman collection for them, and after that they trusted me with the actual project.

And that project was huge compared to anything I had built before.

I had to build an admin panel from scratch with React. It had more than 70 APIs, a lot of features, and a level of complexity that was way beyond anything I had worked on until then.

I was learning while building it almost every day.

AI was starting to become useful around that time, but it still couldn't really build the project for me. It was more like having a university friend next to me who could explain something or give me an idea when I got stuck.

The whole project used Ant Design too, so during those months I became much more familiar with its structure and with building larger React applications in general.

It took around seven months to build, and by the end we had a clean and working system.

That project gave me a lot of confidence. I had gone from teaching myself React to building the entire frontend of a complex product for a company by myself.

Around the same time, we were redesigning the entry process for CS Internship. We needed a simple way to show applicants when the program's weekly meetings were happening, and I volunteered to build a calendar for it.

That became CS Queue Calendar.

I knew I could build it, but I also knew I didn't want to build something that was just functional. I wanted it to feel like something that belonged to me and to the program.

I randomly found out that Ant Design already had a calendar component, but it was very different from what I had in mind for a Persian experience. I added a lot of custom CSS, changed the way information was presented, and eventually shipped the first version for the launch of the new entry system.

The feedback was really good, and during the next year and a half I don't remember applicants having trouble understanding how to use it.

I even hid a small easter egg in the browser console.

About a year later I came back to the project because I knew I could make it better. I redesigned parts of the UI, made the information simpler and clearer, improved the easter egg, and added proper mobile support.

It's still one of my favorite projects. I volunteered to build it, made everything from the first version to the mobile experience myself, maintained it, and even left a small piece of my personality inside it.

Later, I felt like some of my React skills were getting rusty, so I built React Mastery Loop AI for myself.

The idea was simple. AI would look at my current skill level and give me a project challenge. I would build it, practice things I already knew, and learn something new along the way.

When I finished, another AI process would review the project, score it, explain what I could have done better, and save the result into a report. The next challenge could then use the reports from my previous projects to decide what I should practice next.

I went through several challenges with it and learned things like React Query while also refreshing older skills.

During that period I also started paying much more attention to everything around the React code itself: project maintenance, cleaner tooling, automated releases, CI/CD, formatting, linting, and systems that keep a project healthy over time.

Then AI coding became dramatically more capable.

My role started changing. I wasn't always the person manually writing every line anymore. More and more, I became the person defining the architecture, breaking down the work, making decisions, reviewing the result, testing it, and guiding the project toward what I actually wanted.

That became especially clear when I started building internal tools for MelkRadar.

One example was MLK Monthly Report Generator, a fairly large and complicated React application that took two spreadsheet files and turned them into a complete HTML/CSS report that could be printed as a PDF.

With AI helping with implementation and me managing the architecture, requirements, iterations, testing, and details, I was able to build and deliver the whole project in less than 45 hours.

React is still one of the most important technical foundations I have.

I understand how much I can build with it, how I like to structure things, and how to use it to turn real problems into working products. If I have the choice, React is still one of the first tools I want to reach for when I'm solving a problem for a team or a company.

I'm really happy that I introduced myself to React and kept following this path.

I'm happy that even when I knew I didn't yet have the knowledge to build something, I still accepted the challenge, went into it, learned what I needed, and tried to deliver the best version I could.

And I'm happy that I care about the little details enough to stop, learn the right way to do something, and improve it instead of just making it work.

React has been a good friend to me.`,
        storyFA: `یادگیری React رو حدود سال‌های ۱۴۰۲ و ۱۴۰۳ به‌صورت خودخوان شروع کردم.

یه دوره پولی براش گرفتم، وقتی چیز جدیدی یاد می‌گرفتم تو دفترم نوت برمی‌داشتم و یه پروژه چرک‌نویس هم داشتم که همزمان با دیدن ویدئوها توش کد می‌زدم و تمرین می‌کردم.

React برام خیلی هیجان‌انگیز بود. وقتی فقط JavaScript کار می‌کردم بیشتر صفحه رو به‌عنوان یه چیز واحد می‌دیدم، ولی React باعث شد بتونم صفحه رو به چند دنیای کوچیک‌تر تقسیم کنم. هر کامپوننت می‌تونست رفتار و مسئولیت خودش رو داشته باشه و بعد همه این دنیاهای کوچیک کنار هم قرار بگیرند و صفحه نهایی رو بسازند.

اوایل قطعا همه چیز رو درست نمی‌فهمیدم. یادمه مفهوم useEffect رو خوب درک نکرده بودم و برای کوچک‌ترین تغییر یا چک کردن اتفاقی که تو صفحه می‌افتاد useEffect می‌نوشتم.

یکی از اولین پروژه‌های بزرگ‌تری که ساختم React Dice Distribution بود. برای سطحی که اون موقع داشتم پروژه نسبتا پیچیده و از نظر بصری خیلی جذابی بود. الان اگه بهش نگاه کنم می‌تونم تو ذهنم بگم ساختار کلیش رو چجوری می‌سازم، ولی اون موقع اصلا همچین توانایی‌ای نداشتم. با کله رفتم تو دل پروژه و آروم آروم سعی کردم بفهمم هر قسمت رو چجوری باید بسازم.

یه جایی دوره‌ای که باهاش React یاد می‌گرفتم قدیمی و بیش از حد تئوری شد. از اونجا به بعد بیشتر خودم شروع کردم پروژه ساختن و تمرین کردن.

تقریبا همون زمان پروژه React Rick and Morty Characters رو ساختم. یه نفر تو توییتر پروژه رو معرفی کرده بود و گفته بود اگه کسی بتونه تو دو روز خوب بسازتش، حاضر میشه منتورش بشه.

یادمه ساعت‌ها داشتم همزمان با ساخت پروژه سعی می‌کردم CRUD رو بفهمم، Endless Scroll پیاده کنم، درخواست‌ها و State رو مدیریت کنم و بقیه قسمت‌های پروژه رو هم جلو ببرم.

اون زمان هنوز AI وارد زندگی روزمره برنامه‌نویسی نشده بود. بیشتر چیزها از داکیومنتیشن، Stack Overflow و کلی آزمون و خطا درمیومد. دنیای سخت‌تری بود ولی یه جورهایی شیرین‌تر هم بود.

وقتی پروژه رو ساختم خیلی بهش افتخار می‌کردم. در نهایت اون فرد من رو برای منتورشیپ انتخاب نکرد، ولی خود تلاش برای ساختنش چیزهای زیادی بهم یاد داد.

همون دوره با ابزارهایی مثل ApexCharts و Ant Design هم آشنا شدم و برای اینکه یادشون بگیرم پروژه‌های تمرینی باهاشون ساختم.

بعدتر CS Step0 Message Maker رو با React برای برنامه CS Internship ساختم. اینجا دیگه کار کردن با React و ساختن پروژه برام خیلی راحت‌تر شده بود. برنامه به Firebase وصل می‌شد، عملیات CRUD انجام می‌داد و چیزهایی مثل Encryption، حالت Read Only، Toastify و یه سری سیستم‌های دیگه هم کنارش داشت. پروژه خفنی بود و خیلی دوستش داشتم.

بعد وارد شرکت داده‌پردازی آزموده‌کاران شدم.

پروسه ورودم به شرکت خودش داستان داشت. CS Step0 Message Maker و منطق و ساختارش رو بهشون معرفی کردم، یه پروژه دمو همراه فایل Postman براشون ساختم و بعد از اون موافقت کردند پروژه اصلی رو به من بدن.

و پروژه اصلی خیلی خیلی بزرگ‌تر از هر چیزی بود که تا اون زمان ساخته بودم.

قرار بود یه Admin Panel رو از پایه با React بسازم. پروژه بیشتر از ۷۰ API داشت، کلی فیچر مختلف داشت و از نظر حجم و پیچیدگی خیلی بالاتر از تجربه‌ای بود که تا اون موقع داشتم.

در حین ساخت پروژه تقریبا لحظه به لحظه داشتم یاد می‌گرفتم و همزمان می‌ساختم.

اون زمان AI تازه داشت یکم کاربردی‌تر می‌شد ولی هنوز نمی‌تونست واقعا پروژه رو برات بسازه. بیشتر شبیه یه دوست دانشگاهی بود که وقتی گیر می‌کردی می‌تونستی ازش سوال بپرسی و یه راهنمایی بگیری.

کل پروژه هم با Ant Design ساخته می‌شد و تو اون چند ماه خیلی عمیق‌تر با ساختارش و کلا ساخت پروژه‌های بزرگ React آشنا شدم.

ساخت پروژه حدود ۷ ماه طول کشید و در نهایت یه سیستم مرتب و درست بالا اومده بود.

اون پروژه اعتماد به نفس خیلی زیادی بهم داد. از جایی که React رو خودم داشتم یاد می‌گرفتم رسیده بودم به اینکه کل فرانت یه پروژه پیچیده شرکتی رو به‌تنهایی بالا آورده بودم.

تقریبا همون دوره تو CS Internship داشتیم سیستم ورود افراد به برنامه رو بازطراحی می‌کردیم. نیاز داشتیم یه راه ساده داشته باشیم که متقاضی‌ها بتونند زمان جلسات هفتگی برنامه رو ببینند و من پیشنهاد دادم یه برنامه تقویم براش می‌سازم.

اون پروژه شد CS Queue Calendar.

می‌دونستم می‌تونم بسازمش، ولی می‌دونستم یه چیز صرفا کار راه‌بند هم نمی‌سازم. می‌خواستم چیزی بسازم که برازنده کار خودم و برنامه باشه.

خیلی رندوم دیدم Ant Design خودش کامپوننت Calendar داره، ولی چیزی که من برای یه تجربه فارسی تو ذهنم داشتم خیلی باهاش فرق داشت. کلی CSS کاستوم بهش اضافه کردم، مدل نمایش اطلاعات رو تغییر دادم و در نهایت نسخه اول رو برای رونمایی سیستم جدید برنامه آماده کردم.

بازخورد خیلی خوبی گرفت و تو حدود یک سال و نیم بعدش یادم نمیاد متقاضی‌ای برای فهمیدن نحوه استفاده ازش مشکل داشته باشه.

حتی یه Easter Egg خیلی ناز هم تو کنسولش گذاشته بودم.

حدود یه سال بعد دوباره برگشتم سراغ پروژه چون می‌دونستم می‌تونم بهترش کنم. UI رو بهتر کردم، مدل نمایش اطلاعات رو مینیمال‌تر و قابل فهم‌تر کردم، Easter Egg رو بهتر کردم و ساپورت درست موبایل هم بهش اضافه کردم.

هنوز هم یکی از دوست‌داشتنی‌ترین پروژه‌هام می‌دونمش. خودم داوطلب شدم بسازمش، از نسخه اول تا نسخه موبایل همه چیزش رو خودم ساختم، خودم مراقبش بودم و حتی یه تیکه کوچیک از خودم رو هم تو Easter Egg پروژه گذاشتم.

بعد از یه مدت حس کردم یه مقدار روی مهارت Reactم خاک نشسته. برای همین React Mastery Loop AI رو برای خودم ساختم.

ایده این بود که AI سطح مهارتم رو ببینه و یه پروژه برای تمرین بهم بده. من پروژه رو می‌ساختم، چیزهایی که بلد بودم رو تمرین می‌کردم و وسطش چیزهای جدید هم یاد می‌گرفتم.

بعد از تموم شدن پروژه، AI میومد کل پروژه رو بررسی می‌کرد، بهم نمره می‌داد، می‌گفت چه چیزهایی رو می‌شد بهتر ساخت و نتیجه رو تو یه فایل گزارش ذخیره می‌کرد. وقتی زمان چلنج بعدی می‌رسید، AI به گزارش پروژه‌های قبلی هم دسترسی داشت و با توجه به اون‌ها تمرین بعدی رو می‌ساخت.

چندین چلنج با این سیستم انجام دادم و تو همون مسیر چیزهایی مثل React Query رو هم یاد گرفتم و یه سری مهارت‌های قدیمی‌ترم رو دوباره تمرین کردم.

تو اون دوره خیلی بیشتر هم رفتم سمت چیزهایی که اطراف خود کد React قرار دارند. مراقبت از پروژه، ابزارهای تمیز نگه داشتن کد، Release خودکار، CI/CD، Formatting، Linting و چیزهایی که باعث میشن یه پروژه در طول زمان سالم و مرتب بمونه.

بعد وارد دوره‌ای شدیم که AI تو کدنویسی خیلی خیلی قدرتمند شد.

از اونجا کم کم نقش خودم هم تغییر کرد. دیگه همیشه قرار نبود خودم نویسنده تک تک خط‌های کد باشم. بیشتر تبدیل شدم به کسی که معماری رو مشخص می‌کنه، کارها رو می‌شکنه، تصمیم می‌گیره، خروجی رو بررسی می‌کنه، تست می‌کنه و پروژه رو به سمتی که می‌خواد هدایت می‌کنه.

این موضوع مخصوصا وقتی برای ملک‌رادار شروع کردم ابزارهای داخلی ساختن خیلی مشخص شد.

یکی از اون‌ها MLK Monthly Report Generator بود. یه پروژه React نسبتا بزرگ و بسیار پیچیده که دو فایل Excel رو می‌گرفت و از اطلاعاتشون یه گزارش کامل HTML/CSS می‌ساخت که می‌شد ازش PDF گرفت.

با کمک AI در پیاده‌سازی و با مدیریت معماری، نیازمندی‌ها، تسک‌ها، تست و ریزه‌کاری‌های پروژه از سمت خودم، تونستم کل پروژه رو تو کمتر از ۴۵ ساعت بسازم و تحویل بدم.

React هنوز یکی از مهم‌ترین پایه‌های فنی من هست.

درک خوبی از قدرتش، ساختارش و مدل پیاده‌سازی پروژه باهاش دارم و اگه انتخاب با خودم باشه، React هنوز یکی از اولین ابزارهاییه که برای حل مسئله یه شرکت یا تیم میرم سمتش.

خوشحالم که خودم رو با React آشنا کردم و این مسیر رو برای خودم ساختم.

خوشحالم زمان‌هایی که می‌دونستم در لحظه سواد ساخت یه پروژه رو ندارم، باز قبولش کردم، رفتم تو دلش، چیزهایی که لازم داشتم رو یاد گرفتم و سعی کردم به بهترین شکلی که می‌تونم تحویلش بدم.

و خوشحالم که تو کارهام روی ریزه‌کاری‌ها حساسم و حتی برای چیزهای کوچیک هم دوست دارم بفهمم راه درست‌تر و بهتر انجام دادنش چیه.

React دوست خوبم هست.`,
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "GitHub Repository",
                text: "React Mastery Loop AI",
                url: "https://github.com/Ali-Sdg90/React-Mastery-Loop-AI",
            },
            {
                label: "GitHub Repository",
                text: "CS Queue Calendar",
                url: "https://github.com/cs-internship/CS-Queue-Calendar",
            },
            {
                label: "GitHub Repository",
                text: "React Dice Distribution",
                url: "https://github.com/Ali-Sdg90/React-Dice-Distribution",
            },
            {
                label: "GitHub Repository",
                text: "CS Step0 Message Maker",
                url: "https://github.com/Ali-Sdg90/CS-Step0-Message-Maker",
            },
            {
                label: "GitHub Repository",
                text: "React 25 Project Course",
                url: "https://github.com/Ali-Sdg90/React-25-Project-Course",
            },
            {
                label: "GitHub Repository",
                text: "Path Finder",
                url: "https://github.com/Ali-Sdg90/Path-Finder",
            },
            {
                label: "GitHub Repository",
                text: "HTTP Methods Demo",
                url: "https://github.com/Ali-Sdg90/HTTP-Methods-Demo",
            },
        ],
    },
    javascript: {
        id: "javascript",
        title: "JavaScript",
        lightboxImage: javascriptLogoLarge,
        subtitle: "Placeholder",
        summary: "Placeholder",
        featuresTitle: "Where It Helps",
        features: ["Placeholder"],
        storyTitle: "Story",
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
        ],
    },
    scss: {
        id: "scss",
        title: "SCSS",
        lightboxImage: scssLogoLarge,
        subtitle: "Placeholder",
        summary: "Placeholder",
        featuresTitle: "Where It Helps",
        features: ["Placeholder"],
        storyTitle: "Story",
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
        ],
    },
    antDesign: {
        id: "antDesign",
        title: "Ant Design",
        lightboxImage: antDesignLogoLarge,
        subtitle: "Placeholder",
        summary: "Placeholder",
        featuresTitle: "Where It Helps",
        features: ["Placeholder"],
        storyTitle: "Story",
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
        ],
    },
    tanStackQuery: {
        id: "tanStackQuery",
        title: "TanStack Query",
        lightboxImage: tanStackQueryLogoLarge,
        subtitle: "Placeholder",
        summary: "Placeholder",
        featuresTitle: "Where It Helps",
        features: ["Placeholder"],
        storyTitle: "Story",
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
        ],
    },
    restApis: {
        id: "restApis",
        title: "REST APIs",
        lightboxImage: restApiLogoLarge,
        subtitle: "Placeholder",
        summary: "Placeholder",
        featuresTitle: "Where It Helps",
        features: ["Placeholder"],
        storyTitle: "Story",
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
        ],
    },
    vite: {
        id: "vite",
        title: "Vite",
        lightboxImage: viteLogoLarge,
        subtitle: "Placeholder",
        summary: "Placeholder",
        featuresTitle: "Where It Helps",
        features: ["Placeholder"],
        storyTitle: "Story",
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
        ],
    },
    expo: {
        id: "expo",
        title: "Expo",
        lightboxImage: expoLogoLarge,
        subtitle: "Placeholder",
        summary: "Placeholder",
        featuresTitle: "Where It Helps",
        features: ["Placeholder"],
        storyTitle: "Story",
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
        ],
    },
    reactNative: {
        id: "reactNative",
        title: "React Native",
        lightboxImage: reactNativeLogoLarge,
        subtitle: "Placeholder",
        summary: "Placeholder",
        featuresTitle: "Where It Helps",
        features: ["Placeholder"],
        storyTitle: "Story",
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
        ],
    },
    nodejs: {
        id: "nodejs",
        title: "Node.js",
        lightboxImage: nodejsLogoLarge,
        subtitle: "Placeholder",
        summary: "Placeholder",
        featuresTitle: "Where It Helps",
        features: ["Placeholder"],
        storyTitle: "Story",
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
        ],
    },
    githubActions: {
        id: "githubActions",
        title: "GitHub Actions",
        lightboxImage: githubActionsLogoLarge,
        subtitle: "Placeholder",
        summary: "Placeholder",
        featuresTitle: "Where It Helps",
        features: ["Placeholder"],
        storyTitle: "Story",
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
        ],
    },
    gitGithub: {
        id: "gitGithub",
        title: "Git/GitHub",
        lightboxImage: gitLogoLarge,
        subtitle: "Placeholder",
        summary: "Placeholder",
        featuresTitle: "Where It Helps",
        features: ["Placeholder"],
        storyTitle: "Story",
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
            { label: "Placeholder", text: "Placeholder", url: "" },
        ],
    },
    firebase: {
        id: "firebase",
        title: "Firebase",
        lightboxImage: firebaseLogoLarge,
        subtitle: "Backend, Authentication & Data",
        summary:
            "Used Firebase across learning projects, CS Internship tools, and a real iOS product for authentication, data storage, and backend services.",
        featuresTitle: "Where It Helps",
        features: [
            "Adding authentication and persistent cloud data without building a full backend from scratch",
            "Building CRUD-based applications with structured user-specific data",
            "Providing backend infrastructure for web and mobile products",
        ],
        storyTitle: "Story",
        storyEN: `I first came across Firebase through one of the learning steps in the CS Internship program.

My first project with it was a Todo App.

Each user had their own data structure in the database, with their todos stored underneath it and each todo containing things like its text, status, and other information.

Because Firebase is part of Google's ecosystem, it also made things like Google authentication possible.

I still remember somehow managing to add Sign in with Google to that Todo App with the very limited knowledge I had at the time.

When I look back at it now, I'm honestly impressed that version of me managed to build it with YouTube, Stack Overflow, and a lot of trial and error.

That project was basically my first real experience with databases, storing application data, authentication, and anything that felt like backend development.

It was a completely new world for me. There wasn't an AI sitting next to me explaining everything. It was mostly me, YouTube, documentation, Stack Overflow, and trying things until they worked.

Those were really sweet days. :)

The next time I seriously used Firebase was CS Step0 Message Maker.

That was a project I volunteered to build for CS Internship and it needed somewhere to persist its data, so I went back to Firebase. By then everything felt much more familiar and the integration went pretty smoothly.

Around that period, accessing Firebase from Iran also became much more difficult and using it reliably often required a VPN, which made both development and actually using the application more annoying.

Later, I worked with Firebase much more deeply while building Settle It GPT with my friend.

The app's backend, account system, and a big part of its user infrastructure were built around Firebase, so this time I got to use it as part of a real iOS product rather than just a learning or internal project.

Firebase is a really powerful tool for getting a product moving quickly, especially when you don't want to build every backend piece yourself.

I like working with it. It's lightweight, understandable, and usually gets out of your way.`,
        storyFA: `اولین بار از طریق یکی از تسک‌های مسیر یادگیری CS Internship با Firebase آشنا شدم.

اولین پروژه‌ای که باهاش ساختم یه Todo App بود.

هر کاربر اطلاعات خودش رو تو دیتابیس داشت و Todoهاش زیر همون ساختار ذخیره می‌شدند. هر Todo هم اطلاعاتی مثل متن، وضعیت و چیزهای دیگه خودش رو داشت.

چون Firebase جزو اکوسیستم گوگل هست، قابلیت‌هایی مثل لاگین با اکانت گوگل هم خیلی راحت‌تر در دسترس بود.

یادمه اون موقع با سواد خیلی دست و پا شکسته‌م یه جوری تونستم Sign in with Google رو هم به Todo App اضافه کنم.

الان که به اون پروژه نگاه می‌کنم واقعا از علی اون موقع impress میشم که با YouTube، Stack Overflow و کلی آزمون و خطا تونسته همچین چیزی بسازه.

اون پروژه عملا اولین تجربه واقعی من با دیتابیس، ذخیره اطلاعات اپلیکیشن، Authentication و چیزی بود که برای من حس بک‌اند نویسی داشت.

یه دنیای کاملا جدید بود که خیلی اتفاقی واردش شده بودم. AIای نبود که کنارم باشه و همه چیز رو توضیح بده. خودم بودم و YouTube و داکیومنتیشن و Stack Overflow و آزمون و خطا.

چه روزهای شیرین و خوبی بود واقعا. :)

دفعه بعدی که جدی از Firebase استفاده کردم تو پروژه CS Step0 Message Maker بود.

این پروژه رو خودم داوطلب شدم برای CS Internship بسازم و نیاز داشت یه جا اطلاعاتش رو ذخیره کنه، برای همین دوباره رفتم سراغ Firebase. این بار دیگه کار کردن باهاش خیلی برام آشناتر شده بود و همه چیز خوب پیش رفت.

همون دوره دسترسی به Firebase از ایران هم خیلی سخت‌تر شده بود و برای استفاده درست ازش معمولا نیاز به VPN داشتم. هم دولوپ کردن و هم استفاده از برنامه رو پیچیده‌تر کرده بود.

بعدتر موقع ساخت Settle It GPT با دوستم خیلی عمیق‌تر با Firebase کار کردم.

بک‌اند، سیستم اکانت و بخش مهمی از زیرساخت کاربرهای اپ روی Firebase بود و این بار دیگه داشتم ازش تو یه محصول واقعی iOS استفاده می‌کردم، نه فقط یه پروژه تمرینی یا ابزار داخلی.

Firebase ابزار خیلی قدرتمند و کار راه‌بندیه، مخصوصا وقتی نمی‌خوای برای هر پروژه از صفر کل بک‌اند رو خودت بسازی.

کار کردن باهاش رو دوست دارم. سبک، قابل فهم و راحت برای شروع کردنه.`,
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "GitHub Repository",
                text: "Todo App Firebase",
                url: "https://github.com/Ali-Sdg90/Todo-App-Firebase",
            },
            {
                label: "GitHub Repository",
                text: "CS Step0 Message Maker",
                url: "https://github.com/Ali-Sdg90/CS-Step0-Message-Maker",
            },
            {
                label: "LinkedIn Post",
                text: "Settle It GPT Launch Post",
                url: "https://www.linkedin.com/posts/ali-sdg90_settleitgpt-share-7374421474943700993-_H3R/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADiHtIwB6ffMAWL0iNc5fSdSRqvEYI6Q2IA",
            },
        ],
    },
    chartjs: {
        id: "chartjs",
        title: "Chart.js",
        lightboxImage: chartJsLogoLarge,
        subtitle: "Data Visualization & Custom Charts",
        summary:
            "Worked extensively with Chart.js at MelkRadar, building and delivering more than 50 charts for production while also creating reusable templates and documentation for the design team.",
        featuresTitle: "Where It Helps",
        features: [
            "Building production-ready charts and data visualizations for web applications",
            "Creating reusable chart templates and patterns for consistent implementation across teams",
            "Extending charts with custom configuration and plugins when standard options aren't enough",
        ],
        storyTitle: "Story",
        storyEN: `I've worked with Chart.js a lot. Unfortunately. :)

Most of that experience came from MelkRadar.

Close to Nowruz 1403, the company needed more than 50 charts prepared and delivered in a very short amount of time. I was the person on the team who was more comfortable taking on the challenge of learning the library deeply and building them.

At the same time, part of the work was going to be handled by the design team, so I also needed to teach them how to work with Chart.js and how to build the simpler charts themselves.

Learning the library, building a large number of complicated charts under a tight deadline, and having multiple sessions with the design team to explain how everything worked made that period pretty exhausting for me.

But the result was worth it. The company was able to use all of those charts in one of the most important parts of its product, and eventually I got to see all that work actually being used.

To make working with the design team easier, I created a repository containing the important chart templates the company needed.

I also made a complete 12-page reference for the design team with the chart structures they commonly needed and explanations for how to use and modify them. It basically became their dictionary for working with the charts.

Chart.js is powerful, but I also found it pretty limiting when you start asking for very specific things. Its plugin system can get really complicated too.

I know the library pretty well.

I just don't like it that much anymore.

Probably because of the trauma. :)`,
        storyFA: `با Chart.js خیلی خیلی زیاد کار کردم. متاسفانه. :)

عمده تجربه‌م باهاش مربوط به شرکت ملک‌رادار بود.

نزدیک عید ۱۴۰۳ شرکت نیاز داشت بیشتر از ۵۰ چارت تو یه بازه زمانی خیلی فشرده آماده و تحویل داده بشه. توی تیم من راحت‌تر بودم که این چالش رو بگیرم، لایببری رو درست یاد بگیرم و چارت‌ها رو بسازم.

همزمان قرار شد تیم دیزاین هم بخشی از کار رو انجام بده، برای همین لازم بود کار با Chart.js رو به اون‌ها هم یاد بدم که بتونند چارت‌های ساده‌تر رو خودشون بسازند.

پروسه یاد گرفتن لایببری، ساخت و تحویل تعداد زیادی چارت پیچیده تو زمان خیلی محدود و همزمان جلسه‌های متعدد با تیم دیزاین برای توضیح نحوه کار، دوره خیلی سنگینی برام بود.

ولی نتیجه خیلی خوب شد. شرکت تونست از همه این نمودارها تو یکی از مهم‌ترین قسمت‌های محصولش استفاده کنه و در نهایت دیدم زحمتی که براش کشیده بودم واقعا نتیجه داد.

برای اینکه ارتباط و تحویل چارت‌ها به تیم دیزاین راحت‌تر باشه، یه ریپازیتوری ساختم و تمپلیت چارت‌های مهمی که شرکت نیاز داشت رو توش قرار دادم.

حتی یه فایل کامل ۱۲ صفحه‌ای هم ساختم که ساختارهای مورد نیاز تیم دیزاین و نحوه استفاده و تغییرشون رو توضیح می‌داد. عملا تبدیل شده بود به دیکشنری تیم دیزاین برای ساخت چارت‌ها.

Chart.js لایببری قدرتمندیه، ولی وقتی درخواست‌ها خیلی خاص میشن می‌تونه فوق العاده محدودکننده باشه و سیستم Pluginهاش هم بعضی وقت‌ها خیلی پیچیده میشه.

خیلی خوب می‌شناسمش.

فقط دیگه اونقدر دوستش ندارم.

احتمالا به خاطر ترامایی که برام ساخته. :)`,
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "GitHub Repository",
                text: "Learning Chart.js",
                url: "https://github.com/Ali-Sdg90/Learning-Chart.js-",
            },
            {
                label: "Live Examples",
                text: "Chart.js Design Team Examples",
                url: "https://ali-sdg90.github.io/Learning-Chart.js-/",
            },
            {
                label: "Reference Guide",
                text: "Chart.js Design Team Guide",
                url: "https://ali-sdg.is-a.dev/Learning-Chart.js-/ChartJS.one",
            },
        ],
    },
    apexCharts: {
        id: "apexCharts",
        title: "ApexCharts",
        lightboxImage: apexChartsLogoLarge,
        subtitle: "Interactive Data Visualization",
        summary:
            "Used ApexCharts across React projects to build interactive charts and turn complex data into clear, visual interfaces.",
        featuresTitle: "Where It Helps",
        features: [
            "Building interactive and visually rich charts inside React applications",
            "Supporting different chart types and data-heavy interfaces with one flexible library",
            "Turning raw application data into something much easier to understand and explore",
        ],
        storyTitle: "Story",
        storyEN: `I first used ApexCharts in one of my earliest React projects, React Dice Distribution.

At the time I was still learning React itself, so I slowly learned ApexCharts through its documentation and demos other people had built with it. This was before ChatGPT and AI became part of my development workflow, so most of the process was documentation, searching, testing, and figuring things out myself.

I really liked how powerful and flexible the library was.

I also learned one of its limitations the painful way in React Dice Distribution. ApexCharts renders SVG, and when you're trying to update and redraw charts extremely frequently, like every half second, the browser isn't particularly happy about constantly creating and removing all of that SVG.

Years later I came back to ApexCharts in Spotify Taste Timeline, this time in a much more modern project built with help from Codex.

I needed several different kinds of charts and visualizations, and because the project was already React-based, ApexCharts was an easy choice. A huge part of the experience of that project comes from the charts the library helped me build.

It's a really powerful and versatile library. Maybe not what I'd choose for extremely high-frequency updates, but for almost everything else, I really like it.`,
        storyFA: `اولین بار تو یکی از اولین پروژه‌های Reactم به اسم React Dice Distribution از ApexCharts استفاده کردم.

اون موقع خود React رو هم هنوز داشتم یاد می‌گرفتم و آروم آروم با داکیومنتیشن خود ApexCharts و دموهایی که بقیه باهاش ساخته بودند یاد گرفتم چجوری ازش استفاده کنم. اون زمان هنوز ChatGPT و AI وارد روند کدنویسی من نشده بودند و بیشتر مسیر با داکیومنتیشن، سرچ کردن، تست کردن و آزمون و خطا جلو می‌رفت.

خیلی زود جذب قدرت و تنوع ApexCharts شدم.

یکی از محدودیت‌هاش رو هم دردناک تو React Dice Distribution یاد گرفتم. خروجی چارت‌ها SVG هست و وقتی بخوای مثلا هر نیم ثانیه اطلاعات چارت رو آپدیت کنی، مرورگر خیلی دوست نداره مدام اون همه SVG رو بسازه و حذف کنه.

چند سال بعد دوباره تو یه پروژه مدرن‌تر به اسم Spotify Taste Timeline رفتم سراغ ApexCharts. این بار پروژه با کمک Codex ساخته می‌شد و استفاده‌م از ApexCharts خیلی بیشتر و متنوع‌تر بود.

انواع مختلف نمودار و نمایش اطلاعات لازم داشتم و چون پروژه React بود دوباره رفتم سراغش. خیلی هم انتخاب خوبی بود. بخش بزرگی از قدرت و جذابیت اون پروژه به همین چارت‌هایی هست که با ApexCharts ساختم.

لایببری فوق العاده قدرتمند و همه‌کاره‌ایه. برای آپدیت‌های خیلی خیلی سریع انتخاب مورد علاقه‌م نیست، ولی برای تقریبا هر چیز دیگه‌ای واقعا دوستش دارم.`,
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "GitHub Repository",
                text: "React Dice Distribution",
                url: "https://github.com/Ali-Sdg90/React-Dice-Distribution",
            },
            {
                label: "GitHub Repository",
                text: "Spotify Taste Timeline",
                url: "https://github.com/Ali-Sdg90/Spotify-Taste-Timeline",
            },
        ],
    },
    ollama: {
        id: "ollama",
        title: "Ollama",
        lightboxImage: ollamaLogoLarge,
        subtitle: "Local LLM Runtime",
        summary:
            "Used Ollama to run and manage local LLMs and connect them to Fabrexa AI Bot through its local API.",
        featuresTitle: "Where It Helps",
        features: [
            "Running different LLMs locally without depending on external AI APIs",
            "Exposing local models through a simple API for use inside applications",
            "Testing and switching between models based on system resources and project needs",
        ],
        storyTitle: "Story",
        storyEN: `I started working with Ollama because of a specific need I had for Fabrexa AI Ollama.

I wanted to build a Telegram bot that could talk to LLMs running locally on my own system instead of depending on an online AI service.

That's when I found Ollama and realized how useful it was. It made running local models simple, and it also exposed a local API that I could easily connect to from my own application.

Depending on what I needed and what my system could handle, I downloaded different models from Hugging Face, imported them into Ollama, and then connected Fabrexa AI Bot to them through the Ollama API.

The Telegram bot could send the user's message to the selected local model and return the generated response directly inside Telegram.

It's a really cool and practical tool. It made experimenting with local AI and integrating it into my own projects much easier.`,
        storyFA: `کارم با Ollama از یه نیاز مشخص تو پروژه Fabrexa AI Ollama شروع شد.

می‌خواستم یه بات تلگرام بسازم که به‌جای وابسته بودن به سرویس‌های آنلاین هوش مصنوعی، بتونه به مدل‌هایی که روی سیستم خودم به‌صورت لوکال اجرا میشن وصل بشه.

اونجا با Ollama آشنا شدم و دیدم چقدر ابزار قدرتمند و کار راه‌بندیه. هم اجرای مدل‌های لوکال رو خیلی راحت می‌کرد و هم API داخلی داشت که می‌تونستم مستقیم از پروژه خودم بهش وصل بشم.

با توجه به نیازم و قدرت سیستمم، مدل‌های مختلف رو از Hugging Face دانلود می‌کردم، وارد Ollama می‌کردم و بعد Fabrexa AI Bot از طریق API خود Ollama به اون مدل‌ها دسترسی داشت.

بات می‌تونست پیام کاربر رو برای مدل لوکال انتخاب‌شده بفرسته و جوابش رو مستقیم داخل تلگرام برگردونه.

Ollama واقعا ابزار باحال و کاربردی‌ایه. کار کردن با مدل‌های لوکال و وصل کردنشون به پروژه‌های خودم رو خیلی راحت‌تر کرد.`,
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "GitHub Repository",
                text: "Fabrexa AI Ollama",
                url: "https://github.com/Ali-Sdg90/Fabrexa-AI-Ollama",
            },
        ],
    },
    azureDevops: {
        id: "azureDevops",
        title: "Azure DevOps",
        lightboxImage: azureLogoLarge,
        subtitle: "Boards, Automation & Delivery Workflows",
        summary:
            "Worked extensively with Azure DevOps across CS Internship and MelkRadar, from boards and sprint workflows to automation, pull request reviews, releases, test cases, wikis, queries, and project administration.",
        featuresTitle: "Where It Helps",
        features: [
            "Managing tasks, backlogs, sprints, assignments, queries, and team workflows through Azure Boards",
            "Automating repetitive board operations through the Azure DevOps API",
            "Working with pull requests, test cases, builds, releases, wikis, permissions, and project administration",
        ],
        storyTitle: "Story",
        storyEN: `I first started working with Azure DevOps through the CS Internship program.

I was immediately interested in how much structure it could bring to a team. We created routine tasks and backlogs, assigned them to people, reviewed the board during sprint meetings, closed the sprint, and then started the next one with a new set of work.

For a long time, I was mostly just a user of the board.

After around a year of seeing how CS worked, I noticed that one part of the sprint process was extremely repetitive. Every week, around 70 tasks and backlogs had to be created from the same templates and assigned manually. It took the sprint manager around half an hour every single time.

Then I found out Azure DevOps had an API.

By that point I was confident enough with React that I trusted myself to start the project and actually finish it.

I built CS Azure Board Automation, a web app that could take those templates, copy all of the required tasks and backlogs into a selected sprint, set the correct sprint information, and assign everything automatically.

A process that used to take around 30 minutes could now finish in less than 5 seconds.

I introduced the tool to CS Internship and it was used regularly for around five months. Later, the governance team decided to stop using it because manually working with the board was part of how members learned Azure DevOps. I shut the automation down when they asked.

Around the same time, CS was also trying to become more scalable, and I was really eager to work on that side of the program.

I was given full admin access to the program's Azure DevOps setup and started working on things like new groups, permission structures, privacy settings, and controlling how people inside and outside the program could access different parts of the board.

Some of those changes became part of the regular workflow and some experiments didn't end up being used.

Azure Boards permissions and configuration can get ridiculously complicated, but they're also incredibly powerful.

I also built CS Queue Bot with access to the Azure DevOps API. When someone entered the program's queue group, the bot could automatically create the required task on a specific board and fill in the information for them. I really liked that project too.

At MelkRadar, Azure DevOps was also part of everyday work across different projects.

I worked with test cases, builds, deployments to different environments, project wikis, analytical boards, queries, and the normal sprint and task workflows.

The part I probably spent the most time in was pull requests. For around a year and a half I was responsible for reviewing the frontend team's PRs, so I was constantly reviewing and checking work directly inside Azure DevOps.

I've spent a lot of time with Azure DevOps at this point. I have a strong understanding of Boards, workflows, queries, analysis, permissions, and its day-to-day collaboration features, along with a good understanding of project setup, builds, and releases.

I genuinely like Azure DevOps. It's a powerful, well-thought-out system.

Maybe a little too well-thought-out.`,
        storyFA: `اولین بار از طریق برنامه CS Internship با Azure DevOps آشنا شدم.

خیلی زود جذب قدرت، نظم و ساختارش شدم. تو برنامه تسک‌ها و بک‌لاگ‌های روتین می‌ساختیم، به افراد اساین می‌کردیم، تو جلسات اسپرینت بورد رو بررسی می‌کردیم، اسپرینت رو می‌بستیم و بعد کارهای اسپرینت جدید رو می‌دیدیم و شروع می‌کردیم.

مدت زیادی فقط یه عضو از بورد بودم.

بعد از حدود یک سال دیدن روند کاری CS، متوجه شدم یه قسمت از کار خیلی تکراریه. هر هفته برای هر اسپرینت حدود ۷۰ تسک و بک‌لاگ از روی یه سری تمپلیت ثابت ساخته و برای افراد مختلف اساین می‌شد. کاری که هر بار حدود نیم ساعت از مدیر اسپرینت وقت می‌گرفت.

بعد فهمیدم Azure DevOps API هم داره.

اون موقع تواناییم تو React خیلی بهتر شده بود و اعتماد داشتم اگه پروژه‌ای رو شروع کنم می‌تونم تا آخرش پیش ببرمش.

CS Azure Board Automation رو ساختم. یه وب اپ که می‌تونست همه اون تسک‌ها و بک‌لاگ‌ها رو از روی تمپلیت‌ها تو اسپرینتی که مشخص می‌کردی بسازه، شماره اسپرینت درست رو بذاره و برای افراد مورد نیاز اساینشون کنه.

کاری که حدود ۳۰ دقیقه طول می‌کشید، تو کمتر از ۵ ثانیه انجام می‌شد.

برنامه رو به CS معرفی کردم و حدود ۵ ماه به‌صورت دائم استفاده شد. بعد تیم Governance برنامه به این نتیجه رسید که استفاده از این ابزار باعث میشه افراد برنامه کار کردن دستی با Azure Board رو تمرین نکنند و با درخواستشون استفاده از برنامه رو متوقف کردم.

همون دوره خود CS هم داشت روی اسکیلبل‌تر شدنش کار می‌کرد و من خیلی eager بودم که روی این قسمت کار کنم.

دسترسی کامل ادمینی Azure DevOps برنامه رو گرفتم و رفتم سراغ گروه‌ها، سطح‌های دسترسی، تنظیمات Privacy، مدل دسترسی افراد داخل و خارج برنامه به بورد و یه عالمه تنظیمات دیگه.

بعضی از چیزهایی که ساختیم وارد روند عادی برنامه شدند و بعضی‌ها هم در نهایت به نتیجه نرسیدند.

قسمت دسترسی‌ها و تنظیمات Azure Boards واقعا شاهکار پیچیده و قدرتمندیه.

CS Queue Bot رو هم ساختم که به Azure DevOps API دسترسی داشت. وقتی فردی وارد گروه صف برنامه می‌شد، بات می‌تونست روی یه بورد مشخص براش تسک بسازه و اطلاعات مورد نیاز رو به‌صورت خودکار پر کنه. این پروژه هم خیلی برام دوست‌داشتنی بود.

توی شرکت ملک‌رادار هم تو پروژه‌های مختلف خیلی با Azure DevOps کار می‌کردیم.

با Test Case، Build، ریلیز روی محیط‌های مختلف، Wiki، بوردهای تحلیلی، Query و روند عادی تسک‌ها و اسپرینت‌ها کار کردم.

ولی بخشی که احتمالا بیشتر از همه باهاش درگیر بودم Pull Requestها بودند. حدود یک سال و نیم مسئول ریویوی PRهای تیم فرانت بودم و مدام داخل خود Azure DevOps کارها رو بررسی، ریویو و چک می‌کردم.

در مجموع خیلی با Azure DevOps کار کردم. درک خیلی خوبی از Boards، روندهای کاری، Query، تحلیل اطلاعات، دسترسی‌ها و قابلیت‌های روزمره‌ش دارم و درک خوبی هم از تعریف پروژه، Build و Release روی اون دارم.

Azure DevOps رو واقعا دوست دارم. سیستم خیلی قدرتمند، فکرشده و دوست‌داشتنی‌ایه.

شاید یکم زیادی فکرشده.`,
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "GitHub Repository",
                text: "CS Azure Board Automation",
                url: "https://github.com/Ali-Sdg90/CS-Azure-Board-Automation",
            },
        ],
    },
};

export const getAboutTechStackById = (techId) =>
    aboutTechStackData[techId] ?? null;
