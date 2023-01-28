const jwt = require('jsonwebtoken')

import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied' })
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    req.tokenUser = decoded.tokenUser
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).send({ msg: 'token expired' })
    }
    res.status(401).json({ msg: 'Authorizaton denied' })
  }

  return NextResponse.redirect(new URL(request.url))
}

export const config = {
  matcher: ['/user/:path*', '/presets/:path*']
}

// module.exports = function (req, res, next) {
//   const token = req.header('x-auth-token')
//   if (!token) {
//     return res.status(401).json({ msg: 'Authorization denied' })
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.SECRET)
//     req.tokenUser = decoded.tokenUser
//     next()
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).send({ msg: 'token expired' })
//     }
//     res.status(401).json({ msg: 'Authorizaton denied' })
//   }
// }
