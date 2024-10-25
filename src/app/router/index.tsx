import { FC } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
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

export const AppRouter: FC = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route 
          path="/" 
          element={<Layout />}
        >
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
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