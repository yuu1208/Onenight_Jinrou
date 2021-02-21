const Discord = require('discord.js')
const client = new Discord.Client()
const ytdl = require('ytdl-core');
const fs = require('fs');

client.on('message', m => {
  
  //再帰呼び出し対策： BOTが話した語句には応答しない。
  if(m.author.id == client.user.id) {return}

})

client.login(process.env.DISCORD_BOT_TOKEN)
