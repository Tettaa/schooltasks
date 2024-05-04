import { useEffect, useState, useRef } from "react";
import { useNavigate , useParams } from "react-router-dom";
import CssAppearAnimation from '../CssAppearAnimation.jsx';
import {Link} from "react-router-dom";
import tabellineImg from '../assets/tabelline.png';
import { shuffleArray } from "../common.js";

const TabellineTabellone = () => {


    let base = 10;
    let counterRef = useRef(base);
    const [time, setTime] = useState(counterRef.current);
    const [addendumA, setAddendumA] = useState();
    const [addendumB, setAddendumB] = useState();
    
    const [others, setOthers] = useState();
    const [result, setResult] = useState('');

    let okRef = useRef(0);
    let nokRef = useRef(0);
    const [challenge, setChallenge] = useState({
        ok:0,
        ko:0,
    });

    let othersRef = useRef([]);



    function Ok() {
        console.log("Indovinato");
        counterRef.current = base;
        okRef.current++;
        nokRef.current++;
        setAddendumB( othersRef.current.pop());

       /* setChallenge(prevState => ({
          ...prevState,
          ok: challenge.ok + 1, 
          ko: challenge.ko + 1 
        }))*/
    }

    function Nok() {
        console.log("Noooooooo");
        counterRef.current = base;
        nokRef.current++;
        setAddendumB( othersRef.current.pop());
        
    }




    useEffect(() => {

        console.log("Entro 1");
        let min = 2,max = 10;
        let rdn = parseInt(Math.random() * (max - min) + min);
        setAddendumA(rdn);
        
        let one2ten = [1,2,3,4,5,6,7,8,9,10];
        shuffleArray(one2ten);
       
        setAddendumA(rdn);
        setAddendumB(one2ten.pop());
        othersRef.current = one2ten;
        

      }, []);
    


    useEffect(() => {
        console.log("Entro 2");

        let x = setInterval(() => {
            if(counterRef.current<=0) {
            
                Nok();

            } else {
                counterRef.current--;
                setTime (counterRef.current);
            }
        },800);

        return () => {
            clearInterval(x);
            console.log("exit use effect");
        }
      }, []);
    




    const controlla = () => {
        if(result == addendumA * addendumB){            
            Ok();
        }else{
            Nok();
        }
    }





    return (
        <>
            <div className="container tabelline">

                {(addendumA && addendumB) &&
                                <p className="calcolo"> {addendumA} * {addendumB}  = <input value={result} onChange={e => setResult(e.target.value)}  type="number" />   </p>
                }

                
                <button className="btn btn-primary mt-2" onClick={controlla}>Controlla</button>
                
                <div className="progress mt-3" role="progressbar" aria-label="Example with label" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    <div className={"progress-bar overflow-visible text-dark " + (time < 20 ? "bg-danger":"") } style={{width:time+'%'}}>Se non la becchi in tempo!!!!</div>
                </div>
                <h3 className="mt-3">{'Indovinate ' + okRef.current +' su '+nokRef.current}</h3>


                            
                <Link to="/" className="btn btn-secondary mt-8">Torna all'inizio</Link>
            </div>
        </>
    )

}

export default TabellineTabellone;
