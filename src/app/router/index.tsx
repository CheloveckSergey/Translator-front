import { FC } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Layout } from "../layout";
import { Translator } from "../../pages/translator";
import { TextsPage } from "../../pages/texts";
import { AuthPage } from "../../pages/auth";
import { TextPage } from "../../pages/text";
import { TodayListPage } from "../../pages/todayList";
import { WordsPage } from "../../pages/words";
import { HomePage } from "../../pages/home";

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
          <Route path="/texts" >
            <Route index element={<TextsPage />} />
            <Route path=":textId" element={<TextPage />} />
          </Route>
          <Route path="/today-list" element={<TodayListPage />} />
          <Route path="/words" element={<WordsPage />} />
        </Route>
        <Route path="/registration" element={<AuthPage />} />
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}