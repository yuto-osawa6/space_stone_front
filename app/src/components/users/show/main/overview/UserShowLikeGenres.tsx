import { genre } from "interfaces/product";

type Props = {
  genre : genre
}

export const UserShowLikeGenres:React.FC<Props> = (Props) => {

  return(
    <>
      <div className = "UserShowLikeGenres">
        <ul>
          <li
          style={{
            color:"white",
            backgroundColor:"#20c791",
            padding: "5px",
            borderRadius: "5px"
          }}
          >{Props.genre.name}</li>
        </ul>
      </div>
    </>
  )
}