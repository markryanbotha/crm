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
- User: user@email.com

## Link to source code

Github Repository: https://github.com/markryanbotha/crm

## Running the application locally

1. Run the command `npm install` from the root directory
2. Run the command `npm run dev`
3. Navigate to `https://localhost:3000`

## Project Structure

### prisma/

- Contains the Prisma schema, which defines the tables in the PostgreSQL database hosted in the cloud.

### src/components/

- Contains React components used throughout the application.
- Components used for similar pages or use cases are organized under the same subdirectories to allow for easier navigation between frequently used components.
- Components are server-rendered as the web application uses Next.js as the web framework.

### src/pages/

- This directory defines the routes in the application.
- Each file represents a specific route in the application.
  - For example, `index.tsx` represents the `/` route and `src/pages/dashboard/contact.tsx` represents the `/dashboard/contact` route.

### src/pages/api

- This directory contains routes that represent the API of the application.
- The directory contains proxy components that redirect requests to the appropriate server functions for authentication (NextAuth) and processing (tRPC).

### src/server

- This directory contains the server code, which acts as the backend of the application.

### src/server/api

- This directory hosts the code used to handle API requests via [tRPC](https://trpc.io).
- The `trpc.ts` file contains middleware used in tRPC, such as the context, session data from NextAuth, or procedures.
- The `src/server/api/routers` directory hosts the functional code used to process requests, communicate with the database, and serve a response.
  - This code is invoked via RPC calls from respective methods in the frontend. tRPC handles the routing of the API calls based on which method is called in the frontend.
  - By adding a router to the `root.ts` file, the functions in the router are exposed to the frontend.

### tests

- This directory contains end-to-end tests.
- These tests use the [Playwright](https://playwright.dev/) library, which automates web browser actions and allows for efficient tests.
- The tests cover major functionalities, such as creating, editing, and deleting records in the partner, project, and communication pages.

### Additional Information

- The application is built using TypeScript, a statically typed superset of JavaScript.
- The frontend uses React, a popular JavaScript library for building user interfaces.
- The PostgreSQL database is hosted in the cloud using [Supabase](https://supabase.com/docs/guides/database)]

## Technologies used

This project uses the [T3 Stack](https://create.t3.gg/), which includes

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
