import Favourites from './pages/Favourites';
import Home from './pages/Home';
import WatchList from './pages/WatchList';

export default [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/watch-list',
        exact: true,
        component: WatchList,
    },
    {
        path: '/favourites',
        exact: true,
        component: Favourites,
    },
];
