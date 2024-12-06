import { useCurrentUser } from '@/hooks/user';
import {TwitterLayout} from './index' 
import type { NextPage } from 'next'
import { IoArrowBack } from "react-icons/io5";

 const UserProfilePage: NextPage = () => {
    const {user} = useCurrentUser();
    return <div>
        <TwitterLayout>
            <div>
                <nav className='pl-4 gap-6 flex items-center bg-opacity-50 backdrop-blur py-1' >
                    <IoArrowBack className='text-xl'/>
                    <div>
                        <div className='font-semibold text-xl'>{" Aniket Lakade   " + user?.firstName + user?.lastName}</div>
                        <div className='text-slate-600 text-sm'>100 Post</div>
                    </div>
                </nav>
            </div>
        </TwitterLayout>
    </div>
}

export default UserProfilePage