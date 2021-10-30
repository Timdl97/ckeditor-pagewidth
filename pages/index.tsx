import type { NextPage } from 'next';
import Header from '../components/layout/header';
const Home: NextPage = () => {
  return (
    <>
      <div style={{height: '100px'}}></div>
      <Header sticky></Header>
      <div style={{height: '200vw'}}></div>
    </>
  );
};

export default Home;
