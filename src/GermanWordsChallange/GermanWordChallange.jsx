import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

import GuessWordForm from './GuessWordForm.jsx'

import image from '../assets/devsit.png';



const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_KEY
  ,{  db: {
    schema: 'public',
  }});

function GermanWordChallange() {
  const [vocabulary, setVocabulary] = useState([]);
  const [challange, setChallange] = useState([]);
  const [error, setError] = useState([]);
  const [status, setStatus] = useState({});
  const [indexRef, setIndexRef] = useState(0);
  const [endgame, setEndgame] = useState(false);
 
  useEffect(() => {
    initComponent();
  }, []);

  const feedBack = (result) => {
    console.log(result);
    if(result) {
      setStatus({      
        ...status,
        guessed:status.guessed + 1,
      });
      
    }

    if(indexRef + 1 < vocabulary.length) {
      setIndexRef(() => indexRef+1);
      setChallange(vocabulary[indexRef+1]);  
    }else{
        setEndgame(true);
    }
    
  }


  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

  async function initComponent() {
    const { data, error } = await supabase.from("words").select();
    shuffleArray(data);
    
    setVocabulary(data);
    setChallange(data[indexRef]);
    setError(error);
    setStatus({      
      guessed:0,
      totals:data.length
    });
  }


  return (

    <div className="container">
        <img src={image} class="img-fluid"/>
        <h1>{!endgame ? 'Indovina la parola' : 'La partita è finita'}</h1>      
        <h3 className={status.guessed !== undefined ? '':'d-none'}>{'Indovinate ' + status.guessed +' su '+indexRef}</h3>
        {!endgame ? <GuessWordForm theword={challange} feedBackFn={feedBack} /> : ''}
    </div>
  );
}

export default GermanWordChallange;