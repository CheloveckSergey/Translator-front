import { FC, useRef, useState } from "react";
import './styles.scss';
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { SharedButtons } from "../../shared/sharedUi/buttons";
import { BsList } from "react-icons/bs";
import { SharedHooks, queryClient } from "../../shared/lib";
import { authThunks } from "../../features/auth";
import { SharedBlocks } from "../../shared/sharedUi/blocks";
import { SharedUiTypes } from "../../shared/sharedUi/types";
import { GiSpinningSword } from "react-icons/gi";

const UserMenu: FC = () => {

  const { user, loading, error } = useAppSelector(state => state.user);

  const [shownMenu, setShownMenu] = useState<boolean>(false);

  let img: string;
  let name: string;

  if (user) {
    img = user.avatar;
    name = user.login;
  } else {
    img = 'https://sun6-20.userapi.com/impf/dBOoqwbRx7sFh34Cz949747XtxUKNRn7I2j-cQ/jB0PLDkj6_E.jpg?size=320x240&quality=96&keep_aspect_ratio=1&background=000000&sign=70422b56ba05fba94a7f78481b15eb83&type=video_thumb';
    name = 'Guest';
  }

  const ref = useRef<any>(null);

  SharedHooks.useClickOutside(ref, () => setShownMenu(false));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const actions: SharedUiTypes.MenuLine[] = [];

  if (user) {
    actions.push({
      body: 'Exit',
      onClick: () => {
        dispatch(authThunks.logoutThunk({ userId: user.id }))
        .unwrap()
        .then(() => {
          navigate('/registration');
        });
      },
      isLoading: loading,
      isError: !!error,
    });

    actions.push({
      body: 'Settings',
      onClick: () => {
        navigate('/settings');
      }
    })
  } else {
    actions.push({
      body: 'Authorization',
      onClick: () => {
        navigate('/registration');
      }
    })
  }

  return (
    <SharedBlocks.MenuContainer
      main={(
        <div 
          className="user-icon"
          onClick={() => {
            setShownMenu(!shownMenu);
          }}
        >
          <img 
            src={img}
            alt="IMG"
          />
          <span className="login">
            {name}
          </span>
        </div>
      )}
      actions={actions}
    />
  )
}

interface HProps {
  switchMenu: () => void,
}
export const Header: FC<HProps> = ({ switchMenu }) => {

  const { user } = useAppSelector(state => state.user);

  return (
    <header className="header">
      <div className="left">
        <SharedButtons.TextButton
          body={<BsList size={35} /> }
          color="light"
          onClick={switchMenu}
          className="show-menu-button"
        />
        <span 
          className="app-name"
          onClick={() => {
            console.log('***');
            const queries = queryClient.getQueryCache().findAll();
            console.log(queries);
            queryClient.invalidateQueries('texts')
            .then(() => {
              console.log('invalidateQueries complete');
              const queries = queryClient.getQueryCache().findAll();
              console.log(queries);
            });
          }}
        >
          <GiSpinningSword size={25} />
          STranslator
        </span>
      </div>
      <div className="main-links">
        <Link to='/'>
          Home
        </Link>
        <Link to={'/words/user/' + user?.id}>
          Words
        </Link>
        <Link to='/today-list'>
          Today List
        </Link>
        <Link to={'/texts/user/' + user?.id}>
          Texts
        </Link>
        <Link to='/translator'>
          Translator
        </Link>
        <Link to='/users'>
          Users
        </Link>
      </div>
      <UserMenu />
    </header>
  )
}