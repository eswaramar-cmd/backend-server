const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000
const distPath = path.join(__dirname, 'dashboard', 'dist')

app.use(express.json())
app.use(cors())

// In-memory user storage
const users = []

users.push({
   email: "amar@gmail.com",
   password: "$2b$10$UQw2N6G5NP8jkr.0WEaAuuny7XKMEJErVBF0.vhPkcTChIMhIRqGS"
})

const verifyToken = (req, res, next) => {
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1]

   if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." })
   }

   try {
      req.user = jwt.verify(token, "secretkey")
      next()
   } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" })
   }
}

// ——— API routes (must be before static / SPA) ———

app.get('/verify', verifyToken, (req, res) => {
   res.json({ message: "Token is valid", email: req.user.email })
})

app.post('/register', async (req, res) => {
   try {
      const { email, password, confirmPassword } = req.body

      if (!email || !password) {
         return res.status(400).json({ message: "Email and password are required" })
      }

      if (users.find(u => u.email === email)) {
         return res.status(400).json({ message: "Email already registered" })
      }

      if (password.length < 6) {
         return res.status(400).json({ message: "Password must be at least 6 characters" })
      }

      if (password !== confirmPassword) {
         return res.status(400).json({ message: "Passwords do not match" })
      }

      const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10))
      const newUser = { email, password: hashedPassword }
      users.push(newUser)

      const token = jwt.sign({ email: newUser.email }, "secretkey", { expiresIn: '1d' })

      res.status(201).json({ message: "Registration successful", token })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})

app.post('/login', async (req, res) => {
   try {
      const { email, password } = req.body
      const user = users.find(u => u.email === email)

      if (!user) {
         return res.status(400).json({ message: "Invalid Email" })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
         return res.status(400).json({ message: "Invalid Password" })
      }

      const token = jwt.sign({ email: user.email }, "secretkey", { expiresIn: '1d' })
      res.json({ message: "Login Success", token })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})

// ——— React production build ———

function distExists() {
   return fs.existsSync(path.join(distPath, 'index.html'))
}

if (distExists()) {
   app.use(express.static(distPath))

   // SPA fallback (Express 5 does not support app.get('*', ...))
   app.use((req, res, next) => {
      if (req.method !== 'GET') return next()

      if (path.extname(req.path) && !req.path.endsWith('.html')) {
         return res.status(404).send('Not found')
      }

      res.sendFile(path.join(distPath, 'index.html'), (err) => {
         if (err) next(err)
      })
   })
} else {
   app.use((req, res) => {
      res.status(503).send(
         'Frontend not built. Run: npm run build:app — then restart the server.'
      )
   })
}

app.use((err, req, res, next) => {
   console.error(err)
   res.status(500).json({ message: 'Internal server error' })
})

app.listen(PORT, () => {
   console.log(`Server Running On Port ${PORT}`)
   console.log(`Open http://localhost:${PORT}`)
   if (!distExists()) {
      console.warn('Warning: dashboard/dist missing — run npm run build:app')
   }
})
