var canvas, ctx, t, center, radius, settings, force, background, particles, initialized

class Point {
  constructor (x, y, z) {
    // Origin pos
    this.x = x
    this.y = y
    this.z = z

    // Resulted pos
    this.rx = x
    this.ry = y
    this.rz = z

    // Normalized absolute pos
    this.nx = 0.5 + this.x * 0.5
    this.ny = 0.5 + this.y * 0.5
    this.nz = 0.5 + this.z * 0.5

    // Resulted color
    this.h = this.nx * 360
    this.s = 50 + this.ny * 25
    this.l = 50 + this.nz * 25
  }
}

var PI2 = Math.PI * 2

function getDistance (p0, p1) {
  var dx = p1.x - p0.x
  var dy = p1.y - p0.y
  var dz = p1.z - p0.z
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

function createParticles () {
  for (var i = 1; i < settings.nLat; i++) {
    const posY = Math.cos(settings.aLat * i)
    const r = Math.cos(Math.PI * 0.5 + settings.aLat * i)
    for (var j = 0; j < settings.nLong; j++) {
      const angle = settings.aLong * j
      const point = new Point(
        r * Math.cos(angle),
        posY,
        r * Math.sin(angle)
      )
      particles.push(point)
    }
  }
}

function updateForce () {
  force.x += (Math.cos(t) - force.x) * 0.1
  force.y += (Math.sin(t) - force.y) * 0.1
  force.z += (Math.cos(t) - force.z) * 0.1
}

function drawParticles () {
  const n = particles.length
  var i, p, dist, f
  ctx.save()
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.translate(center.x, center.y)

  ctx.beginPath()
  for (i = 0; i < n; i++) {
    p = particles[i]

    // Draw link
    ctx.moveTo(radius * p.x, radius * p.y)
    ctx.lineTo(radius * p.rx, radius * p.ry)

    // Apply force
    dist = getDistance(p, force)
    f = (settings.forceAmp * Math.max(settings.forceRadius - dist, 0)) + 1
    p.rx = p.x * f
    p.ry = p.y * f
    p.rz = p.z * f
  }
  ctx.closePath()
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'
  ctx.stroke()

  for (i = 0; i < n - 1; i++) {
    p = particles[i]

    // Draw resulted point
    ctx.beginPath()
    ctx.fillStyle = 'hsla(' + p.h + ',' + p.s + '%,' + p.l + '%,0.8)'
    ctx.fillRect(radius * p.rx - 1, radius * p.ry - 1, 1, 1)
    ctx.closePath()
  }
  ctx.restore()
}

function createBackground () {
  background = background || document.createElement('canvas')
  background.width = background.height = radius * 2

  var ctx = background.getContext('2d')
  var i, y, a
  // Draw latitudes
  for (i = 0; i < settings.nLat + 1; i++) {
    a = settings.aLong * i
    // x = radius
    y = Math.cos(a) * radius + radius

    // Draw debug lines
    if (settings.debug) {
      var r = Math.sin(a) * radius
      ctx.save()
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.moveTo(radius - r, y)
      ctx.lineTo(radius + r, y)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
    }
  }

  // Draw longitudes
  for (i = 0; i < settings.nLong; i++) {
    a = settings.aLat * i
    // x = Math.cos(a) * radius + radius
    y = radius

    ctx.save()
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'
    ctx.translate(radius, radius)
    ctx.scale(Math.sin(a), 1)
    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, PI2, false)
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
  }
}

function drawBackground () {
  ctx.save()
  ctx.translate(center.x - radius, center.y - radius)
  ctx.drawImage(background, 0, 0)
  ctx.restore()
}

function resize () {
  // Setup size
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  center = {
    x: canvas.width * 0.5,
    y: canvas.height * 0.5
  }
  radius = Math.min(center.x, center.y) * 0.5 // 50%

  particles = []

  createBackground()
  createParticles()
}

function init (el) {
  if (initialized) {
    return
  } else {
    initialized = true
  }
  canvas = el || document.createElement('canvas')
  ctx = canvas.getContext('2d')
  force = new Point(0, 0, 0)
  t = 0

  // Settings
  settings = {
    debug: true,
    nLong: 35,
    nLat: 30,
    forceAmp: 0.2,
    forceRadius: 2,
    moveSpeed: 0.04
  }

  // Computed settings
  settings.aLong = Math.PI / settings.nLong
  settings.aLat = Math.PI / settings.nLat
  console.log('initialized')
  resize()
  draw()
}

function draw () {
  window.requestAnimationFrame(draw)
  render()
}

function render () {
  t += settings.moveSpeed

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawBackground()
  updateForce()
  drawParticles()
}

export {canvas, ctx, init, settings, resize}
