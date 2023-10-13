import Drawer from "../Drawer/Drawer"

type Props = {
  titile: string
  children: React.ReactNode
}

function Template({ titile, children }: Props) {
  return <Drawer titile={titile}>{children}</Drawer>
}

export default Template
