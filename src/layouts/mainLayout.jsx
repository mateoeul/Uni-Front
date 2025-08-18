import { Outlet } from 'react-router-dom';
import LogedNav from '../components/logedNav';


const mainLayout = () => {
  return (
    <>
      <LogedNav />
      <div className="layout-content">
        <Outlet />
      </div>
    </>
  );
};

export default mainLayout;
