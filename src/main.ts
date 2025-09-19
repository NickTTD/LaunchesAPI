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

// Función para obtener los lanzamientos desde la API
async function fetchRecentLaunches() {
  try {
    const response = await fetch('https://ll.thespacedevs.com/2.0.0/launch/previous/?limit=9&ordering=-net')
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Error fetching launches:', error)
    return []
  }
}

// Función para crear el grid con los datos de los lanzamientos
async function createLaunchGrid() {
  const launches = await fetchRecentLaunches()
  
  if (launches.length === 0) {
    // Fallback en caso de error con la API
    for (let i = 1; i <= 9; i++) {
      const card = createCard({
        title: `Card ${i}`,
        textColor: '#bf0bd7ff',
        textBgColor: '#1f2937',
        imageUrl: undefined
      })
      grid.appendChild(card)
    }
  } else {
    // Usar los datos reales de la API
    launches.forEach((launch: any, index: number) => {
      const card = createCard({
        title: launch.name,
        textColor: '#bf0bd7ff',
        textBgColor: '#1f2937',
        imageUrl: launch.image
      })
      grid.appendChild(card)
    })
  }
  
  container.appendChild(grid)
}

// Inicializar la aplicación
createLaunchGrid()