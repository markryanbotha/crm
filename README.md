# Partner Relational Management System

## Overview

The is a web application to allow Project Managers and Users to share a central repository of information. It will include important information such as contact information and key details about the Partner and their projects. It will also allow the users to track communications with each other, such as meeting notes and emails.

It can be extended so that the application integrates directly with email, Jira and Partner Projects so that all information is automatically synced and stored in a single location.

## Accessing the deployed web application

1. Navigate to https://crm-umber-eight.vercel.app/
2. Click the `Get Started` button
3. Sign up for an account

   - You can insert any email address, it does not need to be a real email address
   - Select the appropriate role

4. If you select the User role, select an existing `Company` at random
5. Click the `Sign up` button

If you have already completed steps 1-5 before, you can click the `Sign in` hyperlink to sign in using the same email address that you previously used.

As an Admin, you will have access to all Partners and Projects; as a user, you will have access to Projects related to your partner only, and cannot view other Partners.

The communications page can be used to send messages to any user. It updates the database so that all users can view relevant communications, as well as any messages that they have sent or received themselves

## Test accounts to sign in with

- Admin: admin@email.com
- User: user@email

## Link to source code

Github Repository: https://github.com/markryanbotha/crm

## Running the application locally

1. Run the command `npm install` from the root directory
2. Run the command `npm run dev`
3. Navigate to `https://localhost:3000`

## Technologies used

This project uses the [T3 Stack](https://create.t3.gg/), which includes

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
