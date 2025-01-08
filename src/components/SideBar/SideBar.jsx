/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const SideBar = () => {

    const [extended,setExtended]=useState(false)
    const {onSent,prevPrompts,setRecentPrompt,newChat}=useContext(Context)

    const loadPrompt = async (prompt)=>{
       setRecentPrompt(prompt)
        await onSent(prompt)
    }
  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>setExtended(prev=>!prev)} className='menu' src= {assets.menu_icon} alt="" />
            <div onClick={()=>newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {extended?<p>New Chat</p>:null}
            </div>
            {extended?<div className="recent">
                <p className="recent-title">Recent</p>
                {prevPrompts.map((item,index)=>{
                    return (
                        <div onClick={()=>loadPrompt(item)} className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,18)} ...</p>
                </div>

                    )
                })}
                
            </div>
            :null
            }
            

        </div>
        <div className="bottom">

            <div className="bottom-item recent-entry">
            <a href="https://www.linkedin.com/in/kumar-abhinav-a32815179/" target='_blank'>    <img src={assets.question_icon} alt="" /> </a>
               {extended?<p>Help</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
               {extended?<p>Activity</p>:null}
            </div>
            <div className="bottom-item recent-entry">
              <a href=""> <img  src={assets.setting_icon} alt="" /></a> 
              {extended?<p>Settings</p>:null}
            </div>

        </div>
      
    </div>
  )
}

export default SideBar
