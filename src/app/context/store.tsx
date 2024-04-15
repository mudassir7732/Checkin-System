"use client"
import React, { Dispatch, FC, SetStateAction, createContext, useState } from 'react';
interface ContextProps {
  openCheckin: boolean;
  setCheckin: Dispatch<SetStateAction<boolean>>;
  openDetails: boolean;
  setDetails: Dispatch<SetStateAction<boolean>>;
  detailProps: string;
  setDetailProps: Dispatch<SetStateAction<string>>
}
interface MyContextProviderProps {
  children: React.ReactNode; 
}

const MyContext = createContext<ContextProps>({
  openCheckin: false,
  setCheckin: () => { },
  openDetails: false,
  setDetails:()=>{},
  detailProps:'',
  setDetailProps:()=>{},
});

const MyContextProvider: FC<MyContextProviderProps> = ({ children }) => {
  const [openCheckin, setCheckin] = useState<boolean>(false);
  const [openDetails, setDetails] = useState<boolean>(false);
  const [detailProps, setDetailProps] = useState<string>('');

  return (
    <MyContext.Provider value={{ openCheckin, setCheckin, openDetails, setDetails, detailProps, setDetailProps }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };

