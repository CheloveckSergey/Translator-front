import { Outlet, useNavigate } from 'react-router-dom';
import { Footer } from '../../widgets/footer';
import { Header } from '../../widgets/header';
import './styles.scss';
import { useAppDispatch, useAppSelector } from '../store';
import { MyRejectValue, authThunks } from '../../features/auth';
import { useEffect } from 'react';
import { SharedIcons } from '../../shared/sharedUi/icons';

export const Layout = () => {

  const { user, loading, error } = useAppSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function refresh() {
    console.log('APP_USE_EFFECT');
    dispatch(authThunks.refreshThunk({}))
    .unwrap()
    .then((data) => {

    })
    .catch((error: MyRejectValue) => {
      navigate('/registration');
    });
  }

  useEffect(() => {
    refresh();
  }, []);

  if (loading) {
    return (
      <div className='auth-loading'>
        <SharedIcons.Spinner size={90} />
      </div>
    )
  }

  if (!user) {
    return (
      <div className='auth-loading'>
        <SharedIcons.Error size={50} />
        <p>Нет доступа без авторизации</p>
      </div>
    )
  }

  return (
    <div className="layout">
      <Header />
      <div className='main-footer'>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}