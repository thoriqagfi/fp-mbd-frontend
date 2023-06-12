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
    system_min: string;
    system_rec: string;
    picture: string;
    game_id: number;
}

export default function UploadGame() {
    const id = parseInt(useRouter().query.id as string, 10);
    const {mutate, isSuccess, isError} = useMutationToast(useMutation(async ( upload_data: UploadData) => {
      upload_data.game_id = id;
      console.log(upload_data);
      await apiMock.post(`/secured/user/updlc`,  upload_data, {
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
        deskripsi: "",
        harga: 0,
        system_min: "",
        system_rec: "",
        picture: "",
      });
    }
    if(isError) {
      <h1>Error</h1>
    }
  }, [formState, reset, isSuccess, isError]);

  return (
    <Layout
      title='Upload DLC Page'
    >
      <main className='min-h-[calc(100vh-85px)] flex items-center justify-center py-5'>
        <div className='w-full md:w-[calc(100vw/2)] flex justify-center items-center'>
          <div className='border-2 rounded-xl border-black dark:border-white px-5 py-10 flex flex-col justify-center items-center w-full'>
            <h1 className='text-center font-bold text-xl my-5'>Upload your DLC</h1>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center gap-y-1 w-3/4'>
                <Input
                  id='nama'
                  titleLabel='Title'
                  inputType='nama'
                  placeholder='DLC title'
                  registerType={{
                    required: 'DLC title is required',
                  }}
                  errorMessage={errors.nama?.message}
                />

                <TextArea
                  id='deskripsi'
                  placeholder='DLC description'
                  required={true}
                  helperText={errors.deskripsi?.message}
                  minRows={1}
                  maxRows={10}
                  titleLabel={'Description'}
                  registerType={{
                    required: 'This field is required',
                  }}
                  errorMessage={errors.deskripsi?.message}
                  />

                <Input
                  id='harga'
                  titleLabel='Price'
                  inputType= 'number'    
                  placeholder='DLC price'
                  registerType={{
                    required: 'DLC price is required',
                    valueAsNumber: true,
                  }}
                  errorMessage={errors.harga?.message}           
                />

                <TextArea
                  id='system_min'
                  placeholder='DLC minimum system requirement'
                  required = {true}
                  helperText={errors.system_min?.message}
                  minRows={1}
                  maxRows={10}
                  titleLabel={'Minimum system requirement'}
                  registerType={{
                    required: 'This field is required',
                  }}
                  errorMessage={errors.system_min?.message}
                />

                <TextArea
                  id='system_rec'
                  placeholder='DLC recommended system requirement'
                  required = {true}
                  helperText={errors.system_rec?.message}
                  minRows={1}
                  maxRows={10}
                  titleLabel={'Recommended system requirement'}
                  registerType={{
                    required: 'This field is required',
                  }}
                  errorMessage={errors.system_rec?.message}
                />

                <Input
                  id='picture'
                  titleLabel='Picture'
                  inputType='picture'
                  placeholder='DLC picture link'
                  registerType={{
                    required: 'This field is required',
                  }}
                  errorMessage={errors.picture?.message}
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