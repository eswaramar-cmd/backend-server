const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())
app.use(cors())

// Serve static files from public folder
app.use(express.static('public'))

// In-memory user storage (simulates a database)
const users = []

// Pre-add a default user for testing
users.push({
   email: "amar@gmail.com",
   password: "$2b$10$UQw2N6G5NP8jkr.0WEaAuuny7XKMEJErVBF0.vhPkcTChIMhIRqGS"
})

// Home Route - redirect to login page
app.get('/', (req,res)=>{
   res.sendFile(__dirname + '/public/index.html')
})

// Dashboard Route - serve dashboard page
app.get('/dashboard', (req,res)=>{
   res.sendFile(__dirname + '/public/dashboard.html')
})

// Register Route - serve registration page
app.get('/register', (req,res)=>{
   res.sendFile(__dirname + '/public/register.html')
})

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
   // Get token from Authorization header
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

   if (!token) {
      return res.status(401).json({
         message: "Access denied. No token provided."
      })
   }

   try {
      // Verify token
      const verified = jwt.verify(token, "secretkey")
      req.user = verified
      next()
   } catch (err) {
      res.status(400).json({
         message: "Invalid token"
      })
   }
}

// Verify Token Route - returns user info if token is valid
app.get('/verify', verifyToken, (req, res) => {
   res.json({
      message: "Token is valid",
      email: req.user.email
   })
})

// Register Route
app.post('/register', async (req,res)=>{

   try{

      const {email,password,confirmPassword} = req.body

      // Validation
      if(!email || !password){
         return res.status(400).json({
            message:"Email and password are required"
         })
      }

      // Check if email already exists
      const existingUser = users.find(u => u.email === email)
      if(existingUser){
         return res.status(400).json({
            message:"Email already registered"
         })
      }

      // Check password length
      if(password.length < 6){
         return res.status(400).json({
            message:"Password must be at least 6 characters"
         })
      }

      // Check passwords match
      if(password !== confirmPassword){
         return res.status(400).json({
            message:"Passwords do not match"
         })
      }

      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Save user
      const newUser = {
         email: email,
         password: hashedPassword
      }

      users.push(newUser)

      // Create JWT token
      const token = jwt.sign(
         {email:newUser.email},
         "secretkey",
         {expiresIn:'1d'}
      )

      res.status(201).json({
         message:"Registration successful",
         token
      })

   } catch(err){

      res.status(500).json({
         message: err.message
      })

   }

})

// Login Route
app.post('/login', async (req,res)=>{

   try{

      const {email,password} = req.body

      // Find user by email
      const user = users.find(u => u.email === email)

      if(!user){
         return res.status(400).json({
            message:"Invalid Email"
         })
      }

      // Compare password
      const isMatch = await bcrypt.compare(
         password,
         user.password
      )

      if(!isMatch){
         return res.status(400).json({
            message:"Invalid Password"
         })
      }

      // Create JWT token
      const token = jwt.sign(
         {email:user.email},
         "secretkey",
         {expiresIn:'1d'}
      )

      res.json({
         message:"Login Success",
         token
      })

   } catch(err){

      res.status(500).json({
         message: err.message
      })

   }

})

app.listen(3000,()=>{
   console.log("Server Running On Port 3000")
})