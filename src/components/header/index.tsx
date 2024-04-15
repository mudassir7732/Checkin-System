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
      <Image alt="user" src='/assets/logo/logo2.svg' width={53.19} height={55} className="h-[54px] w-[53.19px]" />
      <Box className='flex flex-row items-center'>
        <Button title='Feedback' variant="contained" className="hidden sm:block mr-[25.12px]" type="button" />
        <Image alt="user" src='/assets/icons/Bell.svg' width={23.19} height={24} className={styles.bellIcon} />
        <Image alt="user" src='/assets/icons/InfoCircle.svg' width={23.19} height={24} className={styles.infoIcon} />
        <Image
          alt="user"
          src='/assets/images/avatar.png'
          height={42}
          width={42}
          className={styles.avatar}
        />
        <Image alt="avatar" src='/assets/icons/menu-icon.svg' width={9.36} height={9} className="h-[9px] w-[9.36px]" />
      </Box>
    </Box>
  )
}
export default Header;