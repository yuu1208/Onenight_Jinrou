
const Discord = require('discord.js');
const client = new Discord.Client();

const SEND_PREFIX = "**ﾌﾟﾝｯ **";
const youbi = ["日","月","火","水","木","金","土"];
const OMIKUJI = ["大吉","中吉","小吉","末吉","凶"];

function GET_HEARTFUL_JAPANTIME() {
  let jst_today = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
  let year = jst_today.getFullYear();
  let month = ((jst_today.getMonth()+1));
  let date = (jst_today.getDate());
  let day = jst_today.getDay();

  let JAPAN_TIME = month + "月" + date + "日" + youbi[day] + "曜日";
  return JAPAN_TIME;
}

client.on('ready', () => {
  console.log("[INFO] " + `${client.user.tag} にログインしました`);
  client.channels.cache.get('802246886768640024').send(SEND_PREFIX + "今日は" + GET_HEARTFUL_JAPANTIME() + "です。");
  
})

//誰かが入ってきた
client.on("guildMemberAdd", member => {

  //入場処理ロール追加
  member.roles.add('入場ロール');
  client.channels.cache.get('入退出記録CHのID').send(SEND_PREFIX + '<@' + member.user + '> さんが入場しました。');

});

//誰かが抜けた
client.on("guildMemberRemove", member => {
  client.channels.cache.get('入退出記録CHのID').send(SEND_PREFIX + '<@' + member.user + "> さんが退出しました。");
});


client.on('message', async message => {

  //再帰呼び出し対策
  if(message.author.id == client.user.id) {
    return;
  }
  
  
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  /* MAYATY VIOLENCE WORD CHECKER v20210209 */
  const Punish_lv1 = /(^死|^し|^シ|^ｼ)(ね|ネ|ﾈ)(?!.*。|.*w|.*えよ)|^(?!コロ|ころ)(殺|ころ|コロ|ｺﾛ)(す|ス|ｽ|し|シ|す|ス|ｽ)(?!.*けど|.？)|(は|ハ|ﾊ)(げ|ゲ|ｹﾞ)(?!.*ーム|.*で)|(き|キ|ｷ)(っしょ|ッショ|ｯｼｮ|しょ|ショ|ｼｮ)|(野獣|田所|yj)(先輩|浩二|snpi)|(唐澤|カラサワ|ｶﾗｻﾜ|ブ|ﾌﾞ|kr)(貴洋|たかひろ|ﾀｶﾋﾛ|リュ|ﾘｭ|sw)|(馬鹿|バカ|ﾊﾞｶ)(?!.*眠|.*痛|.*いたい|.*いてぇ|.*ねむい|.*ねみい|.*ねみぃ|.*くさ|.*臭|.*な)|^(?!下手)(糞|くそ|クソ|ｸｿ)(?!.*眠|.*痛|.*いたい|.*いてぇ|.*ねむい|.*ねみい|.*ねみぃ|.*ン|.*ぉ|.*この|.*つま|.*虚|.*寒|.*暑|.*あつ|.*さむ)|.*fuck|.*wtf|.*WTF/i;
  const Punish_lv2 = /ナチス|ソビエト|ｿﾋﾞｴﾄ|ソヴィエト|ｿｳﾞｨｴﾄ|(安倍|菅)(やめろ|辞めろ|ヤメロ|ﾔﾒﾛ)|(薬草|薬|パケ|大麻|野菜|葉っぱ)(売|あげ|取|うり)|(ほ|ホ|ﾎ)(別|込)|(援交|円光|援助交際|円)(します|する|した|したー)|(えろい|えろ|エロい|ｴﾛい|エロ|えちな|えっちな|え ちな|え 地|え　ちな)(写真|動画|しゃしん|どうが|がぞう|画像|どーが)|(着)(えろ|エロ|ｴﾛ)|(ほ|ホ)(別|込)/;
  const Punish_Adu = /(パイズリ|ぱいずり|ﾊﾟｲｽﾞﾘ)|(ペニ|ぺに|ﾍﾟﾆ)(ス|す|ｽ)|(ちん|チン|ﾁﾝ)(ちん|チン|ﾁﾝ)|(え|エ|ｴ)(っち|ッチ|ｯﾁ)|(ち|チ|ﾁ)(ん|ン|ﾝ)(こ|コ|ｺ)(?!.*んど)|(ぽこ|ポコ|ﾎﾟｺ)(ちん|チン|ﾁﾝ)|(まん|マン|ﾏﾝ)(こ|コ|ｺ)|(包|ほう|ホウ|ﾎｳ)(茎|けい|ケイ|ｹｲ)|(おっ|オッ|ｵ)(ぱい|パイ|ﾊﾟｲ)|(金|きん|キン|ｷﾝ)(玉|たま|タマ|ﾀﾏ)|(ぱん|パン|ﾊﾟﾝ)(つ|ツ|ﾂ)|(いめぷ|イメプ|ｲﾒﾌﾟ)|(ぱい|パイ|ﾊﾟｲ)(ぱん|パン|ﾊﾟﾝ)|(すかとろ|スカトロ|ｽｶﾄﾛ)|(爆乳|巨乳|並乳|貧乳)|(ろり|ロリ|ﾛﾘ|しす|シス|ｼｽ)(こん|コン|ｺﾝ)|(あなる|アナル|ｱﾅﾙ)|(けつ|ケツ|ｹﾂ)(穴|あな|アナ|ｱﾅ|ANA)|(素股|すまた|スマタ|ｽﾏﾀ)/;
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  
  function GET_JAPANTIME() {
    let jst_today = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
    let year = jst_today.getFullYear();
    let month = ('0' + (jst_today.getMonth()+1)).slice(-2);
    let date = ('0' + jst_today.getDate()).slice(-2);
    let day = jst_today.getDay();
    let hours = ('0' + jst_today.getHours()).slice(-2);
    let minutes = ('0' + jst_today.getMinutes()).slice(-2);
    let seconds = ('0' + jst_today.getSeconds()).slice(-2);
    
    let JAPAN_TIME = year + "/" + month + "/" + date + " (" + youbi[day] + ") " + hours + ":" + minutes + ":" + seconds;
    return JAPAN_TIME;
  }


  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  
  
  //時間を聞く
  if (message.content.match(/何時|^なんじ|time/i)) {
    message.channel.send(SEND_PREFIX + "今は " + GET_JAPANTIME() + " です。");
    return;
  }
  
  if (message.content.match(/みくじ|神籤/)) {
    message.channel.send(OMIKUJI[Math.floor(Math.random() * OMIKUJI.length)] + "です。");
    return;
  }
  
  
})

client.login(process.env.DISCORD_BOT_TOKEN)
  
 