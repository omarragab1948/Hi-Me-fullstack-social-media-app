import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <main className="flex flex-wrap justify-center items-center h-screen p-6">
      <div className="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-start lg:justify-start">
        <h3 className="text-primary font-bold text-7xl mb-6 w-fit">HI-ME</h3>
        <p className="font-bold text-lg w-full sm:w-2/3 lg:w-full text-center md:text-start">
          Connect, share, and explore with the world—where every login is a step
          closer to fostering meaningful connections in our vibrant social
          community.
        </p>
      </div>
      <div className="w-full lg:w-1/3">
        <LoginForm />
      </div>
    </main>
  );
}
