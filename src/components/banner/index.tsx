import { Box, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { Button } from "../button";
import AddCheckIn from "../addCheckin";
import styles from './styles'
import { MyContext } from "@/context/store";

const Banner: FC = () => {
  const { setCheckin } = useContext(MyContext);
  let user;
  if (typeof window !== 'undefined') {
    const userString = localStorage.getItem('user');
    if (userString) {
      user = JSON.parse(userString);
    }
  }

  return (
    <Box className={styles.container}
      style={{ backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(/assets/images/banner-crop.png)' }}
    >
      <Typography className={styles.title}>
        {/* Hi!👋{user?.name} */}
        Hi!👋John Doe
      </Typography>
      <Typography className={styles.text}>
        Lorem ipsus dolor sit amen, something important to say here
      </Typography>
      <Button title='Add Check In' variant="contained" type="button" onClick={() => setCheckin(true)} />
      <AddCheckIn />
    </Box>
  )
}
export default Banner;