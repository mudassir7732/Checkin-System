"use client";
import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { Button } from "../button";
import { Box, Modal, Typography } from "@mui/material";
import TextInput from "../TextInput";
import { Form, Formik } from "formik";
import * as yup from 'yup';
import moment from "moment";
import Loader from "../loader";
import { format } from "date-fns";
import { doc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import CustomSnackbar from "../snackbar";
import styles from "./styles";
import { BookingDetailsProps } from "@/types/bookingDetails";
import { MyContext } from "@/context/store";
import { userProps } from "@/types/user";
import db from "@/firebase";

const INITIAL_VALUES: BookingDetailsProps = {
    bookingId: '',
    rooms: null,
    guests: null,
    bookingDate: moment().toDate()
}

const VALIDATION_SCHEMA = yup.object().shape({
    bookingId: yup.string().required('required'),
    rooms: yup.number().moreThan(0, "Required").required('Required'),
    guests: yup.number().moreThan(0, "Required").required('Required'),
    bookingDate: yup.date().required('Required')
})

const Detail: FC = () => {
    const [loading, setLoading] = useState<boolean>(false); // Initialize loading to false
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const { openDetails, setDetails, detailProps } = useContext(MyContext);

    useEffect(() => {
        detailProps;
        setLoading(false);
    }, [detailProps])

    const handleBooking = (values: BookingDetailsProps) => {
        // const userString = localStorage.getItem('user');
        // let user;
        // if (userString !== null) {
        //     user = JSON.parse(userString);
        // }
        // if (!user?.name || !user?.image) {
        //     userAuthentication();
        // }
        // else {
        uploadData(values);
        // }
    };

    const userAuthentication = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                const userName = user.displayName;
                const userImage = user.photoURL;
                const currentUser: userProps = { name: userName, image: userImage };
                localStorage.setItem('user', JSON.stringify(currentUser));
                setSnackbarMessage('Signin Successfull');
            })
            .catch((error) => {
                setSnackbarMessage(error?.message);
            });
    }

    const uploadData = async (values: BookingDetailsProps) => {
        setLoading(true);
        try {
            const date: Date = new Date(values.bookingDate);
            const formattedDate: string = format(date, "do MMM',' yyyy");
            await setDoc(doc(db, "bookings", values.bookingId), {
                id: values?.bookingId,
                numberOfRooms: values.rooms,
                numberOfGuests: values.guests,
                image: detailProps,
                date: formattedDate,
            });
            setDetails(false);
            setSnackbarMessage('Successfully Updated');
        }
        catch (error) {
            setSnackbarMessage((error as Error)?.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            {snackbarMessage && <CustomSnackbar message={snackbarMessage} />}
            <Modal open={openDetails} className={styles.modal}>
                <>
                    {loading && <Loader />}
                    <Box className={styles.container}>
                        <Box className={styles.header}>
                            <Typography className={styles.heading}>
                                Detail
                            </Typography>
                            <Image alt="user" src='/assets/icons/cross.svg' width={11.31} height={11.64}
                                onClick={() => setDetails(false)} className="h-[12px] w-[12px] cursor-pointer" />
                        </Box>

                        <Formik initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA} onSubmit={handleBooking}>
                            {({ handleChange, handleSubmit, setFieldValue, handleReset, errors, touched, values }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Box className={styles.formWrapper}>
                                        <Box className="w-[256px]">
                                            <Box className={styles.inputWrapper}>
                                                <Typography className="text-[16px] font-[500] text-black">
                                                    Booking ID
                                                </Typography>
                                                <TextInput name='bookingId' className='w-[133px] h-[32px]' placeholder="12345678" value={values.bookingId} onChange={handleChange} autoFocus={true}
                                                    error={errors.bookingId && touched.bookingId} helperText={errors.bookingId && touched.bookingId && errors.bookingId} size="small" />
                                            </Box>
                                            <Box className={styles.inputWrapper}>
                                                <Typography className="text-[16px] font-[500] text-black">
                                                    Rooms
                                                </Typography>
                                                <TextInput name='rooms' className='w-[34px] h-[32px] mr-[23px]' placeholder="4" value={values.rooms} onChange={handleChange}
                                                    error={errors.rooms && touched.rooms} helperText={errors.rooms && touched.rooms && errors.rooms} size="small" />
                                            </Box>
                                            <Box className={styles.inputWrapper}>
                                                <Typography className="text-[16px] font-[500] text-black">
                                                    Number of Guest
                                                </Typography>
                                                <TextInput name='guests' className='w-[34px] h-[32px] mr-[23px]' placeholder="4" value={values.guests} onChange={handleChange}
                                                    error={errors.guests && touched.guests} helperText={errors.guests && touched.guests && errors.guests} size="small" />
                                            </Box>
                                            <Box className={styles.inputWrapper}>
                                                <Typography className="text-[16px] font-[500] text-black">
                                                    Booked Date
                                                </Typography>
                                                <input
                                                    name="bookingDate"
                                                    type='date'
                                                    defaultValue={values.bookingDate ? moment(values.bookingDate).format('YYYY-MM-DD') : '12-02-2024'}
                                                    onBlur={(e) => setFieldValue('bookingDate', moment(e.target.value).toDate())}
                                                    className={styles.dateInput}
                                                />
                                            </Box>
                                        </Box>
                                        <Image alt="user" src={detailProps} width={256} height={134} className="object-cover h-[134px] max-w-[256px] rounded-[18px]" />
                                    </Box>
                                    <Box className={styles.buttonsWrapper}>
                                        <Button title='Cancel' type='reset' variant="outlined" className="h-[32px]" />
                                        <Button title='Ok' type='submit' variant="contained" className="h-[32px]" />
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </>
            </Modal >
        </>
    )
}
export default Detail;