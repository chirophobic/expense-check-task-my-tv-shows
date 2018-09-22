import Favourites from './pages/Favourites';
import Home from './pages/Home';
import WatchList from './pages/WatchList';

export default [
    {
        title: 'Home',
        path: '/',
        exact: true,
        component: Home,
    },
    {
        title: 'Watch List',
        path: '/watch-list',
        exact: true,
        component: WatchList,
    },
    {
        title: 'Favourites',
        path: '/favourites',
        exact: true,
        component: Favourites,
    },
];
