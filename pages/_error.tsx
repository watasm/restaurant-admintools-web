import {GetStaticProps} from "next"
import ErrorScene from "scenes/Error"

export default function CustomError() {
  return (
    <ErrorScene/>
  )
}

export const getStaticProps: GetStaticProps<{ pageConfig: PageConfig }> = () => {
  return {
    props: {
      pageConfig: {
        noHeader: true,
        noSidebar: true
      }
    }
  }
}
