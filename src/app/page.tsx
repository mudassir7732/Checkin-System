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
        <Box className={styles.heading}>
          <Typography className="tw-text-[40px] font-[500] text-black">
            Added CheckInsss
          </Typography>
          <Image
            unoptimized={true}
            alt="user"
            src="/assets/icons/menu.svg"
            width={19.13}
            height={15.94}
            className="mr-[12px] cursor-pointer"
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

