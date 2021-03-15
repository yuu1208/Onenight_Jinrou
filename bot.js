const Discord = require('discord.js');
const client = new Discord.Client();


//▼▼▼▼▼▼▼▼▼▼▼▼▼ プレイ設定 ▼▼▼▼▼▼▼▼▼▼▼▼

//最大プレイ人数
  let ONENIGHT_LIMIT = 4;

//デバッグモード
  let j_debug = 0;

//待ち時間
  const j_wait = 180000;

//▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲


client.on('message', async message => {
  
  //再帰呼び出し対策： BOTが話した語句には応答しない。
  if(message.author.id == client.user.id) {return}
  
  var j_job = ["村人","🔯 占い師","🐺 人狼"];
  var j_players_job = [];
  var j_limit_zero = ""; //0人参加必要のメッセージ回避
  
  if (message.content == "人狼参加") {
    message.channel.send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 参加処理中",value: "<@" + message.author.id +"> \n参加依頼を受け付けました。\nただいま処理中です、しばらくお待ち下さい！",inline: false},]}});
    J_ready(message.member.user);
  }
  
  function J_ready() {
    var j_limit = (ONENIGHT_LIMIT - 1) - j_cnt;
    
    if(ONENIGHT_LIMIT <= 2 || j_debug >= 2) {
      message.channel.send({embed: {color: 0xff0000,fields: [{name: "⚠ エラーが発生しました",value: "**ワンナイト人狼**を実行する際に問題が発生しました。恐れ入りますが管理人をお呼び下さい。",inline: false},]}});
      return;
    }
  }
  
  

  
});
client.login(process.env.DISCORD_BOT_TOKEN)
