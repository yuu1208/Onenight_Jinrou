const Discord = require('discord.js')
const client = new Discord.Client()
const ytdl = require('ytdl-core');
const fs = require('fs');
require('./GAME_jinrou.js');

const Punish_lv1,Punish,lv2,youbi,channel = require('./SETTINGS.js');
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

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
C_ENTRANCE = 2;
client.login(process.env.DISCORD_BOT_TOKEN)
