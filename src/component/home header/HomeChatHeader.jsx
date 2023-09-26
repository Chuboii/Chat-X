import SearchIcon from '@mui/icons-material/Search';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./HomeChatHeader.scss"

export default function HomeChatHeader(){
  
  return(
  <header className="homechat-header">
  <div className="homeheader-bio">
  <div className="homeheader-name"> Joe </div>
  <div className= "homeheader-stat">sleeping</div>
  </div>
  
  <div className="homeheader-icons">
  <SearchIcon className="homeh-icon-search"/>
  <CameraAltIcon className="homeh-icon-camera"/>
  <MoreVertIcon className="homeh-icon-ellips"/>
  </div>
  </header>
  )
}