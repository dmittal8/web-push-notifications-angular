const express = require('express')
const webpush = require('web-push')
const cors = require('cors')
const bodyParser = require('body-parser')

const PUBLIC_VAPID =
  'BOE-XacVFcrxu2VYblJmt5Lch7Lr6xyqbsCp67xGTc8yvnrEXBQ3NamvcyK8aa12csJJiw9ivW8J1szZ5mPgx4I'
const PRIVATE_VAPID = 'rfZvmnH4HMJr2TxS3O8X3Mfdw0b5NhSnEvj566IweL4'


let fakeDatabase = []

const app = express()
app.use(cors())
app.use(bodyParser.json())

webpush.setVapidDetails('mailto:http://127.0.0.1:8081/', PUBLIC_VAPID, PRIVATE_VAPID)

app.post('/subscription', (req, res) => {
  fakeDatabase = [];
  const subscription = req.body
  fakeDatabase.push(subscription)
})

app.post('/sendNotification', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification',
      icon: 'assets/icons/icon-512x512.png',
      actions: [{
        action : 'close',
        title : 'Close'
   }]
    },
  }

  const promises = [];
  console.log('fakeDatabase>>>>>>>>>>>>>>>>>>>', fakeDatabase);
  fakeDatabase.forEach(subscription => {
    promises.push(
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload)
      )
    )
  })
  Promise.all(promises).then(() => res.sendStatus(200)).catch(error=> console.error(error));
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})