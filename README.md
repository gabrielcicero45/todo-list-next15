This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install 
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result:
![image](https://github.com/user-attachments/assets/21166316-6cd5-43e4-ba01-ad141108cbff)


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Database Setup with Prisma

This project uses Prisma as an ORM for database management. Follow these steps to set up Prisma:
```bash
    npx prisma generate
    #run the migrations
    npx prisma migrate dev --name <migration-name>
```

## Adding Categories

You can add task categories by visiting the following page in your application:
```bash
    http://localhost:3000/categories/new
```
![image](https://github.com/user-attachments/assets/8281b513-408e-4624-81cb-4684de2f7964)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
