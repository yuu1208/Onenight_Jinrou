const Discord = require('discord.js')
const client = new Discord.Client()

const BOT_PREFIX = (/^おひよ/);
const mension_message = ["どうしたの？","ん、どした？？","呼んだ〜？","はーい！"];

client.on('message', message => {
  
  //再帰呼び出し対策
  //BOTが話した語句には応答しない。
  if(message.author.id == client.user.id) {
    return;
  }
  
  //ご挨拶
  if(message.mentions.users.has(client.user.id) || message.content.match(BOT_PREFIX)) {
    message.channel.send(mension_message[Math.floor(Math.random() * mension_message.length) + 0]);
  }
  
  //動作
  if(message.content.match(BOT_PREFIX) && message.content.match(_|おはよ/)) {
    
  }
  
})

client.login(process.env.DISCORD_BOT_TOKEN)
