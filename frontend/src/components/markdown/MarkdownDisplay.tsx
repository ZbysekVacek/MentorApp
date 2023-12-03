import React from 'react'
import rehypeSanitize from 'rehype-sanitize'
import MDEditor from '@uiw/react-md-editor'

type Props = {
  markdown: string
}
/**
 * This component displays markdown content
 * HTML is sanitized by rehypeSanitize plugin
 * @param props
 * @constructor
 */
const MarkdownDisplay = (props: Props) => {
  return (
    <MDEditor.Markdown
      source={props.markdown}
      rehypePlugins={[rehypeSanitize]}
      wrapperElement={{
        'data-color-mode': 'light',
      }}
    />
  )
}
export default MarkdownDisplay
