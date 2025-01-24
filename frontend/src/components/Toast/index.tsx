'use client';

import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

const Toast = () => {
  const isDark: boolean = useSelector((state: RootState) => state.mainReducer.isDark);
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={isDark ? 'dark' : 'light'}
      transition={Slide}
    />
  );
};

export default Toast;
