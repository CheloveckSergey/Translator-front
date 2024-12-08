import { FC } from "react";
import './styles.scss';
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { authThunks } from "../../features/auth";
import { SharedButtons } from "../../shared/sharedUi/buttons";
import { BsList } from "react-icons/bs";

interface HProps {
  switchMenu: () => void,
}
export const Header: FC<HProps> = ({ switchMenu }) => {

  const { user } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const name = user?.login ? user.login : 'Guest';

  return (
    <div className="header">
      <div className="left">
        <SharedButtons.TextButton
          body={<BsList size={35} /> }
          color="light"
          onClick={() => {switchMenu()}}
          className="show-menu"
        />
        <p>{name}</p>
      </div>
      <div className="main-links">
        <Link to='/'>
          <h3>Home</h3>
        </Link>
        <Link to={'/words/user/' + user?.id}>
          <h3>Words</h3>
        </Link>
        <Link to='/today-list'>
          <h3>Today List</h3>
        </Link>
        <Link to={'/texts/user/' + user?.id}>
          <h3>Texts</h3>
        </Link>
        <Link to='/translator'>
          <h3>Translator</h3>
        </Link>
        <Link to='/users'>
          <h3>Users</h3>
        </Link>
      </div>
      <h3
        onClick={() => {
          if (user) {
            dispatch(authThunks.logoutThunk({ userId: user?.id }));
          }
          navigate('/registration');
        }}
      >
        Exit
      </h3>
    </div>
  )
}