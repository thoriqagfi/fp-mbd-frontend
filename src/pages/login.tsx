import * as React from 'react';
import Layout from '@/components/layout/Layout';
import { FormProvider, FormProviderProps, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query';
import { apiMock } from '@/lib/apiMock';
import { setToken } from '@/lib/token';
import Input from '@/components/Input';

export type LoginData = {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const methods = useForm<LoginData>();
  const {
    handleSubmit,
    formState,
    reset,
    formState: { errors },
  } = methods;
  const { login } = useAuthStore();

  const { mutate } = useMutation(
    async ({email, password}: LoginData) => {
      const res = await apiMock.post('/login', {email, password})
      const { token } = res.data.data;
      setToken(token);

      const user = await apiMock.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      login({
        ...user.data.data,
      })
      return res;
    }
  )

  const onSubmit = ({email, password}: LoginData) => {
    mutate({email, password});
  }
  return (
    <Layout
      title='Login Page'
    >
      <div className='min-h-screen'>
        <div className='h-full flex justify-center items-center'>
          <div className='border-2 w-80 h-96 rounded-xl flex flex-col justify-between items-center mx-auto my-auto border-black dark:border-white'>
            <h1 className='text-center font-bold my-auto'>LOGIN HERE</h1>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
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
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </Layout>
  )
}