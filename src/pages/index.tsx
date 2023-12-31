import { RootContainer } from "@/components/General/RootContainer";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SweetStack</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RootContainer>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-gray-500 sm:text-[5rem]">
            <span key={0} className="text-primary">
              $
            </span>
            weet
            <span key={1} className="text-primary">
              $
            </span>
            tack
          </h1>
        </div>
      </RootContainer>
    </>
  );
};

export default Home;
