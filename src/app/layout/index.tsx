import { Outlet } from 'react-router-dom';
import { Footer } from '../../widgets/footer';
import { Header } from '../../widgets/header';
import './styles.scss';
import { RefreshLoader } from '../refreshLoader';
import { SideNavigation } from '../../widgets/navigation';
import { useState } from 'react';

export const Layout = () => {

  const [showNav, setShowNav] = useState<boolean>(false);

  function switchMenu() {
    setShowNav(showNav => !showNav);
  }

  function closeNav() {
    setShowNav(false);
  }

  return (
    <RefreshLoader >
      <div className="layout">
        <Header switchMenu={switchMenu}/>
        <div className='layout-content'>
          {showNav && <SideNavigation close={closeNav} />}
          <div className='main-footer'>
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </RefreshLoader>
  )
}