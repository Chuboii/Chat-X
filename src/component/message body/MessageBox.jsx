import img from "/src/assets/html.webp"
import "./MessageBox.scss"

export default function MessageBox(){
  
  return (
    <>
    <div className='message-container'>
    <div className="message-image">
    <img src={img} className="message-img" />
    </div>
    
    <div className="message-name-msg">
    <div className="message-name">
    joe doe
    </div>
    <div className="message-text">
    Hey john, longest time hehej hehd udhd ud
    </div>
    </div>
    
    <div className="messageBox-third">
    <div className="messageBox-time">
    9:16 AM
    </div>

    <div className="messageBox-online">
    online
    </div>
    
    <div className="messageBox-unread">
    8
    </div>
    </div>
    </div>
    
        <div className='message-container'>
    <div className="message-image">
    <img src={img} className="message-img" />
    </div>
    
    <div className="message-name-msg">
    <div className="message-name">
    joe doe
    </div>
    <div className="message-text">
    Hey john, longest time hehej hehd udhd ud
    </div>
    </div>
    
    <div className="messageBox-third">
    <div className="messageBox-time">
    9:16 AM
    </div>

    <div className="messageBox-online">
    online
    </div>
    
    <div className="messageBox-unread">
    8
    </div>
    </div>
    </div>
    </>
    )
}