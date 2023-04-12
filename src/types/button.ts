import { IconType } from 'react-icons';

enum ButtonVariant {
  'red',
  'yellow',
  'green',
  'outline',
  'basic',
  'discolored',
}
enum ButtonSize {
  'small',
  'base',
  'large',
}

export type ButtonProps = {
  isLoading?: boolean;
  size?: keyof typeof ButtonSize;
  variant?: keyof typeof ButtonVariant;
  leftIcon?: IconType;
  rightIcon?: IconType;
} & React.ComponentPropsWithRef<'button'>;