import "@/styles/globals.css";
import '@/styles/custom.css'
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from 'react-hot-toast';


export default function App({ Component, pageProps }: AppProps) {
  return <GoogleOAuthProvider clientId="586627096565-4kv9dfm755jvcjbeon71jk7rl8heuhv8.apps.googleusercontent.com">
    <Component {...pageProps} />
    <Toaster/>
  </GoogleOAuthProvider>;
}
