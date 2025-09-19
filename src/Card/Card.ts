import './CardStyle.css'

export interface CardProps {
  title: string
  width?: string       // ancho de la card
  height?: string      // alto de la card
  textColor?: string   // color del texto
  textBgColor?: string // fondo del texto
  darkMode?: boolean   // si true usa modo oscuro
}

export function createCard({
  title,
  width,
  height,
  textColor,
  textBgColor,
  darkMode = false
}: CardProps): HTMLDivElement {
  const card = document.createElement('div')
  card.className = 'card'
  if (darkMode) card.classList.add('dark')
  if (width) card.style.width = width
  if (height) card.style.height = height

  const textContainer = document.createElement('div')
  textContainer.className = 'card-text-container'
  if (textBgColor) textContainer.style.backgroundColor = textBgColor

  const text = document.createElement('span')
  text.className = 'card-text'
  text.textContent = title
  if (textColor) text.style.color = textColor

  textContainer.appendChild(text)
  card.appendChild(textContainer)

  return card
}
