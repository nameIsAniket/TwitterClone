import { IoBookmarkOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { RiShare2Line } from "react-icons/ri";
import Image from "next/image";

export const Feedcard:React.FC = () => {
    return  <div className="grid grid-cols-12 px-4 font-sans py-2 border-b border-slate-700">
                <div className="col-span-1">
                  <Image src="https://pbs.twimg.com/profile_images/1127986516339249152/-NCXZ_DB_400x400.jpg" 
                  alt = "user-image"
                  height={40} 
                  width={40}
                  className="rounded-full"
                 />
                </div>
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
              </div>
}