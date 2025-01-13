/* eslint-disable react/no-danger-with-children */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}= useContext(Context)
    const handleKeyPress=(e)=>{
        if (e.key === 'Enter'){
            onSent();
        }
    }
    
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
            
        </div>

        <div className="main-container">

            {!showResult?
            <>
             <div className="greet">
                <p><span>Hello,My</span></p>
                <p>How Can I help you Today</p>
            </div>
            </>
            :<div className="result">
                <div className ="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                        <hr/>

                    </div>: <p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                   
                </div>
            </div>
            }
           

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a Prompt Here' onKeyDown={handleKeyPress}/>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                       {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="" />:!null} 
                    </div>
                </div>
                <p className="bottom-info">
                    It may display inaccurate info so be carefull 
                </p>
                <p className="bottom-info">
                    Made By <span>Kumar Abhinav</span>
                </p>
            </div>
        </div>
      
    </div>
  )
}

export default Main
