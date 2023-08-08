import express from 'express'
import http from 'http'
import connectDB from './configs/db.config.js'
import errorHandler from './middlewares/errorHandler.js'
import userRouter from './routes/User.route.js'
import AuthRouter from './routes/Auth.route.js'
import cors from 'cors'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'

config()

const app = express()
app.use(cookieParser())
app.use(cors({
    origin: `*`,
    credentials: true
}))
const server = http.createServer(app)
const PORT = process.env.PORT || 4000
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/st888'

app.use(express.json())
connectDB(mongoURI)
    .then(() => {
        console.log('connected to db')
    }).then(() => {
        server.listen(PORT, () => {
            try {

                console.log(`listening on port ${PORT}`)
            } catch (error) {
                console.log('error starting server', err.message);
            }
        })
    }).catch((err) => console.log('error connecting to database', err.message))


const rootRoute = '/api/v1'
app.use(`${rootRoute}/users`, userRouter)
app.use(`${rootRoute}/auth`, AuthRouter)

app.all('*', (req, res) => {
    res.status(400).json({ message: 'resource not found', status: false })
})
app.use(() => errorHandler())
