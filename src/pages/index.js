import Image from "next/image";
import { Rubik } from "next/font/google";
import Head from "next/head";
const rubik = Rubik({ subsets: ["latin"] });
import { useState, useRef } from "react";

export default function Home() {
  let inputValue =  useRef();

async function handleApi(){
    console.log(inputValue.current.value) 
    const url = "https://kitsu.io/api/edge/anime?filter[categories]="
    await fetch(url+inputValue.current.value).then(response => {
      console.log(response.json())
    })
  }
const mainFunction = () => {
    let response = handleApi()

    setmodalContainer(!modalContainer)
    
  } 
  return (<>

    <Head>
      <title>Anime Discovery</title>
    </Head>

    <div class={`${rubik.className} antialiased transition-all`}>

      <div class="search flex flex-col px-72 z-10 text-center my-40 gap-10 justify-center">
        <div class="mainHeader flex flex-row justify-center">
          <h1 class="text-5xl font-bold hover:drop-shadow-xl">Discover new anime</h1>
        </div>
        <form class="flex flex-col place-self-center w-[40rem]" onSubmit={mainFunction()}>
          <input placeholder="genre, name, type"  ref={inputValue} class="bg-transparent block p-3 w-full  place-self-center outline-none rounded-md border-current rounded-md border"></input>
        </form>
      </div>

      <div class= "modal hidden absolute w-screen h-screen flex  flex-wrap gap-2.5 p-8 backdrop-blur bottom-0 left-0"}>
        <div class="modal_container bg-black/[0.6] flex flex-col h-[30rem] rounded-lg w-[23rem]">
          <img src="https://media.kitsu.io/anime/cover_images/8699/original.jpg" class="rounded-lg" alt="Anime image" />
          <div class="info p-5">
            <h1 class="font-bold text-3xl my-2">The Seven Deadly Sins</h1>
            <p class="text-sm italic truncate h-14 ">In a world similar to the European Middle Ages, the feared yet revered Holy Knights of Britannia use immensely powerful magic to protect the region of Britannia and its kingdoms. However, a small subset of the Knights supposedly betrayed their homeland and turned their blades against their comrades in an attempt to overthrow the ruler of Liones. They were defeated by the Holy Knights, but rumors continued to persist that these legendary knights, called the "Seven Deadly Sins," were still alive. Ten years later, the Holy Knights themselves staged a coup d’état, and thus became the new, tyrannical rulers of the Kingdom of Liones.\n\nBased on the best-selling manga series of the same name, Nanatsu no Taizai follows the adventures of Elizabeth, the third princess of the Kingdom of Liones, and her search for the Seven Deadly Sins. With their help, she endeavors to not only take back her kingdom from the Holy Knights, but to also seek justice in an unjust world.\n\n(Source: MAL Rewrite)</p>
            <div class="pills flex flex-wrap flex-row">
              <div class="pill font-bold capitalize bg-slate-800 my-2 text-sm p-2 rounded-lg">action</div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </>);
}

export async function getStaicProps({ params }) { }
