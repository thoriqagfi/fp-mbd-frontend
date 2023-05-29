import * as React from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { FormProvider, FormProviderProps, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import useMutationToast from '@/components/Toast/useMutationToast';
import { UseMutationResult } from '@tanstack/react-query';
import toast, {Toaster} from "react-hot-toast";
import { apiMock } from '@/lib/apiMock';
import { setToken } from '@/lib/token';
import { getToken } from "@/lib/token";
import Input from '@/components/Input';
import SelectInput from '@/components/SelectInput';
import { AxiosError } from 'axios';
import Button from '@/components/Button';

export type LoginData = {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuthStore();

  const { mutate, isSuccess, isError, isLoading } = useMutationToast<void, LoginData>(
    useMutation(
      async ({email, password}: LoginData) => {
          apiMock.post(`/login`, {email, password})
        .then( async (res) => {
          console.log(res)
          const data = res.data.data;
          setToken('token', data.token);
          const user = await apiMock.get(`/user/profile`, {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          })
          login({
          id: user.data.data.id,
          name: user.data.data.name,
          email: user.data.data.email,
          pp: user.data.data.pp,
          token: data.token,
          password: user.data.data.password
        })
      })}
    ))

  const onSubmit = ({email, password}: LoginData) => {
    mutate({email, password});
  }

  const onSubmitTemp = () => {
    useAuthStore.setState({
      isAuthenticated: true,
      user: {
        id: '1',
        name: 'test',
        email: 'test',
        pp: 'https://drive.google.com/uc?export=view&id=1_jTTRDcgx3qJa6hI-PSbR-EDGJ_Rup8N',
        token: 'test',
        password: 'test'
      }
    })
    router.push('/')
  }

  const methods = useForm<LoginData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    }
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
        email: "",
        password: "",
      });
    }
  }, [formState, reset]);

  return (
    <Layout
      title='Login Page'
    >
      <div className='h-[calc(100vh-90px)] flex items-center justify-center'>
        <div className='h-full flex justify-center items-center'>
          <div className='border-2 py-10 px-20 rounded-xl justify-between items-center mx-auto my-auto border-black dark:border-white'>
            <h1 className='text-center font-bold my-3'>LOGIN</h1>
            <FormProvider {...methods}>
              <form 
                // onSubmit={handleSubmit(onSubmit)}
                onSubmit={() => onSubmitTemp()}
              >
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
                <Button
                  type="submit"
                  className="rounded-md cursor-pointer bg-slate-700 hover:bg-slate-600 py-2 px-5 text-white duration-200 mt-5"
                >
                  Login
                </Button>
                <span className="flex gap-2 mt-10">
                <h3 className="text-gray-600">Don&apos;t have an account ?</h3>
                <Link className="hover:underline" href="/register">
                  Register
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