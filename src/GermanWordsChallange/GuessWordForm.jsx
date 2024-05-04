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

    let resultSolution = {
        ok:false,
        ko:false,
        solution:'',
        okMessage:'Evvai!!'
    }


    let validateState = {
        hiddenClass: 'd-none',
        validateButtonClass: '',
        validateInputClass: '',
        validateText:' '
    }


    const [guessArticle, setGuessArticle] = useState('');
    const [guessWord, setGuessWord] = useState('');
    const [result, setResult] = useState(resultSolution);
    const [buttonSelected, setButtonSelected] = useState(buttonSel);
    const [validattion, setValidattion] = useState(validateState);



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
        setResult(resultSolution);
        setButtonSelected({
            ...buttonSel
        });
    }


    const proximityGuess = (guess, correct) => {
        
        let guessArray = guess.toLowerCase().split('');
        let correctArray = correct.toLowerCase().split('');

        let minL = correctArray.length > guessArray.length ?  guessArray.length : correctArray.length

        let guessedCount = 0;
        for(let r = 0;r < minL;r++) {        
            //console.log(guessArray[r] +"=="+ correctArray[r]);
            if(guessArray[r] == correctArray[r]){
                guessedCount++;
            }
        }

      
        let threshold = correctArray.length - guessedCount;
        let diff = correctArray.length - guessArray.length;
        
        threshold + diff; 
        
        return threshold;

    }


    const controlla = () => {
        console.log(guessArticle);
        console.log(guessWord);
        if(guessArticle.trim().length == 0  || guessWord.trim().length == 0) {
    
            let tmp = {...validateState};

            if(guessArticle.trim().length == 0) {
                tmp['validateButtonClass'] = 'val-border-red';
                tmp['validateText'] += 'Devi scegliere l\'articolo ';
            }
            if(guessWord.trim().length == 0) {
                tmp['validateInputClass'] = 'val-border-red';
                if(guessArticle.trim().length == 0) {
                    tmp['validateText'] += ' e scrivere la parola ';
                }else {
                    tmp['validateText'] += 'Devi scrivere la parola ';
                }
            }

            tmp['hiddenClass'] = '';
            setValidattion(tmp);

        } else {
            setValidattion(validateState);

            let getWord = proximityGuess(guessWord,word);
            let getArticle = guessArticle.toLowerCase().trim() == article.toLowerCase().trim()


            if(getArticle && getWord <= 1){
                
                setResult({
                    ...resultSolution,
                    ok:true,
                    okMessage: getWord == 1 ? "Te la faccio passare! Giusta era "+tagret: "Evvai!!"
                });
                setTimeout(()=>{
                    resetForm();
                    feedBackFn(true)            
                },1500); 
    
            }else{
                setResult({
                    ...resultSolution,
                    ko:true,
                    solution: tagret
                });
                setTimeout(()=>{
                    resetForm();
                    feedBackFn(false)            
                },2500);
            }
        }
        
    }


  return (
    <>
        <p>Come si dice <b>{source}</b> in tedesco?</p>
        <div className="mb-3 d-flex flex-row justify-content-center gap-2">
            <button className={validattion.validateButtonClass+' btn btn-outline-primary '+ buttonSelected.der} onClick={() => setArticle('Der')}>Der</button>
            <button className={validattion.validateButtonClass+' btn btn-outline-primary '+ buttonSelected.die} onClick={() => setArticle('Die')}>Die</button>
            <button className={validattion.validateButtonClass+' btn btn-outline-primary '+ buttonSelected.das} onClick={() => setArticle('Das')}>Das</button>
        </div>
        <input className={validattion.validateInputClass +' form-control'} value={guessWord} type="text" onChange={setWord}></input>
        <div className={validattion.hiddenClass+' custom-invalid-feedback'}>{validattion.validateText}</div>
        
        <button className="btn btn-primary mt-2" onClick={controlla}>Controlla</button>
        <br/>
        {/*<p>Debug {guessArticle} {guessWord}</p>*/}
        
        <p className={result.ko ? '':'d-none'}> Noooo peccato, la risposta giusta era: <b>{result.solution}</b></p>
        <p className={result.ok ? '':'d-none'}>{result.okMessage}</p>
        

    </>
  );
}

export default GuessWordForm;