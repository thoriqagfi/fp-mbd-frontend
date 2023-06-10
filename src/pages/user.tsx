import Head from "next/head";
import * as React from 'react';
import Image from 'next/image';

import { FormProvider, FormProviderProps, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import toast, {Toaster} from "react-hot-toast";
import { apiMock } from '@/lib/apiMock';
import { getToken } from '@/lib/token';

import { Carousel } from '@mantine/carousel';
import Layout from "@/Layout/Layout";
import { Search, PlaylistAdd, DeviceGamepad2, Plus } from 'tabler-icons-react';
import withAuth from "@/components/hoc/withAuth";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";

  export type DevReleaseDataResponse = {
    data: ListGameDLC;
    code: number;
    message: string;
    success: boolean;
  };


  export type ListGameDLC = {
    ListGames: ListGame[];
    ListDLC: ListDLC[];
  };

  export type ListGame = {
    id: string;
    nama: string;
    deskripsi: string;
    release_date: string;
    harga: number;
    age_rating: string;
    system_min: string;
    system_rec: string;
    picture: string;
    video: string;
    developer: string;
  };
  
  export type ListDLC = {
    id: string;
    nama: string;
    deskripsi: string;
    harga: number;
    system_min: string;
    system_rec: string;
    picture: string;
  };

 export default withAuth(User, "USER");

function User(){
    const router = useRouter();
    const {user} = useAuthStore();
    const { isLoading, error, data } = useQuery<DevReleaseDataResponse>(
        ['data'],
        async () => {
            const {data} = await apiMock.get(`/secured/user/medev`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            });
            //console.log(data.data.game_picture);
            return data;
        }
    );

    return(
        <>
            <Head>
                <title>Profile Page</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
            {user?.role=== "Developer"?
               <main className="bg-blue-200 dark:bg-slate-800 py-12">
               <div className="px-[20%] md:px-[15%]">
                   <div className="w-full py-10 px-16 flex flex-col lg:flex-row bg-slate-900">
                       <div className="w-full lg:w-2/3 flex flex-col lg:flex-row">
                           <div className="w-full lg:w-1/3">
                               <Image height={300} width={300} alt="image2" className="w-auto h-2/3 lg:h-full lg:w-auto mx-auto lg:mx-0 float-none lg:float-right" src={user?.profile_image}/>
                           </div>
                           <div className="ml-0 lg:ml-10 mt-5 lg:mt-0 w-full lg:w-2/3 grid content-center">
                               <p className="font-bold text-3xl mx-auto lg:mx-0">{user?.name}</p>
                               <p className="mt-2 font-normal text-xl mx-auto lg:mx-0">{user?.email}</p>
                           </div>
                       </div>
                       <div className="w-full lg:w-1/3 mt-5 lg:mt-0 grid content-center">
                           <div className="flex flex-row items-center mx-auto lg:mx-0">
                               <DeviceGamepad2 size={24} strokeWidth={2} color={'#ffff'}/><p className="font-semibold text-xl ml-3">{(data?.data.ListGames === undefined || data?.data.ListGames === null)  ? 0 : data?.data.ListGames.length}</p><p className="font-normal text-xl ml-2">Released Games</p>
                           </div>
                           <div className="flex flex-row items-center mx-auto lg:mx-0 mt-5">
                               <PlaylistAdd size={24} strokeWidth={2} color={'#ffff'}/><p className="font-semibold text-xl ml-3">{(data?.data.ListDLC === undefined || data?.data.ListDLC === null) ? 0 : data?.data.ListDLC.length}</p><p className="font-normal text-xl ml-2">Released DLC's</p>
                           </div>

                           <div className="flex flex-row items-center mx-auto lg:mx-0 mt-4">
                                <Link href="/uploadGame">
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded float-right'>
                                        <Plus size={12} strokeWidth={2} color={'#ffff'}/>
                                    </button>
                                </Link>
                                <p className="font-light text-md ml-2">Upload Game</p>
                           </div>
                       </div>
                   </div>
                   <div className="w-full mt-5 py-5 px-16 flex flex-col gap-10 xl:flex-row bg-slate-900">
                       <div className="w-full xl:w-1/2">
                           <p className="font-normal text-xl ml-2 my-5">Released Games</p>
                           {(data?.data.ListGames === undefined || data?.data.ListGames === null)? <p>This developer hasn't released any game's</p> : data?.data.ListGames.map((item) => (
                           <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row w-full dark:border-gray-700 dark:bg-gray-800 mb-3">
                                <Image height={500} width={500} className="object-cover h-full w-auto rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={item.picture} alt=""/>
                                <div className="flex flex-col justify-between p-0 sm:p-4 leading-normal pl-2 sm:pl-5 w-full">
                                    <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">{item.nama}</h5>
                                    <div className="flex flex-row items-center mt-1">
                                        <a onClick={() =>
                                            router.push({
                                                pathname: '/uploadDLC',
                                                query: { id: `${item.id}`},
                                              })}>
                                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded float-right'>
                                                <Plus size={12} strokeWidth={2} color={'#ffff'}/>
                                            </button>
                                            </a>
                                        <p className="font-light text-md ml-2">Add DLC</p>
                                    </div>
                                </div>
                            </div>
                           ))}
                       
                       </div>
                       
                       <div className="w-full xl:w-1/2">
                       <p className="font-normal text-xl ml-2 my-5">Released DLC's</p>
                       {(data?.data.ListDLC === undefined || data?.data.ListDLC === null)? <p>This developer hasn't released any DLC's</p> : data?.data.ListDLC.map((item) => (
                            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row w-full dark:border-gray-700 dark:bg-gray-800 mb-3">
                               <Image height={500} width={500} className="object-cover h-full w-auto rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={item.picture} alt=""/>
                               <div className="flex flex-col justify-between p-0 sm:p-4 leading-normal pl-2 sm:pl-5 w-full">
                                   <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">{item.nama}</h5>
                               </div>
                           </div>
                       ))}
                       
                       </div>
                   </div>
               </div>
           </main> 
            
            : user?.role=== "User"?
            <main className="bg-blue-200 dark:bg-slate-800 py-12">
                    <div className="px-[20%] md:px-[15%]">
                        <div className="w-full py-10 px-16 flex flex-col lg:flex-row bg-slate-900">
                            <div className="w-full lg:w-2/3 flex flex-col lg:flex-row">
                                <div className="w-full lg:w-1/3">
                                    <Image height={300} width={300} src={user?.profile_image} alt="image2" className="w-auto h-2/3 lg:h-full lg:w-auto mx-auto lg:mx-0 float-none lg:float-right"/>
                                </div>
                                <div className="ml-0 lg:ml-10 mt-5 lg:mt-0 w-full lg:w-2/3 grid content-center">
                                    <p className="font-bold text-3xl mx-auto lg:mx-0">{user?.name}</p>
                                    <p className="mt-2 font-normal text-xl mx-auto lg:mx-0">{user?.email}</p>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/3 mt-5 lg:mt-0 grid content-center">
                                <div className="flex flex-row items-center mx-auto lg:mx-0">
                                    <DeviceGamepad2 size={24} strokeWidth={2} color={'#ffff'}/><p className="font-semibold text-xl ml-3">{user?.list_game === undefined ? 0 : user?.list_game.length}</p><p className="font-normal text-xl ml-2">Owned Games</p>
                                </div>
                                <div className="flex flex-row items-center mx-auto lg:mx-0 mt-5">
                                    <PlaylistAdd size={24} strokeWidth={2} color={'#ffff'}/><p className="font-semibold text-xl ml-3">{user?.list_dlc === undefined ? 0 : user?.list_dlc.length}</p><p className="font-normal text-xl ml-2">Owned DLC's</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-5 py-5 px-16 flex flex-col gap-10 xl:flex-row bg-slate-900">
                            <div className="w-full xl:w-1/2">
                                <p className="font-normal text-xl ml-2 my-5">Owned Games</p>
                                {user?.list_game === undefined? <p>This user has no games</p> : user?.list_game.map((item) => (
                                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row w-full dark:border-gray-700 dark:bg-gray-800 mb-3">
                                    <Image height={500} width={500} className="object-cover h-full w-auto rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={item.picture} alt=""/>
                                    <div className="flex flex-col justify-between p-0 sm:p-4 leading-normal pl-2 sm:pl-5 w-full">
                                        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">{item.nama}</h5>
                                    </div>
                                </div>
                                ))}
                            
                            </div>
                            
                            <div className="w-full xl:w-1/2">
                                <p className="font-normal text-xl ml-2 my-5">Owned DLC</p>
                                {user?.list_dlc === undefined? <p>This user has no DLC's</p> : user?.list_dlc.map((item) => (
                                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row w-full dark:border-gray-700 dark:bg-gray-800 mb-3">
                                    <Image height={500} width={500} className="object-cover h-full w-auto rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={item.picture} alt=""/>
                                    <div className="flex flex-col justify-between p-0 sm:p-4 leading-normal pl-2 sm:pl-5 w-full">
                                        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">{item.nama}</h5>
                                    </div>
                                </div>
                                ))}
                            
                            </div>
                        </div>
                    </div>
                </main>
            : <main className="bg-blue-200 dark:bg-slate-800 py-12 h-[calc(100vh-90px)] flex justify-center"><p className="my-auto">Please Login to reveal profile</p></main>}

            </Layout>
        </>
    )
}