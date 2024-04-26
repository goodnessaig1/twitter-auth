import { TwitterIcon } from '../Utils';

const Dashboard = () => {
  return (
    <div className='h-screen bg-[#eeeeee] w-full items-center justify-center'>
      <div className='flex flex-col gap-[12px] items-center justify-center'>
        <img src={TwitterIcon} className='w-[60px] h-[80px]' alt='' />
        <h1 className=''>WELCOME TO X</h1>
      </div>
    </div>
  );
};

export default Dashboard;
