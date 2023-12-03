import MDEditor from '@uiw/react-md-editor'
import { useCallback } from 'react'

type Props = {
  markdown: string
  onChange: (markdown: string) => void
  loading?: boolean
}
/**
 * Component for markdown editing
 */
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
