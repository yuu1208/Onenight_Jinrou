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
let eew_cnt = 0;
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
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
function runPunishLv1() {
  
}
function runPunishLv2() {
  
}

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
client.on('ready', () => {
  console.log("[INFO] " + `${client.user.tag} にログインしました`);
});

client.on("guildMemberAdd", member => {
  member.roles.add('800742672947871748');
  client.channels.cache.get('800742673924751391').send('<@' + member.user + '>さんが来たよ〜〜！！');
});

client.on("guildMemberRemove", member => {
  
});
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
client.on('message', async message => {
  
  
  //再帰呼び出し対策： BOTが話した語句には応答しない。
  if(message.author.id == client.user.id) {return}
  
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
  //ログ
  if(message.content.length >= 1) {
  if(Punish_lv2.test(message.content) || Punish_sit.test(message.content) || Punish_Pri.test(message.content)) {runPunishLv2()}
  else if(Punish_lv1.test(message.content) || Punish_Adu.test(message.content)) {
  if(message.member.roles.cache.has('763300263292567563')) {
  if((message.channel == CHANNEL[7] != Punish_Adu.test(message.content)) || Punish_lv1.test(message.content)) {runPunishLv2()}
  else {return}}}}
  
  let FILE_WRITE = getTime_JPN + ',' + message.member.displayName + ',' + message.member + ',' + message.channel + ',' + message.content + ',' + message.id + ',' + judge + "\n";
  fs.appendFileSync("logs/logs.csv", FILE_WRITE);
  client.channel.cache.get(CHANNEL[2]).send(message.content);
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  
  
});
client.login(process.env.DISCORD_BOT_TOKEN)
