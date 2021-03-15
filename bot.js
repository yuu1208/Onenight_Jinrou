const Discord = require('discord.js');
const client = new Discord.Client();

var J_PlayerCount = 0;
var J_PlayerList = [];
var J_Jobs = ["村人","🔯 占い師","🐺 人狼"];

//▼▼▼▼▼▼▼▼▼▼▼▼▼ プレイ設定 ▼▼▼▼▼▼▼▼▼▼▼▼

//最大プレイ人数
  let J_PLAYER_LIMIT = 4;

//デバッグモード
  let j_debug = 1;

//待ち時間
  const j_wait = 180000;

//▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲


client.on('message', async message => {
  
  //再帰呼び出し対策： BOTが話した語句には応答しない。
  if(message.author.id == client.user.id) {return}
  
  if(message.content == "人狼参加") {
    message.channel.send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 参加処理中",value: "<@" + message.author.id +"> \n参加依頼を受け付けました。\nただいま処理中です、しばらくお待ち下さい！",inline: false},]}});
    J_ready(message.member.user);
  }
  
  function J_ready(JoinUser) {
    
    if(ONENIGHT_LIMIT <= 2 || j_debug >= 2) {
      message.channel.send({embed: {color: 0xff0000,fields: [{name: "⚠ エラーが発生しました",value: "**ワンナイト人狼**を実行する際に問題が発生しました。恐れ入りますが管理人をお呼び下さい。",inline: false},]}});
      return;
    }
    
    if(J_PLAYER_LIMIT == J_PlayerCount) {
      message.channel.send({embed: {color: 0xFDD835,fields: [{name: "🐺 ワンナイト人狼： 進行中の別のゲームがあります",value: "<@" + message.author.id +"> \n現在、他のユーザーがワンナイト人狼をプレイ中です！\n終了するまでしばらくお待ち下さい！",inline: false},]}});
      return;
    }
    
    J_PlayerList[J_PlayerCount] = JoinUser;
    message.channel.send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 参加完了",value: "<@" + message.author.id +"> \n参加しました。\nあなたは **プレイヤー" + (J_PlayerCount + 1) + "** です。※覚える必要はありません\n" + "\n**●プレイ方法**\nカテゴリ「プレイ中のゲーム」から「ワンナイト人狼」専用チャンネルをご覧ください。必要に応じて専用VCチャンネルもご利用下さい。",inline: false},]}});
    
  }
  
  

  
});
client.login(process.env.DISCORD_BOT_TOKEN)
