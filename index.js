// Response for Uptime Robot
const http = require('http')
http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Discord bot is active now \n')
  })
  .listen(3000)

// Discord bot implements
const discord = require('discord.js')
const client = new discord.Client()

client.on('ready', message => {
  console.log(`${client.user.tag}にログインしました！`);
})

client.on('message', message => {
  if (message.mentions.users.has(client.user.id)) {
    message.reply('呼びましたか？')
    return
  }
})

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log('tokenが設定されていません！')
  process.exit(0)
}

client.login(process.env.DISCORD_BOT_TOKEN)
