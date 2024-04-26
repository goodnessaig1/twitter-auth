/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from 'framer-motion';
import { Oval } from 'react-loader-spinner';
import { TwitterIcon } from '../Utils';

// this modal is used to post tweets
export const TweetModal = ({
  tweet,
  setTweet,
  mutate,
  isPending,
  closeModal,
}) => {
  return (
    <div className='fixed z-2 h-screen top-0 left-0 right-0 bottom-0 px-[28px] md:px-0 flex  items-center justify-center bg-transparent'>
      <div
        onClick={closeModal}
        className='w-full z-3 fixed hover:cursor-pointer h-screen top-0 left-0 right-0 bottom-0 px-[28px] md:px-0 flex  items-center justify-center bg-dOverlay '
      ></div>
      <AnimatePresence className=''>
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className='bg-white z-3 flex p-[24px] inter__ gap-[22px] flex-col w-[300px] h-[300px] rounded-[24px]'
        >
          <div className='flex flex-col gap-[24px]'>
            <div className='flex items-center justify-center flex-col gap-[8px] '>
              <img src={TwitterIcon} className='w-[30px] h-[30px]' alt='' />
              <h1 className='font-semibold text-[24px]'>Write Tweet</h1>
            </div>
            <form action='' onSubmit={e => e.preventDefault()}>
              <div className='flex flex-col gap-[24px] z-10 w-full'>
                <div className='border-[1px] border-[#eeeeee] h-[48px] w-full flex items-center rounded-[8px]'>
                  <input
                    placeholder='Enter your tweet'
                    value={tweet}
                    className='bg-transparent px-[8px] outline-none w-full'
                    onChange={e => setTweet(e.target.value)}
                  />
                </div>
                {!isPending ? (
                  <button
                    onClick={() => mutate()}
                    disabled={tweet.length < 1}
                    className={`h-[36px] flex items-center justify-center w-full ${
                      tweet ? 'bg-black hover:opacity-[0.8]' : 'bg-[#eeeeee]'
                    } rounded-[24px]  transition duration-300 ease-in-out text-white mt-[4px] `}
                  >
                    <span className='text-[16px] font-medium leading-[24px] text-white'>
                      Post
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
              </div>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
