'use strict'

const restify = require('restify')
const restifyBodyParser = require('restify-plugins').bodyParser
const restifyQueryParser = require('restify-plugins').queryParser
const nodemailer = require('nodemailer')
const parameters = require('./parameters')
const server = restify.createServer()

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    return next()
  }
)

server.use(restifyBodyParser({mapParams: false}))
server.use(restifyQueryParser({mapParams: false}))

const transporter = nodemailer.createTransport({
  service: parameters.mail.service,
  auth: {
    user: parameters.mail.auth.user,
    pass: parameters.mail.auth.password
  }
})

server.post('/api/v1/send-mail', (req, res, next) => {
  const data = req.body || {}
  if (typeof data.to === 'undefined' || typeof data.subject === 'undefined' || typeof data.content === 'undefined') {
    return res.json(400, {error: 'Parameters to, subject and content are required'})
  }

  transporter.sendMail({
    from: parameters.mail.auth.user,
    to: data.to,
    subject: data.subject,
    html: data.content
  }, (err, info) => {
    if (err) {
      return res.json(500, {
        error: err.message
      })
    }

    return res.json(200, info)
  })
})

server.listen(parameters.app.port, () => {
  console.log('%s listening at %s', server.name, server.url);
})
