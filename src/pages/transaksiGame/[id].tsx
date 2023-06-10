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
import Image from 'next/image';
import Button from '@/components/Button';
import { rupiah } from '@/lib/rupiah';
import useMutationToast from '@/components/Toast/useMutationToast';

export type PurchaseData = {
    metode_bayar: string;
}

export default function TransaksiGame() {
    const { id } = useRouter().query;

    const { isLoading, error, data } = useQuery(['game_detail'], async () => {
      const {data} = await apiMock.get(`/storeMainPage/game/${id}`);
      return data;
  });

  const {mutate, isSuccess, isError} = useMutation(async ({ metode_bayar }: PurchaseData) => {
      apiMock.post(`/secured/user/purchase/${id}`, { metode_bayar }, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
      }})
  });



  const router = useRouter();
  const methods = useForm<PurchaseData>({
    mode: "onChange",
  });

  const onSubmit = async (data: PurchaseData) => {
    try {
      mutate(data);
      router.push("/");
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
        metode_bayar: ""
      });
    }
    if(isError) {
      <h1>Error</h1>
    }
  }, [formState, reset, isLoading, isSuccess, isError]);

  return (
    <Layout
      title='Register Page'
    >
      <div className='h-[calc(100vh-90px)] flex items-center justify-center'>
        <div className='h-full flex justify-center items-center'>
          <div className='border-2 rounded-xl border-black dark:border-white px-32 py-10 flex flex-col justify-center items-center'>
            <h1 className='text-center font-bold '>Check Out</h1>
            <div className='w-62 flex m-5 bg-slate-700 rounded-lg'>
              <Image
                height={500}
                width={500}
                className='object-cover h-full w-auto rounded-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
                src={data?.data.picture}
              alt=''
              />
              <div className='flex flex-col justify-between p-4 leading-normal pl-5 w-1/3 sm:w-full'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    {data?.data.nama}
                </h5>
                <p className='font-semibold text-gray-700 dark:text-white p-0 md:pr-8'>
                    {rupiah(data?.data.harga)}
                </p>
              </div>
            </div>

            {<FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center gap-y-1'>
                <SelectInput
                  id="metode_bayar"
                  titleLabel="metode bayar"
                  registerType={{
                    required: "This is required!",
                  }}
                  options={['Steam Wallet', 'Credit Card', 'Paypal', 'Gopay', 'OVO']}
                />
                <Button
                  type="submit"
                  className="rounded-md cursor-pointer mt-5 bg-slate-700 hover:bg-slate-600 p-2 text-white duration-200"
                >
                  Purchase
                </Button>
              </form>
            </FormProvider>}
          </div>
        </div>
      </div>
    </Layout>
  )
}