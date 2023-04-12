import * as React from 'react';
import Layout from '@/components/layout/Layout';

export default function Login() {
  return (
    <Layout
      title='Login Page'
    >
      <div className='min-h-screen'>
        <div className='h-full flex justify-center items-center'>
          <div className='border-2 w-80 rounded-xl flex flex-col justify-between items-center mx-auto my-auto'>
            <h1 className='text-center font-bold'>LOGIN HERE</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}