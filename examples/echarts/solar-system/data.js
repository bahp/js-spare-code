console.log("FEO")

// https://github.com/rikirolly/orbit/blob/main/solar_orbit_3d_plt.py

function generateTrajectory(x, y, z, xv, yv, zv, gravconst, M, xr=0, yr=0, zr=0) {
    /**
     *
     */

    var t           = 0.0
    var dt          = 1*daysec

    list = []

    while (t < 5*365*daysec*50) {

        // Compute G force.
        rx = x - xr
        ry = y - yr
        rz = z - zr

        modr3_e = (rx ** 2 + ry ** 2 + rz ** 2) ** 1.5
        fx = -gravconst * rx / modr3_e
        fy = -gravconst * ry / modr3_e
        fz = -gravconst * rz / modr3_e

        // Update quantities how is this calculated?  F = ma -> a = F/m
        xv += fx * dt / M
        yv += fy * dt / M
        zv += fz * dt / M

        // Update position
        x += xv * dt
        y += yv * dt
        z += zv * dt

        // save the position in list
        list.push([x, y, z])

        t += dt
    }

    return list
}



var G           = 6.67e-11
var Mb          = 4.0e30                    // black hole
var Ms          = 2.0e30                    // sun
var Me          = 5.972e24                  // earth
var Mm          = 6.39e23                   // mars
var Mc          = 6.39e20                   // unknown comet
var AU          = 1.5e11
var daysec      = 24.0*60*60

var e_ap_v      = 29290                     // earth velocity at aphelion
var m_ap_v      = 21970                     // mars velocity at aphelion
var commet_v    = 7000

var gravconst_e = G*Me*Ms
var gravconst_m = G*Mm*Ms
var gravconst_c = G*Mc*Ms

console.log(gravconst_e)
console.log(gravconst_m)

var earth_trj = generateTrajectory( 1.0167*AU,0,0,
    0, e_ap_v,0, gravconst_e, Me)
var mars_trj = generateTrajectory(1.666*AU,0,0,
    0,m_ap_v,0, gravconst_m, Mm)
console.log(earth_trj)

var data = {}
for (let i = 0; i < planets.length-4; i++) {
    var d = planets[i]
    var x = d['Aphelion (10^6 km)'] * 1e6 * 1e3 // why missing 1e3
    var m = d["Mass (10^24kg)"] * 1e24
    var dist = d['Distance from Sun (10^6 km)'] * 1e6
    var ap_v = d["Orbital Velocity (km/s)"] * 1000
    //var ap_v = Math.sqrt((G * Ms) / dist)
    var grav = G * m * Ms
    console.log(d.Planet, x, m, ap_v, grav)
    console.log("Test", 1.0167*AU, Me, e_ap_v, gravconst_e)
    console.log("Test", 1.666*AU, Mm, m_ap_v, gravconst_m)
    var aux = generateTrajectory(x, 0, 0, 0, ap_v, 0, grav, m)
    data[d.Planet] = aux
}

console.log(data)

function getTrajectoryPolar(rmax, rmin, t) {

}