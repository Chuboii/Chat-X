import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RedoSharpIcon from '@mui/icons-material/RedoSharp';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import "./ChatImageHeader.scss"
export default function ChatImageHeader(){
  
  
  return(
    <div className="cih-container">
    <header className="chatimageheader-container">
    <ArrowBackIcon/>
    <div className="cih-name">
    <p className="cih-user">You </p>
    <p className="cih-time"> time </p>
    </div>
    <div className="cih-icons">
    <RedoSharpIcon/>
    <MoreVertIcon/>
    </div>
    </header>
    </div>
    )
}