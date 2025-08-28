import { useEffect, useState } from "react"

import * as utils from "../../../utils/textUtil"
import { cn } from "../../../utils/cn"

export const TextFormatter = ({ 
  text = "", 
  highlights = [],
  underlines = [],
  links = [],  
  className,
  ...props
}) => {
  const [FinalText, setFinalText] = useState(() => <span>{text}</span>)

  useEffect(() => {
    if (text &&  (
      highlights.length > 0 ||
      underlines.length > 0 ||
      links.length > 0
    )) {
      let newText = text
      newText = utils.unescapeText(newText)
      newText = utils.highlightText(newText, highlights)
      newText = utils.underlineText(newText, underlines)
      newText = utils.linkifyText(newText, links)
      setFinalText(() => <span dangerouslySetInnerHTML={{ __html: newText }} 
        {...props}
      />)
    }
  }, [text, highlights])

  const wrapperClasses = cn(
    className || '',
  );

  return (
    <div className={wrapperClasses}>
      {FinalText}
    </div>
  )
}