import './CardStyle.css'

export interface CardProps {
  title: string
  width?: string // ancho de la card
  height?: string // alto de la card
  textColor?: string // color del texto
  textBgColor?: string // fondo del texto
  darkMode?: boolean // si true usa modo oscuro
  imageUrl?: string // URL de la imagen de fondo
}

export function createCard({
  title,
  width,
  height,
  textColor,
  textBgColor,
  darkMode = false,
  imageUrl
}: CardProps): HTMLDivElement {
  const card = document.createElement('div')
  card.className = 'card'
  
  if (darkMode) card.classList.add('dark')
  if (width) card.style.width = width
  if (height) card.style.height = height
  
  // Agregar imagen de fondo si se proporciona
  if (imageUrl) {
    const img = document.createElement('img')
    img.src = imageUrl
    img.alt = title
    img.className = 'card-background-image'
    img.style.position = 'absolute'
    img.style.top = '0'
    img.style.left = '0'
    img.style.width = '100%'
    img.style.height = '100%'
    img.style.objectFit = 'cover'
    img.style.zIndex = '1'
    
    // Manejo de error de imagen
    img.onerror = () => {
      img.style.display = 'none'
    }
    
    card.appendChild(img)
  }
  
  const textContainer = document.createElement('div')
  textContainer.className = 'card-text-container'
  if (textBgColor) textContainer.style.backgroundColor = textBgColor
  
  // Si hay imagen, hacer el texto más visible con overlay
  if (imageUrl) {
    textContainer.style.position = 'relative'
    textContainer.style.zIndex = '2'
    textContainer.style.background = textBgColor ? 
      `linear-gradient(transparent, ${textBgColor})` : 
      'linear-gradient(transparent, rgba(0,0,0,0.7))'
  }
  
  const text = document.createElement('span')
  text.className = 'card-text'
  text.textContent = title
  if (textColor) text.style.color = textColor
  
  // Mejorar legibilidad del texto sobre imagen
  if (imageUrl) {
    text.style.textShadow = '0 1px 3px rgba(0,0,0,0.8)'
    text.style.fontWeight = 'bold'
  }
  
  textContainer.appendChild(text)
  card.appendChild(textContainer)
  
  return card
}