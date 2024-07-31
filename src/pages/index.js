import Image from "next/image";
import { Inter, Rubik } from "next/font/google";
import Head from "next/head";
const rubik = Rubik({ subsets: ["latin"] });

export default function Home() {
  return (<>
    <Head>
      <title>Anime Discovery</title>
    </Head>
    <div class={`${rubik.className} antialiased`}>
      <div class="search flex flex-col px-72 z-10 text-center my-40 gap-10 justify-center">
        <div class="mainHeader flex flex-row justify-center">
        <h1 class="text-5xl font-bold hover:drop-shadow-xl">Discover new anime</h1>
        </div>
        <input class="bg-transparent block p-3 w-2/3 place-self-center outline-none rounded-md border-current rounded-md border"></input>
      </div>
    </div>
  </>);
}

export async function getStaicProps({ params }) { }
