const Discord = require('discord.js');
const client = new Discord.Client();

var cnt;

var J_PlayerCount = 0;
var J_PlayerList = [];
var J_PlayerJobs = [];
var J_Jobs = ["村人","🔯 占い師","🐺 人狼"];

//▼▼▼▼▼▼▼▼▼▼▼▼▼ プレイ設定 ▼▼▼▼▼▼▼▼▼▼▼▼

//最大プレイ人数
  let J_PLAYER_LIMIT = 4;

//デバッグモード
  let J_Debug = 1;

//待ち時間
  const j_wait = 180000;

//▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲


client.on('message', async message => {
  
  //再帰呼び出し対策： BOTが話した語句には応答しない。
  if(message.author.id == client.user.id) {return}
  
  if(message.content == "人狼参加") {
    message.channel.send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 参加処理中",value: "<@" + message.author.id +"> \n参加依頼を受け付けました。\nただいま処理中です、しばらくお待ち下さい！",inline: false},]}});
    J_ready(message.author);
  }
  
  //開始準備
  function J_ready(JoinUser) {
    
    if(J_PLAYER_LIMIT <= 2 || J_Debug >= 2) {
      message.channel.send({embed: {color: 0xff0000,fields: [{name: "⚠ エラーが発生しました",value: "**ワンナイト人狼**を実行する際に問題が発生しました。恐れ入りますが管理人をお呼び下さい。",inline: false},]}});
      return;
    }
    
    if(J_PLAYER_LIMIT == J_PlayerCount) {
      message.channel.send({embed: {color: 0xFDD835,fields: [{name: "🐺 ワンナイト人狼： 進行中の別のゲームがあります",value: "<@" + message.author.id +"> \n現在、他のユーザーがワンナイト人狼をプレイ中です！\n終了するまでしばらくお待ち下さい！",inline: false},]}});
      return;
    }
    
    J_PlayerCount++;
    J_PlayerList[J_PlayerCount] = JoinUser;
    message.channel.send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 参加完了",value: "<@" + message.author.id +"> \n参加しました。\nあなたは **プレイヤー" + (J_PlayerCount) + "** です。※覚える必要はありません\n" + "\n**●プレイ方法**\nカテゴリ「プレイ中のゲーム」から「ワンナイト人狼」専用チャンネルをご覧ください。必要に応じて専用VCチャンネルもご利用下さい。",inline: false},]}});
    
    if(J_Debug == 1) {
      message.channel.send('参加プレイヤーID: ' + J_PlayerList + '\n[人数カウント: ' + J_PlayerCount + '人 ｜ 開始まであと: ' + (J_PLAYER_LIMIT - J_PlayerCount) + "人 ｜ 許容上限人数: "+ J_PLAYER_LIMIT + "人]");
    }
    
    if(J_PLAYER_LIMIT == J_PlayerCount) {
      message.channel.send(":small_red_triangle_down: " + J_PLAYER_LIMIT + "人集まりました。これよりゲームを開始します！");
      setTimeout(J_PLAY_DAY1_DAYTIME(),5000);
    }
  }
  
  function J_PLAY_DAY1_DAYTIME() {
    
    //役職配布
    for(cnt = 0; cnt < J_PLAYER_LIMIT; cnt++) {
      J_PlayerJobs[cnt] = 0;
    }
    
    //占い師選抜
    J_PlayerJobs[Math.floor(Math.random() * J_PLAYER_LIMIT)] = 1;
    
    //人狼選抜
    //占い師と同じIDにならなくなるまで選抜を繰り返す
    let J_JinrohRand = Math.floor(Math.random() * J_PLAYER_LIMIT);
    while(J_PlayerJobs.indexOf(1) == J_JinrohRand) {
      J_JinrohRand = Math.floor(Math.random() * J_PLAYER_LIMIT);
    }
    J_PlayerJobs[J_JinrohRand] = 2;
    
    if(J_Debug == 1) {
      message.channel.send("職業カードID: " + J_PlayerJobs);
    }
    
    //プレイヤー全員に割り振られた役職をDMで伝える
    for(cnt = 0; cnt < J_PLAYER_LIMIT; cnt++) {
      client.users.fetch(J_PlayerList[cnt]).send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： あなたの役職",value: "あなたは **" + J_Jobs[J_PlayerJobs[cnt]] + "** です。\n確認したら、ゲーム画面に戻ってください。",inline: false},]}});
    }
    
    
    
    message.channel.send({embed: {color: 0xFF9800,fields: [{name: ":sun_with_face: 1日目・昼",value: "なんてうつくしい快晴な空なのでしょう！\nさて、プレイヤーの皆様には、個人チャットであなたの職業を送信しました。確認を行った人から、会議を開始して下さい！\n\n⏳ 制限時間は **3分** です。",inline: false},]}});
    
  }
  

  
});
client.login(process.env.DISCORD_BOT_TOKEN)
