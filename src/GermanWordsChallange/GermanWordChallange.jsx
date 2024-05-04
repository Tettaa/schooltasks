import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate , useParams } from "react-router-dom";
import GuessWordForm from './GuessWordForm.jsx'
import image from '../assets/devsit.png';
import CssAppearAnimation from '../CssAppearAnimation.jsx';
import { shuffleArray } from "../common.js";


import {
  Link,
} from "react-router-dom";


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

  const [nodeEnter, setNodeEnter] = useState('');
 
  useEffect(() => {
    initComponent();

    setTimeout(()=>{
      //setNodeEnter('node-enter-active')
    },200);

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
    <CssAppearAnimation timeout={500}>
        <div className={"container "+nodeEnter}>
            <img src={image} className="img-fluid"/>
            <h1>{!endgame ? 'Indovina la parola' : 'La partita è finita'}</h1>      
            <h3 className={status.guessed !== undefined ? '':'d-none'}>{'Indovinate ' + status.guessed +' su '+indexRef}</h3>
            {!endgame ? <GuessWordForm theword={challange} feedBackFn={feedBack} /> : ''}

            <Link to="/" className="btn btn-secondary mt-8">Torna all'inizio</Link>
        </div>
    </CssAppearAnimation>

  );
}

export default GermanWordChallange;