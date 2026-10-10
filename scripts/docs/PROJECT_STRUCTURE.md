# ساختار پروژه

این فایل یک نمای نسبتاً کامل از ساختار پروژه ارائه می‌دهد. فایل‌های کد، داده، تنظیمات و مستندات به‌صورت جداگانه معرفی شده‌اند؛ اما فایل‌های تصویری پرتعداد به‌جای فهرست‌شدن تک‌به‌تک، بر اساس کاربرد و پوشه گروه‌بندی شده‌اند.

پوشه‌های تولیدی مانند `dist` و `node_modules` بخشی از ساختار منبع پروژه محسوب نمی‌شوند و در این فهرست نیامده‌اند.

## نمای کلی

```text
Ali-Sdg90-Resume/
├── public/                  فایل‌هایی که بدون پردازش در خروجی قرار می‌گیرند
├── docs/                    یادداشت‌ها، طرح‌ها و مستندات داخلی توسعه
├── src/
│   ├── assets/              فونت‌ها، تصاویر و SCSS
│   ├── components/          کامپوننت‌های رابط کاربری
│   ├── data/                محتوای رزومه، پروژه‌ها و داستان‌ها
│   ├── hooks/               هوک‌های مشترک و منطق تعاملی
│   ├── utils/               توابع کمکی عمومی
│   ├── App.jsx              انتخاب تجربه موبایل یا دسکتاپ
│   └── main.jsx             نقطه ورود React
├── index.html               سند HTML اولیه و preloadهای اصلی
├── package.json             وابستگی‌ها و دستورهای npm
└── vite.config.js           تنظیمات build و توسعه Vite
```

## فایل‌های ریشه

```text
AGENTS.md
```

قواعد کار روی repository، دستورات بررسی و محدودیت‌های تغییر پروژه.

```text
README.md
```

معرفی محصول، قابلیت‌ها، فناوری‌ها، روش اجرای محلی و فرایند انتشار.

```text
PROJECT_STRUCTURE.md
```

همین سند؛ راهنمای سریع ساختار پوشه‌ها و مسئولیت فایل‌های مهم.

```text
LICENSE
NOTICE
```

شرایط استفاده، مالکیت محتوا و اعلان‌های حقوقی پروژه.

```text
CHANGELOG.md
```

تاریخچه نسخه‌ها که توسط فرایند release مدیریت می‌شود.

```text
package.json
package-lock.json
```

تعریف وابستگی‌ها، نسخه‌ها و دستورهای توسعه، lint، formatting و build.

```text
vite.config.js
eslint.config.js
commitlint.config.js
```

تنظیمات Vite، ESLint و Conventional Commits.

```text
index.html
```

قالب HTML اولیه، metadata صفحه، favicon، preload فونت اصلی و analytics محیط production.

## پوشه `public`

فایل‌های این پوشه مستقیماً و بدون پردازش Vite در build نهایی کپی می‌شوند.

```text
public/
├── CNAME                         دامنه سفارشی GitHub Pages
├── robots.txt                    قوانین crawlerها
├── sitemap.xml                   نقشه صفحات عمومی سایت
├── llms.txt                      معرفی فشرده سایت برای ابزارهای مبتنی بر هوش مصنوعی
├── llms/
│   ├── about.md                  معرفی کوتاه صاحب پورتفولیو
│   ├── experience.md             خلاصه تجربه کاری
│   ├── projects.md               خلاصه پروژه‌ها
│   └── stack.md                  خلاصه فناوری‌ها
├── favicon-128.webp              favicon کوچک
├── favicon-256.webp              favicon بزرگ
├── fonts/
│   ├── Vazirmatn-Light.woff2     فونت فارسی عمومی
│   └── LICENSE.txt               مجوز فونت
├── resume/
│   └── ali-sadeghi-resume-en.pdf رزومه انگلیسی قابل دانلود
└── vite.svg                      asset عمومی Vite
```

## پوشه `docs`

این پوشه شامل فایل‌های مرجع توسعه است و مستقیماً وارد رابط کاربری نمی‌شود.

```text
docs/
├── todos/
│   ├── progress.md               یادداشت پیشرفت کار
│   └── endgame.md                فهرست کارهای نهایی پروژه
└── concepts/
    ├── ali-images/               طرح‌های اولیه تصویر شخصی
    ├── mobile-design/            ایده‌ها و یادداشت‌های طراحی موبایل
    ├── project-icon/             نسخه‌های آزمایشی آیکن پروژه
    └── designs/
        ├── design-v0.0/          طرح‌های بسیار اولیه
        ├── design-v1.0/          طرح‌های موبایل و دسکتاپ نسل اول
        └── design-v2.0/          طرح‌های onboarding، About و Build Story
```

## نقطه ورود برنامه

```text
src/main.jsx
```

استایل سراسری را وارد می‌کند و `App` را داخل `StrictMode` روی عنصر root سوار می‌کند.

```text
src/App.jsx
```

وضعیت URL و کارت انتخاب‌شده را مدیریت می‌کند، viewport را تشخیص می‌دهد و فقط یکی از تجربه‌های موبایل یا دسکتاپ را به‌صورت lazy بارگذاری می‌کند.

## کامپوننت‌ها

### تجربه دسکتاپ

```text
src/components/DesktopPortfolio/
└── DesktopPortfolio.jsx
```

ترکیب‌کننده اصلی رابط دسکتاپ؛ شامل Intro، Shelf، AboutPanel، onboarding، پس‌زمینه و صفحه ورق‌خور داستان ساخت.

```text
src/components/Intro/
├── Intro.jsx                     معرفی اصلی، تصویر و اکشن‌ها
└── HeroContactInfo.jsx           لینک‌های تماس و شبکه‌های اجتماعی
```

```text
src/components/Shelf/
├── Shelf.jsx                     رندر مجموعه ردیف‌های قفسه
├── ShelfSection.jsx              ساختار هر ردیف قفسه
├── ShelfCardTrack.jsx            مسیر حرکت و تکرار کارت‌ها
├── ShelfCard.jsx                 کارت قابل انتخاب
└── ShelfCardImage.jsx            تصویر، loading و fallback کارت
```

```text
src/components/AboutPanel/
├── AboutPanel.jsx                پنل About Me یا جزئیات آیتم انتخاب‌شده
├── AboutMeContent.jsx            محتوای معرفی شخصی دو‌زبانه
├── AboutPanelExpandToggle.jsx    کنترل باز و بسته‌شدن پنل
├── AboutPanelLanguageToggle.jsx  انتخاب زبان انگلیسی یا فارسی
├── ShelfItemDetails/
│   └── index.js                  انتخاب محتوای مناسب هر نوع آیتم
└── FeaturedProjectAbout/
    ├── FeaturedProjectAbout.jsx  جزئیات پروژه، تجربه یا آیتم انتخاب‌شده
    ├── StoryReaderModal.jsx      نمایش کامل داستان‌های بلند
    └── index.js                  export عمومی پوشه
```

```text
src/components/PortfolioReveal/
├── PortfolioReveal.jsx           افکت ورق‌خوردن و ورود lazy به Build Story
└── pageTurnGeometry.js           محاسبات هندسی clip-path و مسیر حرکت ورق
```

```text
src/components/PortfolioOnboarding/
└── PortfolioOnboarding.jsx       راهنمای اولیه استفاده از رابط دسکتاپ
```

```text
src/components/OnboardingDismissControls/
└── OnboardingDismissControls.jsx کنترل بستن و ذخیره ترجیح نمایش onboarding
```

### تجربه موبایل

```text
src/components/MobilePortfolio/
├── MobilePortfolio.jsx           ترکیب‌کننده اصلی صفحه موبایل و Build Story
├── MobileBottomSheet.jsx         Bottom Sheet مشترک About و جزئیات کارت‌ها
├── mobilePortfolioConfig.js      تنظیم ارتباط آیتم‌ها، سکشن‌ها و navigation
├── components/
│   ├── MobileHeader.jsx          هدر ثابت و navigation موبایل
│   ├── MobileHero.jsx            معرفی، تصویر و اکشن‌های ابتدای صفحه
│   ├── MobileDesktopPreview.jsx  معرفی کوتاه تجربه کامل دسکتاپ
│   ├── MobileSectionHeading.jsx  عنوان مشترک سکشن‌های موبایل
│   ├── MobileReveal.jsx          ظاهرشدن تدریجی سکشن‌ها هنگام scroll
│   ├── MobileBuildStoryEntry.jsx ورودی بخش داستان ساخت پورتفولیو
│   └── MobileFooter.jsx          فوتر صفحه موبایل
├── sections/
│   ├── MobileProjectsSection.jsx نمایش پروژه‌ها
│   ├── MobileImpactSection.jsx   نمایش دستاوردها و اعداد
│   ├── MobileStackSection.jsx    نمایش فناوری‌ها و ابزارها
│   └── MobileCareerSection.jsx   نمایش مسیر شغلی
└── hooks/
    ├── useActiveMobileSection.js تشخیص سکشن فعال هنگام scroll
    ├── useActiveProject.js       تشخیص پروژه فعال در rail موبایل
    └── useMobileAvatarMorph.js   انتقال تصویر Hero به هدر موبایل
```

### داستان ساخت پورتفولیو

این بخش به‌صورت lazy و فقط هنگام بازشدن دریافت می‌شود.

```text
src/components/HowItWasBuilt/
├── HowItWasBuilt.jsx             قاب اصلی و وضعیت کلی داستان ساخت
├── StoryHeader.jsx               هدر، بازگشت و انتخاب زبان
├── StoryHero.jsx                 بخش معرفی داستان
├── BuildGallery.jsx              مدیریت گالری فصل‌ها
├── GalleryMedia.jsx              تصویر فعال هر فصل
├── GalleryInformation.jsx        عنوان و توضیح فصل فعال
├── ThumbnailRail.jsx             نوار thumbnailها و navigation
├── StoryClosing.jsx              بخش پایانی داستان
├── useGalleryKeyboardNavigation.js کنترل گالری با keyboard
├── useThumbnailMomentum.js       حرکت momentum نوار thumbnail
├── useLotusEasterEgg.js          تعامل مخفی بخش پایانی
├── motionConfig.js               تنظیمات مشترک انیمیشن‌ها
└── index.js                      export عمومی کامپوننت
```

### رابط کاربری مشترک

```text
src/components/ui/
├── LightboxImage.jsx             تصویر قابل کلیک و ورودی lazy به Lightbox
├── ImageLightbox.jsx             نمایش بزرگ، zoom، pan، reset و download
└── CustomScrollbar.jsx           scrollbar سفارشی قابل استفاده مجدد
```

```text
src/components/layout/
├── DynamicBackground.jsx         پس‌زمینه تزئینی صفحه دسکتاپ
├── AppVersion.jsx                نمایش نسخه برنامه
└── MobileWipNotice.jsx           اعلان قدیمی وضعیت نسخه موبایل
```

```text
src/components/UnderConstructionBadge/
├── UnderConstructionBadge.jsx    نشان اختیاری «در حال ساخت»
├── constants.js                  تنظیمات نشان
└── under-construction-badge.scss استایل مستقل نشان
```

## داده‌ها و محتوا

```text
src/data/portfolio/
├── shelfSections.js              داده ردیف‌ها، کارت‌ها، ابعاد و thumbnailها
├── aboutData.js                  متن، تصویر و tagهای About Me
└── profileLinks.js               لینک‌های تماس، موقعیت و شبکه‌های اجتماعی
```

```text
src/data/aboutSection/
├── aboutProjectData.js           جزئیات پروژه‌ها و لینک componentهای مرتبط
├── projectGalleryData.js         تصاویر کوچک و بزرگ گالری پروژه‌ها
├── aboutCareerData.js            جزئیات مسیر شغلی
├── aboutImpactData.js            جزئیات دستاوردها
└── aboutTechStackData.js         جزئیات فناوری‌ها و ابزارها
```

```text
src/data/howItWasBuilt/
└── howItWasBuiltData.js          فصل‌ها، متن دو‌زبانه و تصاویر Build Story
```

```text
src/data/stories/
├── en/
│   ├── projects/                 داستان انگلیسی پروژه‌های دارای متن بلند
│   ├── career/                   داستان انگلیسی تجربه‌های کاری
│   └── impact/                   توضیح انگلیسی دستاوردها
└── fa/
    ├── projects/                 نسخه فارسی داستان پروژه‌ها
    ├── career/                   نسخه فارسی تجربه‌های کاری
    └── impact/                   نسخه فارسی دستاوردها
```

فایل‌های `stories` با پسوند Markdown نگهداری می‌شوند و هنگام build به‌عنوان متن وارد برنامه می‌شوند.

## هوک‌ها

```text
src/hooks/
├── useMobileViewport.js          تشخیص breakpoint و انتخاب موبایل یا دسکتاپ
├── usePortfolioHashNavigation.js خواندن و تغییر مسیرهای hash-based
├── useBuildStoryAnalytics.js     ثبت session و تعامل‌های Build Story
└── useShelfScroll/
    ├── index.js                  هوک اصلی حرکت قفسه
    ├── constants.js              ثابت‌های سرعت، اصطکاک و drag
    ├── scrollUtils.js            توابع محاسباتی scroll و loop
    ├── useShelfAutoScroll.js     حرکت خودکار ردیف‌ها
    └── useShelfMomentum.js       ادامه حرکت بعد از drag
```

## توابع کمکی

```text
src/utils/
├── analytics.js                     ارسال eventهای Umami
├── getShelfItemId.js                ساخت یا دریافت شناسه پایدار آیتم‌ها
├── portfolioOnboardingPreference.js خواندن و ذخیره ترجیح onboarding
└── setDocumentTitle.js              تعیین عنوان document
```

## استایل‌ها

```text
src/assets/scss/
├── index.scss                    نقطه ورود تمام استایل‌های عمومی
├── base/
│   ├── _all.scss                 تجمیع استایل‌های پایه
│   ├── _variables.scss           رنگ‌ها، فونت‌ها، easing و متغیرها
│   ├── _reset.scss               reset مرورگر
│   ├── _global.scss              قواعد عمومی صفحه
│   └── _typography.scss          تعریف Geist و Vazirmatn
└── components/
    ├── _all.scss                 تجمیع استایل componentها
    ├── about-panel/              پنل About، جزئیات، Story Modal و Lightbox
    ├── dynamic-background/       پس‌زمینه دسکتاپ
    ├── how-it-was-built/         Build Story و گالری آن
    ├── intro/                    معرفی اصلی دسکتاپ
    ├── layout/                   ساختار صفحه و AppVersion
    ├── mobile-portfolio/         تمام بخش‌ها و responsiveهای موبایل
    ├── mobile-wip/               اعلان قدیمی موبایل
    ├── onboarding-dismiss-controls/ کنترل‌های onboarding
    ├── portfolio-onboarding/     راهنمای اولیه دسکتاپ
    ├── portfolio-reveal/         افکت page peel
    └── shelf/                    قفسه، کارت‌ها و variantهای آن
```

استایل‌های سنگین `HowItWasBuilt` و `ImageLightbox` از فایل‌های اصلی جدا شده‌اند و همراه componentهای lazy خودشان دریافت می‌شوند.

## فونت‌ها

```text
src/assets/fonts/
├── Geist/
│   ├── Geist-Variable.woff2      فونت اصلی انگلیسی و رابط کاربری
│   ├── fonts.css                 تعریف font-face
│   └── LICENSE.txt               مجوز فونت
├── Vazirmatn/
│   └── fonts.css                 تعریف فونت فارسی موجود در public
└── Manrope/                      فایل‌های فونت قدیمی یا جایگزین
```

Geist در HTML با اولویت بالا preload می‌شود. Vazirmatn برای محتوای فارسی تعریف شده و در شروع صفحه preload نمی‌شود.

## تصاویر

```text
src/assets/images/
├── ali-images/                   تصویر پروفایل
├── global/                       placeholder، امضا و preview عمومی
├── page/                         تصویر اصلی قفسه
├── ui/                           assetهای کوچک رابط کاربری
├── thumbnails/
│   ├── projects/                 تصاویر سبک کارت پروژه‌ها
│   ├── career/                   لوگوهای سبک تجربه‌های کاری
│   └── tech-stack/               لوگوهای سبک فناوری‌ها
├── large-images/
│   ├── projects/                 تصاویر بزرگ پروژه‌ها
│   ├── career/                   لوگوهای بزرگ مسیر شغلی
│   └── tech-stack/               لوگوهای بزرگ فناوری‌ها
├── gallery-images/
│   ├── small-images/             previewهای سبک گالری
│   └── large-images/             نسخه‌های Lightbox و download
└── history-class/
    ├── small-images/             thumbnail فصل‌های Build Story
    └── large-images/             تصاویر بزرگ فصل‌های Build Story
```

قاعده کلی رسانه‌ها این است که رابط عادی از thumbnail استفاده کند و تصویر بزرگ فقط هنگام بازشدن Lightbox یا بخش مربوط دریافت شود.

## مسیر کلی اجرای برنامه

```text
index.html
    ↓
src/main.jsx
    ↓
src/App.jsx
    ├── MobilePortfolio.jsx
    │   ├── سکشن‌های موبایل
    │   ├── MobileBottomSheet.jsx
    │   └── HowItWasBuilt.jsx (lazy)
    └── DesktopPortfolio.jsx
        ├── Intro.jsx
        ├── Shelf.jsx
        ├── AboutPanel.jsx
        ├── PortfolioOnboarding.jsx
        └── PortfolioReveal.jsx
            └── HowItWasBuilt.jsx (lazy)

LightboxImage.jsx
    └── ImageLightbox.jsx (lazy و فقط بعد از کلیک)
```

## محل مناسب برای تغییرات رایج

| نوع تغییر                        | محل اصلی                                            |
| -------------------------------- | --------------------------------------------------- |
| اضافه یا ویرایش کارت قفسه        | `src/data/portfolio/shelfSections.js`               |
| تغییر جزئیات پروژه               | `src/data/aboutSection/aboutProjectData.js`         |
| تغییر تصاویر گالری               | `src/data/aboutSection/projectGalleryData.js`       |
| تغییر متن About Me               | `src/data/portfolio/aboutData.js`                   |
| تغییر لینک‌های تماس              | `src/data/portfolio/profileLinks.js`                |
| تغییر داستان‌های فارسی و انگلیسی | `src/data/stories/`                                 |
| تغییر فصل‌های Build Story        | `src/data/howItWasBuilt/howItWasBuiltData.js`       |
| تغییر رابط موبایل                | `src/components/MobilePortfolio/` و SCSS متناظر     |
| تغییر رابط دسکتاپ                | component مربوط و SCSS متناظر                       |
| تغییر Lightbox                   | `src/components/ui/` و `_about-panel-lightbox.scss` |
| تغییر routing مبتنی بر hash      | `src/hooks/usePortfolioHashNavigation.js`           |
| تغییر فونت یا رنگ‌های عمومی      | `src/assets/scss/base/`                             |
