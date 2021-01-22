const Discord = require('discord.js')
const client = new Discord.Client()

const isset = function(data){ if(data === "" || data === null || data === undefined){ return false; }else{ return true; } }; 
const BOT_PREFIX = (/^おひよ/);


client.on('message', message => {
  
  //再帰呼び出し対策
  //BOTが話した語句には応答しない。
  if(message.author.id == client.user.id) {
    return;
  }
  
  //ご挨拶
  if(message.mentions.users.has(client.user.id)) {
    message.channel.send("私は知的なエージェントとして、ゆうにより開発されました。”おひよ”と申します！\n何か話したい場合は、「おひよ、眠い」などと話しかけて下さい！");
    return;
  }
  
  if(message.content == "おひよ") {
    const MSG_greeting = ["どうしたの？","ん、どした？？","呼んだ〜？","はーい！"];
    message.channel.send(MSG_greeting[Math.floor(Math.random() * MSG_greeting.length) + 0]);
    return;
  }
  
  //動作
  if(message.content.match(BOT_PREFIX) && message.content.match(/起き|おはよ/)) {
    message.channel.send("おはよ〜" + message.member.displayName + "！");
    let 
    return;
  }
  if(message.content.match(BOT_PREFIX) && message.content.match(/眠|ねむ(く|い)/)) {
    const MSG_SLEEPY = ['眠いときにねるのが一番だけど、やることは終わった？','寝ちゃう？','そっかおやすみ〜((','もう寝ちゃうんですか...?'];
    message.channel.send(MSG_SLEEPY[Math.floor(Math.random() * MSG_SLEEPY.length) + 0]);
    return;
  }
  
  if(message.content.match(BOT_PREFIX) && isset(message.content)) {
    message.channel.send("ごめん、私にはわからない、、");
  }
  
})

client.login(process.env.DISCORD_BOT_TOKEN)
