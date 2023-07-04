export default function AboutPage() {
  return (
    <>
      <div className="p-32">
        <div className="pb-20">
          <h2 className="text-end text-4xl">T3 Manage It - MVP</h2>
          <p className="text-end italic">Written on: 07/03/2023</p>
        </div>
        <div className="px-32 text-xl">
          <p>
            This is the first iteration of this app, and before I get too far, I
            wanted to document where am I right now.
          </p>
          <br></br>
          <p>
            First of all, I want to thank Theo and the create T3 community for
            creating such a productive stack. I found this stack through his
            YouTube channel and have really enjoyed it.
          </p>
          <br></br>
          <h3 className="text-3xl">Backend</h3>
          <br></br>
          <p>
            This MVP is fully deployed on Vercel and allows a sign in with
            Github and Discord. All content is isolated to each individual user
            and nothing is shareable to other users. This makes this app the
            most basic version of of a productivity app.
          </p>
          <br></br>
          <p>
            I am using the combination of PlanetscaleDB, Prisma, and tRPC for my
            backend. Which I have only been using for 1 month now. I really
            enjoy using Prisma Studio, especially in the beginning, when I am
            trying to establish a basic UI. I can seed the development database
            with data for my entire schema and use that until I build my create
            components and procedures.
          </p>
          <br></br>
          <p>
            My experience with tRPC has been fantastic also. The way it pulls
            data is amazing and it goes so well with Prisma. I definitely look
            forward to continuing to use it more sophisticated ways.
          </p>
          <br></br>
          <h3 className="text-3xl">Frontend</h3>
          <br></br>
          <p>
            On the frontend, NextJS plus DaisyUI, and currently they are both
            being used in basic ways. I am using components from DaisyUI for the
            Navbar, Inputs, Buttons, and Progress Bar.
          </p>
          <br></br>
          <p>
            use the carousel or something similar to show screen shots of the
            current state.{" "}
          </p>
        </div>
      </div>
    </>
  );
}
