const bcryptjs = require('bcryptjs')
const User = require('../models/user')

exports.getLogin = (req, res, nex) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    editing: false,
    isAuthenticated: false,
    error: req.flash('error')[0]
  })
}

exports.getSignup = (req, res, nex) => {
  res.render('auth/signup', {
    pageTitle: 'Signup',
    path: '/signup',
    isAuthenticated: false,
    error: req.flash('errorEmail')[0]
  })
}

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid email or password !')
        return res.redirect('/login')
      }
      bcryptjs.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true
          req.session.user = user
          return req.session.save(() => res.redirect('/'))
        }
        req.flash('error', 'Invalid email or password !')
        return res.redirect('/login')
      })
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/login')
    })
}

exports.postLogout = (req, res, nex) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

exports.postSignup = (req, res, nex) => {
  const { name, email, password } = req.body
  User.findOne({ email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          'errorEmail',
          'Email exists already, please pick a different one.'
        )
        return res.redirect('/signup')
      }
      return bcryptjs
        .hash(password, 12)
        .then((password) => {
          const user = new User({
            name,
            email,
            password,
            cart: {
              items: []
            }
          })
          return user.save()
        })
        .then((result) => {
          return res.redirect('/login')
        })
    })
    .catch((err) => console.log(err))
}
