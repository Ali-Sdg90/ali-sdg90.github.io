I came across TanStack Query relatively late, in 2026, after I had already spent a lot of time working with REST APIs, fetch, and Axios.

By that point, I had already experienced what it was like to manage asynchronous data manually, so when I started using TanStack Query and useQuery, its value made sense to me almost immediately.

What I liked wasn't just that it reduced the amount of code.

The mental model also made a lot of sense to me: treating server state as something different from normal application state and giving it its own tools for fetching, caching, refetching, and keeping data in sync.

I practiced it more seriously while building React Mastery Loop AI, one of the projects I created to keep my React skills fresh and explore tools I hadn't used much before.

I think you need to work without something like TanStack Query for a while to really appreciate it.

You need to manually handle loading, errors, data, retries, request timing, and the state changes around fetch calls at least once to understand how much work tools like Axios and especially TanStack Query can handle for you.

My experience with it still isn't as deep as something like React or Axios, but I really like the way it approaches server state.

If I'm building a React application with a lot of API-driven data today, TanStack Query is one of the first tools I'd consider using.
