import Head from 'next/head';
import * as React from 'react';
import Image from 'next/image';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { apiMock } from '@/lib/apiMock';

import useAuthStore from '@/store/useAuthStore';

import { Carousel } from '@mantine/carousel';
import Layout from '@/Layout/Layout';
import { Search, PlayerTrackNext, PlayerTrackPrev } from 'tabler-icons-react';
import Link from 'next/link';
import { rupiah } from '@/lib/rupiah';
import Loading from '../Loading';
import { ClassNames } from '@emotion/react';
import withAuth from '../hoc/withAuth';

export type SearchData = {
  keyword: string;
};

export type FeaturedApiResponse = {
  data: Featured[];
  code: number;
  message: string;
  success: boolean;
};

export type Featured = {
  game_id: string;
  game_title: string;
  game_description: string;
  game_price: number;
  game_picture: string;
};
export default withAuth(StoreMainPage, "auth");

function StoreMainPage() {
  const {user } = useAuthStore();
  const router = useRouter();
  const { isLoading, error, data } = useQuery<FeaturedApiResponse>(
    ['data'],
    async () => {
      const { data } = await apiMock.get(`/storeMainPage/featured`);
      //console.log(data.data.game_picture);
      return data;
    }
  );

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

  if(isLoading) return <Loading/>
  return (
    <>
      <Head>
        <title>Store Main Page</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <main className='bg-white dark:bg-slate-800 min-h-screen'>
          <section>
            <div className='px-[15%] pt-5 flex flex-row'>
              <div className='w-full'>
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
            </div>
            <div className='px-[15%] py-5'>
              <p>FEATURED & RECOMMENDED</p>
            </div>
            <div style={{ display: 'flex' }} className='w-full h-96 mb-10'>
              <Carousel
                height='100%'
                maw='100%'
                loop
                withIndicators
                controlsOffset='xl'
                controlSize={30}
                slideSize='70%'
                slideGap='xl'
                breakpoints={[
                  { minWidth: 'xl', slideSize: '70%', slideGap: 'xl' },
                  { minWidth: 'md', slideSize: '80%', slideGap: 'xl' },
                  { minWidth: 'sm', slideSize: '100%', slideGap: 'xl' },
                ]
              }
                nextControlIcon={<PlayerTrackNext size={20} color='white' />}
                previousControlIcon={
                  <PlayerTrackPrev size={20} color='white' />
                }
              >
                {data?.data.map((item) => (
                  <Carousel.Slide
                    key={item.game_id}
                    onClick={
                      (e) => {
                        e.stopPropagation();
                      }
                    }
                    className='w-fit'
                  >
                    <Link
                      href={`/game/${item.game_id}`}
                      className='flex flex-col md:flex-row items-center shadow h-full mx-auto'
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className='flex items-center basis-2/3 bg-black h-full'>
                        <Image
                          height={500}
                          width={500}
                          src={item.game_picture}
                          alt='image2'
                          className='w-full h-auto'
                        />
                      </div>
                      <div className='flex p-4 leading-normal basis-1/3 px-10 h-full w-full bg-slate-700'>
                        <div className='m-auto'>
                          <h5 className='mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                            {item.game_title}
                          </h5>
                          <p className='mb-5 font-normal text-gray-700 dark:text-gray-400 hidden md:block'>
                            {item.game_description}
                          </p>
                          <p className='font-semibold text-slate-50 dark:text-slate-50'>
                            {rupiah(item.game_price)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </div>
          </section>
          <div className='px-[15%] py-5'>
            <p>BROWSE BY CATEGORY</p>
          </div>
          <div className='w-full h-64 mb-10'>
            <Carousel
              height={250}
              slideSize='25%'
              slideGap='xl'
              loop
              align='start'
              controlsOffset='xl'
              controlSize={30}
              breakpoints={[
                { maxWidth: 'md', slideSize: '50%' },
                { maxWidth: 'sm', slideSize: '100%', slideGap: 'sm' },
              ]}
              nextControlIcon={<PlayerTrackNext size={20} color='white' />}
              previousControlIcon={<PlayerTrackPrev size={20} color='white' />}
            >
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=16M3Q_B3x8o_96EoP8rZe5BHZ4tSLZrGL'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    ACTION
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=10hMKfsOmYHRoq3R8AQmcLyqCBc-RR_3f'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    MULTIPLAYER
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1X0JUnaBG3ITbadqkq7_WnK2Z-LFexd-z'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    COMPETITIVE
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1nnwXN8pOWqBm_J_bcAQ32LjAcYOU6cEq'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    SURVIVAL
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1dPeSQxGqPqFgWiQbmTvhPC6Q2X4Tk8k7'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    BATTLE ROYALE
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1SBgO7i33z9HD5AkiRXBo0czM_XXqbrFn'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    SHOOTER
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1mZXqNybn-jaA-zkYVyzJUdiHuczohj9j'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    HORROR
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1xHBROdo7S_wwt-OP46R5bBILX9gVFeP6'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    LOCAL & PARTY
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1V3yewaAzFIVQRYgdnO657isOYKhRqL0F'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    OPEN WORLD
                  </p>
                </a>
              </Carousel.Slide>

              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1L88k-JqDzGOyRz2qJCzLWst5ibJIoY56'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    STRATEGY
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1yPnZJO5Dh_2MT8RTkgt0VfwDsLUDreNx'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>MOBA</p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1A-ywZYxn6F9d836nviCDaaSWswsRk6Oc'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>PVP</p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=11vLXz2HjMhnkXiCD98bibNyk1AXqj24k'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    SIMULATION
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1n71wzDFXyuSSzzjPvExKMIOP2NEGPVAa'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    FANTASY
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1kvYE_u_IPoHbH-7kiqxnbalbRbDMPIsi'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>RPG</p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1HdIbMVVG88g7XJfCag9NE0Ih5AOdLQPz'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    TACTICAL
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1UOX9hzioGUnmgNYEeA2lBtEmson4YIwU'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    TEAM-BASED
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=178HEwH3W3bXD52D7hL1Q2-7GyBAr6W7q'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    MMORPG
                  </p>
                </a>
              </Carousel.Slide>
              <Carousel.Slide>
                <a
                  href='#'
                  className='w-full h-full bg-gradient-to-t from-gray-900 from-20% to-transparent grid place-items-end relative overflow-hidden'
                >
                  <Image
                    height={500}
                    width={500}
                    alt=''
                    src='https://drive.google.com/uc?export=view&id=1_jTTRDcgx3qJa6hI-PSbR-EDGJ_Rup8N'
                    className='h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-overlay'
                  />
                  <p className='text-white font-semibold mx-auto mb-5'>
                    ADVENTURE
                  </p>
                </a>
              </Carousel.Slide>
            </Carousel>
          </div>
          <div className='px-[15%] py-5'>
            <p>POPULAR</p>
          </div>
          <div className='w-2/3 mx-auto'>
            <a
              href='#'
              className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-3'
            >
              <Image
                height={500}
                width={500}
                className='object-cover h-full w-auto rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
                src='https://drive.google.com/uc?export=view&id=1_jTTRDcgx3qJa6hI-PSbR-EDGJ_Rup8N'
                alt=''
              />
              <div className='flex flex-col justify-between p-4 leading-normal pl-5 w-1/3 sm:w-full'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                  STRAY
                </h5>
                <p className='font-normal text-gray-700 dark:text-gray-400'>
                  Adventure, Strategy, Open World
                </p>
              </div>
              <div className='flex flex-col p-4 leading-normal pl-5 w-full items-end'>
                <p className='font-semibold text-gray-700 dark:text-white p-0 md:pr-8'>
                  Rp80000
                </p>
              </div>
            </a>
            <Link
              // href={`/game/${data?.data.game_id}`}
              href={`/game/2}`}
              className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-3'
            >
              <Image
                height={500}
                width={500}
                className='object-cover h-full w-auto rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
                src='https://drive.google.com/uc?export=view&id=178HEwH3W3bXD52D7hL1Q2-7GyBAr6W7q'
                alt=''
              />
              <div className='flex flex-col justify-between p-4 leading-normal pl-5 w-1/3 sm:w-full'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                  Monster Hunter
                </h5>
                <p className='font-normal text-gray-700 dark:text-gray-400'>
                  Action, Multiplayer, Open World
                </p>
              </div>
              <div className='flex flex-col p-4 leading-normal pl-5 w-full items-end'>
                <p className='font-semibold text-gray-700 dark:text-white p-0 md:pr-8'>
                  Rp300000
                </p>
              </div>
            </Link>
          </div>
        </main>
      </Layout>
    </>
  );
}