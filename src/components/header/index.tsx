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
      <Image unoptimized={true} alt="user" src='/assets/logo/logo.svg' width={53.19} height={55} />
      <Box className='flex flex-row items-center'>
        <Button title='Feedback' variant="contained" className="hidden sm:block mr-[25.12px]" type="button" />
        <Image unoptimized={true} alt="user" src='/assets/icons/Bell.svg' width={23.19} height={24} className={styles.bellIcon} />
        <Image unoptimized={true} alt="user" src='/assets/icons/InfoCircle.svg' width={23.19} height={24} className={styles.infoIcon} />
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