import { useCookies } from "next-client-cookies";

export   function useSession() {
    const cookies = useCookies();
    const session = cookies.get('session-client')
        return session
}