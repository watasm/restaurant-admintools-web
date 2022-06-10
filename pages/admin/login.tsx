import {GetStaticProps} from "next"
import AdminLoginScene from "scenes/AdminLogin"

export default function AdminLogin() {
  return (
    <AdminLoginScene/>
  )
}

export const getStaticProps: GetStaticProps<{ pageConfig: PageConfig }> = () => {
  return {
    props: {
      pageConfig: {
        noHeader: true,
        noSidebar: true,
        notLoggedInOnly: {
          redirectTo: "/admin"
        }
      }
    }
  }
}
