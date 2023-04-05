# Partner Relational Management System

To-Do

- [ ] Error handling and validation for all forms
- [ ] Optimistic updates

## Overview

The is a web application to allow Project Managers and Users to share a central repository of information. It will include important information such as contact information and key details about the Partner and their projects. It will also allow the users to track communications with each other, such as meeting notes and emails.

It can be extended so that the application integrates directly with email, Jira and Partner Projects so that all information is automatically synced and stored in a single location.

## Accessing the deployed web application

1. Navigate to https://crm-umber-eight.vercel.app/
2. Click the `Get Started` button
3. Sign up for an account

   - You can insert any email address, it does not need to be valid
   - Select the appropriate role

4. If you select the User role, select an existing `Company` at random
5. Click the `Sign up` button

If you have already completed steps 1-5 before, you can click the `Sign in` hyperlink to sign in using the same email address that you previously used.

Currently, there is no distinction between Admin and User roles. However, in the future, and Admin will have access to all Partner Data, with the ability to edit, delete or create new partners. A User will only be able to access Partner data for their respective company, and will only be able to edit the details of their respective partner.

I still need to build out the `Projects` and `Communications` functionality. These tables will store the respective users projects information and previous communications. Admins will have access to all projects and all communications.

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
