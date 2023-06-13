import * as React from 'react';
import Layout from '@/components/layout/Layout';
import { useQuery } from '@tanstack/react-query';
import Link from "next/link";
import { FormProvider, FormProviderProps, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query';
import { apiMock } from '@/lib/apiMock';
import { getToken } from '@/lib/token';
import Input from '@/components/Input';
import SelectInput from '@/components/SelectInput';
import TextArea from '@/components/TextArea';
import Image from 'next/image';
import Button from '@/components/Button';
import { rupiah } from '@/lib/rupiah';
import useMutationToast from '@/components/Toast/useMutationToast';

export const tagData = [
    'Action',
    'Multiplayer',
    'Competitive',
    'Survival',
    'Battle Royale',
    'Shooter',
    'Horror',
    'Local & Party',
    'Open World',
    'Sports',
    'Strategy',
    'Moba',
    'PvP',
    'Simulation',
    'Fantasy',
    'Rpg',
    'Tactical',
    'Team-Based',
    'MMORPG',
    'Adventure'
  ];
  

export type UploadData = {
    nama: string;
    game_id: number;
}

export default function AddTag(){
    const id = parseInt(useRouter().query.id as string, 10);

    const {mutate, isSuccess, isError} = useMutationToast(useMutation(async ( upload_data: UploadData) => {
      upload_data.game_id = id;
      console.log(upload_data);
      await apiMock.post(`/secured/user/add/tags`,  upload_data, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
      }})
  }));



  const router = useRouter();
  const methods = useForm<UploadData>({
    mode: "onChange",
  });

  const onSubmit = async (data: UploadData) => {
    try {
      mutate(data);
      router.push("/user");
    } catch (err) {
      console.log(err);
    }
  }

  const {
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = methods;

  React.useEffect(() => {
    if (formState.isSubmitSuccessful && isSuccess) {
      reset({
        nama: "",
      });
    }
    if(isError) {
      <h1>Error</h1>
    }
  }, [formState, reset, isSuccess, isError]);

  return (
    <Layout
      title='Add suitable tag'
    >
      <main className='min-h-[calc(100vh-85px)] flex items-center justify-center py-5'>
        <div className='w-full md:w-[calc(100vw/2)] flex justify-center items-center'>
          <div className='border-2 rounded-xl border-black dark:border-white px-5 py-10 flex flex-col justify-center items-center w-full'>
            <h1 className='text-center font-bold text-xl my-5'>Add Suitable Tag</h1>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center gap-y-1 w-3/4'>
        
              <SelectInput
                  id="nama"
                  titleLabel="Tag"
                  registerType={{
                    required: "This field is required!",
                  }}
                  
                  options={tagData.map((item)=> item)}
                />

                <Button
                  type="submit"
                  className="rounded-md cursor-pointer mt-5 bg-slate-700 hover:bg-slate-600 p-2 text-white duration-200 w-48 mx-auto"
                >
                  Submit
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </main>
    </Layout>
  )
}