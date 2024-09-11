

import Home  from "./components/Home";
import Login from './components/Login';
import Admindashboard from './components/Admindashboard';
import EquipmentDetails from './components/EquipmentDetails';
import PlaceOrder from './components/PlaceOrder';
import MyOrders from './components/MyOrders';
import ProfileDetails from './components/ProfileDetails';
import Signup from './components/Signup';
import LabourDashboard from './components/LabourDashboard'
import OrderDashboard from './components/OrderDashboard';
import EquipmentDashboard from './components/EquipmentDashboard';
import UserDashboard from './components/UserDashboard';
import Equipment from './components/Equipment';
import LabourRequestDashboard from './components/LaborRequestDashboard';
import Labour from './components/Labour';
import LabourDetails from "./components/LabourDetails";
const AppRoutes = [
  {
    path: '/Labour',
    element:<Labour/>
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/Equipment',
    element: <Equipment/>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admindashboard',
    element: <Admindashboard />
  },
  {
    path: '/EquipmentDetails',
    element: <EquipmentDetails state />
  },
  {
    path: '/LabourDetails',
    element: <LabourDetails state />
  },
  {
    path: '/placeorder',
    element: <PlaceOrder state />
  },
  {
    path: '/myorders',
    element: <MyOrders />
  },
  {
    path: '/profile',
    element: <ProfileDetails />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/usertable',
    element: <UserDashboard />
  },
  {
    path: '/producttable',
    element: <EquipmentDashboard />
  },
  {
    path: '/Labourtable',
    element: <LabourDashboard />
  },
  {
    path: '/ordertable',
    element: <OrderDashboard />
  },
  {
    path: '/LabourRequesttable',
    element: <LabourRequestDashboard />
  },
];

export default AppRoutes;
