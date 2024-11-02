import { FC } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, redirect } from "react-router-dom";
import { Layout } from "../layout";
import { Translator } from "../../pages/translator";
import { TextsPage } from "../../pages/texts/ui";
import { AuthPage } from "../../pages/auth";
import { TextPage } from "../../pages/text";
import { TodayListPage } from "../../pages/todayList";
import { WordsPage } from "../../pages/words";
import { HomePage } from "../../pages/home";
import { UsersPage } from "../../pages/users/ui";
import { UserPage } from "../../pages/user";
import { useAppSelector } from "../store";

// interface PRProps {
//   element: React.ReactNode,
//   path: string,
// }
// const ProtectedRoute: FC<PRProps> = ({ element, path }) => {

//   return (
//     <Route 
//       path={path}
//       element={<Redirect to />}
//     />
//   )
// }

export const AppRouter: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route 
          path="/" 
          element={<Layout />}
        >
          <Route index element={<HomePage />} />
          <Route 
            path="/home" 
            element={<HomePage />} 
            // loader={}
            loader={() => {
              // const { user } = useAppSelector(state => state.user);

              if (!user) {
                redirect('/generalFeed')
              }

              return true
            }}
          />
          <Route path="/translator" element={<Translator />} />
          <Route path="/texts">
            <Route path=":textId" element={<TextPage />} />
            <Route path="user/:userId" element={<TextsPage />} />
          </Route>
          <Route path="/today-list" element={<TodayListPage />} />
          <Route path="/words/user/:userId" element={<WordsPage />} />
          <Route path="/users" >
            <Route index element={<UsersPage />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>
        </Route>
        <Route path="/registration" element={<AuthPage />} />
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}