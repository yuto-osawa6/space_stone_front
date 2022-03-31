import { ShareMain } from "components/share/main/ShareMain"
import Link from "next/link"

type Props = {
  // getLayout: (page: any) => JSX.Element
}

const Ota: React.FC<Props>& { getLayout: (page: any) => JSX.Element } = (Props) => {

  return(
    <>
      {/* <ShareMain> */}
        aaaaaaaaajklkaaaaafl
      {/* </ShareMain> */}
      <Link href="/">
          <a>Home</a>
      </Link>
    </>
  )
}

export default Ota


Ota.getLayout = function getLayout(page) {
  return (
    <ShareMain>
      {page}
    </ShareMain>
  )
}