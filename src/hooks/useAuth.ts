import type { ILogin } from "@/helpers/models/auth";
import { unsecureHttpService } from "@/helpers/services/httpService";
import { useMutation } from "@tanstack/react-query";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"
import { EVENT_PAGE_URL } from "@/helpers/services/urls";

const useAuth = () => {

    const router = useRouter()


    const { mutate: signIn, isPending: signInPending } = useMutation({
        mutationFn: (data: ILogin) => unsecureHttpService.post(`/auth/signin`, data),
        onError: (error: any) => {
            console.log(error);
            // toast.error("Incorrect Username or Password")

            toaster.create({
                title: `Error`,
                description: "Incorrect Username or Password",
                type: "error",
                closable: true
            })
        },
        onSuccess: (data: any) => {

            toaster.create({
                title: `Success`,
                description: "Login Successful",
                type: "success",
                closable: true
            })
            Cookies.set("chase_token", data?.data?.access_token, {
                path: "/",
                secure: true,
                sameSite: "Lax",
            });

            // Pass the token to App B through URL
            window.location.href = `${EVENT_PAGE_URL}?token=${data?.data?.access_token}`;
             
        },
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: (data: ILogin) => {
            signIn({
                username: data?.username,
                password: data?.password
            })
        },
    });


    return {
        signInPending,
        formik
    }

}

export default useAuth