import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import Head from 'next/head';
import * as React from 'react';

import { FormProvider, FormProviderProps, useForm } from 'react-hook-form';
import { apiMock } from '@/lib/apiMock';

import { Carousel } from '@mantine/carousel';
import Layout from '@/Layout/Layout';
import { Search, PlayerTrackNext, PlayerTrackPrev } from 'tabler-icons-react';
import { rupiah } from '@/lib/rupiah';
import Link from 'next/link';
import Image from 'next/image';

export type IdData = {
  id: String;
};

export type SearchData = {
  keyword: string;
};

export type GameDataResponse = {
  data: GameData;
  code: number;
  message: string;
  success: boolean;
};

export interface GameListDLC {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  system_min: string;
  system_rec: string;
  picture: string;
  game_id: number;
}

export type GameData = {
  id: number;
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

// export default withAuth(GameDetail, 'auth');

export default function GameDetail() {
  const { id } = useRouter().query;
  const [openTab, setOpenTab] = React.useState(1);
  const { isLoading, error, data } = useQuery(['game_detail'], async () => {
    const res = await apiMock.get(`/storeMainPage/game/${id}`);
    return res.data;
  });
  const listDLC: GameListDLC[] = data?.data.list_dlc

  const methods = useForm<SearchData>({
    mode: 'onChange',
    defaultValues: {
      keyword: '',
    },
  });

  const {
    handleSubmit,
    formState,
    reset,
    formState: { errors },
  } = methods;

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        keyword: '',
      });
    }
  }, [formState, reset]);

  return (
    <>
      <Head>
        <title>Game Page</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <main className='bg-blue-200 dark:bg-slate-800'>
          <div className='px-[15%] pt-5'>
            <FormProvider {...methods}>
              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              <label
                htmlFor='default-search'
                className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
              >
                Search
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <svg
                    aria-hidden='true'
                    className='w-5 h-5 text-gray-500 dark:text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    ></path>
                  </svg>
                </div>
                <input
                  type='search'
                  id='default-search'
                  className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Search Games, Tags...'
                  required
                />        
                <button
                  type='submit'
                  className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  <Search size={20} color='white' />
                </button>

              </div>
              {/* </form> */}
            </FormProvider>
          </div>

          <div className='container w-10/12 flex flex-col px-0 mt-1 mx-auto'>
            <p className='ml-2 mt-10 mb-5 font-medium text-2xl'>
              {data?.data.nama}
            </p>

            <div className='container w-full flex flex-col-reverse md:flex-row px-0 bg-slate-900'>
              <div className='w-full flex md:w-2/3 p-0'>
                <div className='embed-responsive embed-responsive-16by9 align-center w-full my-auto'>
                  <iframe
                    className='w-full aspect-video embed-responsive-item'
                    src={data?.data.video}
                  ></iframe>
                </div>
              </div>

              <div className='w-full md:w-1/3 p-3'>
                <img
                  src={data?.data.picture}
                  className='img-fluid w-full h-auto'
                  alt='Game image'
                />
                <div className='G-desk m-2'>
                  <p className='my-0 text-light text-lg'>
                    {data?.data.deskripsi}
                  </p>
                  <br />
                  <p className='mt-1 mb-0 text-light font-light text-lg'>
                    Developer: {data?.data.developer}
                  </p>
                  <p className='mt-1 mb-0 text-light font-light text-lg'>
                    Release Date: {data?.data.release_date}
                  </p>
                  <p className='mt-1 mb-0 text-light font-light text-lg'>
                    Age Rating: {data?.data.age_rating}
                  </p>
                  <p className='mt-3 mb-0 text-light font-light text-lg'>
                    <b>Tags:</b>
                  </p>
                  <div className='flex flex-wrap'>
                    <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                      [G_TAGS]
                    </span>
                    <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                      [G_TAGS]
                    </span>
                    <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                      [G_TAGS]
                    </span>
                    <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                      [G_TAGS]
                    </span>
                    <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                      [G_TAGS]
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='container flex flex-col md:flex-row px-0 mt-3'>
              <div className='container w-full md:w-2/3 flex flex-col m-0 p-0 h-100'>
                <div className='w-full bg-slate-700 block rounded p-5'>
                  <h5 className='ml-2 mt-4 font-medium text-lg w-2/3'>
                    Play {data?.data.nama}
                  </h5>
                  <Link href={`/transaksiGame/${data?.data.id}`}>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right'>
                    {rupiah(data?.data.harga)}
                    </button>
                  </Link>
                </div>

                <div>
                  {listDLC && <h1 className='text-xl font-bold py-5'>List DLC</h1>}
                  {listDLC && listDLC?.map((data) => {
                      return (
                        <Link href={`/dlc/${data.id}`} className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-3'>
                          <Image
                            height={500}
                            width={500}
                            className='object-cover h-full w-auto rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
                            src={data.picture}
                            alt=''
                          />
                          <div className='flex flex-col justify-between p-4 leading-normal pl-5 w-1/3 sm:w-full'>
                            <h5 className='mb-2 line-clamp-2 text-base font-bold tracking-tight text-gray-900 dark:text-white'>
                              {data.nama}
                            </h5>
                            <p className='font-normal line-clamp-1 text-gray-700 dark:text-gray-400'>
                              {data.deskripsi}
                            </p>
                          </div>
                          <div className='flex flex-col p-4 leading-normal pl-5 w-full items-end'>
                            <p className='font-semibold text-gray-700 dark:text-white p-0 md:pr-8'>
                              {rupiah(data.harga)}
                            </p>
                          </div>
                        </Link>
                      )
                    })
                  }
                </div>

                <div className='container col-12 my-2 py-3'>
                  <div className='w-full bg-slate-900 p-5'>
                    <div className='flex flex-wrap'>
                      <div className='w-full'>
                        <ul
                          className='w-full lg:w-1/3 flex mb-0 list-none flex-row'
                          role='tablist'
                        >
                          <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
                            <a
                              className={
                                'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-t-sm block leading-normal ' +
                                (openTab === 1
                                  ? 'text-white bg-slate-700'
                                  : 'text-white bg-blueGray-600')
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(1);
                              }}
                              data-toggle='tab'
                              href='#link1'
                              role='tablist'
                            >
                              Minimum
                            </a>
                          </li>
                          <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
                            <a
                              className={
                                'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-t-sm block leading-normal' +
                                (openTab === 2
                                  ? 'text-white bg-slate-700'
                                  : 'text-white bg-blueGray-600')
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(2);
                              }}
                              data-toggle='tab'
                              href='#link2'
                              role='tablist'
                            >
                              Recommended
                            </a>
                          </li>
                        </ul>
                        <div className='relative flex flex-col min-w-0 break-words w-full mb-1 shadow-lg rounded-b-sm bg-slate-700'>
                          <div className='px-4 py-5 flex-auto'>
                            <div className='tab-content tab-space'>
                              <div
                                className={openTab === 1 ? 'block' : 'hidden'}
                                id='link1'
                              >
                                <p>
                                  {data?.data.system_min}
                                </p>
                              </div>
                              <div
                                className={openTab === 2 ? 'block' : 'hidden'}
                                id='link2'
                              >
                                {data?.data.system_rec}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full md:w-1/3 pl-0 md:pl-4 md:my-0'>
                <div className='w-full bg-slate-900'>
                  <div className='w-full flex flex-col p-6'>
                    <h5 className='text-light text-lg'>
                      Language Compatibility
                    </h5>
                    <p className='mx-1 mt-3 text-light '>Interface:</p>
                    <div className='flex flex-wrap'>
                      <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                        [BI_NAME]
                      </span>
                      <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                        [BI_NAME]
                      </span>
                    </div>
                    <p className='mx-1 mt-3 text-light'>Audio:</p>
                    <div className='flex flex-wrap'>
                      <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                        [BA_NAME]
                      </span>
                      <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                        [BA_NAME]
                      </span>
                      <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                        [BA_NAME]
                      </span>
                    </div>
                    <p className='mx-1 mt-3 text-light'>Subtitle:</p>
                    <div className='flex flex-wrap'>
                      <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                        [BS_NAME]
                      </span>
                      <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                        [BS_NAME]
                      </span>
                      <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                        [BS_NAME]
                      </span>
                      <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                        [BS_NAME]
                      </span>
                      <span className='w-fit my-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                        [BS_NAME]
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
