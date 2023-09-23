import statImg from "/src/assets/html.webp"
import "./UsersOnline.scss"
export default function UsersOnline(){
  
  return(
    <div className="useronline-container">
    <div className="useronline-user">
    <div className="useronline-image">
    <img src={statImg} className="useronline-img" />
    </div>
    <div className="useronline-name">
    Joe Doe
    </div>
    <div className="useronline-dot"> </div>
    </div>
        <div className="useronline-user">
    <div className="useronline-image">
    <img src={statImg} className="useronline-img" />
    </div>
    <div className="useronline-name">
    Joe Doe
    </div>
    <div className="useronline-dot"> </div>
    </div>
    </div>
)
}