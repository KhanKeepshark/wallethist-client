import { Auth } from '../../pages/authorization/Auth'
import { Home } from '../../pages/home/Home'
import { Profile } from '../../pages/profile/Profile'
import { RecordList } from '../../pages/recordList/RecordList'
import { AUTH_ROUTE, HOME_ROUTE, PROFILE_ROUTE, RECORD_LIST_ROUTE } from './pathConsts'

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: RECORD_LIST_ROUTE,
        Component: RecordList
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
]

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth
    },
]