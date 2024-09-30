import { FC, useEffect } from "react"
import './styles.scss'
import { useSearchParams } from "react-router-dom"
import { Menu } from "./menu";
import { FriendsListWidget } from "./findUsers";
import { FindFriendsListWidget } from "./friends";
import { RequestsListWidget } from "./requests";
import { UsersPageLib } from "../lib";

export const UsersPage: FC = () => {

  const { searchType, setSearchType } = UsersPageLib.useUsersSearchType();

  useEffect(() => {
    if (!searchType) {
      setSearchType('friends');
    }
  })

  return (
    <div className="users-page">
      <div className="main-content">
        <h1>Users</h1>
        <div className="wrapper">
          {searchType === 'friends' && <FriendsListWidget />}
          {searchType === 'findFriends' && <FindFriendsListWidget />}
          {(searchType === 'incomeRequests' || searchType === 'outcomeRequests') && <RequestsListWidget />}
          <Menu />
        </div>
      </div>
    </div>
  )
}