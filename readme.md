## A fibonacci sequence game

## Dev Usage
Run with `npm run dev`
head to localhost:3000 and follow the prompts

## testing

Test using `npm run test`

## Notes
1. You have a new requirement to implement for your application: its logic should stay exactly the same but it will need to have a different user interface (e.g. if you wrote a web app, a different UI may be a REPL).
Please describe how you would go about implementing this new UI in your application?
Would you need to restructure your solution in any way?
In the webapp I am reliant on useState and useRef hooks to keep track of various elements of the application each render.
I would put the logic in a backend api, giving the api the users inputs and displaying the return messages instead of the front end handling the logic. Instead of storing the state the in frontend the backend would use a session or similar in-memory store to keep track of the state in the backend, if we wanted the game state to be persistant we can use a database.
I would use websockets to display the current game state, based on the timer.
Would have mock the api response for unit testing.


2. You now need to make your application "production ready", and deploy it so that it can be used by customers.
Please describe the steps you'd need to take for this to happen.
Add more robust test cases, perhaps test the hook.
Add testing to the CI
Add a stage phase to review before going live.
Add a domain.
Add new features such as, saving game state into a database retieved with an account or localstorage.


3. What did you think about this coding test - is there anything you'd suggest in order to improve it?
Straight forward enough, based on question one it was hard to interpret if you wanted a full stack application to begin with or talk about how I would make one by answering question one.


# Created using Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Technologies
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)


