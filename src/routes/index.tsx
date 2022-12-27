
import HomePage from '../components/ogranisms/HomePage/HomePage';
import ListToday from '../pages/listWeather/index';

export const ROUTES = {
  HomePage: '/',
  ListToday: (dataToday: any, today: any) => `/listWeather/${today}`,
};

const routes = [
  { exact: true, path: ROUTES.HomePage, component: HomePage},
  { exact: true, path: ROUTES.ListToday(':dataToday', ':today'), component: ListToday},
];

export default routes;
