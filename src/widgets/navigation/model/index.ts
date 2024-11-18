import { useAppSelector } from "../../../app/store"

interface NavLink {
  name: string,
  to: string,
}

export const useLinks = (): NavLink[] => {
  const { user } = useAppSelector(state => state.user);

  const links: NavLink[] = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Words',
      to: '/words/user/' + user?.id,
    },
    {
      name: 'Today List',
      to: '/today-list',
    },
    {
      name: 'Texts',
      to: '/texts/user/' + user?.id,
    },
    {
      name: 'Translator',
      to: '/translator',
    },
    {
      name: 'Users',
      to: '/users',
    },
  ]
  return links
} 