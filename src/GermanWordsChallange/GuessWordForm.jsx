import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import './GuessWordForm.css'


function GuessWordForm  ({theword, feedBackFn})  {

    let article = theword.article;
    let word = theword.word;
    let source = theword.italian;
    let tagret = theword.german;

    let buttonSel = {
        der:'',
        die:'',
        das:'',
    };

    const [guessArticle, setGuessArticle] = useState('');
    const [guessWord, setGuessWord] = useState('');
    const [result, setResult] = useState();
    const [buttonSelected, setButtonSelected] = useState(buttonSel);


    const setArticle = (a) => {
        setGuessArticle(a);
        let key = a.toLowerCase();     
        let nbuttonSel = {
            ...buttonSel,
            [key]:'selected'
        }
        setButtonSelected(nbuttonSel);
    }

    const setWord = (e) => {
        let word = e.target.value;
        setGuessWord(word);
    }

    const resetForm = () => {
        setGuessArticle('');
        setGuessWord('');
        setResult('');
        setButtonSelected({
            ...buttonSel
        });
    }

    const controlla = () => {
        console.log(guessArticle);
        console.log(guessWord);
        if(guessArticle.trim().length == 0  || guessWord.trim().length == 0) {
            console.log("vuoto");
        }else {
            if(tagret.toLowerCase().includes(guessArticle.toLowerCase().trim()+" "+guessWord.toLowerCase().trim())){
                setResult("Evvvai");
            
                setTimeout(()=>{
                    resetForm();
                    feedBackFn(true)            
                },1500); 
    
            }else{
                setResult("Noooo peccato, la risposta giusta era: "+tagret);
                setTimeout(()=>{
                    resetForm();
                    feedBackFn(false)            
                },1500);
            }
        }
        
    }


  return (
    <>
        <p>Come si dice <b>{source}</b> in tedesco?</p>
        <div className="mb-3 d-flex flex-row justify-content-center gap-2">
            <button className={'btn btn-outline-primary '+ buttonSelected.der} onClick={() => setArticle('Der')}>Der</button>
            <button className={'btn btn-outline-primary '+ buttonSelected.die} onClick={() => setArticle('Die')}>Die</button>
            <button className={'btn btn-outline-primary '+ buttonSelected.das} onClick={() => setArticle('Das')}>Das</button>
        </div>
        <input className="form-control" value={guessWord} type="text" onChange={setWord}></input>
        
        <button className="btn btn-primary mt-2" onClick={controlla}>Controlla</button>
        <br/>
        <p>Debug {guessArticle} {guessWord}</p>
        <p>{result}</p>

    </>
  );
}

export default GuessWordForm;