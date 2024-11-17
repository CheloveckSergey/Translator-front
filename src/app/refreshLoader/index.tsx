import { FC, useEffect } from "react";
import { SharedUiHelpers } from "../../shared/sharedUi/helpers";
import { useAppDispatch, useAppSelector } from "../store";
import './styles.scss'
import { authThunks } from "../../features/auth";

// Когда рендерится лэйаут (а он загружается, как обёртка для большинства страниц), 
// вместе с лэйаутом рендерится рефрешЛоадер. Рефрешлоадер проверяет, была ли уже попытка рефреша.
// Если попытки рефреша не было, и нет юзера (т.е. лэйаут загружается в первый раз),
// то срабатывает рефрешсанк. В независимости от результата рефреша, далее рендерится 
// вложенный роут, т.е. проверка на доступ к странице ложится уже на вложенный роут.

// Иначе говоря, при любом вхое в приложение на страницу с лэйаутом, происходит рефреш.
// При отрицательном рефреше, пользователь продолжает, как гость. При положительном - как 
// авторизованный юзер. При попытке попасть на закрытую страницу, неважно, как он туда попал:
// при входе в приложение или путём изменения адреса, с одной из ссылок внутри приложения или
// опять же путём ручного изменения адреса. Если пользователь попадает на страницу авторизации,
// то рефреш не требуется, поэтому на эту страницу рефрешлоадер не добавляется.

let beenTryToRefresh = false;

interface RLProps {
  children: React.ReactNode | React.ReactNode[],
}
export const RefreshLoader: FC<RLProps> = ({ children }) => {

  const { user, loading } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user && !beenTryToRefresh) {
      dispatch(authThunks.refreshThunk({}));
      beenTryToRefresh = true;
    }
  }, [user]);

  return (
    <SharedUiHelpers.ErrorLoader
      isLoading={loading}
      isError={false}
      className="refresh-loader"
      isEmpty={!user && !beenTryToRefresh}
      iconSize={50}
    >
      {children}
    </SharedUiHelpers.ErrorLoader>
  )
}