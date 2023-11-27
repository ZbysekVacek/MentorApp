import { ButtonProps, Button as AntdButton } from 'antd'

/**
 * This component is a wrapper around antd's Tabs component.
 * This approach allow us to change the UI library component style and behavior if we need it
 */
const Button = (props: ButtonProps) => {
  return <AntdButton {...props} />
}

export default Button
