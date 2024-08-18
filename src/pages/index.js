import { Rubik } from "next/font/google";
import Head from "next/head";
import React from "react";
const rubik = Rubik({ subsets: ["latin"] });

function AnimeItem(props) {
  return (<>
    <div className="modal_container bg-black/[0.6] flex flex-col h-[30rem] rounded-lg w-[20.5rem]">
      <img src={`${props.image}`} className="h-56 w-full" loading="lazy" style={{"object-fit": "cover"}}  alt="Anime image" />
      <div className="info p-5">
        <h1 className="font-bold text-3xl my-2">{props.name}</h1>
        <p className="text-sm italic line-clamp-4 h-14 ">{props.desc}</p>
      </div>
    </div>
  </>)
}


export default function Home() {
  const [responseState, setresponseState] = React.useState([])
  const [displayContainer, setdisplayContainer] = React.useState("hidden")
  async function handleApi(inputValue) {
    const url = `https://kitsu.io/api/edge/anime?filter[categories]=${inputValue}`
    const response = await fetch(url);
    return response.json()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const query = e.target[0].value
    const { data } = await handleApi(query)
    e.target.reset()
    setresponseState(data)
    setdisplayContainer("block")
    
  }
  function showContainer(){
    setdisplayContainer("hidden")
  }

  React.useEffect(() => {
      console.log("Response", responseState)
  }, [responseState])

  return (<>

    <Head>
      <title>Anime Discovery</title>
    </Head>

    <div className={`${rubik.className} *antialiased transition-all`}>

      <div className="search flex flex-col px-72 z-10 text-center my-40 gap-10 justify-center">
        <div className="mainHeader flex flex-row justify-center">
          <h1 className="text-5xl font-bold hover:drop-shadow-xl">Discover new anime</h1>
        </div>
        <form className="flex flex-col place-self-center w-[40rem]" onSubmit={handleSubmit}>
          <input placeholder="genre, name, type" name="category" className="bg-transparent block p-3 w-full  place-self-center outline-none rounded-md border-current rounded-md border"></input>
        </form>
      </div>

      <div className={`modal absolute w-screen h-screen p-10 overflow-y-auto backdrop-blur bottom-0 left-0 ${displayContainer}`}>
        <button className="my-8 p-2 font-black" onClick={showContainer}>X</button>
        <div className="flex flex-wrap  gap-2.5">
        { responseState.map((anime) => <AnimeItem key={anime.id} name={anime.attributes.canonicalTitle} image={anime.attributes.coverImage.original} desc={anime.attributes.description}/>) }
      </div>
      </div>

    </div>

  </>);
}

