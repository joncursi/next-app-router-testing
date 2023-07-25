See: https://github.com/vercel/next.js/discussions/53173

---

With the pages router, it used to be possible to deploy a static Next.js app to an S3 bucket, even if the static app was built with dynamic routes. See https://github.com/vercel/next.js/discussions/17711 for the discussion on this topic, and how this can be achieved by sprinkling a little bit of business logic into the 404 page.

My team is in the process of migrating our Next.js app, which is built in this ^^ way, from the Pages Router over to the App Router. However, we noticed that when exporting our app-router-based application, we are no longer seeing the dynamic segment HTML files in our `out` folder anymore.

For example, let's say I have an app route named `app/hey/[slug]/page.tsx`, with the contents of:

```
import React from 'react';

const Page = () => {
  return <div>Nothing special here</div>;
};

export default Page;
```

We expect to find an `out/hey/[slug].html` appearing in the build as a result of running `next build`. However, we get this build result:

![Screenshot 2023-07-20 at 4 31 04 AM](https://github.com/vercel/next.js/assets/4974609/69967ec9-05d1-4562-8943-eabfbdf9fc44)

This route is interpreted as a server route, thus no `out/hey/[slug].html` file is created.

I was able to get `next build` to detect this dynamic segment as a static route by adding the following to `app/hey/[slug]/page.tsx`:

```
import React from 'react';

// Added:
export const dynamic = 'force-static';

const Page = () => {
  return <div>Nothing special here</div>;
};

export default Page;
```

![Screenshot 2023-07-20 at 10 29 51 AM](https://github.com/vercel/next.js/assets/4974609/0291a1a3-d4db-4bf3-bb7f-0995774bca87)

However, I still don't see `out/hey/[slug].html` appearing in the build.

Does the Next.js team have plans to address this issue with the App Router, or is this viewed more as an "anti-pattern" (static export + dynamic routes) and thus have no plans to allow this going forward with the app router?
