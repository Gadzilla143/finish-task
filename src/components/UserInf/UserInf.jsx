import React, { useEffect, useState } from 'react'
import './UserInf.scss'
import approve from '../../assets/inf/approved.png'
import will from '../../assets/inf/will.png'
import john from '../../assets/inf/john.png'
import mike from '../../assets/inf/mike.png'
import katrine from '../../assets/inf/katrine.png'

const UserInf = ({ name, comment }) => {
    const [img, setImg] = useState(approve)
    useEffect(() => {
        if (comment) {
            setImg(approve)
        } else {
            switch (name){
                case 'Will McConnel': setImg(will); break;
                case 'John Smith': setImg(john); break;
                case 'Mike Smith': setImg(mike); break;
                case 'Katrin Brown': setImg(katrine); break;
            }
        }
    }, [])
    return (
        <div className="inf__user">
            <img src={img} />
            <div className="inf__user-inf">
                {comment ?
                    <>
                        <div className="inf__user-name"><b>{name}</b></div>
                        <div className="inf__user-comments">Comments: {comment}</div>
                    </>
                    :
                    <div style={{marginTop: "5px"}} className="inf__user-name"><b>{name}</b></div>
                }
            </div>
        </div>
    )
}

export default UserInf