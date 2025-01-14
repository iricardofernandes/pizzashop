import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div>
      <h1>App Layout</h1>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
