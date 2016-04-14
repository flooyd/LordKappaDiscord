var discord = require('discord.js')
// var logins = require('logins.js')
var express = require('express')
var app = express()
var PORT = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('Ability to add new bot commands through browser coming soon :D')
})

app.listen(PORT, function () {
  console.log('Express listening on port ' + PORT)
})

var bot = new discord.Client()
var basedThing = false

bot.on('message', function (message) {
  if (message.content.includes('Kappa')) {
    bot.sendMessage('167794933720285184', 'Yes?' , {tts: true})
  } else if (message.content === 'How are you doing bot?') {
    message = "I'm doing fine. Thank you for asking peasant."
    bot.sendMessage('167794933720285184', message , {tts: true})
  }
  else if (message.content === '!uptime') {
    message = 'I have been trolling this chat for ' + bot.uptime / 1000 + ' seconds.'
    bot.sendMessage('167794933720285184', message , {tts: true})
  } else if (message.content === 'test') {
    bot.sendMessage('167794933720285184', 'Hello', {tts: true})
  } else if (message.content === '!themostbasedthing') {
    message = 'The most based thing has been enabled.'
    bot.sendMessage('167794933720285184', message , {tts: true})
    basedThing = true
  } else if (message.content === '!lol') {
    message = 'lololololololololololololololol'
    bot.sendMessage('167794933720285184', message , {tts: true})
  } else if (message.content.includes('!armory')) {
    var armory = getArmory(message.content)
    var armoryMessage = 'Here is the armory for ' + armory.character + ' on ' + armory.server + ':   ' + armory.url
    bot.reply(message, armoryMessage)
  }
})

bot.on('messageUpdated', function (newMessage, oldMessage) {
  console.log(oldMessage)
})

bot.on('userTypingStarted', function (user, channel) {
  var message
  if (basedThing === true) {
    if (user.username === 'Grey Face (no space)') {
      message = 'Get ready son. The most based god is typing a message!'
    } else message = 'What are you typing ' + user.username + '?'
    setTimeout(function () {
      bot.sendMessage('167794933720285184', message , {tts: true})
    }, 400)

    basedThing = false
  }
})

bot.on('voiceJoin', function (voice, user) {
  var message = user.username + ' has joined voice chat. ' + ' Hello ' + user.username + '.'

  setTimeout(function () {
    bot.sendMessage('167794933720285184', message , {tts: true})
  }, 1500); // this set timeout doesn't work. idk why
})

function getArmory (message) {
  message = message.split('/')

  var server = message[1]
  var character = message[2]

  var url = 'http://us.battle.net/wow/en/character/' + server + '/' + character + '/advanced'

  return {
    server: server,
    character: character,
    url: url
  }
}

bot.login(process.env['lord_kappa_email'], process.env['lord_kappa_pw'])
