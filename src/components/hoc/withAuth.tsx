import { NextRouter, useRouter } from 'next/router';
import * as React from 'react';
import Loading from '@/components/Loading';
import { showToast, WARNING_TOAST } from '../Toast/Toast';
import { apiMock } from '@/lib/apiMock';
import { getToken, removeToken } from '@/lib/token';
import useAuthStore from '@/store/useAuthStore';
import { User } from '@/types/user';

export interface withAuthProps {
  user: User;
}

type GeneralPermission = 'DEVELOPER' | 'USER' | 'auth';

const HOME_ROUTE = '/';
const DEVELOPER_ROUTE = '/dashboard';
const LOGIN_ROUTE = '/login';

// export enum RouteRole {
//   user,
//   developer
// }

const hasPermission = (user: User | null, permission: GeneralPermission) => {
  //* If user is not present, return false
  if (!user) return false;

  return false;
};

const withAuth = <P extends withAuthProps>(
  Component: React.ComponentType<P>,
  routePermission: GeneralPermission,
  withRefetch?: boolean
) => {
  const ComponentWithAuth = (props: Omit<P, keyof withAuthProps>) => {
    const router = useRouter();
    const { query } = router;
    const { user, isLoading, login, isAuthenticated, stopLoading, logout } =
      useAuthStore();

    const checkAuth = React.useCallback(() => {
      const token = getToken();
      //* If token is not present, logout
      if (!token) {
        isAuthenticated && logout();
        stopLoading();
        return;
      }

      //* If token is present, check if user is authenticated
      const user = async () => {
        try {
          const res = await apiMock.get(`/secured/user/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = res.data;
          login({
            id: data.data.id,
            name: data.data.name,
            email: data.data.email,
            profile_picture: data.data.profile_picture,
            role: data.data.role,
            token: token,
            password: data.data.password,
            wallet: data.data.wallet,
            list_game: data.data.list_game,
            list_dlc: data.data.list_dlc,
          });
        } catch (error) {
          removeToken();
        } finally {
          stopLoading();
        }
      };

      //* If user is not authenticated, fetch user
      if (!isAuthenticated || withRefetch) {
        user();
      }
    }, [isAuthenticated, login, logout, stopLoading]);

    //* Check if user has permission
    // React.useEffect(() => {
    //   console.log('1')
    //   // * If user is not loading, check if user has permission
    //   if (!isLoading || user?.role) {
    //     // * If user is not authenticated, redirect to login
    //     if (isAuthenticated) {
    //       // * If user is authenticated, check if user has permission
    //       if (
    //         routePermission === 'auth' ||
    //         routePermission === 'USER' ||
    //         routePermission === 'DEVELOPER'
    //       ) {
    //         // * If user does not have permission, redirect to login
    //         if (query?.redirect && routePermission !== 'auth') {
    //           router.replace(query.redirect as string);
    //         } else if (
    //           routePermission === 'USER' &&
    //           user?.role === 'DEVELOPER'
    //         ) {
    //           // * If user is a developer, redirect to DEVELOPER_ROUTE
    //           router.replace(DEVELOPER_ROUTE);
    //         } else if (
    //           routePermission === 'auth' &&
    //           user?.role !== 'DEVELOPER'
    //         ) {
    //           // * If user is authenticated and tries to access /login, redirect to /
    //           router.replace(HOME_ROUTE);
    //         } else {
    //           // * User has permission, continue with the current route
    //         }
    //       } else {
    //         // * User does not have permission, redirect to login and show toast message
    //         showToast(
    //           'Anda tidak memiliki akses ke halaman tersebut',
    //           WARNING_TOAST
    //         );
    //         router.replace(LOGIN_ROUTE);
    //       }
    //     } else {
    //       // * If user is not authenticated, redirect to login
    //       router.replace(HOME_ROUTE);
    //     }
    //   }
    // }, []);

    React.useEffect(() => {
      checkAuth();
      console.log('2')
      window.addEventListener('focus', checkAuth);
      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    if (isLoading) return <Loading />;
    return <Component {...(props as P)} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
