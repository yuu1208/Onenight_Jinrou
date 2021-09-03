const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log("[INFO] " + `${client.user.tag} にログインしました`);
});


//▼▼▼▼▼▼▼▼▼▼▼▼▼ プレイ設定 ▼▼▼▼▼▼▼▼▼▼▼▼

//最大プレイ人数
  let J_PLAYER_LIMIT = 3;

//デバッグモード
  let J_Debug = 1;

//話し合いの待ち時間 DEFAULT・180000
  const J_WAIT_TIME = 10000;

//投票・占いの待ち時間 DEFAULT・60000
  const J_ToWaitTime = 10000;

//▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

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
var J_STATUS = 0;
var J_Message;
var J_VoteWatcher = [];
var J_GameChannel;
/*

0 実行なし
1 待機中
2 一日目 昼
3 一日目 夜
4 二日目 朝
5 二日目 夜
6 三日目 朝

*/

function rand() {
  var len = 1;
  var str = J_PlayerJobs.length;
  var strLen = str.length;
  var result = "";
 
  for (var i = 0; i < len; i++) {
    result += str[Math.floor(Math.random() * strLen)];
  }
  return result;  
}

const aryMax = function (a, b) {return Math.max(a, b);}

client.on('message', async message => {
  
  
  //再帰呼び出し対策： BOTが話した語句には応答しない。
  if(message.author.id == client.user.id) {return}
  
  if(message.content == "強制終了") {
    message.channel.send("強制終了します。");
    J_PlayerCount = 0;
    J_PlayerList = [];
    J_PlayerJobs = [];
    J_PlayerList_Select = "";
    J_MurderTo = "";
    J_Fortune_To  ="";
    J_MurderVote = [];
    J_STATUS = 0;
    J_VoteWatcher = [];
  }
  
  if(message.content.match(/人狼|jinrou|じんろう/)) {
    if(message.channel.type != "dm") {
      J_ready(message.member.id);
    }
    else {
      message.channel.send({embed: {color: 0xff0000,fields: [{name: "⚠ エラーが発生しました",value: "ゲームへの参加はサーバーで行ってください。",inline: false},]}});
    }
  }
  
  //開始準備
  function J_ready(JoinUser) {
    
    if(J_PLAYER_LIMIT <= 2 || J_Debug >= 2) {
      message.channel.send({embed: {color: 0xff0000,fields: [{name: "⚠ エラーが発生しました",value: "**ワンナイト人狼**を実行する際に問題が発生しました。",inline: false},]}});
      return;
    }
    
    if(J_PLAYER_LIMIT == J_PlayerCount) {
      message.channel.send({embed: {color: 0xFDD835,fields: [{name: "🐺 ワンナイト人狼： 進行中の別のゲームがあります",value: "<@" + message.author.id +"> \n現在、他のユーザーがワンナイト人狼をプレイ中です！\n終了するまでしばらくお待ち下さい！",inline: false},]}});
      return;
    }
    J_STATUS = 1;
    
    // if(J_PlayerList.includes(message.member.id)) {
    //   message.channel.send({embed: {color: 0xff0000,fields: [{name: "⚠ エラーが発生しました",value: "すでに参加しています！",inline: false},]}});
    // }
    if(1==1) {
      J_PlayerList[J_PlayerCount] = JoinUser;
      J_PlayerCount++;
      
      message.channel.send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 参加完了",value: "<@" + message.author.id + "> \n参加しました。\nあなたは **プレイヤー" + (J_PlayerCount) + "** です。※覚える必要はありません\n" + "\n**●プレイ方法**\nこのテキストチャンネルで、BOTがゲームの進行をします。ゲームに参加した方は、BOTの指示に従いゲームを楽しんで下さい！",inline: false},]}});
    }
    
    
    if(J_Debug == 1) {
      
      let J_PlayerList_Select = "";
      
      for(cnt = 0; cnt < J_PLAYER_LIMIT; cnt++) {
        J_PlayerList_Select += "``" + (cnt + 1) + "``： <@" + J_PlayerList[cnt] + ">\n";
      }

      message.channel.send({embed: {color: 0xffffff,title: "💻 デバッグモード", fields: [{name: "管理画面",value: "プレイ待機中： ``" + J_PlayerCount + "``人\n人狼開始まで： ``" + (J_PLAYER_LIMIT - J_PlayerCount) + "``人\n　　最大人数： ``" + J_PLAYER_LIMIT + "``人\n\n**参加プレイヤー**\n" + J_PlayerList_Select ,inline: false},]}});
    }
    
    
    if(J_PLAYER_LIMIT == J_PlayerCount) {
      message.channel.send({embed: {color: 0xAD1457,fields: [{name: ":small_red_triangle_down: " + J_PLAYER_LIMIT + "人集まりました。",value: "これよりゲームを開始します！",inline: false},]}});
      J_GameChannel = message.channel.id;
      setTimeout(J_PLAY_DAY1_DAYTIME,1000);
    }
  }
  
  function J_PLAY_DAY1_DAYTIME() {
    
    J_STATUS = 2;
    
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
      message.channel.send({embed: {color: 0xffffff,title: "💻 デバッグモード", fields: [{name: "管理画面",value: "職業カード配布結果： ```" + J_PlayerJobs  + "```",inline: false},]}});
    }
    
    //プレイヤー全員に割り振られた役職をDMで伝える
    for(cnt = 0; cnt < J_PLAYER_LIMIT; cnt++) {
      client.users.cache.get(J_PlayerList[cnt]).send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： あなたの役職",value: "あなたは **"+ J_Jobs[J_PlayerJobs[cnt]] + "** です。\n確認したら、<#" + J_GameChannel + ">に戻ってください。",inline: false},]}});
    }
  
    message.channel.send({embed: {color: 0xFF9800,fields: [{name: ":sun_with_face: 1日目・昼",value: "**ようこそ、人狼の館へ。**\n\nプレイヤーの皆様には、個人チャットであなたの職業を送信しました。確認を行った人から、会議を開始して下さい！\n\n⏳ 制限時間は " + J_WAIT_TIME / 1000 / 60 + "分 です。",inline: false},]}});
    setTimeout(J_PLAY_DAY1_NIGHT,J_WAIT_TIME);
    
    return;
  }
  
  function J_PLAY_DAY1_NIGHT() {
    
    J_STATUS = 3;
    
    for(cnt = 0; cnt < J_PLAYER_LIMIT; cnt++) {
      J_PlayerList_Select += "``" + (cnt + 1) + "``： <@" + J_PlayerList[cnt] + ">\n";
    }
    
    client.users.cache.get(J_PlayerList[J_PlayerJobs.indexOf(2)]).send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 人狼",value: "1日目の夜になりました。\n人狼のあなたは、ここで特定の１人だけを殺害することができます。殺害されたユーザーは、次の日の朝からチャットで発言できなくなります。\n\n以下から対象のユーザー選んだ後、その人の名前の左側にある数字を、このBOT宛に送信して下さい。\n\n⏳ 制限時間は " + J_ToWaitTime / 1000 / 60 + "分 です。\n\n" + J_PlayerList_Select,inline: false},]}});
    
    client.users.cache.get(J_PlayerList[J_PlayerJobs.indexOf(1)]).send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 占い師",value: "1日目の夜になりました。\n占い師のあなたは、ここで特定の１人だけ、村人か人狼かをあなただけが知ることができます。\n\n以下から対象のユーザー選んだ後、その人の名前の左側にある数字を、このBOT宛に送信して下さい。\n\n⏳ 制限時間は " + J_ToWaitTime / 1000 / 60 + "分 です。\n\n" + J_PlayerList_Select,inline: false},]}});
    
    message.channel.send({embed: {color: 0x536DFE,fields: [{name: ":crescent_moon: 1日目・夜",value: "すっかり日が暮れて、夜になりました。\n人狼と占い師の方には、個人にてチャットを送信します。他の方は朝になるまで待ちましょう！",inline: false},]}});
    
    setTimeout(J_PLAY_DAY2_DAYTIME,J_ToWaitTime);
    
  }
  
  if(message.content <= J_PLAYER_LIMIT && J_STATUS == 3) {
    
      let J_Number = message.content;
      if(message.channel.type == "dm" && message.author == J_PlayerList[J_PlayerJobs.indexOf(1)]) {
        if(!J_Fortune_To) {
          J_Fortune_To = J_PlayerList[J_Number - 1];
          message.channel.send({embed: {color: 0xAD1457,fields: [{name: ":small_red_triangle_down: ワンナイト人狼：占い結果",value: "<@" + J_PlayerList[J_Number - 1] + "> さんを占った結果、``" + J_Jobs[J_PlayerJobs[J_PlayerList.indexOf(J_Fortune_To)]] + "``でした。",inline: false},]}});
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
    
    J_STATUS = 4;
    
    if(!J_MurderTo) {
      J_MurderTo = J_PlayerList[Math.floor(Math.random() * J_PLAYER_LIMIT)];
    }
    message.channel.send({embed: {color: 0xFF9800,fields: [{name: ":sun_with_face: 2日目・朝",value: "おはようございます！\nさて、カーテンを開けると、今日は雲がきれいな空だ。\n\n**そして廊下には、" + J_Jobs[J_PlayerJobs[J_PlayerList.indexOf(J_MurderTo)]] + "の <@" + J_MurderTo + "> さんが血まみれの状態で倒れていました。**\n\n殺害された人はチャットで発言できなくなります。それでは昨日の昼同様に、会議を開始して下さい！\n\n⏳ 制限時間は " + J_WAIT_TIME / 1000 / 60 + "分 です。",inline: false},]}});
    setTimeout(J_PLAY_DAY2_NIGHT,J_WAIT_TIME);
  }
  
  if(message.author == J_MurderTo) {
    message.delete();
  }
  
  function J_PLAY_DAY2_NIGHT() {
    
    J_STATUS = 5;
    
    let J_Number = "";
    
    for(cnt = 0; cnt < J_PLAYER_LIMIT; cnt++) {
      J_MurderVote[cnt] = 0;
    }
    
    
    message.channel.send({embed: {color: 0x536DFE,fields: [{name: ":crescent_moon: 2日目・夜",value: "すっかり日が暮れて、夜になりました。\n\nこれより、個人チャットにて、投票形式で誰を殺害するかを決定します。\nもっとも票の多かった方は、次の日の朝に殺害されてしまいます。\n\nあなたが人狼だと思う人に票を入れてください。\nなお投票は1回・1人のみですので、お間違えのないようにお願いします。\nそれでは個人チャットにてどうぞ！",inline: false},]}});
    
    for(cnt = 0; cnt < J_PLAYER_LIMIT; cnt++) {
      if(J_MurderTo != J_PlayerList[cnt]) {
        client.users.cache.get(J_PlayerList[cnt]).send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： 投票",value: "2日目の夜になりました。\nあなたは、ここで特定の１人だけを投票することができます。\n\n最も投票数が多いユーザーは、次の日の朝に殺害されます。\n\n以下から対象のユーザー選んだ後、その人の名前の左側にある数字を、このBOT宛に送信して下さい。\n\n⏳ 制限時間は " + J_ToWaitTime / 1000 / 60 + "分 です。\n\n" + J_PlayerList_Select,inline: false},]}});
      }
      else {
        client.users.cache.get(J_PlayerList[cnt]).send({embed: {color: 0xAD1457,fields: [{name: "🐺 ワンナイト人狼： You are dead!!",value: "2日目の夜になりました。\nあなたは既に人狼に殺害されたため、投票を行うことができません。",inline: false},]}});
      }
    }
    
    
    setTimeout(J_PLAY_DAY3_DAYTIME,J_ToWaitTime);
  }

  //ここでcntを初期化
  cnt = 0;
  
  if(message.content <= J_PLAYER_LIMIT && J_STATUS == 5) {
    
      let J_Number = message.content;
      
    
      if(message.channel.type == "dm" && J_MurderTo != message.author) {
        
        if(J_VoteWatcher.includes(message.author)) {
          message.channel.send("⚠ 投票は一度のみです");
          message.channel.send({embed: {color: 0xff0000,fields: [{name: "⚠ エラーが発生しました",value: "投票は1度しか行なえません！",inline: false},]}});
        }
        
        else {
          J_VoteWatcher[cnt] = message.author;
          cnt++;
          J_MurderVote[J_Number - 1] += 1;
          message.channel.send("<@" + J_PlayerList[J_Number - 1] + "> さんに投票しました。");
          if(J_Debug == 1) {
            message.channel.send({embed: {color: 0xffffff,title: "💻 デバッグモード", fields: [{name: "管理画面",value: "投票状況： ```" + J_MurderVote  + "```\n\n投票者： ```" + J_VoteWatcher + "```",inline: false},]}});
          }
        }
        
      }
      else {
        message.channel.send({embed: {color: 0xff0000,fields: [{name: "⚠ エラーが発生しました",value: "投票対象者ではありません",inline: false},]}});
      }
    
    
    
  }
  
  function J_PLAY_DAY3_DAYTIME() {
    
    J_STATUS = 6;
    
    //2日目の夜の殺害データ
    //投票最大値を検索したあと、その最大値がどこにあるかを検索
    //そのあとの検索結果の数字を殺す
    let max_vote = J_MurderVote.reduce(aryMax);
    let day2_night_dead = J_MurderVote.indexOf(max_vote);
    
    J_MurderTo = J_PlayerList[day2_night_dead];
    
    if(J_Debug == 1) {
      message.channel.send({embed: {color: 0xffffff,title: "💻 デバッグモード", fields: [{name: "管理画面",value: "殺害ターゲット： ```" + J_PlayerList[day2_night_dead]  + "```\n投票数： ```" + J_MurderVote.reduce(aryMax) + "```\n最も投票が多かった人の対象添え字： ```" + J_MurderVote.indexOf(max_vote) + "```",inline: false},]}});
    }
    
    
    if(J_Jobs[J_PlayerJobs[J_PlayerList.indexOf(J_MurderTo)]].match(/人狼/)) {
      J_Message = "居間で倒れていました。**\n\nそして、遺体が静かに消えていきました。そして、同時に館の鍵が開いた音がした！\n\n村人たちは、二度とくるまいと、さっそうと館を後にした。";
    }
    else {
      J_Message = "血だらけの状態でクローゼットに隠されていました。**このあと、村人たちは変えることが出来ず、全員帰らぬ人となってしまいました。";
    }
    
    message.channel.send({embed: {color: 0xFF9800,fields: [{name: ":sun_with_face: 3日目・朝",value: "おはようございます！\nさて、カーテンを開けると、今日は霧が深いようだ。\n\nあれ、寝室に人数分あるベッドだったはずが、キレイにに１台なくなっている…\nみんなは恐る恐る、館を探し始めた。そうすると、 **<@" + J_PlayerList[rand()] + ">** さんが窓から、外にバラバラの状態のベッドを見つけた。\n\nこれはなにかおかしいと考え始めた **<@" + J_PlayerList[rand()] + ">** さんはクローゼットや屋根裏を探すと、なんと予想通りに、\n首のあたりにかじられたような跡がある、**" + J_Jobs[J_PlayerJobs[J_PlayerList.indexOf(J_MurderTo)]] + "の <@" + J_MurderTo + "> さんが、" +  J_Message + "\n\nこれにてゲームを終了します。",inline: false},]}});
    
    J_PlayerCount = 0;
    J_PlayerList = [];
    J_PlayerJobs = [];
    J_PlayerList_Select = "";
    J_MurderTo = "";
    J_Fortune_To  ="";
    J_MurderVote = [];
    J_STATUS = 0;
    J_VoteWatcher = [];
    
    if(J_Debug == 1) {
      message.channel.send({embed: {color: 0xffffff,title: "💻 デバッグモード", fields: [{name: "管理画面",value: "セーブデータの初期化完了",inline: false},]}});
    }
  }
  
});
client.login(process.env.DISCORD_BOT_TOKEN)
