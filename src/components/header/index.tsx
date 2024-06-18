import Image from "next/image";
import { FC } from "react";
import { Button } from "../button";
import { Box } from "@mui/material";
import styles from './styles';

const Header: FC = () => {
  let userString;
  if (typeof localStorage !== 'undefined') {
    userString = localStorage.getItem('user');
  }

  let user;
  if (userString) {
    user = JSON.parse(userString);
  }

  return (
    <Box className={styles.container}>
      <Image unoptimized={true} alt="logo" src='/assets/logo/logo.svg' width={55} height={55} />
      <Box className='tw-flex tw-flex-row tw-items-center'>
        <Button title='Feedback' variant="contained" className="tw-hidden sm:tw-block tw-mr-[25.12px]" type="button" />
        <Image unoptimized={true} alt="bell_icon" src='/assets/icons/Bell.svg' width={23.19} height={24} className={styles.bellIcon} />
        <Image unoptimized={true} alt="info_icon" src='/assets/icons/InfoCircle.svg' width={23.19} height={24} className={styles.infoIcon} />
        <Image unoptimized={true}
          alt="user"
          src='/assets/images/Avatar1.png'
          height={42}
          width={42}
          className={styles.avatar}
        />
        <Image unoptimized={true} alt="avatar" src='/assets/icons/menu-icon.svg' width={9.36} height={9} />
      </Box>
    </Box>
  )
}
export default Header;