import { Oval } from 'react-loader-spinner';
import { useAuth } from '../Context/AuthContext';
import { TwitterIcon } from '../Utils';
import { useMutation } from '@tanstack/react-query';
import { useQueryAPI } from '../Hooks/useQueryApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Authorization = () => {
  const navigate = useNavigate();

  const { requestToken, oauthVerifier, setOauthVerifier } = useAuth();

  const callApi = useQueryAPI();

  const credentials = {
    oauth_token: requestToken,
    verifier: oauthVerifier,
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      callApi('verify/access_token', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: response => {
      navigate(`/user-dashboard/${response?.screen_name}/${response?.user_id}`);
      const keys = {
        oauth_token: response?.oauth_token,
        oauth_token_secret: response?.oauth_token_secret,
      };

      localStorage.setItem('secret', JSON.stringify(keys));
      toast.success('Success', {
        position: 'top-right',
      });
    },
  });

  return (
    <div className='bg-overlay w-full h-screen fixed z-2 t-0 r-0 l-0 b-0'>
      <div className='flex w-full h-screen flex-col items-center justify-center '>
        <div className='bg-white w-full md:rounded-lg items-center md:max-w-[450px] h-screen md:max-h-[450px] w-[450px] md:h-[500px] justify-center flex flex-col'>
          <img src={TwitterIcon} className='w-[40px] h-[36px]' alt='' />
          <div className='w-[300px]  flex flex-col md:mt-[32px] gap-[24px]'>
            <h1 className='font-bold text-center leading-[32px] text-[32px]'>
              Enter Authorization Token
            </h1>
            <div className='mt-[54px] w-full flex-col  flex'>
              <form
                action=''
                onSubmit={e => e.preventDefault()}
                className='flex flex-col gap-[24px]'
              >
                <div className='w-full border-[#d0d5dd] border-[1px] rounded-[12px] flex items-center pl-4 h-[50px]'>
                  <input
                    type='text'
                    placeholder='Enter oauth verifier'
                    value={oauthVerifier}
                    className='outline-none'
                    onChange={e => setOauthVerifier(e.target.value)}
                  />
                </div>

                {!isPending ? (
                  <button
                    onClick={() => mutate()}
                    disabled={oauthVerifier.length < 6}
                    className={`h-[36px] flex items-center justify-center w-full ${
                      oauthVerifier.length > 6
                        ? 'bg-black hover:opacity-[0.8]'
                        : 'bg-[#eeeeee]'
                    } rounded-[24px]  transition duration-300 ease-in-out text-white mt-[4px] `}
                  >
                    <span className='text-[16px] font-medium leading-[24px] text-white'>
                      Next
                    </span>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
