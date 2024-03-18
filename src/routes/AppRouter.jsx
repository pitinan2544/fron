import {createBrowserRouter,RouterProvider,Outlet} from 'react-router-dom'
import LoginFrom from '../layout/LoginFrom'
import RegisterFrom from '../layout/RegisterFrom'
import Header from '../layout/Header'
import useAuth from '../hooks/useAuth'
import CreateMember from '../layout/CreateMember'
import MemberAll from '../layout/Member'
import Record from '../layout/RecordList'
import RecordAll from '../layout/RecordAll'
const guesRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
        <Header/>
        <Outlet/>
        </>,
        children: [
            {index: true,element:<LoginFrom/>},
            {path:'/register',element:<RegisterFrom/>}
        ]
    }
])

const userRouter = createBrowserRouter([
    {
        path:'/',
        element:<>
        <Header/>
        <Outlet/>
        </>,
        children : [
            {index : true,element:<p>User Home / Dashboard</p> },
            {path:'/createMember',element:<CreateMember/>},
            {path:'/member',element:<MemberAll/>},
            {path:'/record',element:<Record/>},
            {path:'/recordAll',element:<RecordAll/>}
            
        ]
    }
])

export default function AppRouter() {
  const{user} = useAuth()
  const finalRouter = user?.id? userRouter: guesRouter
  return (
    <RouterProvider router={finalRouter}/>
  )
}
