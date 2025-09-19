import './style.css'
import { createCard } from './Card/Card'

const container = document.querySelector<HTMLDivElement>('#app')!

const grid = document.createElement('div')
grid.style.display = 'grid'
grid.style.gridTemplateColumns = 'repeat(3, 1fr)'
grid.style.gridTemplateRows = 'repeat(3, 1fr)'
grid.style.gap = '1rem'
grid.style.width = '50vw'
grid.style.height = '100vh'
grid.style.padding = '1rem'

for (let i = 1; i <= 9; i++) {
  const card = createCard({
    title: `Card ${i}`,
    textColor: '#bf0bd7ff', // azul
    textBgColor: '#1f2937' // fondo del texto
  })
  grid.appendChild(card)
}

container.appendChild(grid)

