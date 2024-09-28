import Markdown from 'react-markdown'

export type BodyContent = {
  type: "text" | "image" | "video"
  value: any
}

export function Summary({children}: {children: any}) {
  return (
    <div><Markdown>{children}</Markdown></div>
  )
}


export default function BodyContents({ contents } : { contents: BodyContent[] }) {
  return (
    <>
    { contents.map((b, i) => {
      if (b.type !== 'text') {
        return <>{b.type}</>
      }
      return <div key={i}><Markdown>{b.value}</Markdown></div>
    }) }
    </>
  )
}
