const checkCredentials = (req, res, next) => {
  const { username, password } = req.body
  if (!username.trim() || username.length > 50) {
    return next(new Error('username is required (max 50 char)'))
  }
  if (!password.trim() || password.length > 20 || password.length < 5) {
    return next(new Error('password is required (5-20 characters)'))
  }

  next()
}

module.exports = checkCredentials
