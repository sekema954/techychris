import { ReactNode } from 'react';
import PageNotFound from '../../../src/pages/404'; 

type Props = {
  children: ReactNode;
};

const PrivateRouter = ({ children }: Props) => {
  const token = localStorage.getItem('authToken');

  return token ? children : <PageNotFound />; 
};

export default PrivateRouter;
