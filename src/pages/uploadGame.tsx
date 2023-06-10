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

export type UploadData = {
    nama: string;
    deskripsi: string;
    harga: number;
    age_rating: string;
    system_min: string;
    system_rec: string;
    picture: string;
    video: string;
}

export default function UploadGame() {

  const {mutate, isSuccess, isError} = useMutation(async ( upload_data: UploadData) => {
      console.log(upload_data);
      apiMock.post(`/secured/user/upload`, { upload_data }, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
      }})
  });



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
        deskripsi: "",
        harga: 0,
        age_rating: "",
        system_min: "",
        system_rec: "",
        picture: "",
        video: "",
      });
    }
    if(isError) {
      <h1>Error</h1>
    }
  }, [formState, reset, isSuccess, isError]);

  return (
    <Layout
      title='Upload Game Page'
    >
      <main className='min-h-[calc(100vh-85px)] flex items-center justify-center py-5'>
        <div className='w-full md:w-[calc(100vw/2)] flex justify-center items-center'>
          <div className='border-2 rounded-xl border-black dark:border-white px-5 py-10 flex flex-col justify-center items-center w-full'>
            <h1 className='text-center font-bold text-xl my-5'>Upload your game</h1>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center gap-y-1 w-3/4'>
                <Input
                  id='nama'
                  titleLabel='Title'
                  inputType='nama'
                  placeholder='Game title'
                  registerType={{
                    required: 'Game title is required',
                  }}
                  errorMessage={errors.nama?.message}
                />

                <p className='text-light'>Description</p>
                <TextArea
                  id='deskripsi'
                  placeholder='Game description'
                  required={true}
                  helperText={errors.deskripsi?.message}
                  minRows={1}
                  maxRows={10}
                  titleLabel={''}
                  />

                <Input
                  id='harga'
                  titleLabel='Price'
                  inputType= 'number'    
                  placeholder='Game price'
                  registerType={{
                    required: 'Game price is required',
                    valueAsNumber: true,
                  }}
                  errorMessage={errors.harga?.message}           
                />

                <SelectInput
                  id="age_rating"
                  titleLabel="Age rating"
                  registerType={{
                    required: "This field is required!",
                  }}
                  
                  options={['PEGI-3', 'PEGI-7', 'PEGI-12', 'PEGI-16', 'PEGI-18']}
                />

                <p className='text-light mt-3'>Minimum system requirement</p>
                <TextArea
                  id='system_min'
                  placeholder='Game minimum system requirement'
                  required = {true}
                  helperText={errors.system_min?.message}
                  minRows={1}
                  maxRows={10}
                  titleLabel={''}
                />

                <p className='text-light mt-3'>Recommended system requirement</p>
                <TextArea
                  id='system_rec'
                  placeholder='Game recommended system requirement'
                  required = {true}
                  helperText={errors.system_rec?.message}
                  minRows={1}
                  maxRows={10}
                  titleLabel={''}
                />

                <Input
                  id='picture'
                  titleLabel='Picture'
                  inputType='picture'
                  placeholder='Game picture link'
                  registerType={{
                    required: 'This field is required',
                  }}
                  errorMessage={errors.picture?.message}
                />

                <Input
                  id='video'
                  titleLabel='Video'
                  inputType='video'
                  placeholder='Game video preview link'
                  registerType={{
                    required: 'This field is required',
                  }}
                  errorMessage={errors.video?.message}
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