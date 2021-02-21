const Discord = require('discord.js')
const client = new Discord.Client()
const ytdl = require('ytdl-core');
const fs = require('fs');
require('./GAME_jinrou.js');
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
const youbi = ["日","月","火","水","木","金","土"];
const EEW_icon = "https://play-lh.googleusercontent.com/91udG1PTmvsm_u7dvQmj4MuW3KK4-vQjXl359qnHkXDYH_wxKkdE6Fo6pBI6zngsqxw";
const EEW_MSG = [":warning::loudspeaker: **緊急地震速報（気象庁発表）**","緊急地震速報を受信しました。強い揺れに備えてください。\n地震の詳細の情報は以下のとおりです。\n\n","\n⚠**一律配信のため、一部地域では揺れない場合があります**\n\nこの情報を鵜呑みにせず、テレビ・ラジオ等の電源をONにし最新情報を得て下さい。\n\nまた、すでに揺れている場合は、落ち着いて行動・避難してください。\n\n津波の恐れがありますので、海岸や河口の近くにいる方は、直ちに安全な高台や津波避難ビルに避難してください。 \n\n> NHKニュース（災害時地上波同時配信）\nhttps://plus.nhk.jp/watch/ch/g1\n\n> Yahooリアルタイム地震モニター\nhttps://typhoon.yahoo.co.jp/weather/jp/earthquake/kyoshin```\n\n @everyone"];
const EEW_QUAKE = ["４以上","５弱以上（最大震度上昇）","５強以上（最大震度上昇）","6弱以上（最大震度上昇）","６強以上（最大震度上昇）","７（最大震度上昇）"];
const Punish_lv1 = /(死|し|シ|ｼ)(んじま|ね|ネ|ﾈ)(?!.*。|.*w|.*え|.*ベンチ|.*べんち)|^(?!コロ|ころ)(殺|ころ|コロ|ｺﾛ)(す|ス|ｽ|し|シ|す|ス|ｽ)(?!.*けど|.？)|(は|ハ|ﾊ)(げ|ゲ|ｹﾞ)(?!.*ーム|.*で)|(き|キ|ｷ)(っしょ|ッショ|ｯｼｮ|しょ|ショ|ｼｮ)|(唐澤|カラサワ|ｶﾗｻﾜ|ブ|ﾌﾞ|kr)(貴洋|たかひろ|ﾀｶﾋﾛ|リュ|ﾘｭ|sw)|(馬鹿|バカ|ﾊﾞｶ)(?!.*眠|.*痛|.*いたい|.*いてぇ|.*ねむい|.*ねみい|.*ねみぃ|.*くさ|.*臭|.*な)|^(?!下手)(糞|くそ|クソ|ｸｿ)(?!.*眠|.*痛|.*いたい|.*いてぇ|.*ねむい|.*ねみい|.*ねみぃ|.*ン|.*ぉ|.*この|.*つま|.*虚|.*寒|.*暑|.*あつ|.*さむ)|.*fuck|.*wtf|.*WTF/i;
const Punish_lv2 = /ナチス|(安倍|菅)(やめろ|辞めろ|ヤメロ|ﾔﾒﾛ)|(薬草|薬|パケ|大麻|野菜|葉っぱ)(売|あげ|取|うり)|(ほ|ホ|ﾎ)(別|込)|(援交|円光|援助交際|円)(します|する|した|したー)|(えろい|えろ|エロい|ｴﾛい|エロ|えちな|えっちな|え ちな|え 地|え　ちな)(写真|動画|しゃしん|どうが|がぞう|画像|どーが)|(着)(えろ|エロ|ｴﾛ)|(ほ|ホ)(別|込)/;
const Punish_Adu = /(パイズリ|ぱいずり|ﾊﾟｲｽﾞﾘ)|(ペニ|ぺに|ﾍﾟﾆ)(ス|す|ｽ)|(ちん|チン|ﾁﾝ)(ちん|チン|ﾁﾝ)|(え|エ|ｴ)(っち|ッチ|ｯﾁ)|(ち|チ|ﾁ)(ん|ン|ﾝ)(こ|コ|ｺ)(?!.*んど)|(ぽこ|ポコ|ﾎﾟｺ)(ちん|チン|ﾁﾝ)|(まん|マン|ﾏﾝ)(こ|コ|ｺ)|(包|ほう|ホウ|ﾎｳ)(茎|けい|ケイ|ｹｲ)|(おっ|オッ|ｵ)(ぱい|パイ|ﾊﾟｲ)|(金|きん|キン|ｷﾝ)(玉|たま|タマ|ﾀﾏ)|(ぱん|パン|ﾊﾟﾝ)(つ|ツ|ﾂ)|(いめぷ|イメプ|ｲﾒﾌﾟ)|(ぱい|パイ|ﾊﾟｲ)(ぱん|パン|ﾊﾟﾝ)|(すかとろ|スカトロ|ｽｶﾄﾛ)|(爆乳|巨乳|並乳|貧乳)|(ろり|ロリ|ﾛﾘ|しす|シス|ｼｽ)(こん|コン|ｺﾝ)|(あなる|アナル|ｱﾅﾙ)|(けつ|ケツ|ｹﾂ)(穴|あな|アナ|ｱﾅ|ANA)|(素股|すまた|スマタ|ｽﾏﾀ)/;
const Punish_sit = /(pornhub|xvideos|xhamster|ero-video|avgle|javfull|hao123)(.*com|.*net)|dmm.co.jp|gravify.link|goo.gl|bit.ly/i;
const Punish_Pri = /^0[789]0-\d{4}-\d{4}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
let LEFT_REASON = "自主的に";
var judge = "正常";
var reason;
let eew_cnt = 0;
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
const roles = ["800742672947871749","800742672947871750","800742672947871748","800742672947871747","800742672947871746"];
/*
roles変数の通し番号
[0]警告 [1]処罰 [2]入場処理 [3]常連 [4]アダルト
*/
const CHANNEL = ["800742673001873493","800742674226216963","800742674226216964",,"800742674424266762","800742674226216965","800742673001873496","800742673924751391","800742673924751392","800742673924751394","800742673924751397","800742674226216960","804617566399496202"];
/*
CHANNEL変数の通し番号
[0]玄関 [1]管理ログ [2]動作確認 [3]年齢確認 [4]地震警報 [5]お知らせ [6]一般CH [7]アダルトCH [8]聞き専多目的 [9]聞き専雑談1 [10]聞き専雑談2 [11]聞き専ゲーム

→地震速報通知は5番以上から通知
*/
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function getTime_JPN() {
  let jst_today = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
  let year = jst_today.getFullYear();
  let month = ('0' + (jst_today.getMonth()+1)).slice(-2);
  let date = ('0' + jst_today.getDate()).slice(-2);
  let day = jst_today.getDay();
  let hours = ('0' + jst_today.getHours()).slice(-2);
  let minutes = ('0' + jst_today.getMinutes()).slice(-2);
  let seconds = ('0' + jst_today.getSeconds()).slice(-2);
  let RESULT = year + "/" + month + "/" + date + "(" + youbi[day] + ") " + hours + ":" + minutes + ":" + seconds;
  return RESULT;
}
function getTime_CAN() {
  let jst_today = new Date(Date.now() + ((new Date().getTimezoneOffset() - (5 * 60)) * 60 * 1000));
  let year = jst_today.getFullYear();
  let month = ('0' + (jst_today.getMonth()+1)).slice(-2);
  let date = ('0' + jst_today.getDate()).slice(-2);
  let day = jst_today.getDay();
  let hours = ('0' + jst_today.getHours()).slice(-2);
  let minutes = ('0' + jst_today.getMinutes()).slice(-2);
  let seconds = ('0' + jst_today.getSeconds()).slice(-2);
  let RESULT = year + "/" + month + "/" + date + "(" + youbi[day] + ") " + hours + ":" + minutes + ":" + seconds;
  return RESULT;
}
function getTime_USA() {
  let jst_today = new Date(Date.now() + ((new Date().getTimezoneOffset() - (6 * 60)) * 60 * 1000));
  let year = jst_today.getFullYear();
  let month = ('0' + (jst_today.getMonth()+1)).slice(-2);
  let date = ('0' + jst_today.getDate()).slice(-2);
  let day = jst_today.getDay();
  let hours = ('0' + jst_today.getHours()).slice(-2);
  let minutes = ('0' + jst_today.getMinutes()).slice(-2);
  let seconds = ('0' + jst_today.getSeconds()).slice(-2);
  let RESULT = year + "/" + month + "/" + date + "(" + youbi[day] + ") " + hours + ":" + minutes + ":" + seconds;
  return RESULT;
}

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
client.on('ready', () => {
  console.log("[INFO] " + `${client.user.tag} にログインしました`);
});

client.on("guildMemberAdd", member => {
  member.roles.add(roles[2]);
  client.channels.cache.get(CHANNEL[6]).send('<@' + member.user + '>さんが来たよ〜〜！！');
});

client.on("guildMemberRemove", member => {
  
});
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
client.on('message', async message => {
  
  
  //再帰呼び出し対策： BOTが話した語句には応答しない。
  if(message.author.id == client.user.id) {return}
  
  function runPunishLv1() {
    judge = "▲ 警告判定";
    message.member.roles.add(roles[0]);
    client.channels.cache.get(CHANNEL[1]).send({embed: {color: 0xffff00,fields: [{name: "⚠不適切な行動を検知しました",value: "下記に表示されている対象者に警戒してください。\n\n**対象者**：" + "<@" + message.member.user + ">" + "\n　**処罰**：警告\n　**理由**：" + reason + "\n　**時間：**" + getTime_JPN() + "\n　**場所**：" + "<#" + message.channel + ">" + "\n　**内容**：" + message.content + "\n\n[対象メッセージにジャンプ](https://discord.com/channels/800742672947871744/" + message.channel + "/"+ message.id +")",inline: false},]}});
    let FILE_WRITE_PUNISH = "▲警告処理," + message.member.displayName + "," + reason + "," + getTime_JPN() + "," + message.content + "," + message.id + "," + message.member + "\n";
    fs.appendFileSync("logs/punish.txt", FILE_WRITE_PUNISH);
    let RESULT = "<@" + message.member + "> 違反行為を検知しました。あなたは１度目の警告を受けました。";
    return RESULT;
  }
  function runPunishLv2() {  
    judge = "✕ 一発BAN判定";
    for(var cnt = 0; cnt < roles.length; cnt++) {
      message.member.roles.remove(roles[cnt]);
    }
    message.member.roles.add(roles[1]);
    client.channels.cache.get(CHANNEL[1]).send({embed: {color: 0xff0000,fields: [{name: "🚫 ユーザーの処罰を行いました",value: "誤判定の場合はユーザーネームをクリックし、役職を取り消すことで処罰を取り消すことができます。" +"\n\n**対象者**：" + "<@" + message.member.user + ">" + "\n　**処罰**：アカウント利用制限\n　**理由**：" + reason + "\n　**時間**：" + getTime_JPN() + "\n　**場所**：" + "<#" + message.channel + ">" + "\n　**内容**：" + message.content + "\n\n[対象メッセージにジャンプ](https://discord.com/channels/800742672947871744/" + message.channel + "/"+ message.id +")",inline: false},]}});
    let FILE_WRITE_PUNISH = "●利用制限," + message.member.displayName + "," + reason + "," + getTime_JPN() + "," + message.content + "," + message.id + "," + message.member + "\n";
    fs.appendFileSync("logs/punish.txt", FILE_WRITE_PUNISH);
    let RESULT = "<@" + message.member + "> 違反行為を検知したため、処罰を実行しました。";
    return RESULT;
  }

  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //緊急地震速報転送
  if((message.author.id == "329257498668302346" && !message.content) && message.channel == CHANNEL[4]) {
    eew_cnt++;
    if(eew_cnt >= 6) {eew_cnt = 5}
    for(var cnt = 5; cnt < CHANNEL.length; cnt++) {
      const notif_eew = await client.channels.cache.get(CHANNEL[cnt]).send({embed: {color: 0xff0000,thumbnail: {url: EEW_icon},fields: [{name: EEW_MSG[0],value: EEW_MSG[1] + "```発生日時：" + getTime_JPN() + " 頃\n予想震度：" + EEW_QUAKE[eew_cnt-1] + "```" + EEW_MSG[2],inline: false},]}});
      notif_eew.delete({ timeout: 10000 });
    }
  }
  //1分経てばeew_cntを削除して震度4以上に戻す
  var EEW_CNT_RESET = function() {eew_cnt = 0}
  setTimeout(EEW_CNT_RESET, 60000);
  
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //ログと処罰
  
  if(Punish_lv2.test(message.content)) {
     reason = "一発BAN発言";
     message.channel.send(runPunishLv2());
  }
  else if(Punish_sit.test(message.content)) {
     reason = "有害なサイトリンクを掲載する行為";
     message.channel.send(runPunishLv2());
  }
  else if(Punish_Pri.test(message.content)) {
     reason = "個人情報の掲載行為";
     message.channel.send(runPunishLv2());
  }
  
  if (Punish_lv1.test(message.content) || Punish_Adu.test(message.content)) { 
    //警告ロールあり
    if (message.member.roles.cache.has(roles[0])) {
      //アダルト発言をアダルトチャンネルで？
      if(message.channel == CHANNEL[7] && Punish_Adu.test(message.content)) {return;}
      //それ以外？
      else {reason = "警告ワードを2回発言する行為";message.channel.send(runPunishLv2());}
    }
    //警告ロールなし
    else { 
      //アダルト発言をアダルトチャンネルで？
      if(message.channel == CHANNEL[7] && Punish_Adu.test(message.content)) {return;}
      //それ以外
      else {reason = "不適切な発言";message.channel.send(runPunishLv1());}
    }
  }
  
  let FILE_WRITE = getTime_JPN() + ',' + message.member.displayName + ',' + message.member + ',' + message.channel + ',' + message.content + ',' + message.id + ',' + judge + "\n";
  fs.appendFileSync("logs/logs.csv", FILE_WRITE);
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  
  
    //年齢制限を聞くやつ
  if (message.content == "MSG_RULE") {
    message.channel.send(
      {embed: {color: 0xcccccc,fields: [
        {name: "📔 サーバールール・利用規約",value: "当サーバーに入場し、年齢確認を終えた方は、以下のルールと利用規約に同意し、いかなる処分を受けてもそれに服従すると同時に、下記に記載する事項で発生した損害等については、運営は一切の責任を追わないものとします。",inline: false},
        {name: "▼ 年齢確認",value: "```・当サーバーのBOTは、年齢確認ができるものとします。\n・あくまでも自己申告制ですので、身分証明書などを提出する必要はありません```",inline: false},
        {name: "▼ 禁止事項",value: "```・ハラスメント行為（セクハラ・モラハラ等）\n・チャットやVCで執拗に入退出や送信をする行為\n・相手が拒否しているのにも関わらず個人情報等を聞き出す行為\n・当サーバーやユーザーの情報を蓄積/販売する行為\n・連続でBOTが反応する語句を送信する行為\n・セキュリティの脆弱性を突く/突こうと試みる行為\n・その他、運営が不適切と判断したもの```",inline: false},
        {name: "▼ VC使用時の注意",value: "```・ゲーム専用VCや雑談専用VCがありますので、用途に合う部屋を使用してください。\n・聞き専（ミュート勢の方など）は聞き専CHを使用してください。\n・用途以外のVCの使用は禁止です。```",inline: false},
        {name: "当サーバーは迷惑行為検知システムにより、24時間365日監視しています",value: "万一、検知システムに反応しない迷惑行為を発見した場合には、いかなる処罰・法的措置も辞さないことを当利用規約に記します。\n\nこのサーバーを使うみなさまが、安心して利用できるコミュニティを継続するために、ルール厳守にご理解ご協力をお願い致します。",inline: false},
      ]}});
   return;
  }
  
  else if (message.content == "MSG_WELCOME") {
    message.channel.send(
      {embed: {color: 0xEC407A,fields: [
        {name: "🎉 ようこそサーバーへ！",value: "数あるサーバーの中から当サーバーを選んで頂き、ありがとうございます！",inline: false},
        {name: "■ まずなにする？",value: "**”年齢認証にご協力下さい”**タブより、年齢確認のご協力をお願いします！\n年齢認証が完了するまで、通常のチャットやVCはご利用いただけません！",inline: false},
        {name: "■ 年齢認証が終わったら",value: "一般チャットで初めての挨拶をしてみたり、会話に参加してみよう！\nVCに参加するのもGOOD！",inline: false},
        {name: "■ 年齢制限後に一般チャット等が表示されない場合",value: "BOTが処理をするのに時間がかかっています。\n通常は数秒(長くても10秒)で終わりますが、もし表示されない場合は @ًゆう までご一報下さい！",inline: false},
        {name: "■ 告知：サーバーのレビューをお願いします！",value: "サーバーに７日間以上滞在すると、DISBOARDにてサーバーのレビューが書き込めるようになります！新しいユーザーの方を勧誘するためにも、レビュー投稿に是非お願い致します！\n\nレビューはこちらから！\nhttps://disboard.org/ja/review/create/800742672947871744",inline: false},
      ]}});
   return;
  }
  
  
  else if (message.content == "MSG_AGECHECK") {
    message.channel.send(
      {embed: {color: 0xEC407A,fields: [
        {name: "⚠ 年齢認証",value: "当サーバーでは、青少年の方の健全な育成に心がけております。利用者の方々には、13歳未満でないことの確認を行っております。なお、確認はBOTが自動的に行います。年齢はBOTのサーバーに保管されます。そのため、__運営があなたの年齢を知ることはできません。__",inline: false},
        {name: ":pray: 年齢確認のご協力のお願い",value: "チャット欄に、年齢を __**数値のみで**__ 送信してください。\n送信して数秒経つと、送信して頂いた年齢は自動的に削除され、チャット、VCが利用できるようになります。\n\n例: 18歳の場合 ➟ 「18」と **__”半角英数”__** で送信してください。\n",inline: false}
      ]}});
   return;
  }
  
  //ルール
  else if (message.content == "MSG_NEWCOMER") {
    message.channel.send(
      {embed: {color: 0x10eb73,fields: [
        {name: "☑ サーバールールと利用規約",value: "当サーバーに入場し、年齢確認を終えた方は、以下のルールと利用規約に同意し、いかなる処分を受けてもそれに服従すると同時に、下記に記載する事項で発生した損害等については、運営は一切の責任を追わないものとします。",inline: false},1111111111111
      ]}});
   return;
  }
  
  
  //警告
  if (message.content == "MSG_WARN") {  
    message.channel.send(
      {embed: {color: 0xffff00,fields: [
        {name: "⚠ 警告処分",value: "当サーバーで軽度のルール違反を犯すと、「警告処分中」の役職が付きます。\n役職がつけられた理由は以下の通りです。\n\n```・チャットやVCでの著しく誹謗な発言\n・VCチャンネルの不正利用（入退室を繰り返すなど）\n・その他、運営が不適切と判断し役職付与が適当と判断した場合```\nこの役職が付与されている者は、次回以降の違反が厳罰化されます。もう一度ルールをご確認頂き、ルール違反の再発防止に努めて下さい。",inline: false},
        {name: "次回の違反は利用制限/BANになります",value: "2回目以降の違反は厳罰化され、違反行為により利用制限、BAN、Kick等の処罰が科されますので、十分にご注意下さい。",inline: false},
        {name: "誤審・不服申立て",value: "あなたはこの処罰に対して、誤審・不服を申し立てる権利を有します。この処罰に対して不服・誤審だと思う場合は、当サーバーの管理人 <@532928957402710046> まで**__DM__**でご連絡下さい。追って連絡を返信させて頂きます。",inline: false}
     ]}});
    return;
  }
  
  //処罰
  if (message.content == "MSG_PUNISH") {  
    message.channel.send(
      {embed: {color: 0xff0000,fields: [
        {name: "🚫 利用制限措置",value: "あなたは、当サーバーで重大な違反、もしくは軽度な違反を二度繰り返したため、このサーバーでの行為が制限されています。\n一定時間経過後には解除されますが、過去の違反や今回の違反により、処罰時間が変動する場合があります。",inline: false},
        {name: "誤審・不服申立て",value: "あなたはこの処罰に対して、誤審・不服を申し立てる権利を有します。この処罰に対して不服・誤審だと思う場合は、当サーバーの管理人 <@532928957402710046> まで**__DM__**でご連絡下さい。追って連絡を返信させて頂きます。",inline: false}
      ]}});
    return;
  }
  
  
});
client.login(process.env.DISCORD_BOT_TOKEN)
