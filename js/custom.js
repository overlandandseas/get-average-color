(function() {
	'use strict'
	const btn = document.getElementById('submit-button')
  const inpt = document.getElementById('image-url')
  const imgDisplay = document.getElementById('image-display')
  const spn = document.getElementById('color-box')
	
  const img = new Image()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  let url
  let averageColor
	img.crossOrigin = 'Ananomous'
  
	
	// when new src is placed in image
  img.onload = () => {
  	let reds = []
    let greens = []
    let blues = []
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0,0)
    let pixels = ctx.getImageData(0, 0, img.width, img.height).data
    for(var c = 0; c < pixels.length; c += 4) {
    	reds.push(pixels[c])
      greens.push(pixels[c + 1])
      blues.push(pixels[c + 2])
    }
    averageColor = `#${pad(avg(reds))}${pad(avg(greens))}${pad(avg(blues))}`
    spn.innerHTML = spn.style.color = averageColor
  }
  
  inpt.addEventListener('input', evt => {
  	imgDisplay.src = url = evt.target.value
  })
  
  btn.addEventListener('click', evt => {			
    img.src = url
    
  });
  
  function avg(arr) {
  	return arr.reduce(i => i + i, 0) / arr.length
	}

	function pad(n) {
  	return ('00' + n.toString(16)).slice(-2)
	}
  
})()