import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";

export const TweetCard:React.FC = () => {
    
    const {user} = useCurrentUser();
    return <div className="grid grid-cols-12 px-4 py-2 border-b border-slate-700">
        <div className="col-span-1"> 
            {user && <div className="mt-2">
                <Image src={user?.profileImage || "user not found"} 
                alt = "user-image"
                height={40} 
                width={40}
                className="rounded-full"
                />
            </div>}
        </div>

        <div className="col-span-11 ">
            <textarea className="bg-transparent"></textarea>
        </div>

     </div>
}
