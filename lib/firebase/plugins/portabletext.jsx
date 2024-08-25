import Markdown from 'react-markdown'

export const PortableText = props => {
  const {value} = props
  return (
    <>
    {value && value.map((e, i) => {
      if (e.type !== 'text') {
        return <></>
      }
      if (!e.value) {
        return <></>
      }
      const text = e.value.replace(/\\n/g, "\n")
      return <Markdown key={i}>{text}</Markdown>
    })}
    </>)
}
