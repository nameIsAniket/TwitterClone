import {Feedcard, TwitterLayout} from './index' 
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image';
import { IoArrowBack } from "react-icons/io5";
import { Tweet, User } from '@/gql/graphql';
import { graphqlClient } from '@/client/api';
import { getUserByIdQuery } from '@/graphql/quries/user';
import { useCurrentUser } from '@/hooks/user';
import { useCallback, useMemo } from 'react';
import { FollowUserMutation, unFollowUserMutation } from '@/graphql/mutation/user';
import { useQueryClient } from '@tanstack/react-query';

interface ServerProps {
    userInfo? : User}

const UserProfilePage: NextPage<ServerProps> = (props) => {
    const user = props.userInfo;
    const currentUser = useCurrentUser();
    const queryClient = useQueryClient();

    const isFollwed = useMemo(() => {
        if (!user || !currentUser.user?.Following) return false; // Ensure both are valid
        return (
            (currentUser.user.Following.findIndex(
                (el) => el?.id === user.id
            ) ?? -1) >= 0
        );
    }, [currentUser.user?.Following, user]);

    const handleFollowUser = useCallback( async() => {
        if(!user?.id) return;
        await graphqlClient.request(FollowUserMutation, {to : user?.id});
        await queryClient.invalidateQueries({queryKey: ["current-user"]})
    },[queryClient, user?.id])

    const handleUnFollowUser = useCallback( async() => {
        if(!user?.id) return;
        await graphqlClient.request(unFollowUserMutation, {to : user?.id});
        await queryClient.invalidateQueries({queryKey: ["current-user"]})
    },[queryClient, user?.id])

    return <div>
        <TwitterLayout>
            <div className='relative'>
                <nav className='ml-4 gap-6 flex items-center bg-opacity-50 backdrop-blur py-1' >
                    <IoArrowBack className='text-xl'/>
                    <div>
                        <div className='font-semibold text-xl'>{user?.firstName + " " +user?.lastName}</div>
                        <div className='text-slate-600 text-sm'>100 Post</div>
                    </div>
                </nav>

                <Image src={'https://pbs.twimg.com/profile_banners/3052732555/1557767914/1500x500'} alt='Background Image' height={200} width={598} className='w-full'></Image>

                <Image src={"https://pbs.twimg.com/profile_images/1127986516339249152/-NCXZ_DB_400x400.jpg"} alt='Profile Image' height={140} width={140} className='rounded-full absolute top-48 ml-4 bg-black p-1'></Image>

                {currentUser.user?.id != user?.id && <div className='flex justify-end h-16 mt-2'>
                    { isFollwed ? (
                        <button className='border rounded-full border-slate-600 h-fit px-3 py-1 mr-4 mt-2 font-semibold' onClick={handleUnFollowUser}>
                            UnFollow 
                        </button>
                    ) : (
                        <button className='border rounded-full border-slate-600 h-fit px-3 py-1 mr-4 mt-2 font-semibold' onClick={handleFollowUser}>
                            Follow
                        </button>
                    )}
                </div>} 

                {currentUser.user?.id == user?.id && <div className='flex justify-end h-16 mt-2'>
                    <button className='border rounded-full border-slate-600 h-fit px-3 py-1 mr-4 mt-2 font-semibold'>Edit Profile</button>
                </div>}
                
                <div className='pl-4 pb-4 border-b border-slate-600'>
                    <div className='text-xl font-bold pt-2 '>
                        Aniket Lakade
                    </div>
                    <div className='text-slate-600 font-sans h-fit'>
                        @AniketLakde
                    </div>
                    <div className='font-sans mt-2'>
                        Curious/Learner/Traveller
                    </div>
                    <div className='flex gap-2 mt-1 text-slate-600 font-sans h-fit'>
                        <div>

                            Wardha, India
                        </div>
                        <div>

                            Born January 10, 2000
                        </div>
                        <div>

                            joined March 2015
                        </div>
                    </div>
                    <div className='flex gap-2 mt-2 font-sans text-sm h-fit'>
                        <div className='flex gap-1'>
                            <div>{user?.follower?.length ?? 0}</div><div className='text-slate-600'>followers</div>
                        </div>
                        <div className='flex gap-1'>
                            <div>{user?.Following?.length ?? 0}</div><div className='text-slate-600'>Following</div>
                        </div>
                    </div>
                </div>

                <div>
                    {user?.tweets?.map(tweet => <Feedcard key={tweet?.id} data={tweet as Tweet}/>)}
                </div>
                
            </div>
        </TwitterLayout>
    </div>
}

export const getServerSideProps : GetServerSideProps<ServerProps> = async(context) => {
    const givenId = context.query.id as string | undefined    

    if(!givenId) return {notFound:true, props : {user : undefined}}

    const userInfo = await graphqlClient.request(getUserByIdQuery, {givenId})

    if(!userInfo?.getUserByID) return {notFound:true, props : {user : undefined}}

    return {
        props : {
            userInfo : userInfo.getUserByID as User
        }
    }
}

export default UserProfilePage