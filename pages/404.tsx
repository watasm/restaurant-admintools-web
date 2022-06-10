import {GetStaticProps} from "next"
import ErrorScene from "scenes/Error"

export default function Custom404() {
  return (
    <ErrorScene error="404"/>
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
