import {GetStaticProps} from "next"
import AdminScene from "scenes/Admin"

export default function Admin() {
  return (
    <AdminScene/>
  )
}

export const getStaticProps: GetStaticProps<{ pageConfig: PageConfig }> = () => {
  return {
    props: {
      pageConfig: {
        loggedInOnly: {redirectTo: "/admin/login"}
      }
    }
  }
}
