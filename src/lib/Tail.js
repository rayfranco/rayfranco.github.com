export default function (canvas) {
  var ctx = canvas.getContext('2d')
  var input = [window.innerWidth / 2, window.innerWidth / 2]
  var i = 0 // iterator

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const SIZE = 30
  const MAX_POINTS = 30
  const REFRESH = 2
  const ANIMATE = true
  const DEBUG = false

  var points = [input[0], input[1]]

  function drawSkeleton () {
    points.forEach((current, i) => {
      let prev = points[i - 1]
      ctx.fillRect(current[0] - 2, current[1] - 2, 4, 4)
      ctx.beginPath()
      ctx.arc(current[0], current[1], getRadius(i), 0, Math.PI * 2)
      ctx.stroke()
      ctx.closePath()
      if (prev) {
        ctx.moveTo(prev[0], prev[1])
        ctx.lineTo(current[0], current[1])
        ctx.stroke()
      }
    })
  }

  // Pass current point (a) and next point (b)
  function getVector (a, b) {
    let dx = b[0] - a[0]
    let dy = b[1] - a[1]
    let len = Math.hypot(dx, dy)
    if (len === 0) {
      return [0, 0]
    }
    let x = dx / len
    let y = dy / len
    return [x, y]
  }

  function getRadius (i) {
    const MAX_I = points.length - 1
    return SIZE * (MAX_I - i) / MAX_I
  }

  function drawSlice () {
    var p = computePoints()
    p.forEach((c, i) => {
      if (i === 0) {
        ctx.moveTo(c[0], c[1])
      } else {
        bezierForIndex(i, p)
      }
    })
    if (DEBUG) ctx.stroke()
    else ctx.fill()
  }

  function drawCursor () {
    ctx.beginPath()
    ctx.arc(points[0][0], points[0][1], SIZE, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }

  function drawMask () {
    ctx.fillStyle = 'rgb(26, 26, 26)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  function computePoints () {
    let up = []
    let down = []
    let pa = 0// save previous angle

    points.forEach((p, i) => {
      const RADIUS = getRadius(i)
      let n = points[i + 1] || p // next point (or current if none / last)
      let v = getVector(p, n) // vector to next point
      let na = Math.atan2(v[1], v[0]) - Math.PI / 2 // perpendicular angle
      let ca = (na + pa) / 2 // compute avg angle
      if (Math.abs(na - pa) > Math.PI) {
        ca += Math.PI
      }
      ca %= Math.PI * 2

      up.push([p[0] + Math.cos(ca) * RADIUS, p[1] + Math.sin(ca) * RADIUS])
      down.unshift([p[0] + Math.cos(ca) * -RADIUS, p[1] + Math.sin(ca) * -RADIUS])

      pa = na // store angle
    })
    return up.concat(down)
  }

  function bezierForIndex (i, points) {
    const curr = points[i]
    const next = points[i + 1] || curr
    const mid = [(curr[0] + next[0]) / 2, (curr[1] + next[1]) / 2]
    ctx.quadraticCurveTo(curr[0], curr[1], mid[0], mid[1]) // use midpoint as dest and current point as control point
  }

  function animate () {
    canvas.width = canvas.width

    if (ANIMATE) window.requestAnimationFrame(animate)
    if (ANIMATE && (points[0][0] !== input[0] || points[0][1] !== input[1])) {
      points.unshift([input[0], input[1]])
    }
    if (points.length > MAX_POINTS || (ANIMATE && i % REFRESH === 0 && points.length > 2)) {
      points.pop()
    }
    drawMask()
    ctx.globalCompositeOperation = 'destination-out'
    drawSlice()
    drawCursor()
    if (DEBUG) drawSkeleton()
    i++
  }

  window.addEventListener('mousemove', ({ clientX, clientY }) => {
    input = [clientX, clientY]
  })

  window.requestAnimationFrame(animate)
}
