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
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
