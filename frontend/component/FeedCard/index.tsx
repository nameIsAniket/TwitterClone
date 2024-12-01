import { IoBookmarkOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { RiShare2Line } from "react-icons/ri";
import Image from "next/image";
import { Tweet } from "@/gql/graphql";

interface FeedCardProps {
  data : Tweet
}
export const Feedcard:React.FC<FeedCardProps> = (props) => {

  const { data } = props;

    return  <div className="grid grid-cols-12 px-4 font-sans py-2 border-b border-slate-700">
                <div className="col-span-1">
                  <Image src= {data.author?.profileImage || "https://www.shutterstock.com/shutterstock/photos/1290290407/display_1500/stock-vector-isolated-object-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-1290290407.jpg"}  
                  alt = "user-image"
                  height={40} 
                  width={40}
                  className="rounded-full"
                  />
                </div>
                <div className="col-span-11 flex flex-col">
                  <div className="flex items-center gap-1">
                    <div>{data.author?.firstName}</div>
                    <div className="text-[#71767b]">@{data.author?.firstName}{data.author?.lastName}</div>
                    <div className="bg-[#71767b] rounded-full h-[2px] w-[2px]"><div/></div>
                    <div className="text-[#71767b]">15h</div>
                  </div>
                  
                  <p>
                    {data.tweet}
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
              </div>
}