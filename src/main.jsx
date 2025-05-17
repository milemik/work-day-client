import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './pages/Root'
import HomePage from  "./pages/HomePage"
import WorkDaysPage, { GetWorkDays } from './pages/WorkDaysPage'
import CompanyPage from './pages/CompanyPage'


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
        path: "work-days/",
        Component: WorkDaysPage,
        loader: async () => await GetWorkDays(),
      },
      {
        path:"companies/",
        Component: CompanyPage,
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
