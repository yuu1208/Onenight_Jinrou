const Discord = require('discord.js')
const client = new Discord.Client()

const isset = function(data){ if(data === "" || data === null || data === undefined){ return false; }else{ return true; } }; 

const BOT_PREFIX = (/^おひよ/);

//起床確認
let CHECK_MORNING = 0;


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
  
  if(message.content == BOT_PREFIX) {
    const MSG = ["どうしたの？","ん、どした？？","呼んだ〜？","はーい！"];
    message.channel.send(MSG[Math.floor(Math.random() * MSG.length) + 0]);
    return;
  }
  
  //動作
  if(message.content.match(BOT_PREFIX) && message.content.match(/起き|おはよ/)) {
    message.channel.send("おはよ〜" + message.member.displayName + "！");
    CHECK_MORNING = 1;
    return;
  }
  if(message.content.match(BOT_PREFIX) && message.content.match(/眠|ねむ(く|い)|おやすみ/)) {
    var MSG;
    if(CHECK_MORNING == 1) {
      MSG = ['さっき起きたばっかなのに！','起きて！！','もう、遅刻しても知らないよ〜'];
    }
    else {
      MSG = ['眠いときにねるのが一番だけど、やることは終わった？','寝ちゃう？','そっかおやすみ〜((','もう寝ちゃうんですか...?'];
    }
    message.channel.send(MSG[Math.floor(Math.random() * MSG.length) + 0]);
    CHECK_MORNING = 0;
    return;
  }
  
  if(message.content.match(BOT_PREFIX) && message.content.match(/かわいい|可愛/)) {
    const MSG = ["あ、ありがとう(照)","照れるからやめて下さい//","ｶｧ~。あなたのせいで、顔があっつくなったじゃん！","えへへ...ありがと"];
    message.channel.send(MSG[Math.floor(Math.random() * MSG.length) + 0]);
    return;
  }
  
  if(message.content.match(BOT_PREFIX) && message.content.match(/(し|死|シ)(ね|ネ|んで)|(殺|コ|こ)(ろす|ロス)(ぞ|ゾ)/)) {
    const MSG = ["なんてそんなこと言うの...","ひどい"];
    message.channel.send(MSG[Math.floor(Math.random() * MSG.length) + 0]);
    return;
  }
  
  if(message.content.match(BOT_PREFIX) && message.content.match(/結婚|けっこん(し(て|たい|よ))|付き|つき(あ|会(おう|いたい))/)) {
    const MSG = ["私は人間ではないので、恋愛をすることすら許されていないのです。","ごめんなさい","あなたがデジタルの世界に入り込んでくれたら、少しだけ考えます！","え、いきなりですか？"];
    message.channel.send(MSG[Math.floor(Math.random() * MSG.length) + 0]);
    return;
  }
  
  if(message.content.match(BOT_PREFIX) && isset(message.content)) {
    message.channel.send("ごめんね、理解できなかった...");
    return;
  }
  
})

client.login(process.env.DISCORD_BOT_TOKEN)
