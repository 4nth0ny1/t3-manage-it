# T3-Manage-It

## Personal project management tool, built with the T3 Stack.

### This project utilizes these technologies...

- NextJS
- NextAuth
- TailwindCSS
- tRPC
- Prisma
- PlanetscaleDB
- DaisyUI
- ReactMarkdown
- CodeMirror
- DayJS

### The Goal and App Overview

The goal of this app is to have a simple app that can help a user manage their own projects and be more productive.

It allows a user to have multiple projects at once, multiple sprints within each project and todos within a sprint.

Each project has it's own dashboard which contains forms for creating more sprints and todos and tracking your progress.

The todos can be toggled to a complete status, edited and deleted at any time. Completing a increments the DaisyUI Radial Progress Bar by percentage.

### Backend

On the backend, I used PlanetscaleDB, Prisma and tRPC. This combination is wildly productive and makes making a deployed typesafe full stack app a breeze.

In 2 lines of code I can have my backend connected to my frontend.

Backend

```
  getAllProjects: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),
```

Frontend

```
  const { data: projects } = api.project.getAllProjects.useQuery();
```

As for PlanetscaleDB, this is my first try at it and I have to say it's very user friendly. I used two databases (prod and dev), then when I'm satisfied with the changes I make to the prisma.schema file, I can create a deploy request on my dev branch and it pushes the changes to my production db. Planetscale will detect the changes I made to the schema and hold off until I say go.

### Frontend

The Frontend uses a variety of tools like NextJS, TailwindCSS, DaisyUI, CodeMirror, React Markdown, and DayJS. There is plenty of good information available in their respective docs, YouTube and blogs on how to use all of them.

### Deployment

For this I used Vercel and probably will continue to use it on my future deployments.

### To create your own T3 App ...

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

test
