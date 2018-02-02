const stars = document.getElementById('stars')

const space = stars.getElementById('space')
space.setAttribute('width', window.innerWidth)
space.setAttribute('height', window.innerHeight)

const mayteWhite = a => `rgba(243,243,243,${!a ? a === 0 ? 0 : 1 : a})`
const starRadius = 5

class StarSheet {
  constructor(canvas) {
    this.canvas = canvas
    this.writeSheet(this.canvas)
  }

  writeSheet(s) {
    const count  = parseInt(s.getAttribute('data-count'))
    const radius = parseInt(s.getAttribute('data-radius'))
    const fill   = s.getAttribute('data-fill')
    const length = parseInt(s.getAttribute('data-length'))

    const sizer = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    sizer.setAttribute('x', 0)
    sizer.setAttribute('y', 0)
    sizer.setAttribute('width', window.innerWidth)
    sizer.setAttribute('height', window.innerHeight * 2)
    sizer.setAttribute('fill', 'rgba(0,0,0,0)')
    s.appendChild(sizer)

    for (let i = 0; i < count; i++) {
      const cx = Math.random()*(window.innerWidth-radius)+radius
      const cy = Math.random()*(window.innerHeight-radius)+radius

      const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      star.setAttribute('cx', cx)
      star.setAttribute('cy', cy)
      star.setAttribute('r', radius)
      star.setAttribute('fill', fill)
      s.appendChild(star)

      const dup = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      dup.setAttribute('cx', cx)
      dup.setAttribute('cy', window.innerHeight+cy)
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
