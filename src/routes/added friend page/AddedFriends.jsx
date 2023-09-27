import SearchIcon from '@mui/icons-material/Search';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './AddeFriends.scss'
import  VerifiedUser  from '@mui/icons-material/VerifiedUser';
import img from '/src/assets/html.webp'

import {collection, doc, getDocs, query} from 'firebase/firestore'
import {db} from '/src/utils/firebase/firebase'

export default function AddedFriends(){







const getAddedFriendsFromDb = () => {
    const addedFriendsCollection =  doc(db, 'user friends')

    const q = query(addedFriendsCollection)
    
} 






    return (
        <div className="added-friends-container">
        <div className='added-friends-first'>
        <header className='added-friends-header'>
        <div className='added-friends-sub-header'>
        <div className='added-friends-back'>
        <ArrowBackIcon/>
        <div className='added-friends-text'>
        <p className='added-friends-friends'>
        Select friends 
        </p>
        <p className='added-friends-no'>
        102 friends
        </p>

        </div>

        </div>

        <div className='added-friends-icons'>
     <SearchIcon/>
     <MoreVertIcon/>
     </div>
        </div>

        <div className='added-friends-sub-header-two'>
        <div className='added-friends-add-friends'>
        <VerifiedUser sx={{background:"green", padding:'.5rem', borderRadius:'50%'}}/>
        </div>
        
<div className='added-friends-add-friends-text'>
Add Friends
</div>
        </div>
        </header>
        <div className='added-friends-divider-text'>
        Friends on chatty pro
        </div>

        <main className='added-friends-main'>
        
        <div className='added-friends-chat-box'>
        <div className='added-friends-image'>
        <img src={img} className='added-friends-img'/>
        </div>
        <div className='added-friends-user-info'>
        <p className='added-friends-user-name'>
        Joe Doe
        </p>
        <p className='added-friends-user-stat'>
        sleeping
        </p>
        </div>
        </div>
        </main>
        </div>

        <div className='added-friends-second'>
        hello
        </div>
        </div>
    )
}