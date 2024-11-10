import { BsTwitterX } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuMail } from "react-icons/lu";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

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
          <button className="font-sans text-xl py-3 mt-2 bg-[#1D9BF0] rounded-full w-52 content-center">Post</button>
        </div>

        <div className="col-span-5 border-x border-slate-700"></div>
        <div className="col-span-4"></div>
      </div>
    </div>
  );
}
