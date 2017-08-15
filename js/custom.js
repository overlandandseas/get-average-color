(function() {
	'use strict'
	const btn = document.getElementById('submit-button')
  const inpt = document.getElementById('image-url')
  const imgDisplay = document.getElementById('image-display')
  const spn = document.getElementById('color-text')
	const circle = document.getElementById('color-circle')
	const warning = document.getElementById('warning-message')
	const corsmsg = document.getElementById('cors-message')
	
  const img = new Image()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  let url
  let averageColor
	img.crossOrigin = 'Ananomous'
  
	
  img.onload = () => {
  	let reds = []
    let greens = []
    let blues = []
    canvas.width = img.width
    canvas.height = img.height
		
  	ctx.drawImage(img, 0,0)
		let pixels = ctx.getImageData(0, 0, img.width, img.height).data
		for (var c = 0; c < pixels.length; c += 4) {
			reds.push(pixels[c])
			greens.push(pixels[c + 1])
			blues.push(pixels[c + 2])
		}
		averageColor = `#${pad(~~avg(reds))}${pad(~~avg(greens))}${pad(~~avg(blues))}`
		spn.innerHTML = averageColor
		circle.style.background = averageColor
		
  }
  
  inpt.addEventListener('input', evt => {
		if (/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(evt.target.value)) {
			fetch(evt.target.value).then(() => {
				imgDisplay.src = url = evt.target.value
				warning.classList.add('dn')
				corsmsg.classList.add('dn')
			}).catch(() => {
				corsmsg.classList.remove('dn')
				url = false
				imgDisplay.src = evt.target.value
			})
		} else if (evt.target.value === '') {
			warning.classList.add('dn')
			corsmsg.classList.add('dn')
		} else {
			url = false
			warning.classList.remove('dn')
			corsmsg.classList.add('dn')
			imgDisplay.src = ''
		}
  })
  
  btn.addEventListener('click', evt => {			
		evt.preventDefault()
		if (url)
			img.src = url
  });
	inpt.addEventListener('keydown', evt => {
		if (evt.which === 13 && url)
		 	img.src = url
	})
  
  function avg(arr) {
  	return arr.reduce((val, prev) => val + prev, 0) / arr.length
	}

	function pad(n) {
  	return ('00' + n.toString(16)).slice(-2)
	}
  
})()