import { FC } from "react";
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, redirect, useNavigate } from "react-router-dom";
import { Layout } from "../layout";
import { Translator } from "../../pages/translator";
import { TextsPage } from "../../pages/texts/ui";
import { AuthPage } from "../../pages/auth";
import { EditingTextPage } from "../../pages/editingText";
import { TodayListPage } from "../../pages/todayList";
import { WordsPage } from "../../pages/words";
import { HomePage } from "../../pages/home";
import { UsersPage } from "../../pages/users/ui";
import { UserPage } from "../../pages/user";
import { useAppSelector } from "../store";
import { SettingsPage } from "../../pages/settings";
import { AllTextsPage } from "../../pages/allTexts";
import { TextPage } from "../../pages/text";

interface PRProps {
  element: React.ReactNode,
}
const ProtectedElement: FC<PRProps> = ({ element }) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/registration" />;
  }

  return (
    <>
      {element}
    </>
  )
};

export const AppRouter: FC = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route 
          path="/" 
          element={<Layout />}
        >
          <Route
            index 
            element={<Navigate to={'/home'} replace />}
          />
          <Route 
            path="/home"
            element={<ProtectedElement element={<HomePage />} />} 
          />
          <Route path="/translator" element={<Translator />} />
          <Route path="/texts">
            <Route path=":textId" element={<TextPage />} />
            <Route path="user/:userId" element={<TextsPage />} />
          </Route>
          <Route path="/all-texts" element={<AllTextsPage />} />
          <Route path="/editingText/:textId" element={<EditingTextPage />} />
          <Route path="/today-list" element={<TodayListPage />} />
          <Route path="/words/user/:userId" element={<WordsPage />} />
          <Route path="/users" >
            <Route index element={<ProtectedElement element={<UsersPage />} />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>
          <Route 
            path="/settings" 
            element={<ProtectedElement element={<SettingsPage />} />}
          />
        </Route>
        <Route path="/registration" element={<AuthPage />} />
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}