import { BsTwitterX } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuMail } from "react-icons/lu";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { Feedcard } from "@/component";

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
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen">
        <div className="col-span-3 mt-1 pl-24">
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
        </div>

        <div className="col-span-5 border-x border-slate-700 overflow-scroll no-scrollbar">

          <div className="flex justify-around h-14 items-center border-b border-slate-700 text-slate-400 fixed w-[665px] bg-[#2F3336] bg-opacity-80">
            <div>For you</div>
            <div>Following</div>
          </div>

          <div className="h-14"/>

          <Feedcard/>
          <Feedcard/>
          <Feedcard/>
          <Feedcard/>
          <Feedcard/>
          <Feedcard/>
          <Feedcard/>
          <Feedcard/>
          <Feedcard/>
          <Feedcard/>

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

        <div className="col-span-4"></div>
      </div>
    </div>
  );
}
