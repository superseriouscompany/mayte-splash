const stars = document.getElementById('stars')
const space = stars.getElementById('space')

const mayteWhite = a => `rgba(243,243,243,${!a ? a === 0 ? 0 : 1 : a})`

class StarSheet {
  constructor(canvas) {
    this.canvas = canvas
    this.writeSheet(this.canvas)
  }

  writeSheet(s) {
    const count  = parseInt(s.getAttribute('data-count'))
    const radius = parseFloat(s.getAttribute('data-radius'), 10)
    const fill   = s.getAttribute('data-fill')
    const length = parseInt(s.getAttribute('data-length'))

    const sizer = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    sizer.setAttribute('x', 0)
    sizer.setAttribute('y', 0)
    sizer.setAttribute('width', 200)
    sizer.setAttribute('height', 200)
    sizer.setAttribute('fill', 'rgba(0,0,0,0)')
    s.appendChild(sizer)

    for (let i = 0; i < count; i++) {
      const cx = Math.random()*(100-radius)+radius
      const cy = Math.random()*(100-radius)+radius

      const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      star.setAttribute('cx', `${cx}`)
      star.setAttribute('cy', `${cy}`)
      star.setAttribute('r', radius)
      star.setAttribute('fill', fill)
      s.appendChild(star)

      const dup = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      dup.setAttribute('cx', `${cx}`)
      dup.setAttribute('cy', `${100+cy}`)
      dup.setAttribute('r', radius)
      dup.setAttribute('fill', fill)
      s.appendChild(dup)
    }

    s.style.animation = `star-sheet ${length}s linear infinite`
  }
}

const sheets = Array.from(stars.getElementsByClassName('sheet'))
sheets.forEach((s,i,a) => {
  return new StarSheet(s)
})
