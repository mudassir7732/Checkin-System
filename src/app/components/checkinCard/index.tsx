import Image from "next/image";
import { FC, useContext } from "react";
import { Button } from "../button";
import { Box, Typography } from "@mui/material";
import { CheckinCardProps } from "@/app/types/checkInCard";
import { MyContext } from "@/app/context/store";
import styles from './styles';

const CheckinCard: FC<CheckinCardProps> = (props) => {
    const { id, title, image, date, owner, avatar } = props;
    const { setDetails, setDetailProps } = useContext(MyContext);

    return (
        <Box className={styles.container}>
            <Box key={id} className={styles.imageWrapper}>
                <Image alt="user" src={image} width={271} height={160} className="object-cover h-full mx-auto" style={{ objectPosition: 'center' }} />
                <Button title='Checked In' variant="contained" type="button" onClick={() => { setDetails(true); setDetailProps(image) }}
                    className={styles.button} />
            </Box>
            <Typography className={styles.title}>
                {title}
            </Typography>
            <Typography className={styles.date}>
                {date}
            </Typography>
            <Box className={styles.owner}>
                <Image alt="user" src={avatar} width={32} height={32} className="rounded-full h-[32px] w-[32px]" />
                <Typography className={styles.name}>
                    Owner: {owner}
                </Typography>
            </Box>
        </Box>
    )
}
export default CheckinCard;
