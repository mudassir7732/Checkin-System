"use client"
import Image from "next/image";
import { FC, useContext, useState } from "react";
import TextInput from "../TextInput";
import { Button } from "../button";
import { Box, Modal, Typography } from "@mui/material";
import { MyContext } from "@/app/context/store";
import { Form, Formik } from "formik";
import * as yup from 'yup';
import { CheckInProps } from "@/app/types/checkIn";
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from "firebase/firestore";
import { ref, getStorage, getDownloadURL, uploadBytes } from 'firebase/storage';
import db from "@/app/firebase";
import { format } from "date-fns";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Loader from "../loader";
import { userProps } from "@/app/types/user";
import CustomSnackbar from "../snackbar";
import styles from './styles';

const INITIAL_VALUES: CheckInProps = {
    title: '',
    image: new Blob(),
}

const VALIDATION_SCHEMA = yup.object().shape({
    title: yup.string().required('Title required'),
    image: yup.mixed().test('isFile', 'Image required', value => value instanceof File).required('Image required')
})

const AddCheckIn: FC = () => {
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { openCheckin, setCheckin } = useContext(MyContext);

    const handleInput = async (values: CheckInProps) => {
        const userString = localStorage.getItem('user');
        let user;
        if (userString !== null) {
            user = JSON.parse(userString);
        }
        if (!user?.name || !user?.image) {
            userAuthentication();
        }
        else {
            uploadData(values, user);
        }
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

    const uploadData = async (values: CheckInProps, user: userProps) => {
        setLoading(true);
        const checkInId = uuidv4();
        try {
            const storage = getStorage();
            const imageRef = ref(storage, `checkins/${checkInId}`);
            await uploadBytes(imageRef, values.image);
            const imageUrl = await getDownloadURL(imageRef);
            const date: Date = new Date();
            const formattedDate: string = format(date, "do MMM',' yyyy");
            await setDoc(doc(db, "checkIns", checkInId), {
                id: checkInId,
                owner: user.name,
                avatar: user.image,
                title: values.title,
                image: imageUrl,
                date: formattedDate,
            });
            setSnackbarMessage('Successfully Updated');
            setCheckin(false);
        }
        catch (error) {
            console.log('Failed', error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            {snackbarMessage && <CustomSnackbar message={snackbarMessage} />}
            <Modal open={openCheckin} className={styles.modal}>
                <>
                    {loading && <Loader />}
                    <Box className={styles.Container}>
                        <Box className={styles.header}>
                            <Typography className={styles.title}>
                                Add Check In
                            </Typography>
                            <Image alt="user" src='/assets/icons/cross.svg' width={11.31} height={11.64}
                                className="h-[12px] w-[12px] cursor-pointer" onClick={() => setCheckin(false)} />
                        </Box>
                        <Formik initialValues={INITIAL_VALUES}
                            validationSchema={VALIDATION_SCHEMA} onSubmit={handleInput}>
                            {({ handleChange, handleSubmit, setFieldValue, handleReset, errors, touched, values }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Box className="px-[24px] pt-[24px] pb-[32px] outline-none max-w-[572px]">
                                        <Typography className={styles.inputLabel}>
                                            Title
                                        </Typography>
                                        <TextInput name="title" value={values.title} onChange={handleChange} placeholder="Enter title"
                                            fullWidth={true} type="" size="medium"
                                            autoFocus={true} error={errors.title && touched.title}
                                            helperText={errors.title && touched.title && errors.title} />
                                        <Typography className={styles.inputLabel}>
                                            Upload Image
                                        </Typography>
                                        <Box className={`flex flex-col items-start w-full `}>
                                            <Box className={`${styles.imageInput} ${ errors.image ? 'border-[#d32f2f]' : 'border-[#b4b4b4]'} `}>
                                                <input
                                                    type="file"
                                                    name="image"
                                                    onChange={(event) => {
                                                        const file = event.currentTarget.files && event.currentTarget.files[0];
                                                        if (file) {
                                                            setFieldValue('image', file);
                                                        }
                                                    }}
                                                    style={{ display: 'none', border: '2px solid red' }}
                                                />
                                                <Box onClick={() => document.getElementsByName('image')[0].click()} >
                                                    <Image alt="user" src="/assets/icons/inbox.svg"
                                                        width={35.11}
                                                        height={35.51}
                                                        className="mt-[22.23px] mx-auto"
                                                    />
                                                    <Typography className={styles.inputText1}>
                                                        Click or drag file to this area to upload
                                                    </Typography>
                                                    <Typography className={styles.inputText2}>
                                                        Support for a single or bulk upload. Strictly prohibit from uploading company or other band files
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            {errors.image && touched.image && (
                                                <span className={styles.errorMessage}>
                                                    {errors.image?.toString()}
                                                </span>
                                            )}
                                        </Box>
                                    </Box>
                                    <Box className={styles.buttonsWrapper}>
                                        <Button title='Cancel' variant="outlined" className="h-[32px]" type="reset" />
                                        <Button title='Ok' type='submit'
                                            variant="contained" className="h-[32px]" />
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </>
            </Modal>
        </>
    );
}
export default AddCheckIn;