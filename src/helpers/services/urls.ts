
export const URLS = {
    LOGIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    auth: '/auth', 
    SEND_VERIFICATION_EMAIL: '/auth/verification/send-email',
    VERIFY_TOKEN: '/auth/verification/verify-token',
    RESET_PASSWORD: '/auth/verification/change-password', 
    SIGN_IN_WTIH_CREDENTIALS: '/auth/signinWithCredentials', 
    GET_USER_PRIVATE_PROFILE: '/user/privateprofile', 
    UPDATE_PROFILE: '/user/update-profile',
}

export const IMAGE_URL = process.env.NEXT_PUBLIC_RESOURCE_URL as string;
export const EVENT_PAGE_URL = process.env.NEXT_PUBLIC_EVENT_PAGE_URL as string;
export const DASHBOARDPAGE_URL = process.env.NEXT_PUBLIC_DASHBOARDPAGE_URL as string
export const POST_PAGE_URL = process.env.NEXT_PUBLIC_POST_PAGE_URL as string;

// export const RESOURCE_BASE_URL = process.env.NEXT_PUBLIC_AWS_BASE_URL as string;

// export const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN as string;;
