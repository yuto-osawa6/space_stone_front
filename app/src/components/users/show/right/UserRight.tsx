import { UserShowContext } from "@/contexttype/contexttype"
import { useContext } from "react"
import { GrOverview, GrFavorite, GrScorecard } from "react-icons/gr"
import { ImStatsBars } from "react-icons/im"
import { MdFavoriteBorder, MdOutlineRateReview, MdScore } from "react-icons/md"
import { GiMedievalGate} from "react-icons/gi"
import { BsFillGridFill } from "react-icons/bs"
import Link from "next/link"

export const UserRight:React.FC = function UserRightFunc(){
  const {user} = useContext(UserShowContext)
  return(
    <>
      <div className ="UsersShowRight">
        <div className = "UsersShowRightSocial">
        </div>
        <div className = "UsersShowRightMenu">
          <ul>
            {user!=undefined&&(
              <>
                <li><Link href={`/users/${user.id}`}><a><GiMedievalGate/>Top</a></Link></li>
                <li><Link href={`/users/${user.id}/likes`}><a><MdFavoriteBorder/>Like</a></Link></li>
                <li><Link href={`/users/${user.id}/scores`}><a><MdScore/>Score</a></Link></li>
                <li><Link href={`/users/${user.id}/reviews`}><a><MdOutlineRateReview/>Review</a></Link></li>
                <li><Link href={`/users/${user.id}/threads`}><a><MdOutlineRateReview/>Thread</a></Link></li>
                <li><Link href={`/users/${user.id}/tiers`}><a><BsFillGridFill/>MyTier</a></Link></li>
              </>
            )}
          </ul>
        </div>
        <div className = "UsersShowRightTags">
        </div>
      </div>
    </>
  )
}