/* eslint-disable react/display-name */
import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner, ImSpinner2 } from 'react-icons/im';
import { clsxm } from '@/lib/clsxm';

enum ButtonVariant {
  'red',
  'yellow',
  'green',
  'outline',
  'basic',
  'primary',
}
enum ButtonSize {
  'small',
  'base',
  'large',
}

type ButtonProps = {
  isLoading?: boolean;
  size?: keyof typeof ButtonSize;
  variant?: keyof typeof ButtonVariant;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      size = 'base',
      variant = 'primary',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'button inline-flex items-center justify-center rounded-md md:rounded-lg',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'transition-colors duration-75',
          //#region  //*=========== Size ===========
          [
            size === 'large' && [
              'min-h-[34px] py-2 px-[18px] font-semibold md:min-h-[38px] md:py-2.5 md:px-6',
              'md:text-lg',
            ],
            size === 'base' && [
              'min-h-[30px] py-1.5 px-[14px] font-semibold md:min-h-[34px] md:py-2 md:px-5',
              'text-sm ',
            ],
            size === 'small' && [
              'min-h-[26px] py-0.5 px-[10px] font-medium md:min-h-[30px] md:py-1.5 md:px-4',
              'text-xs md:text-sm',
            ],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === 'red' && [
              'bg-critical-600 text-white',
              'hover:bg-critical-700',
              'active:bg-critical-800',
              'disabled:bg-critical-700 disabled:brightness-90 disabled:hover:bg-critical-700',
            ],
            variant === 'yellow' && [
              'bg-warning-600 text-white',
              'hover:bg-warning-700',
              'active:bg-warning-800',
              'disabled:bg-warning-700 disabled:brightness-90 disabled:hover:bg-warning-700',
            ],
            variant === 'green' && [
              'bg-success-600 text-white',
              'hover:bg-success-700',
              'active:bg-success-800',
              'disabled:bg-success-700 disabled:brightness-90 disabled:hover:bg-success-700',
            ],
            variant === 'outline' && [
              '!text-typo-secondary',
              'border border-outline-base duration-250',
              'hover:bg-base-surface active:bg-base-outline disabled:bg-base-outline',
            ],
            variant === 'basic' && [
              '!text-typo-secondary',
              'shadow-none duration-250',
              'hover:bg-base-surface active:bg-base-outline disabled:bg-base-outline',
            ],
            variant === 'primary' && [
              'bg-tainted-200 text-discolored-1000',
              'hover:bg-tainted-600',
              'active:bg-tainted-700',
              'disabled:bg-tainted-600 disabled:brightness-90 disabled:hover:bg-tainted-700',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white'
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {/* Left Icon */}
        {LeftIcon && (
          <div className='mr-1'>
            <LeftIcon
              className={clsxm(
                [
                  size === 'large' && 'text-xl md:text-2xl',
                  size === 'base' && 'text-lg md:text-xl',
                  size === 'small' && 'text-sm md:text-lg',
                ],
                [
                  variant === 'outline' && 'text-typo-white',
                  variant == 'basic' && 'text-typo-white',
                ],
                leftIconClassName
              )}
            />
          </div>
        )}
        {children}
        {RightIcon && (
          <div className='ml-1'>
            <RightIcon
              className={clsxm(
                [
                  size === 'large' && 'text-xl md:text-2xl',
                  size === 'base' && 'text-lg md:text-xl',
                  size === 'small' && 'text-sm md:text-lg',
                ],
                [
                  variant === 'outline' && 'text-typo-icon',
                  variant == 'basic' && 'text-typo-icon',
                ],
                rightIconClassName
              )}
            />
          </div>
        )}
      </button>
    );
  }
);

export default Button;