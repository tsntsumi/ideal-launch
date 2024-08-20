import Markdown from 'react-markdown'

export const PortableText = props => {
  const text = props.value?.replace(/\\n/g, "\n")
  return (
    <Markdown>{text}</Markdown>
  )
}
