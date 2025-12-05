// Custom admonition definitions for MyST Typst export
// This file adds support for additional admonition types beyond the default 'note'

#let admonition(body, heading: none, color: blue) = {
  let stroke = (left: 2pt + color.darken(20%))
  let fill = color.lighten(80%)
  let title
  if heading != none {
    title = block(width: 100%, inset: (x: 8pt, y: 4pt), fill: fill, below: 0pt, radius: (top-right: 2pt))[#text(11pt, weight: "bold")[#heading]]
  }
  block(width: 100%, stroke: stroke, [
    #title
  #block(fill: luma(240), width: 100%, inset: 8pt, radius: (bottom-right: 2pt))[#body]
])
}

// Note admonition (blue)
#let noteBlock(body, heading: [Note]) = admonition(body, heading: heading, color: blue)

// Tip admonition (green)
#let tipBlock(body, heading: [Tip]) = admonition(body, heading: heading, color: green)

// Important admonition (yellow/orange)
#let importantBlock(body, heading: [Important]) = admonition(body, heading: heading, color: orange)

// Warning admonition (red)
#let warningBlock(body, heading: [Warning]) = admonition(body, heading: heading, color: red)

// Caution admonition (yellow)
#let cautionBlock(body, heading: [Caution]) = admonition(body, heading: heading, color: yellow.darken(20%))

// Attention admonition (red)
#let attentionBlock(body, heading: [Attention]) = admonition(body, heading: heading, color: red)

// Danger admonition (dark red)
#let dangerBlock(body, heading: [Danger]) = admonition(body, heading: heading, color: red.darken(20%))

// Hint admonition (cyan/teal)
#let hintBlock(body, heading: [Hint]) = admonition(body, heading: heading, color: rgb(0, 150, 150))

// Example admonition (purple)
#let exampleBlock(body, heading: [Example]) = admonition(body, heading: heading, color: purple)

// See Also admonition (gray)
#let seealsoBlock(body, heading: [See Also]) = admonition(body, heading: heading, color: gray)

// Generic admonition block (accepts custom heading)
#let admonitionBlock(body, heading: none) = admonition(body, heading: heading, color: blue)
