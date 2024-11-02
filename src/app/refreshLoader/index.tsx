import { FC, useEffect } from "react";
import { SharedUiHelpers } from "../../shared/sharedUi/helpers";
import { useAppDispatch, useAppSelector } from "../store";
import './styles.scss'
import { useNavigate } from "react-router-dom";
import { AuthActions, authThunks } from "../../features/auth";

let alreadyBeenRefreshed = false;

interface RLProps {
  children: React.ReactNode | React.ReactNode[],
}
export const RefreshLoader: FC<RLProps> = ({ children }) => {

  const { user, loading, error } = useAppSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function refresh() {
    dispatch(authThunks.refreshThunk({}))
    .unwrap()
    .catch(() => {
      dispatch(AuthActions.clearUser());
      navigate('/registration');
    });
  }

  useEffect(() => {
    if (!user && !alreadyBeenRefreshed) {
      refresh();
      alreadyBeenRefreshed = true;
    }
  }, [user]);

  return (
    <SharedUiHelpers.ErrorLoader
      isLoading={loading}
      isError={!!error}
      className="refresh-loader"
      isEmpty={!user}
      iconSize={50}
    >
      {children}
    </SharedUiHelpers.ErrorLoader>
  )
}