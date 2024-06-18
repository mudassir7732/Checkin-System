"use client"
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import styles from './styles';
import db from "@/firebase";
import { dataProps } from "@/types/firebaseData";
import Banner from "@/components/banner";
import CheckinCard from "@/components/checkinCard";
import Detail from "@/components/detail";

const Home = () => {
  const [data, setData] = useState<dataProps[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = collection(db, 'checkIns');
        const unsubscribe = onSnapshot(ref, (snapshot) => {
          const newData: dataProps[] = [];
          snapshot.forEach((doc) => {
            newData.push(doc.data() as dataProps);
          });
          setData(newData);
        });
        return unsubscribe;
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };
    fetchData();
    return () => {
    };
  }, []);

  useEffect(()=>{
    console.log(data,' = Data is here')
  },[data])

  return (
    data && (
      <Box className="tw-flex tw-flex-col"> 
        <Banner />
        <Box className={styles.headingWrapper}>
          <Typography className={styles.heading}>
            Added CheckIns
          </Typography>
          <Image
            unoptimized={true}
            alt="user"
            src="/assets/icons/menu.svg"
            width={20}
            height={16}
            className="tw-mr-[12px] tw-cursor-pointer"
          />
        </Box>
        <Box className="flex justify-center">
          <Box className={styles.cardsContainer}>
            {data?.map((card, index) => (
              <CheckinCard
                key={index}
                title={card?.title}
                image={card?.image}
                date={card?.date}
                owner={card?.owner}
                avatar={card?.avatar}
                id={card?.id}
              />
            ))}
          </Box>
        </Box>
        <Detail />
      </Box>
    )
  )
}
export default Home;

