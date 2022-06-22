import { Button, IconButton, Stack } from "@mui/material"
import { styled } from '@mui/material/styles';
import { useState } from "react"
import { GiPhotoCamera } from "react-icons/gi"
// import { EditTopImage } from "./Topimage"
import TopimageV2 from "./Topimage2"
// import { EditTopImage } from "./topimage"
// import { UserBackgroupdModal } from "./UserBackgroundModal"
const Input = styled('input')({
  display: 'none',
});

export const TopImageSetUp:React.FC = function UserBackgroupdSetUpFunc(){
  const [on,setOn] = useState<boolean>(false)
  // symple handler
  const changeOnHandler = () => setOn(true)
  return(
    <>
    <div className = "UsersShowTopSettingListBackgroudImage"
      onClick={changeOnHandler}
      style={{
        cursor:"pointer",
        margin:"10px 0px 10px 0px"
      }}
      >
        画像を変更する
      </div>
      {/* <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <GiPhotoCamera />
        </IconButton>
      </label>
      </Stack> */}

      <TopimageV2
        on = {on}
        setOn = {setOn}
      />
    </>
  )
}