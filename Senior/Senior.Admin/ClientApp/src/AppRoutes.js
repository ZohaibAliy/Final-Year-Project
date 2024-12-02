

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
import Resourses from './components/Resourses';
import LabourDetails from "./components/LabourDetails";
import  PlaceLabourRequest  from "./components/PlaceLabourRequest";
import MyLabourRequest from "./components/MyLabourRequest";
import Request from "./components/Requests";
import Printresourses from "./components/printresourses";
import ProjectDashboard from "./components/ProjectDashboard";
import ResourseAllocation from "./components/ResourseAllocation";

import ContractorDashboard from "./components/ContractorDashboard";
const AppRoutes = [
  {
    path: '/Resourses',
    element:<Resourses/>
  },
  {
    path: '/ResourseAllocation',
    element:<ResourseAllocation/>
  },
  {
    path: '/printresourses',
    element:<Printresourses/>
  },
  {
    path:'/ContractorDashboard',
    element:<ContractorDashboard/>
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
    path: '/PlaceLabourRequest',
    element: <PlaceLabourRequest state />
  },
  {
    path: '/myorders',
    element: <MyOrders />
  },
  {
    path: '/MyLabourRequest',
    element: <MyLabourRequest />
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
    path:'/projecttable',
    element:<ProjectDashboard/>
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
  {
    path: '/Request',
    element:<Request/>
  }
];

export default AppRoutes;
