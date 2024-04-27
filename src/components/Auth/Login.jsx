/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import { TwitterIcon } from '../Utils';
import { useMutation } from '@tanstack/react-query';
import { useQueryAPI } from '../Hooks/useQueryApi';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
  const callApi = useQueryAPI();
  const { setRequestToken } = useAuth();
  const navigate = useNavigate();

  const url = 'https://api.twitter.com/oauth/authorize?oauth_token=';

  // initialize login to get token

  // useMutation from @tanstack/query is a versatile hook facilitating easy and efficient request handling.
  const { mutate, isPending } = useMutation({
    // Call api i a hook created inside the useQuerryAPI which gets the method, endpoint, and header as parameters.
    mutationFn: () => callApi('request_token', { method: 'GET' }),
    onSuccess: response => {
      // This code opens a new window with a URL and OAuth token, focusing on it if successful, or logging an error if blocked.
      const newWindow = window.open(`${url}${response?.oauth_token}`, '_blank');
      if (newWindow) {
        newWindow.focus();
      } else {
        console.error('Popup blocked. Please allow popups for this site.');
      }
      navigate('/authorization/verify-otp');
      setRequestToken(response?.oauth_token);
    },
  });

  return (
    <div className='bg-overlay w-full h-screen fixed z-2 t-0 r-0 l-0 b-0'>
      <div className='flex w-full h-screen flex-col items-center justify-center '>
        <div className='bg-white w-full md:rounded-lg items-center md:max-w-[450px] h-screen md:max-h-[450px] w-[450px] md:h-[450px] justify-center lg:justify-start flex flex-col'>
          <img
            src={TwitterIcon}
            className='w-[40px] md:mt-[24px] h-[36px]'
            alt=''
          />
          <div className='w-[300px]  flex flex-col md:mt-[8px] gap-[24px]'>
            <h1 className='font-bold text-center leading-[32px] text-4xl'>
              Login
            </h1>
            <div className='lg:mt-[54px] h-[44px] w-full flex'>
              {!isPending ? (
                <button
                  // This onclick triggers the login function
                  onClick={() => mutate()}
                  className='w-full h-[44px]  px-[16px] border-[#d0d5dd] border-[1px] rounded-[24px] flex flex-row items-center justify-between  gap-[12px] transition-colors duration-300 bg-white border-1 border- text-black rounded-[8px] focus:shadow-outline hover:bg-[#eeeeee]'
                >
                  <span className='text-[16px] font-medium leading-[24px] text-[#344054]'>
                    Sign in with X
                  </span>
                  <img
                    src={TwitterIcon}
                    alt='X Logo'
                    className='w-[24px] rounded-[50%] h-[24px] '
                  />
                </button>
              ) : (
                <div className='w-full flex items-center justify-center'>
                  <Oval
                    visible={true}
                    height='40'
                    width='40'
                    color='gray'
                    ariaLabel='oval-loading'
                    wrapperStyle={{}}
                    wrapperClass=''
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
