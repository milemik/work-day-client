import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './pages/Root'
import HomePage from  "./pages/HomePage"
import WorkDaysPage, { GetWorkDays } from './pages/WorkDaysPage'
import CompanyPage, { GetCompanies } from './pages/CompanyPage'
import AddCompanyPage, {AddCompany} from './pages/AddCompanyPage'
import CompanyDetailPage, { CompanyAction, GetCompanyDetail } from './pages/CompanyDetailPage'
import AddWorkDayPage, { AddWorkDay } from './pages/AddWorkDayPage'
import LoginPage from './pages/LoginPage'
import {action as LoginAction} from './pages/LoginPage';
import SignUpPage from './pages/SingUpPage'
import { action as signUpAction } from './pages/SingUpPage';
import { IsAuthenticated } from './utils/auth'
import {action as LogoutAction} from './pages/LogOutPage';


const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: HomePage
      },
      {
        path: "work-days",
        loader: IsAuthenticated,
        children:[
          {
            index: true,
            Component: WorkDaysPage,
            loader: GetWorkDays,
          },
          {
            path: "add",
            Component: AddWorkDayPage,
            loader: GetCompanies,
            action: AddWorkDay,
          }
        ]
      },
      {
        path:"companies",
        loader: IsAuthenticated,
        children: [
          {
            index: true,
            Component: CompanyPage,
            loader: GetCompanies,
          },
          {
            path: "add",
            Component: AddCompanyPage,
            action: AddCompany,
          },
          {
            path: ":companyID",
            Component: CompanyDetailPage,
            loader: GetCompanyDetail,
            action: CompanyAction
          }
        ]
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            index: true,
            Component: LoginPage,
            action: LoginAction
          },
          {
            path: "singup",
            Component: SignUpPage,
            action: signUpAction
          },
          {
            path: "logout",
            action: LogoutAction
          }
        ]
      },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
