import jwt from 'jsonwebtoken'

export default async (id) => {
    return jwt.sign({ id: id }, 'my-secret-key')
}