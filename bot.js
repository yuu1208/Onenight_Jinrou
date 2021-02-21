const Discord = require('discord.js')
const client = new Discord.Client()
const ytdl = require('ytdl-core');
const fs = require('fs');
require('./GAME_jinrou.js');
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
const youbi = ["日","月","火","水","木","金","土"];
const Punish_lv1 = /(死|し|シ|ｼ)(んじま|ね|ネ|ﾈ)(?!.*。|.*w|.*え|.*ベンチ|.*べんち)|^(?!コロ|ころ)(殺|ころ|コロ|ｺﾛ)(す|ス|ｽ|し|シ|す|ス|ｽ)(?!.*けど|.？)|(は|ハ|ﾊ)(げ|ゲ|ｹﾞ)(?!.*ーム|.*で)|(き|キ|ｷ)(っしょ|ッショ|ｯｼｮ|しょ|ショ|ｼｮ)|(唐澤|カラサワ|ｶﾗｻﾜ|ブ|ﾌﾞ|kr)(貴洋|たかひろ|ﾀｶﾋﾛ|リュ|ﾘｭ|sw)|(馬鹿|バカ|ﾊﾞｶ)(?!.*眠|.*痛|.*いたい|.*いてぇ|.*ねむい|.*ねみい|.*ねみぃ|.*くさ|.*臭|.*な)|^(?!下手)(糞|くそ|クソ|ｸｿ)(?!.*眠|.*痛|.*いたい|.*いてぇ|.*ねむい|.*ねみい|.*ねみぃ|.*ン|.*ぉ|.*この|.*つま|.*虚|.*寒|.*暑|.*あつ|.*さむ)|.*fuck|.*wtf|.*WTF/i;
const Punish_lv2 = /ナチス|(安倍|菅)(やめろ|辞めろ|ヤメロ|ﾔﾒﾛ)|(薬草|薬|パケ|大麻|野菜|葉っぱ)(売|あげ|取|うり)|(ほ|ホ|ﾎ)(別|込)|(援交|円光|援助交際|円)(します|する|した|したー)|(えろい|えろ|エロい|ｴﾛい|エロ|えちな|えっちな|え ちな|え 地|え　ちな)(写真|動画|しゃしん|どうが|がぞう|画像|どーが)|(着)(えろ|エロ|ｴﾛ)|(ほ|ホ)(別|込)/;

let LEFT_REASON = "自主的に";

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function GetTime_JPN() {
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
function GetTime_CAN() {
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
function GetTime_USA() {
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
  member.roles.add('800742672947871748');
  client.channels.cache.get('800742673924751391').send('<@' + member.user + '>さんが来たよ〜〜！！');
});

client.on("guildMemberRemove", member => {
  
});
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
client.on('message', m => {
  
  //再帰呼び出し対策： BOTが話した語句には応答しない。
  if(m.author.id == client.user.id) {return}

})

client.login(process.env.DISCORD_BOT_TOKEN)
