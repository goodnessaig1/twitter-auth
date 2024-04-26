/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import { useQueryAPI } from '../Hooks/useQueryApi';
import { useMutation } from '@tanstack/react-query';
import { TwitterIcon } from '../Utils';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { TweetModal } from './TweetModal';

const UserDashboard = () => {
  const { screen_name } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [tweet, setTweet] = useState('');
  const [tokens, setTokens] = useState(null);

  const callApi = useQueryAPI();

  useEffect(() => {
    // Function to fetch the object from localStorage
    const getTokens = () => {
      const savedTokens = localStorage.getItem('secret');
      if (savedTokens) {
        // Parse the saved JSON string back into an object
        setTokens(JSON.parse(savedTokens));
      }
    };

    // Call the function when the component mounts
    getTokens();
  }, []);

  const dataData = {
    oauth_token: tokens?.oauth_token,
    tweet: tweet,
    oauth_token_secret: tokens?.oauth_token_secret,
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      callApi('write_tweet', {
        method: 'POST',
        body: JSON.stringify(dataData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: () => {
      setOpenModal(false);
      toast.success('Success', {
        position: 'top-right',
      });
    },
  });

  return (
    <div>
      {openModal && (
        <TweetModal
          tweet={tweet}
          setTweet={setTweet}
          mutate={mutate}
          isPending={isPending}
          closeModal={() => setOpenModal(false)}
        />
      )}
      <div className='h-[60px] t-0 w-full fixed border-b-[1px] px-[16px] md:px-[60px] border-b-[#f1f1f1] flex items-center justify-between'>
        <img src={TwitterIcon} alt='' className='w-[40px] h-[40px]' />

        <div className='flex flex-row uppercase'>
          Welcome to X <span className='font-bold pl-2'> {screen_name}</span>
        </div>
      </div>
      <div className='w-full px-[16px] md:px-[60px] pt-[60px]'>
        <div
          onClick={() => setOpenModal(true)}
          className='mt-[32px] w-[240px] flex items-center justify-center hover:opacity-[0.7] hover:cursor-pointer transitiion duration-300 rounded-[8px] text-white bg-black p-[8px]'
        >
          Click here to write a tweet
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
