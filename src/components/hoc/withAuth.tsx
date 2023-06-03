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

const hasPermission = (user: User | null, router: NextRouter) => {
  if (!user) {
    showToast('You are not logged in', WARNING_TOAST);
    router.push('/login');
    return false;
  }
  return true;
};

const withAuth = <P extends withAuthProps>(
  Component: React.ComponentType<P>,
  withRefetch?: boolean
) => {
  const ComponentWithAuth = (props: Omit<P, keyof withAuthProps>) => {
  const router = useRouter();
  const { query } = router;
  const { user, isLoading, login, isAuthenticated, stopLoading, logout } =
    useAuthStore();

  const checkAuth = React.useCallback(() => {
    const token = getToken();
    if (!token) {
      // isAuthenticated && logout();
      stopLoading();
      return;
    }
    const user = async () => {
      try {
        const res = await apiMock.get(`/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        login({
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          pp: data.data.pp,
          token: token,
          password: data.data.password,
        });
      } catch (error) {
        removeToken();
      } finally {
        stopLoading();
      }
    };
    if (!isAuthenticated || withRefetch) {
      user();
    }
  }, [isAuthenticated, login, logout, stopLoading]);

  React.useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        if (!hasPermission(user, router)) return;
      }
    }
  });

  React.useEffect(() => {
    checkAuth();

    window.addEventListener('focus', checkAuth);
    return () => {
      window.removeEventListener('focus', checkAuth);
    };
  }, [checkAuth]);

  if(isLoading) return <Loading/>
  return <Component {...(props as P)} />;
  }

  return ComponentWithAuth;
};

export default withAuth;