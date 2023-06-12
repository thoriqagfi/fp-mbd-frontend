import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Button from '../Button';
import { HiOutlineUserCircle } from 'react-icons/hi'
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { clsxm } from '@/lib/clsxm';
import { Tooltip } from 'react-tooltip'

export const links = [
  { href: '/', label: 'Store' },
  { href: '/library', label: 'Library' },
  { href: '/user', label: 'User' },
  { href: '/game', label: 'Game'}
]

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { theme, setTheme, systemTheme } = useTheme();

  const [mounted, setMounted] = React.useState<boolean>(false);
  React.useEffect(() => setMounted(true), []);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === 'system' ? systemTheme : theme;
    if (currentTheme === 'dark') {
      return (
        <BsSunFill
          onClick={() => setTheme('light')}
          className={clsxm(
            'hover:text-gray-500 transition duration-300 ease-in-out',
            'font-bold cursor-pointer my-auto'
          )}
        />
      );
    } else {
      return (
        <BsMoonFill
          onClick={() => setTheme('dark')}
          className={clsxm(
            'hover:text-gray-500 transition duration-300 ease-in-out',
            'font-bold cursor-pointer my-auto'
          )}
        />
      );
    }
  };
  return (
    <>
      <header className='shadow-lg mx-auto'>
        <div className='flex justify-between py-3 px-20 items-center'>
          <Link href={'/'}>
            <Image
              src='/logo-steam.png'
              alt='Steam Logo'
              width={40}
              height={40}
            />
          </Link>
          <nav className=''>
            <ul className='flex gap-x-8 items-center justify-center'>
              {links.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                  <Link
                    href={href}
                    className={clsxm(
                      'hover:text-gray-500 transition duration-300 ease-in-out',
                      'font-bold text-lg'
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className='flex my-auto'>
            {renderThemeChanger()}
            {
              isAuthenticated ? (
                <div className={clsxm(
                  'relative group flex px-5',
                )}>
                    {/* <Image
                      src={user!.pp}
                      alt='Profile Picture'
                      width={30}
                      height={30}
                    /> */}
                    <HiOutlineUserCircle className='text-2xl cursor-pointer' id='clickable'/>
                    <Tooltip anchorSelect='#clickable' clickable>
                      <Link href='/user'>
                        {user?.name}
                      </Link>
                      <hr />
                      <Link href={`/profile/${user?.id}`}>
                        Profile
                      </Link>
                      <hr />
                      <Link href={'/'} onClick={() => {logout()}}>
                        Logout
                      </Link>
                    </Tooltip>
                </div>
              ) : (
                <Link href='/login' className='pl-6'>
                  Login
                </Link>
              )
            }
          </div>
        </div>
      </header>
    </>
  );
}
