import { Outlet } from 'react-router-dom';
import { Footer } from '../../widgets/footer';
import { Header } from '../../widgets/header';
import './styles.scss';
import { RefreshLoader } from '../refreshLoader';

export const Layout = () => {

  return (
    <RefreshLoader >
      <div className="layout">
        <Header />
        <div className='main-footer'>
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </RefreshLoader>
  )
}