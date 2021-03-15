const Discord = require('discord.js');
const client = new Discord.Client();

var cnt;

var J_PlayerCount = 0;
var J_PlayerList = [];
var J_PlayerJobs = [];
var J_PlayerList_Select = "";
var J_MurderTo;
var J_Fortune_To;
var J_FortuneWatcher = 0;
var J_MurderVote = [];
var J_Jobs = ["村人","🔯 占い師","🐺 人狼"];

//▼▼▼▼▼▼▼▼▼▼▼▼▼ プレイ設定 ▼▼▼▼▼▼▼▼▼▼▼▼

//最大プレイ人数
  let J_PLAYER_LIMIT = 3;

//デバッグモード
  let J_Debug = 0;

//待ち時間
  const J_WAIT_TIME = 10000;

//▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲


client.on('message', async message => {
  
  //再帰呼び出し対策： BOTが話した語句には応答しない。
  if(message.author.id == client.user.id) {return}
  
  if(message.content == "人狼参加") {
    message.channel.send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 参加処理中",value: "<@" + message.author.id +"> \n参加依頼を受け付けました。\nただいま処理中です、しばらくお待ち下さい！",inline: false},]}});
    J_ready(message.member.id);
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
    
    J_PlayerList[J_PlayerCount] = JoinUser;
    J_PlayerCount++;
    message.channel.send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 参加完了",value: "<@" + message.author.id +"> \n参加しました。\nあなたは **プレイヤー" + (J_PlayerCount) + "** です。※覚える必要はありません\n" + "\n**●プレイ方法**\nカテゴリ「プレイ中のゲーム」から「ワンナイト人狼」専用チャンネルをご覧ください。必要に応じて専用VCチャンネルもご利用下さい。",inline: false},]}});
    
    if(J_Debug == 1) {
      message.channel.send('参加プレイヤーID: ' + J_PlayerList + '\n[人数カウント: ' + J_PlayerCount + '人 ｜ 開始まであと: ' + (J_PLAYER_LIMIT - J_PlayerCount) + "人 ｜ 許容上限人数: "+ J_PLAYER_LIMIT + "人]");
    }
    
    if(J_PLAYER_LIMIT == J_PlayerCount) {
      message.channel.send(":small_red_triangle_down: " + J_PLAYER_LIMIT + "人集まりました。これよりゲームを開始します！");
      setTimeout(J_PLAY_DAY1_DAYTIME,1000);
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
      client.users.cache.get(J_PlayerList[cnt]).send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： あなたの役職",value: "あなたは **"+ J_Jobs[J_PlayerJobs[cnt]] + "** です。\n確認したら、ゲーム画面に戻ってください。",inline: false},]}});
    }
  
    message.channel.send({embed: {color: 0xFF9800,fields: [{name: ":sun_with_face: 1日目・昼",value: "なんてうつくしい快晴な空なのでしょう！\nさて、プレイヤーの皆様には、個人チャットであなたの職業を送信しました。確認を行った人から、会議を開始して下さい！\n\n⏳ 制限時間は **3分** です。",inline: false},]}});
    setTimeout(J_PLAY_DAY1_NIGHT,J_WAIT_TIME);
    
    return;
  }
  
  function J_PLAY_DAY1_NIGHT() {
    
    for(cnt = 0; cnt < J_PLAYER_LIMIT; cnt++) {
      J_PlayerList_Select += cnt+1 + "： <@" + J_PlayerList[cnt] + ">\n";
    }
    
    client.users.cache.get(J_PlayerList[J_PlayerJobs.indexOf(2)]).send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 人狼",value: "1日目の夜になりました。\n人狼のあなたは、ここで特定の１人だけを殺害することができます。殺害されたユーザーは、次の日の朝からチャットで発言できなくなります。\n\n以下から対象のユーザーを選び、チャットに __番号で__ 送信して下さい。\n\n⏳ 制限時間は **30秒** です。\n\n" + J_PlayerList_Select,inline: false},]}});
    client.users.cache.get(J_PlayerList[J_PlayerJobs.indexOf(1)]).send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 占い師",value: "1日目の夜になりました。\n占い師のあなたは、ここで特定の１人だけ、村人か人狼かをあなただけが知ることができます。\n\n以下から対象のユーザーを選び、チャットに __番号で__ 送信して下さい。\n\n⏳ 制限時間は **30秒** です。\n\n" + J_PlayerList_Select,inline: false},]}});
    message.channel.send({embed: {color: 0x536DFE,fields: [{name: ":crescent_moon: 1日目・夜",value: "すっかり日が暮れて、夜になりました。\n人狼と占い師の方には、個人にてチャットを送信します。他の方は朝になるまで待ちましょう！",inline: false},]}});
    setTimeout(J_PLAY_DAY2_DAYTIME,10000);
    
  }
  
  if(message.content <= J_PLAYER_LIMIT) {
    
      let J_Number = message.content;
      if(message.channel.type == "dm" && message.author == J_PlayerList[J_PlayerJobs.indexOf(1)]) {
        if(J_FortuneWatcher == 0) {
          J_Fortune_To = J_PlayerList[J_Number - 1];
          message.channel.send("<@" + J_PlayerList[J_Number - 1] + "> さんを占った結果、``" + J_Jobs[J_PlayerJobs[J_PlayerList.indexOf(J_Fortune_To)]] + "``でした。");
          J_FortuneWatcher = 1;
        }
        else {
          message.channel.send("⚠ 占える回数は一度のみです。");
        }
      }
      else if(message.channel.type == "dm" && message.author == J_PlayerList[J_PlayerJobs.indexOf(2)]) {
        message.channel.send("<@" + J_PlayerList[J_Number - 1] + "> さんを殺害します。");
        J_MurderTo = J_PlayerList[J_Number - 1];
      }
  }
  
  function J_PLAY_DAY2_DAYTIME() {
    
    if(!J_MurderTo) {
      J_MurderTo = J_PlayerList[Math.floor(Math.random() * J_PLAYER_LIMIT)];
    }
    message.channel.send({embed: {color: 0xFF9800,fields: [{name: ":sun_with_face: 2日目・朝",value: "おはようございます！\nさて、カーテンを開けると、今日は雲がきれいな空だ。\n\n残念なことに、**" + J_Jobs[J_PlayerJobs[J_PlayerList.indexOf(J_MurderTo)]] + "**の <@" + J_MurderTo + "> さんが人狼に殺害されてしまいました。\n殺害された人はチャットで発言できなくなります。それでは昨日の昼同様に、会議を開始して下さい！\n\n⏳ 制限時間は **3分** です。",inline: false},]}});
    setTimeout(J_PLAY_DAY2_NIGHT,10000);
  }
  
  if(message.author == J_MurderTo) {
    message.delete();
  }
  
  function J_PLAY_DAY2_NIGHT() {
    
    let J_Number = "";
    
    message.channel.send({embed: {color: 0x536DFE,fields: [{name: ":crescent_moon: 2日目・夜",value: "すっかり日が暮れて、夜になりました。\n\nこれより、投票で誰を殺害するかを決定します。もっとも票の多かった方は、次の日の朝に殺害されてしまいます。あなたが人狼だと思う人に票を入れてください。なお投票は1回・1人のみですので、お間違えの内容にお願いします。\nそれでは個人チャットにてどうぞ！",inline: false},]}});
    
    for(cnt = 0; cnt < J_PLAYER_LIMIT; cnt++) {
      if(J_MurderTo != J_PlayerList[cnt]) {
        client.users.cache.get(J_PlayerList[cnt]).send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 投票",value: "2日目の夜になりました。\nあなたは、ここで特定の１人だけを投票することができます。最も投票数が多いユーザーは、次の日の朝に殺害されます。\n\n以下から対象のユーザーを選び、チャットに __番号で__ 送信して下さい。\n\n⏳ 制限時間は **30秒** です。\n\n" + J_PlayerList_Select,inline: false},]}});
      }
      else {
        client.users.cache.get(J_PlayerList[cnt]).send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 投票",value: "2日目の夜になりました。\nあなたは既に人狼に殺害されたため、投票を行うことができません。",inline: false},]}});
      }
    }
    setTimeout(J_PLAY_DAY3_DAYTIME,10000);
  }
  
  if(message.content <= J_PLAYER_LIMIT) {
    
      let J_Number = message.content;

      if(message.channel.type == "dm" && message.author == J_PlayerList[J_PlayerJobs.indexOf(2)]) {
        message.channel.send("<@" + J_PlayerList[J_Number - 1] + "> さんを殺害します。");
        J_MurderTo = J_PlayerList[J_Number - 1];
      }
  }
  
  function J_PLAY_DAY3_DAYTIME() {
    message.channel.send({embed: {color: 0xFF9800,fields: [{name: ":sun_with_face: 2日目・朝",value: "おはようございます！\nさて、カーテンを開けると、今日は雲がきれいな空だ。\n\nさて、点呼を取るとなんと**" + J_Jobs[J_PlayerJobs[J_PlayerList.indexOf(J_MurderTo)]] + "**の <@" + J_MurderTo + "> さんが人狼に殺害されてしまいました。\n\n",inline: false},]}});
  }
  
});
client.login(process.env.DISCORD_BOT_TOKEN)
