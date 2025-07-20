"use client"
import type { ILoginUser } from "@/helpers/models/auth";
import httpService, { unsecureHttpService } from "@/helpers/services/httpService";
import { useMutation } from "@tanstack/react-query";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toaster } from "@/components/ui/toaster";
import { EVENT_PAGE_URL, URLS } from "@/helpers/services/urls";
import { useState } from "react";
import Cookies from 'js-cookie';

const useGoogle = () => {
    const [open, setOpen] = useState(true);
    const [access_Token, setAccessToken] = useState("");

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

                Cookies.set("chase_token", accessToken, {
                    path: "/",
                    secure: true,
                    sameSite: "Lax",
                }); 

                toaster.create({
                    title: "Login Successful",
                    type: "success",
                    closable: true,
                });

                setAccessToken(accessToken)

                checkUserInfo(data?.data?.access_token)

            } else {
                toaster.create({
                    title: "Token missing in response", 
                    type: "error",
                    closable: true,
                });
            }
        },
        onError: (error: any) => {
            console.error("Google sign-in failed:", error);
            toaster.create({
                title: "Google sign-in failed",
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

                console.log("testing"); 

                window.location.replace(`${EVENT_PAGE_URL}?token=${access_Token}`);
                // window.location.href = `${EVENT_PAGE_URL}?token=${access_Token}`;
                // Optional: redirect or load user profile
            }
        },
        onError: (error: any) => {
            console.error("Failed to fetch user info:", error);
            toaster.create({
                title: "Incorrect Username or Password", 
                type: "error",
                closable: true,
            });
        },
    });

    const editProfile = useMutation({
        mutationFn: (data: any) => httpService.put(`${URLS.UPDATE_PROFILE}`, data),
        onSuccess: () => { 

            toaster.create({ 
                title: "Profile Updated",
                type: "success",
                closable: true,
            });

            window.location.replace(`${EVENT_PAGE_URL}?token=${access_Token}`);

            // if (index) {
            //     if (type === "DONATION") {
            //         router.push(`/dashboard/donation/${index}`);
            //     } else if (type === "RENTAL") {
            //         router.push(`/dashboard/kisok/details-rental/${index}`);
            //     } else if (type === "SERVICE") {
            //         router.push(`/dashboard/kisok/service/${index}`);
            //     } else if (type === "KIOSK") {
            //         router.push(`/dashboard/kisok/details/${index}`);
            //     } else {
            //         router.push(`/dashboard/event/details/${(affiliateID === "affiliate" || affiliateIDtwo) ? affiliate ? affiliate : affiliateIDtwo : index}${(affiliateID === "affiliate" || affiliateIDtwo) ? "?type=affiliate" : ""}`);
            //     }
            // } else {
            //     router.push('/dashboard/product')
            // }
        },
        onError: () => { 

            toaster.create({ 
                title: "An error occured while updating your profile",
                type: "error",
                closable: true,
            }); 

        }
    })

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
            editProfile.mutate(data)
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
