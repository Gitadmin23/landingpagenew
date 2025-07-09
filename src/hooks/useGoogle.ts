import type { ILoginUser } from "@/helpers/models/auth";
import { unsecureHttpService } from "@/helpers/services/httpService";
import { useMutation } from "@tanstack/react-query";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toaster } from "@/components/ui/toaster";
import { URLS } from "@/helpers/services/urls";
import { useState } from "react";
import Cookies from 'js-cookie'; 

const useGoogle = () => {
    const [open, setOpen] = useState(true);  

    const { mutate: signInWithGoogle, isPending: signInPending } = useMutation({
        mutationFn: (googleToken: string) =>
            unsecureHttpService.get(URLS.SIGN_IN_WTIH_CREDENTIALS, {
                headers: {
                    Authorization: `Bearer ${googleToken}`,
                },
            }),
        onSuccess: (data: any) => {
            const accessToken = data?.data?.access_token;

            if (accessToken) {
                Cookies.set("chase_token", "checking", {
                    // For localhost, omit domain or use 127.0.0.1
                    // domain: "http://localhost:3001/",
                    path: "http://localhost:3001/",
                    secure: true,
                    sameSite: "Lax", // Use Lax for dev, None only when required with HTTPS
                }); 

                toaster.create({
                    title: "Login Successful", 
                    type: "success",
                    closable: true,
                }); 

                checkUserInfo(data?.data?.access_token)
                
            } else {
                toaster.create({
                    title: "Error",
                    description: "Token missing in response",
                    type: "error",
                    closable: true,
                });
            }
        },
        onError: (error: any) => {
            console.error("Google sign-in failed:", error);
            toaster.create({
                title: "Error",
                description: "Google sign-in failed",
                type: "error",
                closable: true,
            });
        },
    });

    const { mutate: checkUserInfo, isPending: checking } = useMutation({
        mutationFn: (accessToken: string) =>
            unsecureHttpService.get(
                URLS.GET_USER_PRIVATE_PROFILE, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            ),
        onSuccess: (data: any) => {
            if (data?.data?.username === data?.data?.email) {
                setOpen(true);
            } else { 

                console.log(data);
                

                // Optional: redirect or load user profile
            }
        },
        onError: (error: any) => {
            console.error("Failed to fetch user info:", error);
            toaster.create({
                title: "Error",
                description: "Incorrect Username or Password",
                type: "error",
                closable: true,
            });
        },
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            firstName: "",
            lastName: "",
            username: "",
            phone: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            firstName: Yup.string().min(2, "First name must be at least 2 characters").required("First name is required"),
            lastName: Yup.string().min(2, "Last name must be at least 2 characters").required("Last name is required"),
            username: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
            phone: Yup.string()
                .matches(/^\+?[0-9]{10,15}$/, "Phone number is not valid")
                .required("Phone number is required"),
        }),
        onSubmit: (data: ILoginUser) => {
            // Form submission logic (not used in Google sign-in flow)
        },
    }); 

    return {
        signInPending, 
        checking, 
        signInWithGoogle,
        formik,
        open,
    };
};

export default useGoogle;
