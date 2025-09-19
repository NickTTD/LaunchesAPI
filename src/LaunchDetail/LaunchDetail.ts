// LaunchDetail/LaunchDetail.ts
import './LaunchDetailStyle.css'

export interface Launch {
  id: string
  name: string
  status: { id: number; name: string }
  net: string
  image: string
  mission: {
    name: string
    description: string
    type: string
    orbit: { name: string; abbrev: string }
  }
  rocket: {
    configuration: {
      name: string
      family: string
      full_name: string
      variant: string
    }
  }
  launch_service_provider: {
    name: string
    type: string
  }
  pad: {
    name: string
    location: {
      name: string
      country_code: string
    }
  }
  probability?: number
}

export function createLaunchDetailPage(launch: Launch): HTMLDivElement {
  const detailPage = document.createElement('div')
  detailPage.className = 'launch-detail-page'
  
  // Header con botón de regreso
  const header = document.createElement('div')
  header.className = 'detail-header'
  
  const backButton = document.createElement('button')
  backButton.className = 'back-button'
  backButton.textContent = '← Volver'
  backButton.onclick = () => showMainPage()
  
  header.appendChild(backButton)
  
  // Contenido principal
  const content = document.createElement('div')
  content.className = 'detail-content'
  
  // Imagen principal
  const imageContainer = document.createElement('div')
  imageContainer.className = 'detail-image-container'
  
  const image = document.createElement('img')
  image.src = launch.image
  image.alt = launch.name
  image.className = 'detail-image'
  image.onerror = () => {
    imageContainer.style.backgroundColor = '#374151'
    image.style.display = 'none'
  }
  
  imageContainer.appendChild(image)
  
  // Información del lanzamiento
  const infoContainer = document.createElement('div')
  infoContainer.className = 'detail-info'
  
  // Título
  const title = document.createElement('h1')
  title.className = 'detail-title'
  title.textContent = launch.name
  
  // Estado
  const statusContainer = document.createElement('div')
  statusContainer.className = 'status-container'
  
  const statusBadge = document.createElement('span')
  statusBadge.className = `status-badge status-${launch.status.name.toLowerCase()}`
  statusBadge.textContent = launch.status.name
  
  statusContainer.appendChild(statusBadge)
  
  // Fecha
  const dateContainer = document.createElement('div')
  dateContainer.className = 'info-section'
  
  const dateLabel = document.createElement('h3')
  dateLabel.textContent = 'Fecha de Lanzamiento'
  
  const dateValue = document.createElement('p')
  const launchDate = new Date(launch.net)
  dateValue.textContent = launchDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  
  dateContainer.appendChild(dateLabel)
  dateContainer.appendChild(dateValue)
  
  // Información del cohete
  const rocketContainer = document.createElement('div')
  rocketContainer.className = 'info-section'
  
  const rocketLabel = document.createElement('h3')
  rocketLabel.textContent = 'Cohete'
  
  const rocketValue = document.createElement('p')
  rocketValue.textContent = launch.rocket.configuration.full_name
  
  const rocketFamily = document.createElement('p')
  rocketFamily.className = 'secondary-text'
  rocketFamily.textContent = `Familia: ${launch.rocket.configuration.family}`
  
  rocketContainer.appendChild(rocketLabel)
  rocketContainer.appendChild(rocketValue)
  rocketContainer.appendChild(rocketFamily)
  
  // Información de la misión
  const missionContainer = document.createElement('div')
  missionContainer.className = 'info-section'
  
  const missionLabel = document.createElement('h3')
  missionLabel.textContent = 'Misión'
  
  const missionName = document.createElement('p')
  missionName.textContent = launch.mission.name
  
  const missionType = document.createElement('p')
  missionType.className = 'secondary-text'
  missionType.textContent = `Tipo: ${launch.mission.type} | Órbita: ${launch.mission.orbit.name}`
  
  const missionDescription = document.createElement('p')
  missionDescription.className = 'mission-description'
  missionDescription.textContent = launch.mission.description
  
  missionContainer.appendChild(missionLabel)
  missionContainer.appendChild(missionName)
  missionContainer.appendChild(missionType)
  missionContainer.appendChild(missionDescription)
  
  // Proveedor del lanzamiento
  const providerContainer = document.createElement('div')
  providerContainer.className = 'info-section'
  
  const providerLabel = document.createElement('h3')
  providerLabel.textContent = 'Proveedor'
  
  const providerValue = document.createElement('p')
  providerValue.textContent = `${launch.launch_service_provider.name} (${launch.launch_service_provider.type})`
  
  providerContainer.appendChild(providerLabel)
  providerContainer.appendChild(providerValue)
  
  // Ubicación
  const locationContainer = document.createElement('div')
  locationContainer.className = 'info-section'
  
  const locationLabel = document.createElement('h3')
  locationLabel.textContent = 'Ubicación'
  
  const locationValue = document.createElement('p')
  locationValue.textContent = launch.pad.name
  
  const locationDetail = document.createElement('p')
  locationDetail.className = 'secondary-text'
  locationDetail.textContent = launch.pad.location.name
  
  locationContainer.appendChild(locationLabel)
  locationContainer.appendChild(locationValue)
  locationContainer.appendChild(locationDetail)
  
  // Probabilidad (si existe)
  if (launch.probability) {
    const probabilityContainer = document.createElement('div')
    probabilityContainer.className = 'info-section'
    
    const probabilityLabel = document.createElement('h3')
    probabilityLabel.textContent = 'Probabilidad de Éxito'
    
    const probabilityValue = document.createElement('p')
    probabilityValue.textContent = `${launch.probability}%`
    
    const probabilityBar = document.createElement('div')
    probabilityBar.className = 'probability-bar'
    
    const probabilityFill = document.createElement('div')
    probabilityFill.className = 'probability-fill'
    probabilityFill.style.width = `${launch.probability}%`
    
    probabilityBar.appendChild(probabilityFill)
    
    probabilityContainer.appendChild(probabilityLabel)
    probabilityContainer.appendChild(probabilityValue)
    probabilityContainer.appendChild(probabilityBar)
    
    infoContainer.appendChild(probabilityContainer)
  }
  
  // Agregar todas las secciones
  infoContainer.appendChild(title)
  infoContainer.appendChild(statusContainer)
  infoContainer.appendChild(dateContainer)
  infoContainer.appendChild(rocketContainer)
  infoContainer.appendChild(missionContainer)
  infoContainer.appendChild(providerContainer)
  infoContainer.appendChild(locationContainer)
  
  content.appendChild(imageContainer)
  content.appendChild(infoContainer)
  
  detailPage.appendChild(header)
  detailPage.appendChild(content)
  
  return detailPage
}

// Función para mostrar la página principal
function showMainPage() {
  const detailPage = document.querySelector('.launch-detail-page') as HTMLElement
  const mainContent = document.querySelector('#app') as HTMLElement
  
  if (detailPage) {
    // Agregar clase de closing para iniciar la animación
    detailPage.classList.add('closing')
    
    // Esperar a que termine la animación antes de remover el elemento
    setTimeout(() => {
      detailPage.remove()
      
      // Mostrar el contenido principal
      if (mainContent) {
        mainContent.style.display = 'flex'
      }
    }, 400) // 400ms coincide con la duración de la animación
  } else {
    // Fallback en caso de que no encuentre el elemento
    if (mainContent) {
      mainContent.style.display = 'flex'
    }
  }
}