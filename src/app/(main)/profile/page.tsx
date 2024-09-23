import { getCurrentUser } from '@/lib/session';
import React from 'react'
import ImageProfile from '@/components/image-profile/ImageProfile';

const Profile = async() => {
    const user = await getCurrentUser();
  return (
    <div className='flex h-lvh items-center justify-center gap-10 container flex-col md:w-1/2'>
      <div className='flex flex-col gap-10 border shadow-md p-8 w-full'>
        <ImageProfile />
        <h1 className='text-4xl font-bold'>Profile</h1>
        <h2 className='text-xl font-semibold'>{user?.first_name} {user?.last_name}</h2>
        <span>{user?.email}</span>
        <span>{user?.username}</span>
      </div>
    </div>
  )
}

export default Profile
