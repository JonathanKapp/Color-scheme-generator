const seedColorInput = document.getElementById('seed-color')
const colorModeSelect = document.getElementById('color-mode')
const getSchemeBtn = document.getElementById('get-scheme-btn')
const colorSchemeDisplay = document.getElementById('color-scheme-display')

function getNewColorScheme() {
    const selectedColor = seedColorInput.value
    const selectedMode = colorModeSelect.value
    const hexWithoutHash = selectedColor.substring(1)
    
    console.log('button clicked')
    console.log('seed color (HEX):',hexWithoutHash)
    console.log('Mode:', selectedMode)
    
    const apiUrl = `https://www.thecolorapi.com/scheme?hex=${hexWithoutHash}&mode=${selectedMode}&count=5`
    
    fetch(apiUrl)
        .then(res => {
            if(!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            return res.json()
            })
            
        .then(data => {
            const colorsArray = data.colors
            colorSchemeDisplay.innerHTML = ""
            
            for(let color of colorsArray) {
                const hexCode = color.hex.value
                
                const colorColumn = document.createElement('div')
                colorColumn.classList.add('color-column')
                colorColumn.style.backgroundColor = hexCode
                
                const hexValueElement = document.createElement('p')
                hexValueElement.classList.add('hex-value')
                hexValueElement.textContent = hexCode
                
                colorColumn.appendChild(hexValueElement)
                colorSchemeDisplay.appendChild(colorColumn)
                console.log(color.hex.value)
            
            }
        })
        
        .catch(error => console.log('Error fetching color scheme:', error))
}

getSchemeBtn.addEventListener('click', getNewColorScheme) 
    
getNewColorScheme()


