import * as React from 'react';
import Layout from '@/components/layout/Layout';
import Link from "next/link";
import { FormProvider, FormProviderProps, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query';
import { apiMock } from '@/lib/apiMock';
import { setToken } from '@/lib/token';
import Input from '@/components/Input';
import SelectInput from '@/components/SelectInput';
import Button from '@/components/Button';
import useMutationToast from '@/components/Toast/useMutationToast';

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function Register() {
  const { mutate, isSuccess, isError, isLoading } = useMutationToast(useMutation(
    async (data: RegisterData) => {
      const res = await apiMock.post(`/user`, data)
      return res;
    }
  ))

  const router = useRouter();
  const methods = useForm<RegisterData>({
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      mutate(data);
      router.push("/login");
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
    if(isLoading) {
      <h1>Loading...</h1>
    }
    if (formState.isSubmitSuccessful && isSuccess) {
      reset({
        name: "",
        email: "",
        password: "",
        role: ""
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
            <h1 className='text-center font-bold '>REGISTER</h1>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center gap-y-1'>
              <Input
                  id='name'
                  titleLabel='Name'
                  inputType='name'
                  placeholder='Name'
                  registerType={{
                    required: 'Name is required',
                  }}
                  errorMessage={errors.name?.message}
                />
                <Input
                  id='email'
                  titleLabel='Email'
                  inputType='email'
                  placeholder='Email'
                  registerType={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  }}
                  errorMessage={errors.email?.message}
                />
                <Input
                  id="password"
                  titleLabel="Password"
                  inputType="password"
                  registerType={{
                    required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must have at least 6 characters",
                      }
                  }}
                  placeholder="Password"
                  errorMessage={errors.password?.message}
                />
                <SelectInput
                  id="role"
                  titleLabel="Role"
                  registerType={{
                    required: "This is required!",
                  }}
                  options={['Developer', 'User']}
                />
                <Button
                  type="submit"
                  className="rounded-md cursor-pointer mt-5 bg-slate-700 hover:bg-slate-600 p-2 text-white duration-200"
                >
                  Create Account
                </Button>

                <span className="flex gap-2 mt-2">
                  <h3 className="text-gray-600">Already have an account?</h3>
                  <Link className="hover:underline" href="/login">
                    Login
                  </Link>
                </span>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </Layout>
  )
}