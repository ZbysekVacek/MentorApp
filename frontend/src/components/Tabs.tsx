import { TabsProps, Tabs as AntdTabs } from 'antd'

/**
 * This component is a wrapper around antd's Tabs component.
 * This approach allow us to change the UI library component style and behavior if we need it
 */
const Tabs = (props: TabsProps) => {
  return <AntdTabs {...props} />
}

export default Tabs
