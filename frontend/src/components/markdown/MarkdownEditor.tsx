import MDEditor from '@uiw/react-md-editor'
import { useCallback } from 'react'

/**
 * Component for markdown editing
 */
type Props = {
  markdown: string
  onChange: (markdown: string) => void
  loading?: boolean
}
const MarkdownEditor = (props: Props) => {
  const { onChange, loading } = props
  const handleChange = useCallback(
    (value: string | undefined) => {
      onChange(value ?? '')
    },
    [onChange]
  )

  return (
    <MDEditor
      value={props.markdown}
      onChange={handleChange}
      preview={loading ? 'preview' : undefined}
    />
  )
}

export default MarkdownEditor
