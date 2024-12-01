import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuMail } from "react-icons/lu";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import Image from "next/image";
import { graphqlClient } from "@/client/api";
import { getToken } from "@/graphql/quries/user";
import { useCallback} from "react";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";

interface TwitterSideBarItem{
  title : string
  logo  : React.ReactNode
}


const twitterSideBar:TwitterSideBarItem[] = [
  {
    title : "Home",
    logo  : <GoHome />
  },
  {
    title : "Explore",
    logo  : <CiSearch />
  },
  {
    title : "Notifications",
    logo  : <IoNotificationsOutline />
  },
  {
    title : "Messages",
    logo  : <LuMail />
  },
  {
    title : "Bookmarks",
    logo  : <IoBookmarkOutline />
  },
  {
    title : "Profile",
    logo  : <IoPersonOutline />
  }
]

interface TwitterLayoutProp {
    children : React.ReactNode;
}



export const TwitterLayout : React.FC<TwitterLayoutProp> = (props) => {
    const {user} = useCurrentUser();
    const queryClient = useQueryClient();

    const handleLoginWithGoogle = useCallback(
    async (credentialResponse:CredentialResponse) => {
        console.log(credentialResponse)
        const token = credentialResponse.credential;
        
        if(!token) return toast.error("Google Token not found");

        const {verifyGoogleToken} = await graphqlClient.request(getToken,{token : token})
        // console.log("tokenResponse",getTokenResponse.verifyGoogleToken)
        toast.success("Success");

        if(verifyGoogleToken)window.localStorage.setItem('jwttokenforTwitter',verifyGoogleToken)
        //@ts-expect-error : 'Type 'string[]' has no properties in common with type 'InvalidateQueryFilters'. '
        await queryClient.invalidateQueries(["current-user"]);

    },[queryClient]
    );

    return <div>
      <div className="grid grid-cols-12 h-screen w-screen">
        <div className="col-span-3 mt-1 pl-24 relative">
          <div className="text-[26px] hover:bg-gray-900 rounded-full w-fit p-3 cursor-pointer transition-all">
            <BsTwitterX />
          </div>
          <div className="flex flex-col">
            {twitterSideBar.map(item => (
              <div className={`flex items-center hover:bg-gray-900 rounded-full w-fit cursor-pointer transition-all` } key={item.title}>
                <div className="text-3xl p-3 ">{item.logo}</div>
                <div className="font-sans text-[20px] pl-3 pr-6">{item.title}</div>
              </div>
            ))}
          </div>
          <button className="font-sans text-xl py-3 mt-2 bg-[#1D9BF0] rounded-full w-52 content-center ">Post</button>

          <div className="absolute bottom-8 p-2 hover:bg-gray-900 rounded-full flex items-center">
            <div>
              {user && user.profileImage && <Image src={user?.profileImage || ""}
              alt="Profile-Image"
              height={40}
              width={40}
              className="rounded-full"></Image>}
            </div>
            <div>
              <div className="font-sans text-xl px-3">{user?.firstName} {user?.lastName}</div>
              <div className="text-[#71767b] px-3">@AniketLakade</div>
            </div>
          </div>   

        </div>

        <div className="col-span-5 border-x border-slate-700 overflow-scroll no-scrollbar">
            {props.children}
        </div>

        <div className="col-span-4">
          {!user && <div>
            <div className="py-4 text-xl font-semibold flex pl-16">Join Today.</div>
            <div className="pl-16">
              <GoogleLogin
                onSuccess={handleLoginWithGoogle}
                onError={() => {
                  console.log('Login Failed')
                }}
                size="large"
                text="signup_with"
                shape="circle"
                width={300}
              />
            </div>
          </div>}
        </div>
      </div>
    </div>
}