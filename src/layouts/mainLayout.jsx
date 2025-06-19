import { Outlet } from 'react-router-dom';
import LogedNav from '../components/logedNav';


const mainLayout = () => {
  return (
    <>
      <LogedNav />
      <Outlet />
    </>
  );
};

export default mainLayout;
