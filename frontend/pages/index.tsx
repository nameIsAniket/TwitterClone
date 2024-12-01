import { BsTwitterX } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuMail } from "react-icons/lu";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { Feedcard } from "@/component/FeedCard";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import Image from "next/image";
import { graphqlClient } from "@/client/api";
import { getToken } from "@/graphql/quries/user";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { ImEarth } from "react-icons/im";
import { MdOutlineGifBox } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

// import { TweetCard } from "@/component/TweetCard";

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

export default function Home() {
  const {user} = useCurrentUser();
  const {tweets = []} = useGetAllTweets();
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const {mutate} = useCreateTweet()  
  
  const handleSelectImage = useCallback( ()=>{
    const input = document.createElement('input');
    input.setAttribute("type","file");
    input.setAttribute("accept","image/*");
    input.click();
  },[])

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

  const handleCreateTweet = useCallback(()=> {
    console.log({content});
    mutate({content});
  },[content,mutate])

  return (
    <div>
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

          <div className="flex h-14 border-b border-slate-700 text-slate-400 bg-[#000000] bg-opacity-50 backdrop-blur fixed w-[598px]">

            <div className="w-1/2 flex justify-center items-center hover:bg-[#3E4144] hover:bg-opacity-30">
              For you
            </div>
            <div className="w-1/2 flex justify-center items-center hover:bg-[#3E4144]">
              Following
            </div>
            
          </div>
          <div className="h-16"/>

          <div>
            <div className="grid grid-cols-12 px-4 border-b border-slate-700">
              <div className="col-span-1"> 
                {user && <div className="pt-3">
                    <Image src={user?.profileImage || "user not found"} 
                    alt = "user-image"
                    height={40} 
                    width={40}
                    className="rounded-full"
                    />
                </div>}
              </div>

            <div className="col-span-11 ">
              <textarea className="bg-transparent w-full text-xl pt-4 py-4 font-sans outline-none"
              placeholder="What is Happening?!"
              rows={1}
              onChange={e=>setContent(e.target.value)}
              value={content}
              ></textarea>

              <div className="flex items-center gap-2 pb-3 text-[#1D9BF0] border-b border-[#3E4144]">
                <div><ImEarth /></div>
                <div>Everyone can reply</div>
              </div>

              <div className="flex text-[#1D9BF0] m-2 items-center">
                <CiImageOn className="h-[20px] w-[20px] m-3 " onClick={handleSelectImage} />
                <MdOutlineGifBox className="h-[20px] w-[20px] m-3"/>
                <HiOutlineEmojiHappy className="h-[20px] w-[20px] m-3"/>
                <RiCalendarScheduleLine className="h-[20px] w-[20px] m-3"/>
                <CiLocationOn className="h-[20px] w-[20px] m-3"/>
                <div className="ml-auto">
                  <button className="font-sans font-bold text-base  text-white bg-[#1D9BF0] rounded-full px-5 py-2 content-center"
                  onClick={handleCreateTweet}>Post</button>
                </div>
              </div>

              </div>
            </div>
          </div>

          {/* <TweetCard/> */}

          {tweets?.map( tweet => tweet ? <Feedcard key={tweet?.id} data={tweet as Tweet}/>: null )}
          
          {/* <div className="grid grid-cols-12 px-4 font-sans py-2 border-b border-slate-700">
            <div className="col-span-1"> </div>
            <div className="col-span-11 flex flex-col">
              <div className="flex items-center gap-1">
                <div>Naval</div>
                <div className="text-[#71767b]">@naval</div>
                <div className="bg-[#71767b] rounded-full h-[2px] w-[2px]"><div/></div>
                <div className="text-[#71767b]">15h</div>
              </div>
              
              <p>
                Elon Musk wasn’t eligible to be President, so he did the next best thing and got one elected.
              </p>
              <div className="flex justify-between mt-1">
                <div className="flex items-center hover:text-[#1D9BF0] ">
                  <div className=" hover:bg-blue-950 rounded-full p-2">
                    <FaRegComment />
                  </div>
                  <div>330</div>
                </div>
                <div className="flex items-center hover:text-green-500">
                  <div className="hover:bg-green-950 rounded-full text-lg p-2">
                    <BiRepost />
                  </div>
                  <div>591</div>
                </div>
                <div className="flex items-center hover:text-pink-500">
                  <div className=" hover:bg-pink-950 rounded-full p-2">
                    <FaRegHeart /> 
                  </div>
                  <div>330</div>
                </div>
                <div className="flex items-center hover:text-[#1D9BF0]">
                  <div className=" hover:bg-blue-950 rounded-full p-2">
                    <IoIosStats /> 
                  </div>
                  <div>364k</div>
                </div>
                <div className="flex items-center ">
                  <div className=" hover:bg-blue-950 rounded-full p-2 hover:text-[#1D9BF0]">
                    <IoBookmarkOutline />
                  </div>
                  <div className=" hover:bg-blue-950 rounded-full p-2 hover:text-[#1D9BF0]">
                    <RiShare2Line />
                  </div>
                </div>
                
              </div>
            </div>
          </div> */}
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
  )
}
