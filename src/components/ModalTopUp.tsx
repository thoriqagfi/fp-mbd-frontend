import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from './Input';
// import Input from '@mui/material/Input';
import { TextField } from '@mui/material';
import { clsxm } from '@/lib/clsxm';
import Button from './Button';
import { FormProvider, useForm } from 'react-hook-form';
import useMutationToast from './Toast/useMutationToast';
import { useMutation } from '@tanstack/react-query';
import { apiMock } from '@/lib/apiMock';
import { getToken } from '@/lib/token';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#475569',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export type ModalTopUpProps = {
  isOpen: boolean;
  title?: string;
  description?: string;
  isTopUp?: boolean;
  handleClose: () => void;
};

export type TopUpProps = {
  nominal: number;
};

export default function ModalTopUp({
  isOpen,
  title,
  description,
  isTopUp,
  handleClose,
  ...rest
}: ModalTopUpProps) {
  const { mutate, isLoading } = useMutationToast(
    useMutation(async ({nominal}: TopUpProps) => {
      const res = await apiMock.post(`/secured/user/topup`, {nominal}, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return res;
    })
  );

  const methods = useForm<TopUpProps>({
    mode: 'onChange',
  });

  const onSubmit = async ({nominal}: TopUpProps) => {
    mutate({nominal});
  };

  const {
    handleSubmit,
    formState,
    reset,
    formState: { errors },
  } = methods;
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h1'
            className='text-white text-center'
          >
            {title}
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{ mt: 2 }}
            className='text-center'
          >
            {description}
          </Typography>
          <div className='flex flex-col justify-center items-center my-5 gap-y-5'>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  id='nominal'
                  titleLabel='Top Up Steam Wallet'
                  inputType='number'
                  placeholder='Top Up Steam Wallte'
                  registerType={{
                    required: true,
                  }}
                  errorMessage={'Invalid Nominal Number'}
                />
                <Button
                  type='submit'
                  className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 duration-200 dark:hover:bg-blue-600'
                >
                  Top Up
                </Button>
              </form>
            </FormProvider>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
