import { useState, useLayoutEffect } from 'react'


const CssAppearAnimation = ({children,timeout = 200}) => {
    const [nodeEnter, setNodeEnter] = useState('');
    
    useLayoutEffect(() => {
        setTimeout(()=>{
            setNodeEnter('node-enter-active')
          },timeout);
      }, []);


    return (<>
        <div className={"node-enter "+nodeEnter}>
            {children}
        </div>
    </>)
}

export default CssAppearAnimation;