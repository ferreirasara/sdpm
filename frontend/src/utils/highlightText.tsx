import { CSSProperties } from 'react'

export default function highlightText(text: string, searchValue: string, options?: {
  style?: CSSProperties,
  highlightStyle?: CSSProperties,
}): JSX.Element {
  const { style = undefined, highlightStyle = {} } = options || {}
  text = text && typeof text === 'string' ? text : '';

  const text2 = text.toLowerCase()
  const searchValue2 = searchValue.toLowerCase()
  const index = text2.indexOf(searchValue2)
  const beforeStr = text.substr(0, index)
  const middleStr = text.substr(index, searchValue.length)
  const afterStr = text.substr(index + searchValue.length)

  return index > -1 ?
    <span style={style}>
      {beforeStr}
      <span style={{ color: '#f50', ...highlightStyle }}>{middleStr}</span>
      {afterStr}
    </span>
    :
    <span style={style}>{text}</span>
}