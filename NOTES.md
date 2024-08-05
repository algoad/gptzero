**If you were given 2 weeks time, what changes would you make to the project to enhance code quality, UX, performance, or scalability. This should not take more than ~15 minutes.**

Code Quality
I would start by adhering to SOLID principles to ensure the code is modular, reusable, and maintainable. Refactoring the `page.js` file to TypeScript and catch errors. Implementing linting and setting up hooks for scroll references can improve readability and consistency. I would also separate user related logic into its own module to follow the single responsibility principle. Splitting up the `page.js` file into smalle components. I would introduce testing.

UX
I would focus more on error handling. I'd introduce theming with Tailwind CSS as well as introduce a component library like Shadcn/UI. Improving the rendering logic for `ChatPrompt` and `ChatResponse` components, and implementing a chat history feature, would make the chat interface more intuitive.

performance
I would introduce React memoization to prevent unnecessary rerenders. I'd use better state management.

scalability
Deploying the application on EC2 instances with auto-scaling groups would allow it to handle varying loads. Using a load balancer to route requests to ensure high availability. Introducing a key value store like Redis for session storage would enable fast and reliable session management.

**Anything you'd like us to know about your submission? If any instructions were unclear or you encountered problems in the provided code please let us know.**

The one thing I didn't have time to address is the bug where the wc.close isn't being called successfully at the end of the richie response. ideally on the FE online 43 I'd have a await infront of getPromptResponse: `await getPromptResponse(prompt, (partialMessage)` this would disable the send button while a response is being generated. I've removed the await it so the functionality works better. I'm aware of this but given the time constraints I couldn't address it.
