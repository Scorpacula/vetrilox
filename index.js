const Discord = require("discord.js");
const client = new Discord.Client({ws: {intents: Discord.IntentsAll}});
const { inspect } = require("util");
const superagent = require('superagent')
const fs = require("fs");
const ms = require("ms");
const gifSearch = require("gif-search");
const fetch = require('node-fetch');
const api = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
const hastebin = require('hastebin-gen')
const oneLinerJoke = require('one-liner-joke');
var JSONdb = require('simple-json-db');
const qrcode = require('qrcode')
const prettyMS = require('pretty-ms')
const config = require('./config.json')
const tempy = require('tempy')
var TinyURL = require('tinyurl');
const { exec } = require('child_process');
const axios = require('axios')
const categories = ["moderation", "auto-moderation", "entertainment", "utility", "configuration", "images"]
const regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
  const regex2 = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)

	client.on('ready', () => {
	 console.log('Logged in as ' + client.user.tag);
	
});


client.login(config.token);
client.on('guildMemberAdd', member => {
    const db = new JSONdb(`./Servers/${member.guild.id}.sqlite`)
    const channel = db.get('welcomechannel')
    if(db.get('antijoin') !== undefined){
        member.user.send(`Anti-join has been enabled in **${member.guild.name}**. You have been kicked automatically`)
        member.guild.member(member.user.id).kick().catch(console.error);  
      }

      const roles = db.get('autorole')
      if(roles.length !== 0){
          for(i = 0; i < roles.length; i++){
              member.roles.add(roles[i]).catch(err => console.error(err))
          }
      }
    const welcomeembed = new Discord.MessageEmbed()
    .setTitle('Welcome!')
    .setColor('GREEN')
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`Welcome ${member.user.tag} to ${member.guild.name}!\nMake sure to read the rules!\n\nThis server now has ${member.guild.memberCount} members`)
    .setFooter('Vetrilox', client.user.displayAvatarURL())
    .setTimestamp()
    if(channel !== undefined){
    client.guilds.cache.get(member.guild.id).channels.cache.get(channel).send(welcomeembed)
    } 

    
})


client.on('messageDelete', message => {
    if(message.author.bot) return;
    const db = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
    const channel = db.get('messageDelete')
    if(!channel) return;
    const embed = new Discord.MessageEmbed()
    .setTitle('Message deleted in ' + message.channel.name)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(message.content)
    .setFooter('Vetrilox', client.user.displayAvatarURL())
    client.guilds.cache.get(message.guild.id).channels.cache.get(channel).send(embed)
    if(message.mentions.members.first()){
        if(!db.get('ghostpingdetection')) return;
        const member = message.mentions.members.first()
        message.channel.send(`${message.author.tag} just ghost pinged ${member.user.tag}`)
    }

})

client.on('messageUpdate', function(oldMessage, newMessage) {
    if(oldMessage.author.bot) return;
    const db = new JSONdb(`./Servers/${oldMessage.guild.id}.sqlite`)
    if(oldMessage.mentions.members.first() !== undefined && newMessage.mentions.members.first() === undefined){
        if(!db.get('ghostpingdetection')) return;
        const member = oldMessage.mentions.members.first()
        newMessage.channel.send(`${newMessage.author.tag} just ghost pinged ${member.user.tag}`)
    }

})

client.on("guildMemberUpdate", function(oldMember, newMember){
    const db = new JSONdb(`./Servers/${newMember.guild.id}.sqlite`)
    const channel = db.get('roleGiven')
    if(!channel) return;
    if(oldMember._roles.length > newMember._roles.length){
      for(i=0; i < oldMember._roles.length; i++){
        if(!newMember._roles.includes(oldMember._roles[i])){
          const role = newMember.guild.roles.cache.get(oldMember._roles[i])
          const embed = new Discord.MessageEmbed()
          .setAuthor(newMember.user.tag, newMember.user.displayAvatarURL())
          .setDescription(`<@${newMember.id}> was removed from the \`\`${role.name}\`\` role`)
          .setFooter('Vetrilox', client.user.displayAvatarURL())
          .setColor('BLUE')
          client.guilds.cache.get(newMember.guild.id).channels.cache.get(channel).send(embed)
        }
      }
    } else {
      for(i=0; i < newMember._roles.length; i++){
        if(!oldMember._roles.includes(newMember._roles[i])){
          const role = newMember.guild.roles.cache.get(newMember._roles[i])
          const embed = new Discord.MessageEmbed()
          .setAuthor(newMember.user.tag, newMember.user.displayAvatarURL())
          .setDescription(`<@${newMember.id}> was given the \`\`${role.name}\`\` role`)
          .setFooter('Vetrilox', client.user.displayAvatarURL())
          .setColor('BLUE')
          client.guilds.cache.get(newMember.guild.id).channels.cache.get(channel).send(embed)
  
        }
      }
    } 
  });

client.on('guildMemberRemove', member => {
    const welcomedb = new JSONdb(`./Servers/${member.guild.id}.sqlite`)
    const channel = welcomedb.get('welcomechannel')
    const leaveembed = new Discord.MessageEmbed()
    .setTitle('Member Left')
    .setColor('GREEN')
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`${member.user.username} has left\nLet's hope they return!\n\nThis server now has ${member.guild.memberCount} members`)
    .setFooter('Vetrilox', client.user.displayAvatarURL())
    if(channel !== undefined){
    client.guilds.cache.get(member.guild.id).channels.cache.get(channel).send(leaveembed)
    } else {
        return;
    }
})




client.on('guildCreate',  guild => {
    fs.writeFile(`./Servers/${guild.id}.sqlite`, "", (err) => {})
    setTimeout(() => {
        const push = new JSONdb(`./Servers/${guild.id}.sqlite`)

	  push.set(`prefix`, config.prefix)
      push.set(`autorole`, [])
      push.set(`disabled`, [])
    }, 1000)
    const embed = new Discord.MessageEmbed()
    .setAuthor(guild.name, guild.iconURL())
    .setTitle('Join Guild')
  .addField('Guild:', `Name: ${guild.name}\nID: ${guild.id}`)
  .addField('Stats:', `Users: ${guild.memberCount}\nBoosts: ${guild.premiumSubscriptionCount}`)
  .setThumbnail(guild.iconURL())
  .setFooter(`Now in ${client.guilds.cache.size} servers`)
  .setColor('BLUE')
  client.channels.cache.get('775556117350318090').send(embed)
  client.channels.cache.get('834613838669676595').setName(`Vetrilox: ${client.guilds.cache.size}`)

})
client.on('guildDelete', guild => {
    if(guild.id === undefined) return;
    fs.unlinkSync(`./Servers/${guild.id}.sqlite`)
    const embed = new Discord.MessageEmbed()
  .setAuthor(guild.name, guild.iconURL())
  .setTitle('Leave Guild')
  .addField('Guild:', `Name: ${guild.name}\nID: ${guild.id}`)
  .addField('Stats:', `Users: ${guild.memberCount}\nBoosts: ${guild.premiumSubscriptionCount}`)
  .setThumbnail(guild.iconURL())
  .setFooter(`Now in ${client.guilds.cache.size} servers`) 
   .setColor('RED')
  client.channels.cache.get('775556117350318090').send(embed)
  client.channels.cache.get('834613838669676595').setName(`Vetrilox: ${client.guilds.cache.size}`)
})










  


  


	client.on("message", async message => {
        const Invite = new Discord.MessageEmbed()
.setTitle('Invite')
.setDescription('Add Vetrilox to your server: [Click Here](https://discord.com/oauth2/authorize?client_id=492476933808979979&scope=bot&permissions=536898646)')
.setFooter('Vetrilox', client.user.displayAvatarURL())






  const ping = new Discord.MessageEmbed()
  .setTitle('Pong!')
  .addField('API Latency', `${Math.round(client.ping)}ms`)
.setFooter('Vetrilox', client.user.displayAvatarURL())
      const db = new JSONdb(`./Servers/${message.guild.id}.sqlite`)

	  const prefix = db.get(`prefix`) === undefined ? config.prefix : db.get('prefix')
      
      const userdb = new JSONdb(`./Users/${message.author.id}.sqlite`)

	  


	   let msgping1 = new Date();

    let botping = new Date() - message.createdAt;

    let msgping2 = new Date() - msgping1;

    let pingembed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .addField('API Ping : ', Math.floor(client.ping) + 'ms')
        .addField('Bot Ping : ', Math.floor(botping) + 'ms')
        .addField('Message Ping : ', '~' + Math.round(msgping2) + 'ms')
        .setTimestamp()
        .setFooter(`requested by ${message.author.tag}`);
  const args = message.content.split(" ").slice(1)
let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    }
	let region = {
		"brazil": ":flag_br: Brazil",
		"eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa",
        "europe": ":flag_eu: Europe"
    };
    const owner = await client.users.fetch(message.guild.ownerID)
        const serverembed = new Discord.MessageEmbed()
		.setColor('BLUE')
            .setTitle(message.guild.name)
			.setThumbnail(message.guild.iconURL())
           .addField('Owner', `<@${owner.id}>`, true)
			.addField('Acronym', message.guild.nameAcronym, true)
			.addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
            .addField('Explicit Content Filter', message.guild.explicitContentFilter, true)
			.addField('Owner ID', owner.id, true)
            .addField("Server ID", message.guild.id, true)

            .addField("**Stats**", `**Users:** ${message.guild.memberCount}\n**Roles:** ${message.guild.roles.cache.size}\n**Channels:** ${message.guild.channels.cache.size}\n**Emojis:** ${message.guild.emojis.cache.size}`, true)
			.addField('**Settings**', '**Region:** ' + region[message.guild.region] + '\n**Verification Level:** ' + message.guild.verificationLevel + '\n**Partnered?:** ' + message.guild.partnered + '\n**Boosters:** ' + message.guild.premiumSubscriptionCount + '\n**Tier Level:** ' + message.guild.premiumTier, true)
            .addField('Roles', `<@&${message.guild.roles.cache.map(c => c.id).splice(1, 15).join('>, <@&')}> + ${message.guild.roles.cache.map(c => c.id).splice(15).length} more`)

        .setTimestamp()
.setFooter('Vetrilox', client.user.displayAvatarURL())


const error = new Discord.MessageEmbed()
.setTitle('Error')
.setDescription('Command not Found')
const nsfwerror = new Discord.MessageEmbed()
.setTitle('Error')
.setDescription('This is not an NSFW Channel')

if (message.author.bot) return;
if(message.content.toLowerCase().startsWith(`${prefix}prefix`)){

	 const currentprefix = new Discord.MessageEmbed()
  .setTitle('Vetrilox')
  .setDescription(`This servers prefix is **${prefix}**`)
.setFooter(`Use ${prefix}prefix <prefix> to change the prefix`, client.user.displayAvatarURL())
.setColor('WHITE')
if(!args[0]) return message.channel.send(currentprefix);
if(args[0]) {
    const disabled = db.get('disabled')
    if(disabled.includes('configuration')) return message.channel.send('The `Configuration` category is disabled for this server')
	if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot set the server prefix')
	db.set('prefix', args[0])

 const newprefix = new Discord.MessageEmbed()
 .setDescription('✅|This servers prefix has been changed to ' + args[0])
 .setColor('GREEN')
  message.channel.send(newprefix)
}
}
       else if (message.content.toLowerCase() === prefix + `help`) {
		    const embed = new Discord.MessageEmbed()
            .setAuthor('Command List')
            .setDescription(`Prefix: \`${prefix}\``)
            .addField('ℹ️ Information', '`Serverinfo`, `Botinfo`, `Whois`, `Uptime`, `Invite`, `Vote`, `Policy`, `Support`, `Country`, `Superhero`')
            .addField('🔧 Moderation', '`Ban`, `Kick`, `Report`')
            .addField('🔧 Auto-Moderation', '`LinkDetection`, `SwearDetection`, `CapsDetection`, `Gifdetection`, `Spoilerdetection`, `Ghostpingdetection`')
            .addField('🎉 Entertainment', '`8ball`, `Love`, `Clapify`, `Trump`, `FMK`, `Joke`, `RandomNumber`, `Embed`, `Baconipsum`, `Robohash`')
           .addField('🛠️ Utility', '`Poll`, `Google`, `Wikipedia`, `Shorten`, `Morse`, `QRCode`, `Suggest`, `Roleinfo`, `Channelinfo`, `Membercount`, `Permissions`, `Channeltopic`, `Emojis`, `Guildicon`, `Discrim`, `Members`, `Createtextchannel`, `Spotify`, `Genius`, `Lyrics`, `Avatar`, `Today`')
           .addField('🪛 Configuration', '`Config`, `Setsuggestionschannel`, `Setrolelogchannel`, `Setmessagelogchannel`,`Prefix`, `Setwelcomechannel`, `Autorole`, `Setreportschannel`')
           .addField('📸 Image Manipulation', '`Deepfry`, `Blurpify`, `Captcha`, `Changemymind`, `Trumptweet`')
           .addField('🖼️ Images', '`Cat`, `Dog`, `Budgie`, `Koala`, `Redpanda`, `Panda`, `Fox`')
           .addField('🪙 Economy', '`Balance`, `Daily`, `Rob`, `Deposit`, `Withdraw`, `Jobs`, `Apply`, `Work`')
           .addField('🎫 Tickets', '`Createticket`, `Closeticket`, `Adduser`, `RemoveUser`, `Setticketlogschannel`, `DMonClose`, `SetSupportRole`')
           .addField('💰 Premium', '`Antijoin`, `Enable`, `Disable`, `Weekly`')
           .addField('🤷‍♂️ Random', '`Plushy`, `Fitnessgram`, `Stickbugged`')
           if(message.channel.nsfw === false){
               embed.addField('🔞 NSFW', '`Move to an NSFW Channel to show NSFW Commands`')
           } else {
            embed.addField('🔞 NSFW', '`Redtube`')
           }
embed.setColor('BLUE')
       embed.setFooter('Vetrilox', client.user.displayAvatarURL())
       message.channel.send(embed)
	   
             
        
        }else if (message.content.toLowerCase().match(new RegExp(`^<@!?${client.user.id}>`))) {
		  const currentprefix = new Discord.MessageEmbed()
  .setTitle('Vetrilox')
  .setDescription(`This servers prefix is **${prefix}**`)
.setFooter('Vetrilox', client.user.displayAvatarURL())
.setColor('WHITE')
  message.channel.send(currentprefix)
	  }else if (message.content.toLowerCase() === prefix + "botinfo" || message.content.toLowerCase() === prefix + "bi") {
			let { version } = require("discord.js");

            

            let days = 0;
            let week = 0;
            let uptime = ``
            let totalSeconds = (client.uptime / 1000);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            if (hours > 23) {
                days = days + 1;
                hours = 0;
            }

            if (days == 7) {
                days = 0;
                week = week + 1;
            }

            if (week > 0) {
                uptime += `${week} week, `;
            }

            if (minutes > 60) {
                minutes = 0;
            }

            uptime += `${days}d, ${hours}h, ${minutes}m, ${seconds}s`
      const clientembed = new Discord.MessageEmbed()
	  .setAuthor('Vetrilox')
          .setColor('BLUE')
          .setThumbnail(client.user.displayAvatarURL())
          .addField("General", `Name: ${client.user.username}\nDiscriminator: ${client.user.discriminator}\nPrefix: v!`)
          .addField('Statistics', `Guilds: ${client.guilds.cache.size}\nUsers: ${client.guilds.cache.map(c => c.memberCount).reduce((a, b) => a + b)}\nChannels: ${client.channels.cache.size}`)
          .setFooter('Vetrilox', client.user.displayAvatarURL())
    message.channel.send(clientembed);
			
  }else if(message.content.toLowerCase().startsWith(prefix + "avatar")){
    const disabled = db.get('disabled')
    if(disabled.includes('entertainment')) return message.channel.send('The `Entertainment` category is disabled for this server')
   const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
   message.channel.send(new Discord.MessageEmbed().setImage(member.user.displayAvatarURL()))   
    
    
  }
    else if(message.content.toLowerCase() === prefix + "serverinfo" || message.content.toLowerCase() === prefix + "si"){
        
    message.channel.send(serverembed);
  }else if(message.content.toLowerCase() === prefix + "invite"){
    message.channel.send(Invite);
	} if (message.content.toLowerCase().startsWith(prefix + "say")) {
            const sayMessage = args.join(" ");
            message.delete().catch(O_o => { });
           
            message.channel.send(new Discord.MessageEmbed().setDescription(sayMessage));
        } else if (message.content.toLowerCase().startsWith(prefix + "kick")) {
            const disabled = db.get('disabled')
        if(disabled.includes('moderation')) return message.channel.send('The `Moderation` category is disabled for this server')
            if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(new Discord.MessageEmbed().setAuthor('I Am Missing Permissions').setDescription('```KICK_MEMBERS```'))
            if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions').setDescription('```KICK_MEMBERS```'))
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!member) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}kick <mention | id>`))
            member.kick().catch(err => {
                return message.channel.send(new Discord.MessageEmbed().setDescription(`*${member.user.tag} could not be kicked*`))
 
            })
            message.channel.send(new Discord.MessageEmbed().setDescription(`*${member.user.tag} has been kicked*`))
            const modlogs = db.get(member.user.id);
            let reasonn;
            if(reason){
                reasonn = reason
            } else {
                reasonn = "Not Provided"
            }
           if(!modlogs){
               db.set(member.user.id, {modlogs: [{
                   "punishment": "Kick",
                   "Time": new Date(Date.now()).toLocaleString(),
                   "Moderator": message.author.tag,
                   "Reason": reasonn
               }]})
           } else {
               const llogs = db.get(member.user.id)
               const logs = llogs.modlogs;
               logs.push({
                "punishment": "Kick",
                "Time": new Date(Date.now()).toLocaleString(),
                "Moderator": message.author.tag,
                "Reason": reasonn
               })
               db.set(member.user.id, {modlogs: logs})
           }
        } else if (message.content.toLowerCase().startsWith(prefix + "ban")) {
            const disabled = db.get('disabled')
        if(disabled.includes('moderation')) return message.channel.send('The `Moderation` category is disabled for this server')
           if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed().setAuthor('I Am Missing Permissions').setDescription('```BAN_MEMBERS```'))
           if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions').setDescription('```BAN_MEMBERS```'))
           const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
           if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}ban <mention | id>`))
           if(!member) return message.channel.send(new Discord.MessageEmbed().setDescription(`I cannot find this user`))
           if(member.bannable === false) return message.channel.send(new Discord.MessageEmbed().setDescription('I cannot ban this user'))
           const reason = message.content.split(' ').splice(2).join(' ')
           if(!reason){
           member.ban()
           } else {
               member.ban({reason: reason})
           }
           message.channel.send(new Discord.MessageEmbed().setDescription(`*${member.user.tag} has been banned*`))

           const modlogs = db.get(member.user.id)
           let reasonn;
           if(reason){
               reasonn = reason
           } else {
               reasonn = "Not Provided"
           }
           if(!modlogs){
               db.set(member.user.id, {modlogs: [{
                   "punishment": "Ban",
                   "Time": new Date(Date.now()).toLocaleString(),
                   "Moderator": message.author.tag,
                   "Reason": reasonn
               }]})
           } else {
               const llogs = db.get(member.user.id)
               const logs = llogs.modlogs;
               logs.push({
                "punishment": "Ban",
                "Time": new Date(Date.now()).toLocaleString(),
                "Moderator": message.author.tag,
                "Reason": reasonn
               })
               db.set(member.user.id, {modlogs: logs})
           }
        }else if (message.content.toLowerCase().startsWith(prefix + "warn")) {
            const disabled = db.get('disabled')
        if(disabled.includes('moderation')) return message.channel.send('The `Moderation` category is disabled for this server')
           if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions').setDescription('```MANAGE_GUILD```'))
           const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
           if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}warn <mention | id> <reason>`))
           if(!member) return message.channel.send(new Discord.MessageEmbed().setDescription(`I cannot find this user`))
           const reason = message.content.split(' ').splice(2).join(' ')
           if(!reason) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}warn <mention | id> <reason>`))
           message.channel.send(new Discord.MessageEmbed().setDescription(`*${member.user.tag} has been warned for ${reason}*`))

           const modlogs = db.get(member.user.id)
           if(!modlogs){
               db.set(member.user.id, {modlogs: [{
                   "punishment": "Warn",
                   "Time": new Date(Date.now()).toLocaleString(),
                   "Moderator": message.author.tag,
                   "Reason": reason
               }]})
           } else {
               const llogs = db.get(member.user.id)
               const logs = llogs.modlogs;
               logs.push({
                "punishment": "Warn",
                "Time": new Date(Date.now()).toLocaleString(),
                "Moderator": message.author.tag,
                "Reason": reason
               })
               db.set(member.user.id, {modlogs: logs})
           }
        }else if (message.content.toLowerCase().startsWith(prefix + "modlogs")) {
            if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions').setDescription('```MANAGE_GUILD```'))
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!member) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}modlogs <mention | id>`))
            if(db.get(member.user.id) === undefined) return message.channel.send('This user has no mod logs')
            let logs;
            if(!args[1]){
                logs = db.get(member.user.id).modlogs.splice(0, 5)
            } else if(args[1] === "2"){
                logs = db.get(member.user.id).modlogs.splice(5, 10)

            }else if(args[1] === "3"){
                logs = db.get(member.user.id).modlogs.splice(10, 15)

            }else if(args[1] === "4"){
                logs = db.get(member.user.id).modlogs.splice(15, 20)

            }
            const array = []
            for(i=0; i<logs.length;i++){
                array.push(`Punishment: ${logs[i].punishment}\nTime: ${logs[i].Time}\nReason: ${logs[i].Reason}\nModerator: ${logs[i].Moderator}`)
            }
            const embed = new Discord.MessageEmbed()
            if(db.get(member.user.id).modlogs.length >= 5){
            embed.setAuthor(`Modlogs for ${member.user.tag} | Page 1`)
            } else {
                embed.setAuthor(`Modlogs for ${member.user.tag}`)
            }
            embed.setDescription(array.join('\n\n'))
            .setColor('BLUE')
            .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(embed)

        }
            else if (message.content.toLowerCase().startsWith(prefix + "report")) {
            const disabled = db.get('disabled')
        if(disabled.includes('moderation')) return message.channel.send('The `Moderation` category is disabled for this server')
            if(db.get('reportchannel') === undefined) return message.channel.send(new Discord.MessageEmbed().setDescription('Report channel has not been setup; Please ask an admin to do this').setColor("RED"))
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!member) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}report <mention | id> <reason>`))
            const reason = message.content.split(" ").splice(2).join(" ")
            if(!reason) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}report <mention | id> <reason>`))

            const embed = new Discord.MessageEmbed()
            .setTitle('User Report')
            .setDescription(`${message.author.tag} has reported ${member.user.tag} for \`${reason}\``)
            .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.guild.channels.cache.get(db.get('reportchannel')).send(embed)
            const modlogs = db.get(member.user.id)
            let reasonn;
            if(reason){
                reasonn = reason
            } else {
                reasonn = "Not Provided"
            }
            if(!modlogs){
                userdb.set(member.user.id, {modlogs: {
                    "punishment": "Report",
                    "Time": new Date(Date.now()).toLocaleString(),
                    "Moderator": message.author.tag,
                    "Reason": reasonn
                }})
            } else {
                const llogs = db.get(member.user.id)
                const logs = llogs.modlogs;
                logs.push({
                 "punishment": "Report",
                 "Time": new Date(Date.now()).toLocaleString(),
                 "Moderator": message.author.tag,
                 "Reason": reasonn
                })
            }
        }else if (message.content.toLowerCase().startsWith(prefix + "setreportschannel")) {
            const disabled = db.get('disabled')
    if(disabled.includes('configuration')) return message.channel.send('The `Configuration` category is disabled for this server')
            if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions').setDescription('```ADMINISTRATOR```'))
            const channel = message.mentions.channels.first()
            if(args[0] === "disable"){
                if(db.get('reportchannel') === undefined) return message.channel.send('The reports channel for this server has not been set')
                db.delete('reportchannel')
                return message.channel.send(new Discord.MessageEmbed().setDescription('The Report Module has been Disabled'))
            }
            if(!channel) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}setreportschannel <channel_mention>`))
            db.set('reportchannel', channel.id)
            message.channel.send(`Reports will be sent to <#${channel.id}>`)
            
        }else if (message.content.toLowerCase().startsWith(prefix + "purge")) {
            // This command removes all messages from all users in the channel, up to 100.
            if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply('You do not have permission to use this command!')


            // get the delete count, as an actual number.
            const deleteCount = parseInt(args[0], 10);

            // Ooooh nice, combined conditions. <3
            if (!deleteCount || deleteCount < 2 || deleteCount > 100)
                return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
const one = parseInt(1)
            // So we get our messages, and delete them. Simple enough, right?
            const fetched = await message.channel.messages.fetch({ limit: deleteCount });
			const purgeerror = new Discord.MessageEmbed()
			.setDescription(`Couldn't delete messages because of: ${error}`)
            message.channel.bulkDelete(fetched).catch(error => message.channel.send(purgeerror));


			const purgesuccess = new Discord.MessageEmbed()
			.setDescription('Deleted ' + deleteCount + ' messages')
           const sentMessage = await message.channel.send(purgesuccess)
		   await sentMessage.delete({ timeout: 1000 });

        }else if(message.content.toLowerCase().startsWith  (prefix + 'eval')) {
	  if(message.author.id !== '381710555096023061') return message.reply('You do not have permission to use this command!')
		 const code = args.join(" ");
  const token = client.token.split("").join("[^]{0,2}");
  const rev = client.token.split("").reverse().join("[^]{0,2}");
  const filter = new RegExp(`${token}|${rev}`, "g");
  try {
    let output = eval(code);
    if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
    output = inspect(output, { depth: 0, maxArrayLength: null });
    output = output.replace(filter, "[TOKEN]");
    output = clean(output);
    if (output.length < 1950) {
		const outputembed = new Discord.MessageEmbed()
		.setTitle('Evaluation Successful')
		.setDescription('**Argument**\n\`\`\`' + args[0] + '\`\`\`\n\n**Output**\n\`\`\`' + output + '\`\`\`')
		.setFooter('Vetrilox', client.user.displayAvatarURL())
      message.channel.send(outputembed);
    }

	else {
    	  message.channel.send(`${output}`, {split:"\n", code:"js"});
    }
  } catch (error) {
    message.channel.send(`The following error occured \`\`\`js\n${error}\`\`\``);
 }

  function clean(text)  {
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
   }


}else if(message.content.toLowerCase().startsWith(prefix + "leaveguild")){
    if(message.author.id !== "381710555096023061") return;
    
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}leaveguild <guild_id>`))
    const guild = client.guilds.cache.get(args[0])
    guild.leave()
    message.channel.send(`Successfully left ${guild.name}`)
}else if(message.content.toLowerCase().startsWith(prefix + "permissions")){
    const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

const permissions = require('./utils/permissions.json');

const memberPermissions = member.permissions.toArray()
const finalPermissions = []
for (const permission in permissions) {
    if (memberPermissions.includes(permission)) finalPermissions.push(`+ ${permissions[permission]}`);
    else finalPermissions.push(`- ${permissions[permission]}`);
  }

  const embed = new Discord.MessageEmbed()
    .setTitle(`${member.displayName}'s Permissions`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`\`\`\`diff\n${finalPermissions.join('\n')}\`\`\``)
    .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(member.displayHexColor);
  message.channel.send(embed);
}
else if (message.content.toLowerCase().startsWith(prefix + 'whois') || message.content.toLowerCase().startsWith(prefix + "userinfo") || message.content.toLowerCase().startsWith(prefix + "ui")) {
    const disabled = db.get('disabled')
        if(disabled.includes('moderation')) return message.channel.send('The `Moderation` category is disabled for this server')
            const { stripIndents } = require("common-tags");
            const { getMember, formatDate } = require("./functions.js");
            
            let member;
            if(!args[0]){
                member = message.member
            } else {
                member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
                if(!member) {
                    const user = await client.users.fetch(args[0])
                    if(!user) return message.channel.send(new Discord.MessageEmbed().setDescription('I do not share a server with this user'))
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`Cached: <:denied:781345460358873110>`)
                    .setFooter(user.username, `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                    .setColor('BLUE')
                    .addField('Member information:', stripIndents`
                    **- Bot?:** ${user.bot}`, true)
                    .addField('User information:', stripIndents`**- ID:** ${user.id}
                **- Username**: ${user.username}
                **- Discriminator**: ${user.discriminator}
                **- Tag**: ${user.username}#${user.discriminator}`)
                const supportserver = client.guilds.cache.get('708474977342718005')
              const banList = await supportserver.fetchBans();
              
              if(banList.find(member => member.id === user.id)){
                  embed.addField('\u200B', `**User is banned from the support server**`)
              } else {
                embed.addField('\u200B', `**User is not banned from the support server**`)

              }
                return message.channel.send(embed)
                }
            }







            // Member variables
            const joined = formatDate(member.joinedAt);
            const roles = member.roles.cache
                .map(r => r).join(", ") || 'none';
				const user = client.users.cache.get(member.id);

            // User variables
            const created = formatDate(member.user.createdAt);

            const whoisembed = new Discord.MessageEmbed()
            .setDescription(`Cached: <:approved:781345439429558302>`)
                .setFooter(member.displayName, member.user.displayAvatarURL())
                .setThumbnail(member.user.displayAvatarURL())
                .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
                .addField('Member information:', stripIndents`**- Display name:** ${member.displayName}
				**- Joined at:** ${joined}
				**- Status:** ${member.user.presence.status}
				**- Bot?:** ${member.user.bot}`, true)
                .addField('User information:', stripIndents`**- ID:** ${member.user.id}
            **- Username**: ${member.user.username}
			**- Discriminator**: ${member.user.discriminator}
            **- Tag**: ${member.user.tag}
            **- Created at**: ${created}`)
			.addField('**- Roles:**', `${roles}`)

                .setFooter('Vetrilox', client.user.displayAvatarURL())


            if (member.user.presence.game)
                whoisembed.addField('Currently playing', stripIndents`** Name:** ${member.user.presence.game.name}`);
			const supportserver = client.guilds.cache.get('708474977342718005')
              const banList = await supportserver.fetchBans();
              
              if(banList.find(user => user.id === member.user.id)){
                  whoisembed.addField('\u200B', `**User is banned from the support server**`)
              } else {
                whoisembed.addField('\u200B', `**User is not banned from the support server**`)

              }


            message.channel.send(whoisembed);
        } else if (message.content.toLowerCase().startsWith(prefix + 'love')) {
            const disabled = db.get('disabled')
        if(disabled.includes('entertainment')) return message.channel.send('The `Entertainment` category is disabled for this server')
            let person = message.mentions.members.first() || message.guild.members.cache.get(args[0])

            if (!person || message.author.id === person.user.id) {
                person = message.guild.members.cache.filter(c => !c.id !== message.author.id).random()
            }

            const love = Math.random() * 100;
            const loveIndex = Math.floor(love / 10);
            const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

                const loveembed = new Discord.MessageEmbed()
                .setColor("#ffb6c1")
                .addField(`**${person.displayName}** loves **${message.member.displayName}** this much:`,
                    `💟 ${Math.floor(love)}%\n\n${loveLevel}`)
                .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(loveembed);
         

        } else if (message.content.toLowerCase().startsWith(prefix + '8ball')) {
            const disabled = db.get('disabled')
        if(disabled.includes('entertainment')) return message.channel.send('The `Entertainment` category is disabled for this server')
            if (!args[2]) return message.reply(new Discord.MessageEmbed().setDescription(`${prefix}8ball <question>`));
            let replies = ["Yes.", "No.", "It seems so", "I have no clue.", "dunno", "Should you?", "Maybe", "Please ask another question",
                 "No, stuff off.", "Leave me alone! I'm Sleeping", "Too hard", "What are you, stupid?", "How the hell do you not know that?"
                , "Give me a break", "Gone to lunch, back in 15 minutes.", "The cake is a lie", "I'm sorry the person you were trying to call...",];

            let result = Math.floor((Math.random() * replies.length));
            let question = args.slice(0).join(" ");

            let ballembed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag)
                .setColor("#0c45d6")
                .addField("Question", question)
                .addField("Answer", replies[result])
                .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(ballembed);



        } /*else if (message.content.toLowerCase().startsWith(prefix + 'avatar')) {
            
            let target = message.mentions.users.first() || message.author;
setTimeout(function () {
                message.channel.send({
                files: [
                    {
                        attachment: target.displayAvatarURL,
                        name: "avatar.png"
                    }
                ]
            });
            }, 4000);




        }*/ else if (message.content.toLowerCase().startsWith(prefix + 'clapify')) {
            const disabled = db.get('disabled')
        if(disabled.includes('entertainment')) return message.channel.send('The `Entertainment` category is disabled for this server')
            if (args.length < 1) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}clapify <sentence>`))
            message.channel.send(args.join(':clap:'));

        }else if (message.content.toLowerCase().startsWith(prefix + 'gifsearch')) {

            if (!args[0]) return message.channel.send("Please specify a GIF name");

            gifSearch.random(args[0]).then(
                gifUrl => {

                    let randomcolor = ((1 << 24) * Math.random() | 0).toString(16) //Optional
                    var embed = new Discord.MessageEmbed()
                        .setColor(`#${randomcolor}`)
                        .setImage(gifUrl)
                        .setFooter('Vetrilox', client.user.displayAvatarURL())
                    message.channel.send(embed);
                });


        } else if (message.content.toLowerCase().startsWith(prefix + 'roleinfo') || message.content.toLowerCase().startsWith(prefix + "ri")) {
            const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(role => role.name === args[0]);

            if (!role) {
                role = message.member.roles.highest;
            }

            const roleembed = new Discord.MessageEmbed()
                .setTitle(`Role: ${role.name}`)
                .addField('Hoisted', role.hoist.toString(), true)
                .addField('Creation Date', role.createdAt.toDateString(), true)
                .addField('Editable', role.editable.toString(), true)
                .addField('Managed', role.managed.toString(), true)
                .addField('ID', role.id, true)
                .setColor(role.color)
                .setFooter('Vetrilox', client.user.displayAvatarURL())
            return message.channel.send(roleembed)
        }else if (message.content.toLowerCase().startsWith(prefix + 'channelinfo') || message.content.toLowerCase().startsWith(prefix + "ci")) {
            const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(role => role.name === args[0]);

            if (!channel) {
                channel = message.guild.channels.cache.filter(c => c.type !== "category").first()
            }

            if(channel.type === "voice"){
            const roleembed = new Discord.MessageEmbed()
                .setTitle(`Channel: ${channel.name}`)
                .addField('Type', channel.type, true)
                .addField('Parent ID', channel.parentID, true)
                .addField('User Limit', channel.userLimit, true)
                .addField('BitRate', channel.bitrate, true)
                .addField('ID', channel.id, true)
                .setFooter('Vetrilox', client.user.displayAvatarURL())
            return message.channel.send(roleembed)
        } else if(channel.type === "text"){
            const roleembed = new Discord.MessageEmbed()
                .setTitle(`Channel: ${channel.name}`)
                .addField('Type', channel.type, true)
                .addField('Parent ID', channel.parentID, true)
                .addField('Topic', channel.topic === null ? "N/A" : channel.topic, true)
                .addField('NSFW', channel.nsfw === undefined ? "false" : "true", true)
                .addField('RateLimit', channel.rateLimitPerUser, true)
                .addField('Last Message ID', channel.lastMessageID, true)
                .addField('ID', channel.id, true)
                .setFooter('Vetrilox', client.user.displayAvatarURL())
                return message.channel.send(roleembed)
        }
        } else if (message.content.toLowerCase() === prefix + 'trump') {
            const disabled = db.get('disabled')
        if(disabled.includes('entertainment')) return message.channel.send('The `Entertainment` category is disabled for this server')
                axios.get(api).then(r => {
                let embed = new Discord.MessageEmbed()
                    .setTitle('Here is your trump quote')
                    .setDescription(r.data.message)
                    .setColor('BLUE')
                    .setFooter('Vetrilox', client.user.displayAvatarURL())
                message.channel.send(embed)
				})


        }else if(message.content.toLowerCase() === prefix + "membercount"){
            const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
const embed = new Discord.MessageEmbed()
.setDescription(`Online: ${message.guild.members.cache.filter(c => c.presence.status === "online").size}\nIdle: ${message.guild.members.cache.filter(c => c.presence.status === "idle").size}\n
DnD: ${message.guild.members.cache.filter(c => c.presence.status === "dnd").size}\nInvisible: ${message.guild.members.cache.filter(c => c.presence.status === "invisible").size}\nOffline: ${message.guild.members.cache.filter(c => c.presence.status === "offline").size}`)
message.channel.send(embed)

        } else if (message.content.toLowerCase().startsWith(prefix + 'fmk')) {
            const disabled = db.get('disabled')
        if(disabled.includes('entertainment')) return message.channel.send('The `Entertainment` category is disabled for this server')
            const member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
            if(!member) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}fmk <mention | id>`))
            let replies = ['MARRY :ring:', 'KILL :bomb:', 'FUCK :ok_hand:'];
            let result = Math.floor(Math.random() * replies.length);

            let makifuembed = new Discord.MessageEmbed()

                .setDescription(`**<@${member.user.id}> has been chosen by <@${message.author.id}>**`)
                .setColor('BLUE')
                .addField('They want to', replies[result])
                .setFooter('Vetrilox', client.user.displayAvatarURL())
                .setTimestamp();


            message.channel.send(makifuembed);
        } /* if (message.content.toLowerCase().startsWith(prefix + 'gameinfo') || message.content.toLowerCase().startsWith(prefix + "gi")) {
            if (!args[0]) return message.reply('Please provide the name of a game on steam you wish to see info for\ne.g !gameinfo Half-Life')
			var sentMessage = await message.channel.send(loadingembed);
			sentMessage.delete({ timeout: 3000 });
			const target = client.guilds.cache.get('708474977342718005').members.cache.get(message.author.id);
			if(!target.roles.cache.has('708477002813931520')) return message.channel.send(loadingfailed);
            let game = args[0]
            let steampng = "https://cdn.discordapp.com/attachments/458004691402489856/470344660364034049/steam.png"
            provider.search(game).then(result => {
                provider.detail(result[0].id, "turkey", "tr").then(results => {
                    const embed = new Discord.MessageEmbed()
                        .setAuthor('Steam Store', steampng)
                        .setColor("#36393F")
                        .setTitle(result[0].name)
                        .addField(`Game ID`, result[0].id, true)
                        .setThumbnail(results.otherData.imageUrl)
                        .addField('Types', results.genre, true)
                        .addField('Price', `Normal Price **${results.priceData.initialPrice}** \n
Discounted Price **${results.priceData.finalPrice}** `, true)
                        .addField('Platform', results.otherData.platforms, true)
                        .addField('Metacritic Score', results.otherData.metacriticScore, true)
                        .addField('Features', results.otherData.features, true)
                        .addField('Developer', results.otherData.developer, true)
                        .addField('Publisher', results.otherData.publisher, true)
                        .setColor("#36393F")
                        .setFooter('Vetrilox', client.user.displayAvatarURL())
                    message.channel.send(embed).catch(e => {
                        console.log(e)
                        message.reply('Error has occured or `' + game + '` cannot be found')
                    })
                })
            })
 } */else if (message.content.toLowerCase().startsWith(prefix + 'hastebin')) {
            if (!args[0]) { return message.channel.send("What do you want to post in Hastebin?") }

			var sentMessage = await message.channel.send(loadingembed);
			await sentMessage.delete({ timeout: 3000 });
			const target = client.guilds.cache.get('708474977342718005').members.cache.get(message.author.id);
			if(!target.roles.cache.has('708477002813931520')) return message.channel.send(loadingfailed);
          let haste = args.slice(0).join(" ")

            let type = args.slice(1).join(" ")

            hastebin(haste).then(r => {

                message.channel.send("`Posted to Hastebin at this URL:`  " + r);

            }).catch(console.error);
 }  /*else if (message.content.toLowerCase().startsWith(prefix + 'weather')) {
            weather.find({ search: args.join(" "), degreeType: "C" }, function (err, result) {
                if (err) {
                    return message.channel.send("**Please enter a valid location**")
                }

                //If the place entered is invalid
                if (!args[0]) {
                    message.channel.send("**Please enter a valid location**")
                    return;
                }

                //Variables
                var current = result[0].current //Variable for the current part of the JSON Output
                var location = result[0].location //This is a variable for the location part of the JSON Output

                //Sends weather log in embed
                let weathembed = new Discord.MessageEmbed()
                    .setDescription(`**${current.skytext}**`) //How the sky looks like
                    .setAuthor(`Weather for ${current.observationpoint}`) //Shows the current location of the weater
                    .setThumbnail(current.imageUrl) //Sets thumbnail of the embed
                    .setColor(0x00AE86) //Sets the color of the embed
                    .addField("Timezone", `UTC${location.timezone}`, true) //Shows the timezone
                    .addField("Degree Type", location.degreetype, true) //Shows the degrees in Celcius
                    .addField("Temperature", `${current.temperature}`, true)
                    .addField("Feels like", `${current.feelslike} Degrees`, true)
                    .addField("Winds", current.winddisplay, true)
                    .addField("Humidity", ` ${current.humidity}%`, true)
                    .addField("Day", `${current.day}`, true)
                    .addField("Date", `${current.date}`, true)
                    .setFooter('Vetrilox', client.user.displayAvatarURL())
                //Display when it's called
                message.channel.send(weathembed)

            });
        } */else if (message.content.toLowerCase().startsWith(prefix + 'morse')) {
            const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
            if (!args[0])  return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}morse <text>`)) 

            let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
                morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(","),
                text = args.join(" ").toUpperCase();
            while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
                text = text.replace("Ä", "AE").replace("Ö", "OE").replace("Ü", "UE");
            }
            if (text.startsWith(".") || text.startsWith("-")) {
                text = text.split(" ");
                let length = text.length;
                for (i = 0; i < length; i++) {
                    text[i] = alpha[morse.indexOf(text[i])];
                }
                text = text.join("");
            } else {
                text = text.split("");
                let length = text.length;
                for (i = 0; i < length; i++) {
                    text[i] = morse[alpha.indexOf(text[i])];
                }
                text = text.join(" ");
            }const morsetranslate = new Discord.MessageEmbed()
			.addField('Input', args[0])
			.addField('Output', text)
			.setFooter('Vetrilox', `https://rendernetwork.co/vetriloxtrans.png`)
            return message.channel.send(morsetranslate)

	 }  else if (message.content.toLowerCase().startsWith(prefix + 'joke')) {
        const disabled = db.get('disabled')
        if(disabled.includes('entertainment')) return message.channel.send('The `Entertainment` category is disabled for this server')
            var joke = oneLinerJoke.getRandomJoke();

           
            const jokembed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription(joke.body)
                .setFooter('Vetrilox', client.user.displayAvatarURL())
                message.channel.send(jokembed);
    
        } else if (message.content.toLowerCase().startsWith(prefix + 'random')) {
            const disabled = db.get('disabled')
        if(disabled.includes('entertainment')) return message.channel.send('The `Entertainment` category is disabled for this server')
            if (!args[0]) return message.reply(new Discord.MessageEmbed.setDescription(`${prefix}random <number>`))


          
				var randomNumber = Math.round(Math.random() * args[0]);
            const randomnumber = new Discord.MessageEmbed()
                .setTitle(randomNumber)
                message.channel.send(randomnumber)
         
        }   else if (message.content.toLowerCase().startsWith(prefix + 'uptime')) {
            let days = 0;
            let week = 0;
            let uptime = ``;
            let totalSeconds = (client.uptime / 1000);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            if (hours > 23) {
                days = days + 1;
                hours = 0;
            }

            if (days == 7) {
                days = 0;
                week = week + 1;
            }

            if (week > 0) {
                uptime += `${week} week, `;
            }

            if (minutes > 60) {
                minutes = 0;
            }

            uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

            let uptimeembed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .addField('Uptime', uptime)
                .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(uptimeembed);

        }  else if (message.content.toLowerCase().startsWith(prefix + "qrcode")) {
            const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
            if (!args[0]) { return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}qrcode <text>`)) }

            const qrOutput = tempy.file({ extension: "png" });
            message.channel.startTyping();
            if (args.length > 0) {
                qrcode.toFile(qrOutput, args.join(" "), { margin: 1 }, (error) => {
                    if (error) throw new Error(error);
                    message.channel.stopTyping();
                    message.channel.send({
                        files: [{
                            attachment: qrOutput,
                            name: "qr.png"
                        }]
                    });
                });
            } else {
                message.channel.stopTyping();
                message.reply("you need to provide some text to generate a QR code!");
            }

	}else if(message.content.toLowerCase().startsWith(prefix + "setsuggestionschannel")){
        const disabled = db.get('disabled')
    if(disabled.includes('configuration')) return message.channel.send('The `Configuration` category is disabled for this server')
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions').setDescription('```ADMINISTRATOR```'))

	const welcomechannel =  message.mentions.channels.first()
    var welcome = new JSONdb(`./Servers/${message.guild.id}.sqlite`);
    if(args[0] === "disable"){
        welcome.delete('suggestchannel')
        const newchannel = new Discord.MessageEmbed()
        .setDescription('✅ | Suggestions channel has been disabled')
        return message.channel.send(newchannel)
    }
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}setsuggestionschannel <channel_mention | disable>`))
	var welcome = new JSONdb(`./Servers/${message.guild.id}.sqlite`);
const channel = welcome.set(`suggestchannel`, welcomechannel.id)
const newchannel = new Discord.MessageEmbed()
.setDescription('✅ | Suggestions channel has been set to <#' + welcomechannel.id + '>')
message.channel.send(newchannel)
}else if(message.content.toLowerCase().startsWith(prefix + 'suggest')){
    const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
		const thing = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
		const suggestchannel = thing.get(`suggestchannel`)
		const nosuggest = new Discord.MessageEmbed()
		.setDescription(`❎ | This server has not set their suggestions channel\nUse ${prefix}setsuggestionschannel <channel> to set it.`)
		if(!suggestchannel) return message.channel.send(nosuggest)
  const suggestion = args.join(" ");
if(!suggestion) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}suggest <suggestion>`))
  const suggestionembed = new Discord.MessageEmbed()
  .setTitle('New Suggestion')
  .addField('Suggestion', suggestion)
  .addField('Author', `<@${message.author.id}>`)
.setFooter('Vetrilox', `https://rendernetwork.co/vetriloxtrans.png`)
  client.channels.cache.get(suggestchannel).send(suggestionembed) .then(function (message) {
              message.react("✅")
              message.react("❎")
	})
	const suggestionsent = new Discord.MessageEmbed()
	.setDescription('✅ | Suggestion succesfully sent')
  message.channel.send(suggestionsent)

}else if(message.content.toLowerCase() === prefix + "vote"){
	const voteembed = new Discord.MessageEmbed()
	.setTitle('Vote Links')
    .addField('discord.boats', `https://discord.boats/bot/492476933808979979/vote`)
    .addField('top.gg', `https://top.gg/bot/492476933808979979/vote`)
	.setFooter('Vetrilox', `https://rendernetwork.co/vetriloxtrans.png`)
	message.channel.send(voteembed)
}else if(message.content.toLowerCase() === prefix + "support"){
	const support = new Discord.MessageEmbed()
	.setDescription(`Join the support server [here](https://discord.gg/jx6MkVmBQ6) \nor click this link: https://discord.gg/jx6MkVmBQ6`)
	message.channel.send(support)
}else if(message.content.toLowerCase().startsWith(prefix + "poll")){
    const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
	if(!args[0]) return message.reply(new Discord.MessageEmbed().setDescription(`${prefix}poll <question>`))
		
                const question = args.join(" ")
	const pollembed = new Discord.MessageEmbed()
	.setColor('BLUE')
	.setDescription(question)
	.setFooter(`Initiated by ${message.author.tag}`)
	.setTimestamp()
	message.channel.send(pollembed) .then(function (message) {
              message.react("✅")
              message.react("❎")
	})



}else if (message.content.toLowerCase().startsWith(prefix + 'cat')) {
			
			
    const img = await axios.get('https://some-random-api.ml/img/cat')
    const dogembed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setImage(img.data.link)
        .setFooter('Vetrilox', client.user.displayAvatarURL())
    message.channel.send(dogembed);


} else if (message.content.toLowerCase().startsWith(prefix + 'dog')) {
			
			
			const img = await axios.get('https://some-random-api.ml/img/dog')
            const dogembed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setImage(img.data.link)
                .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(dogembed);


        }

        else if (message.content.toLowerCase().startsWith(prefix + 'budgie')) {
			
            const img = await axios.get('https://some-random-api.ml/img/birb')
            const dogembed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setImage(img.data.link)
                .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(dogembed);

        }else if (message.content.toLowerCase().startsWith(prefix + 'redpanda')) {
			
            const img = await axios.get('https://some-random-api.ml/img/red_panda')
            const dogembed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setImage(img.data.link)
                .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(dogembed);

        }else if (message.content.toLowerCase().startsWith(prefix + 'panda')) {
			
            const img = await axios.get('https://some-random-api.ml/img/panda')
            const dogembed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setImage(img.data.link)
                .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(dogembed);

        }else if (message.content.toLowerCase().startsWith(prefix + 'fox')) {
			
            const img = await axios.get('https://some-random-api.ml/img/fox')
            const dogembed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setImage(img.data.link)
                .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(dogembed);

        }else if (message.content.toLowerCase().startsWith(prefix + 'koala')) {
			
            const img = await axios.get('https://some-random-api.ml/img/koala')
            const dogembed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setImage(img.data.link)
                .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(dogembed);

        }else if(message.content.toLowerCase().startsWith(prefix + 'google')){
            const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
if(!args[0]) return message.reply(new Discord.MessageEmbed().setDescription(`${prefix}google <question>`))
	const arguments = args.join('%20')
const google = new Discord.MessageEmbed()
.setDescription(`Click on the link below to see your results!\nhttps://google.com/?q=${arguments}`)
	message.channel.send(google)
		}else if(message.content.toLowerCase().startsWith(prefix + 'wikipedia')){
            const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
            if(!args[0]) return message.reply(new Discord.MessageEmbed().setDescription(`${prefix}wikipedia <question>`))
                const results = args.join('_')
                const search = args.join('+')
            const res = await fetch(`https://wikipedia.com/wiki/${results}`)
            console.log(res.status)
            if(res.status !== 200){
                message.channel.send(`Click on the link below to see your results!\n<https://en.wikipedia.org/w/index.php?search=${search}>`)
            } else {
                message.channel.send(`Click on the link below to see your results!\nhttps://wikipedia.com/wiki/${results}`)

            }
                    }else if(message.content.toLowerCase().startsWith(prefix + 'embed')){
                        const disabled = db.get('disabled')
        if(disabled.includes('entertainment')) return message.channel.send('The `Entertainment` category is disabled for this server')
			if(!args[0]) return message.reply(new Discord.MessageEmbed().setDescription(`${prefix}embed <arguments>`))

	
			const arguments = args.join(' ')
			const letsembed = new Discord.MessageEmbed()
			.setTitle(`This is ${message.author.tag}'s embed!`)
			.setDescription(`**This is what he has to say:**\n ${arguments}`)
			message.channel.send(letsembed)
		
		}else if (message.content.toLowerCase().startsWith(prefix + 'timer')) {
			let Timer = args[0];

  if(!args[0]){
    return message.channel.send("Please Enter a time period e.g \`\`5s, 10m or 20h\`\`");
  }

  if(args[0] <= 0){
    return message.channel.send("Please Enter a time period e.g \`\`5s, 10m or 20h\`\`");
  }
const timerstart = new Discord.MessageEmbed()
.setDescription(`Timer started for ${ms(ms(Timer), {long: true})}`)
  message.channel.send(timerstart)

  setTimeout(function(){
	  const timerend = new Discord.MessageEmbed()
	  .setDescription(`⏰ | Timer has finished after ${ms(ms(Timer), {long: true})}`)
    message.reply(timerend)

  }, ms(Timer));
} else if(message.content.toLowerCase().startsWith(prefix + "shorten")){
    const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
	if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}shorten <url>`))
	TinyURL.shorten(args[0], function(res, err) {
    if (err)
        console.log(err)
    const shorten = new Discord.MessageEmbed()
	.setAuthor('Here is your shortened link...')
	.addField('Original Link', args[0])
	.addField('Shortened Link', res)
	.setFooter('Vetrilox', client.user.displayAvatarURL())
	message.channel.send(shorten)
});
}else if (message.content.toLowerCase().startsWith(prefix + 'redpanda')) {
					 superagent.get('https://some-random-api.ml/img/red_panda')
							 .end((err, response) => {
									 message.channel.send({ file: response.body.message });
							 });
			 }else if (message.content.toLowerCase() === prefix + "createticket"){
                if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new Discord.MessageEmbed().setAuthor('I Am Missing Permissions').setDescription('```MANAGE_CHANNELS```'))

                const ticketmessage = new Discord.MessageEmbed()
            .setTitle('New Ticket')
            .setDescription('Please explain your issue while you wait for support')
            .setFooter('Use v!t close to close this ticket')
            
            const ticketcreate = new Discord.MessageEmbed()
            .setDescription('Ticket has been opened by ' + message.author.tag)
            const JSONdb = require('simple-json-db')
            const logsdatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                const logschannel = logsdatabase.get('logschannel')
              const roledatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
              const supportrole = roledatabase.get('supportrole')
             let failed;
              if(!supportrole) {
                failed = false
                message.guild.channels.create(message.author.tag, {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: message.author.id,
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: client.user.id,
                            allow: ['VIEW_CHANNEL', 'EMBED_LINKS'],
                
                        }
                
                
                
                    ]
                })
                .then(channel => {
                    channel.send(ticketmessage)
                    channel.setTopic(message.author.id)
                    const ticketopen = new Discord.MessageEmbed()
                .setDescription(`Ticket has been opened in <#${channel.id}>`)
                    message.channel.send(ticketopen)}
                ).catch(err => {
                    message.channel.send('Please make sure I have the \`\`MANAGE_CHANNELS\`\` permission otherwise I cannot create a ticket')
                    failed = true
                })
                
                if(failed === true) return;
                if(logschannel !== undefined) {
                client.guilds.cache.get(message.guild.id).channels.cache.get(logschannel).send(ticketcreate)
                
                }
              } else {
                failed = false
                message.guild.channels.create(message.author.tag, {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: message.author.id,
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: client.user.id,
                            allow: ['VIEW_CHANNEL', 'EMBED_LINKS'],
                
                        },
                    {
                            id: supportrole.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                
                        }
                
                
                
                    ]
                })
                .then(channel => {
                    channel.send(ticketmessage)
                    channel.setTopic(message.author.id)
                    const ticketopen = new Discord.MessageEmbed()
                .setDescription(`Ticket has been opened in <#${channel.id}>`)
                    message.channel.send(ticketopen)}
                ).catch(err => {
                    message.channel.send('Please make sure I have the \`\`MANAGE_CHANNELS\`\` permission otherwise I cannot create a ticket')
                    failed = true
                })
                
                if(failed === true) return;
                if(logschannel !== undefined) {
                client.guilds.cache.get(message.guild.id).channels.cache.get(logschannel).send(ticketcreate)
                
                }
              }
                 
            
            } else if(message.content.toLowerCase() === prefix + "closeticket"){
            
              const JSONdb = require('simple-json-db')
              const roledatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
              const dmdatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
              const dmclose = dmdatabase.get('dmonclose')
              const logdatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
              const logchannel = logdatabase.get('logschannel')
              const user = client.users.cache.get(message.channel.topic)
              if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new Discord.MessageEmbed().setAuthor('I Am Missing Permissions').setDescription('```MANAGE_CHANNELS```'))
              if(!user) return message.channel.send('This is not a ticket channel')
            if(message.channel.name === `${user.username.toLowerCase()}${user.discriminator}`) {
            
              message.react('✅').then(() => message.react('❎'));
            
            const filter = (reaction, user) => {
                return ['✅', '❎'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            
            message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '✅') {
                  reaction.users.remove(message.author.id)
                  message.channel.send('Closing in 5 seconds')
                  setTimeout(function () {
                    message.channel.send('Closing...')
                  }, 4000)
                setTimeout(function () {
                const ticketchannel = client.channels.cache.get(message.channel.id)
                ticketchannel.delete()
                if(dmclose === "enabled") {
                  const dmoncloseembed = new Discord.MessageEmbed()
                  .setDescription(`Your ticket in ${message.guild.name} has been closed`)
                  client.users.cache.get(message.channel.topic).send(dmoncloseembed)
                }
                if(logchannel === undefined || logchannel === null){
            
                } else {
                  const ticketclose = new Discord.MessageEmbed()
                  .setDescription(`Ticket created by <@${message.channel.topic}> has been closed by ${message.author.tag}`)
                  const ticketchannel = client.channels.cache.get(logchannel).send(ticketclose)
            }
            }, 5000)
            }
            
            
            
            
            
                if(reaction.emoji.name === '❎'){
                  reaction.users.remove(message.author.id)
            const ticketnotclose = new Discord.MessageEmbed()
            .setDescription('Ticket will not close')
            message.channel.send(ticketnotclose)
            }}).catch(collected => {
                const ticketnotclose = new Discord.MessageEmbed()
                .setDescription('Ticket will not close')
                message.channel.send(ticketnotclose)
                });
            
            
            } else {
              const ticketnotclose = new Discord.MessageEmbed()
              .setDescription('You cannot use this command in non-ticket channels!')
              message.channel.send(ticketnotclose)
            }
            
            }else if(message.content.toLowerCase().startsWith(prefix + 'setticketlogschannel')){
              const supportformat = new Discord.MessageEmbed()
              .setAuthor(`Usage: ${prefix}setticketlogschannel <channel mention>`)
              if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions').setDescription('```ADMINISTRATOR```'))
              const channel = message.mentions.channels.first();
                if(!channel) return message.channel.send(supportformat)
  
                db.set('logschannel', channel.id)
                message.channel.send(`Logs will now be sent to ${channel}`)
            
            }else if(message.content.toLowerCase().startsWith(prefix + "dmonclose")){
                if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions').setDescription('```ADMINISTRATOR```'))

              const currentdmclose = db.get('dmonclose')
              const dmoncloseformat = new Discord.MessageEmbed()
              .setAuthor(`Usage: ${prefix}dmonclose <disable(d)|enable(e)>\n----------\nDMonClose is currently ` + currentdmclose)
                if(!args[0]) return message.channel.send(dmoncloseformat)
            
                        const dmclose = dmdatabase.get(message.guild.it)
            if(args[0] === "enable" | args[0] === "e"){
                db.set('dmonclose', "enabled")
                message.channel.send('DM on Close has been enabled')
            }
                else if(args[0] === "disable" | args[0] === "d"){
                db.set('dmonclose', 'disabled')
                message.channel.send('DM on Close has been disabled')
            }}else if(message.content.toLowerCase().startsWith(prefix + 'setsupportrole')){
              const supportformat = new Discord.MessageEmbed()
              .setAuthor(`Usage: ${prefix}setsupportrole <role mention>`)
              if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions').setDescription('```ADMINISTRATOR```'))
              const supportrole = message.mentions.roles.first()
              if(!supportrole) return message.channel.send(supportformat)
                 
                db.set('supportrole', supportrole.id)
                message.channel.send(`${supportrole.name} has been set as the support role`)
            }else if(message.content.toLowerCase() === prefix + 'config'){
              
              const config = new Discord.MessageEmbed()
              .setTitle(`${message.guild.name}'s Configuration`)
              .addField('Prefix', prefix, true)
              .addField('Premium', db.get('premium') === undefined ? "False" : "True", true)
              config.addField('\u200B', `**Logs**`)
              config.addField('Welcome Channel', db.get('welcomechannel') === undefined ? `Disabled` : `<#${db.get('welcomechannel')}>`, true)
              config.addField('Role Log Channel', db.get('roleGiven') === undefined ? `Disabled` : `<#${db.get('roleGiven')}>`, true)
              config.addField('Message Log Channel', db.get('messageDelete') === undefined ? `Disabled` : `<#${db.get('messageDelete')}>`, true)
              config.addField('Suggestions Channel', db.get('suggestchannel') === undefined ? `Disabled` : `<#${db.get('suggestchannel')}>`)
              config.addField('\u200B', `**AutoMod**`)
                  config.addField('Link Detection', db.get('linkdetection') === undefined ? `Disabled` : 'Enabled', true)
              
                  config.addField('Swear Detection', db.get('sweardetection') === undefined ? `Disabled` : 'Enabled', true)

                      config.addField('GIF Detection', db.get('gifdetection') === undefined ? `Disabled` : 'Enabled', true)
                      config.addField('Ghostping Detection', db.get('ghostpingdetection') === undefined ? `Disabled` : 'Enabled', true)
                      config.addField('\u200B', `**Tickets**`)
                      config.addField('Logs Channel', db.get('logschannel') === undefined ? `Not Set` : `<#${db.get('logschannel')}>`, true)
                      config.addField('DM on Close', db.get('dmonclose') === undefined ? `Disabled` : `Enabled`, true)
                      config.addField('Support Role', db.get('supportrole') === undefined ? `Not Set` : `<@&${db.get('supportrole')}>`, true)


            config.setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(config)
            }else if(message.content.toLowerCase() === prefix + "reset"){
                if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions').setDescription('```ADMINISTRATOR```'))

              
              const Resetting = new Discord.MessageEmbed()
              .setAuthor(`Resetting your servers configuration`, `https://rendernetwork.co/vetriloxloading.gif`)
              const sentMessage = await message.channel.send(Resetting)
              setTimeout(function () {
                const resettinglogchannel = new Discord.MessageEmbed()
                .setAuthor(`Resetting your Log Channel`, `https://rendernetwork.co/vetriloxloading.gif`)
                sentMessage.edit(resettinglogchannel)
                const JSONdb = require('simple-json-db')
                const logsdatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                logsdatabase.delete('logschannel')
              }, 4000)
              setTimeout(function () {
                const resettingdmonclose = new Discord.MessageEmbed()
                .setAuthor(`Resetting your DmonClose`, `https://rendernetwork.co/vetriloxloading.gif`)
                sentMessage.edit(resettingdmonclose)
                const JSONdb = require('simple-json-db')
                const dmdatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                dmdatabase.set('dmonclose', 'disabled')
              }, 8000)
              setTimeout(function () {
                const JSONdb = require('simple-json-db')
                const roledatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                const supportrole = roledatabase.get('supportrole')
                const resettingsupportrole = new Discord.MessageEmbed()
                .setAuthor(`Resetting your Support Role`, `https://rendernetwork.co/vetriloxloading.gif`)
                sentMessage.edit(resettingsupportrole)
                roledatabase.delete('supportrole')
              }, 12000)
              setTimeout(function () {
                const resettingsupportrole = new Discord.MessageEmbed()
                .setAuthor('Successfully reset configuration')
                sentMessage.edit(resettingsupportrole)
              }, 16000)
            }else if(message.content.toLowerCase().startsWith(prefix + "adduser")){
              const JSONdb = require('simple-json-db')
              const roledatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
              const supportrole = roledatabase.get('supportrole')
              if(message.member.hasPermission('MANAGE_CHANNELS') || message.member.roles.cache.has(supportrole)){
                if(client.users.cache.get(message.channel.topic) === undefined) return message.channel.send('You cannot add users to this channel')
              if(client.users.cache.get(message.channel.topic).username.toLowerCase() + client.users.cache.get(message.channel.topic).discriminator !== message.channel.name) return message.channel.send('You cannot add users to this channel')
              const noargs = new Discord.MessageEmbed()
              .setAuthor(`Usage: ${prefix}adduser (user id)`)
              if(!args[0]) return message.channel.send(noargs)
                message.channel.updateOverwrite(args[0], { VIEW_CHANNEL: true });
                message.channel.send('User has been added to the ticket')
            } else {
                return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions/Support Role').setDescription('```MANAGE_CHANNEL```'))
            }
            
            }else if(message.content.toLowerCase().startsWith(prefix + "removeuser")){
              const JSONdb = require('simple-json-db')
              const roledatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
              const supportrole = roledatabase.get(message.guild.id)
              const dmdatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
              const dmclose = dmdatabase.get(message.guild.id)
                if(message.member.hasPermission('MANAGE_CHANNELS') || message.member.roles.cache.has(supportrole)){
                    if(client.users.cache.get(message.channel.topic) === undefined) return message.channel.send('You cannot add users to this channel')
                    if(client.users.cache.get(message.channel.topic).username.toLowerCase() + client.users.cache.get(message.channel.topic).discriminator !== message.channel.name) return message.channel.send('You cannot remove users from this channel')          
                        const noargs = new Discord.MessageEmbed()
              .setAuthor(`Usage: ${prefix}removeuser (user id)`)
              if(!args[0]) return message.channel.send(noargs)
              message.channel.permissionOverwrites.get(args[0]).delete();
              message.channel.send('User has been removed from the ticket')
            } else {
                return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions/Support Role').setDescription('```MANAGE_CHANNEL```'))
            }
            }else if(message.content.toLowerCase().startsWith(prefix + "setwelcomechannel")){
                const disabled = db.get('disabled')
    if(disabled.includes('configuration')) return message.channel.send('The `Configuration` category is disabled for this server')
                if(message.member.hasPermission('ADMINISTRATOR') || message.author.id === "381710555096023061") {
                    if(args[0] === "disable") {
                        const welcomedb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                        if(welcomedb.get('welcomechannel') === undefined) return message.channel.send('Welcome channel has not been set')
                        welcomedb.delete('welcomechannel')
                        return message.channel.send('Welcome messages have been disabled')
                    } 
                const channel = message.mentions.channels.first()
                if(!channel) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}setwelcomechannel <channel_mention || disable>`))
                const welcomedb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                welcomedb.set('welcomechannel', channel.id)
                message.channel.send(`Welcome messages will be sent to ${channel}`)
                } else {
                     return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions').setDescription('```ADMINISTRATOR```'))
                }
        }else if(message.content.toLowerCase().startsWith(prefix + "setmessagelogchannel")){
            const disabled = db.get('disabled')
    if(disabled.includes('configuration')) return message.channel.send('The `Configuration` category is disabled for this server')
            if(message.member.hasPermission('ADMINISTRATOR') || message.author.id === "381710555096023061") {
                if(args[0] === "disable") {
                    const welcomedb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                    if(welcomedb.get('messageDelete') === undefined) return message.channel.send('Message logs has not been set')
                    welcomedb.delete('messageDelete')
                    return message.channel.send('Message logs have been disabled')
                } 
            const channel = message.mentions.channels.first()
            if(!channel) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}setmessagelogchannel <channel_mention || disable>`))
            const welcomedb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
            welcomedb.set('messageDelete', channel.id)
            message.channel.send(`Message logs will be sent to ${channel}`)
            } else {
                return message.channel.send('You cannot use this command')
            }
    }else if(message.content.toLowerCase().startsWith(prefix + "setrolelogchannel")){
        const disabled = db.get('disabled')
        if(disabled.includes('configuration')) return message.channel.send('The `Configuration` category is disabled for this server')
        if(message.member.hasPermission('ADMINISTRATOR') || message.author.id === "381710555096023061") {
                if(args[0] === "disable") {
                    const welcomedb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                    if(welcomedb.get('roleGiven') === undefined) return message.channel.send('Role Given/Removed log channel has not been set')
                    welcomedb.delete('roleGiven')
                    return message.channel.send('Role Given/Removed log messages have been disabled')
                } 
            const channel = message.mentions.channels.first()
            if(!channel) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}setrolelogchannel <channel_mention || disable>`))
            const welcomedb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
            welcomedb.set('roleGiven', channel.id)
            message.channel.send(`Role Given/Removed log messages will be sent to ${channel}`)
            } else {
               return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions').setDescription('```ADMINISTRATOR```'))
            }
    }else if(message.content.toLowerCase().startsWith(prefix + "linkdetection")){
        const disabled = db.get('disabled')
        if(disabled.includes('auto-moderation')) return message.channel.send('The `Auto-Moderation` category is disabled for this server')
            if(message.member.hasPermission('ADMINISTRATOR')) {
                if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('I cannot enable Link Detection as I do not have \`\`MANAGE_MESSAGES\`\` permission')

                const automodb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}linkdetection <enable | disable>`))
            if(args[0] === "enable"){
                
                automodb.set(`linkdetection`, `true`)
                message.channel.send('Link detection is now on')
            }else if(args[0] === "disable"){
                automodb.delete(`linkdetection`)
                message.channel.send('Link detection is now off')
            }
        }else {
            return message.channel.send('You cannot use this command')
        }
        }else if(message.content.toLowerCase().startsWith(prefix + "spoilerdetection")){
            const disabled = db.get('disabled')
        if(disabled.includes('auto-moderation')) return message.channel.send('The `Auto-Moderation` category is disabled for this server')
            if(message.member.hasPermission('MANAGE_MESSAGES')) {
                if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('I cannot enable Spoiler Detection as I do not have \`\`MANAGE_MESSAGES\`\` permission')

                const automodb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}spoilerdetection <enable | disable>`))
            if(args[0] === "enable"){
                
                automodb.set(`spoilerdetection`, `true`)
                message.channel.send('Spoiler detection is now on')
            }else if(args[0] === "disable"){
                automodb.delete(`spoilerdetection`)
                message.channel.send('Spoiler detection is now off')
            }
        }else {
            return message.channel.send('You cannot use this command')
        }
        }else if(message.content.toLowerCase().startsWith(prefix + "sweardetection")){
            const disabled = db.get('disabled')
        if(disabled.includes('auto-moderation')) return message.channel.send('The `Auto-Moderation` category is disabled for this server')
            if(message.member.hasPermission('MANAGE_MESSAGES')) {
                if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('I cannot enable Swear Detection as I do not have \`\`MANAGE_MESSAGES\`\` permission')

                const automodb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}sweardetection <enable | disable>`))
            if(args[0] === "enable"){
                
                automodb.set(`sweardetection`, `true`)
                message.channel.send('Swear detection is now on')
            }else if(args[0] === "disable"){
                automodb.delete(`sweardetection`)
                message.channel.send('Swear detection is now off')
            }
        }else {
            return message.channel.send('You cannot use this command')
        }
        }else if(message.content.toLowerCase().startsWith(prefix + "ghostpingdetection")){
            const disabled = db.get('disabled')
        if(disabled.includes('auto-moderation')) return message.channel.send('The `Auto-Moderation` category is disabled for this server')
            if(message.member.hasPermission('MANAGE_MESSAGES')) {

                const automodb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}ghostpingdetection <enable | disable>`))
            if(args[0] === "enable"){
                
                automodb.set(`ghostpingdetection`, `true`)
                message.channel.send('GhostPing detection is now on')
            }else if(args[0] === "disable"){
                automodb.delete(`ghostpingdetection`)
                message.channel.send('GhostPing detection is now off')
            }
        }else {
            return message.channel.send('You cannot use this command')
        }
        }else if(message.content.toLowerCase().startsWith(prefix + "gifdetection")){
            const disabled = db.get('disabled')
        if(disabled.includes('auto-moderation')) return message.channel.send('The `Auto-Moderation` category is disabled for this server')
            if(message.member.hasPermission('MANAGE_MESSAGES')) {
                if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('I cannot enable GIF Detection as I do not have \`\`MANAGE_MESSAGES\`\` permission')
                const automodb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}gifdetection <enable | disable>`))
            if(args[0] === "enable"){
                
                automodb.set(`gifdetection`, `true`)
                message.channel.send('GIF detection is now on')
            }else if(args[0] === "disable"){
                automodb.delete(`gifdetection`)
                message.channel.send('GIF detection is now off')
            }
        }else {
            return message.channel.send('You cannot use this command')
        }
        }else if(message.content.toLowerCase().startsWith(prefix + "capsdetection")){
            const disabled = db.get('disabled')
        if(disabled.includes('auto-moderation')) return message.channel.send('The `Auto-Moderation` category is disabled for this server')
            if(message.member.hasPermission('MANAGE_MESSAGES')) {
                if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('I cannot enable Caps Detection as I do not have \`\`MANAGE_MESSAGES\`\` permission')
                const automodb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
                if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}capsdetection <enable | disable>`))
                if(args[0] === "enable"){
                
                automodb.set(`capsdetection`, `true`)
                message.channel.send('GIF detection is now on')
            }else if(args[0] === "disable"){
                automodb.delete(`capsdetection`)
                message.channel.send('GIF detection is now off')
            }
        }else {
            return message.channel.send('You cannot use this command')
        }
        }/*else if(message.content.toLowerCase().startsWith(prefix + "whitelist")){
          const disabled = db.get('disabled')
      if(disabled.includes('auto-moderation')) return message.channel.send('The `Auto-Moderation` category is disabled for this server')
          if(message.member.hasPermission('MANAGE_MESSAGES')) {
              if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('I cannot enable Caps Detection as I do not have \`\`MANAGE_MESSAGES\`\` permission')
              const db = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
              const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
              if(!channel) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}whitelist <channel_id || channel_mention>`).addField('Current whitelisted channels:', db.get('whitelist') === undefined || db.get('whitelist').length === 0 ? 'None': db.get('whitelist').map(c => `<#${c}>`).join('\n')))

              if(db.get('whitelist') === undefined){
                db.set(`whitelist`, [channel.id])
              } else {
                if(db.get('whitelist').includes(channel.id)){
                  const whitelist = db.get('whitelist')
                  const index = whitelist.indexOf(channel.id)
                  if(index > -1){
                    whitelist.splice(index, 1)
                  }
                  db.set('whitelist', whitelist)
                  message.channel.send(`<#${channel.id}> has been removed from the whitelist`)
                } else {
                  const whitelist = db.get('whitelist')
                  whitelist.push(channel.id)
                  db.set('whitelist', whitelist)
                  message.channel.send(`<#${channel.id}> has been added to the whitelist`)
                }
              }
          }else if(args[0] === "disable"){
              automodb.delete(`capsdetection`)
              message.channel.send('GIF detection is now off')
          }
   
      }*/else if(message.content.toLowerCase().startsWith(prefix + "antijoin")){
            const disabled = db.get('disabled')
        if(disabled.includes('auto-moderation')) return message.channel.send('The `Auto-Moderation` category is disabled for this server')
            const nopremium = new Discord.MessageEmbed()
            .setDescription('This server is not premium; Please consult the support servers staff about purchasing premium.')
       .setColor('RED')
            if(db.get('premium') === undefined || db.get('premium') !== true) return message.channel.send(nopremium)
            if(message.member.hasPermission('KICK_MEMBERS')) {
                if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('I cannot enable Anti-Join as I do not have \`\`KICK_MEMBERS\`\` permission')
                const automodb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
            if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}antijoin <enable | disable>`))
            if(args[0] === "enable"){
                automodb.set(`antijoin`, `true`)
                return message.channel.send('Anti-Join has been enabled')
            }else if(args[0] === "disable"){
                automodb.delete(`antijoin`)
               return message.channel.send('Anti-Join has been disabled')
            }
        }else {
            return message.channel.send('You cannot use this command')
        }
        }else if(message.content.toLowerCase().startsWith(prefix + "autorole")){
            const disabled = db.get('disabled')
    if(disabled.includes('configuration')) return message.channel.send('The `Configuration` category is disabled for this server')
            if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(new Discord.MessageEmbed().setAuthor('You Are Missing Permissions').setDescription('```MANAGE_ROLES```'))
            if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(new Discord.MessageEmbed().setAuthor('I Am Missing Permissions').setDescription('```MANAGE_ROLES```'))
if(!args[0]){
    const embed = new Discord.MessageEmbed()
    .addField('Remove', 'Removes role from the autorole system')
    .addField('Add', `Adds a role to the autorole system`)
    .addField('List', `Lists all roles added to the autorole system`)
    message.channel.send(embed)
} else if(args[0] === "Remove" || args[0] === "remove"){
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
    if(!role) return message.channels.send(new Discord.MessageEmbed().setDescription(`${prefix}autorole remove <mention | id>`))
const roles = db.get('autorole')
if(!roles.includes(role.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`${role.name} has not been added to the autorole system`))
const index = roles.indexOf(role.id);
if (index > -1) {
    roles.splice(index, 1);
}
db.set(`autorole`, roles)
return message.channel.send(new Discord.MessageEmbed().setDescription(`${role.name} has been removed from the autorole system`))
} else if(args[0] === "Add" || args[0] === "add"){
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
    if(!role) return message.channels.send(new Discord.MessageEmbed().setDescription(`${prefix}autorole remove <mention | id>`))
    const db = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
const roles = db.get('autorole')
if(roles.includes(role.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`${role.name} has already been added to the autorole system`))
roles.push(role.id)
db.set(`autorole`, roles)
return message.channel.send(new Discord.MessageEmbed().setDescription(`${role.name} has been added to the autorole system`))
} else if(args[0] === "List" || args[0] === "list"){
    if(db.get('autorole').length === 0){
        return message.channel.send(new Discord.MessageEmbed().setDescription(`You have not added any roles; Use ${prefix}autorole add <role id | role mention> to add a role`))
    } else {
        return message.channel.send(new Discord.MessageEmbed().setDescription(`<@&${db.get('autorole').join('><@&')}>`))

    }
}
}else if(message.content.toLowerCase().startsWith(prefix + "autoreply")){
    const noperms = new Discord.MessageEmbed()
    .setDescription('You cannot use this command')
if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(noperms) 
    if(!args[0]){
        const embed = new Discord.MessageEmbed()
        .addField('Add', `Adds a trigger word`)
        .addField('Delete', `Deletes a trigger word`)
        .addField('List', `Lists all trigger words`)
        return message.channel.send(embed)
    }
    if(args[0] === "add" || args[0] === "Add"){
        const reply = tagcontext = message.content.split(" ").slice(3).join(" ");
        if(!args[1]) {
            const embed = new Discord.MessageEmbed()
            .setTitle('Autoreply Add Usage')
            .setDescription(`${prefix}autoreply add <trigger word> <reply>`)
            return message.channel.send(embed)
        }else if(!args[2]){
            const embed = new Discord.MessageEmbed()
            .setTitle('Autoreply Add Usage')
            .setDescription(`${prefix}autoreply add <trigger word> <reply>`)
            return message.channel.send(embed)
        }
       
       
            if(db.get('autoreply') === undefined){
                
                db.set('autoreply', [{[args[1]]: reply}])
               return message.channel.send(`\`\`${args[1]}\`\` will reply with \`\`${reply}\`\``)

            } else {
                
                const replies = db.get('autoreply')
                
                for(i =0; i < replies.length; i++){
                    const trigger = Object.keys(replies[i]).toString()
                   if(trigger.toLowerCase() === args[1].toLowerCase()){
                       return message.channel.send('This trigger word already exists; Please choose a different one')
                   }
                    }
                replies.push({[args[1]]: reply})
                db.set('autoreply', replies)
               return message.channel.send(`\`\`${args[1]}\`\` will reply with \`\`${reply}\`\``)

            }
        }
        

    else if(args[0] === "delete" || args[0] === "Delete"){
        if(!args[1]) {
            const embed = new Discord.MessageEmbed()
            .setTitle('Autoreply Delete Usage')
            .setDescription(`${prefix}autoreply delete <trigger word>`)
            return message.channel.send(embed)
        }
       const replies = db.get('autoreply')
       let count = 0
       for(i =0; i < replies.length; i++){
        const trigger = Object.keys(replies[i]).toString()
        if(trigger.toLowerCase() === args[1].toLowerCase()){
            count++
        }
       }
if(count === 0) return message.channel.send('Trigger word not found.')
let index;
for(i =0; i < replies.length; i++){
    console.log(Object.keys(replies[i]).toString())
if(Object.keys(replies[i]).toString() === args[1]){
num = replies.indexOf(replies[i])
if(num > -1){
    index = num
}

}

}
if(index === undefined){
    return message.channel.send('Could not delete trigger word')
} else {
    replies.splice(index, 1)
    db.set('autoreply', replies)
return message.channel.send(`\`\`${args[1]}\`\` has been removed from autoreply`)
}

}

else if(args[0] === "list" || args[0] === "List"){
    const replies = db.get('autoreply')
    const wordList = []


for(i =0; i < replies.length; i++){
const trigger = Object.keys(replies[i])
wordList.push(`**${trigger}** - \`${replies[i][trigger]}\``)
}

    
const embed = new Discord.MessageEmbed()
.setTitle('Autoreply')
.setDescription(wordList.join('\n'))
message.channel.send(embed)
}
}else if(message.content.toLowerCase() === prefix + "today"){
    const disabled = db.get('disabled')
        if(disabled.includes('entertainment')) return message.channel.send('The `Entertainment` category is disabled for this server')
    axios.get('http://history.muffinlabs.com/date').then(res => {
        const events = res.data.data.Events;
        const event = events[Math.floor(Math.random() * events.length)];
        const embed = new Discord.MessageEmbed()
            .setColor(0x00A2E8)
            .setURL(res.url)
            .setTitle(`On this day (${res.data.date})...`)
            .setTimestamp()
            .setDescription(`${event.year}: ${event.text}`)
            .setFooter('Vetrilox', client.user.displayAvatarURL())
        return message.channel.send(embed).catch(console.error);
})
}

// IMAGES
else if(message.content.toLowerCase() === prefix + "blurpify"){
     const member = message.member
    const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=blurpify&image=${member.user.displayAvatarURL()}`));
			const json = await res.json();
    const embed = new Discord.MessageEmbed()
    .setImage(json.message)
    message.channel.send(embed)
}else if(message.content.toLowerCase() === prefix + "captcha"){
     const member = message.member
    const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=captcha&username=${member.user.username}&url=${member.user.displayAvatarURL({ format: 'png', size: 512 })}`));
			const json = await res.json();
    const embed = new Discord.MessageEmbed()
    .setImage(json.message)
    message.channel.send(embed)
}else if(message.content.toLowerCase() === prefix + "deepfry"){
    const member = message.member
   const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${member.user.displayAvatarURL({ format: 'png', size: 512 })}`));
           const json = await res.json();
   const embed = new Discord.MessageEmbed()
   .setImage(json.message)
   message.channel.send(embed)
}else if(message.content.toLowerCase().startsWith(prefix + "changemymind")){
    const text = args.join(" ")
    if(!text) return message.channel.send(new Discord.MessageEmbed().setDescription(`Usage: ${prefix}changemymind <message>`))
   const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`));
           const json = await res.json();
   const embed = new Discord.MessageEmbed()
   .setImage(json.message)
   message.channel.send(embed)
}else if(message.content.toLowerCase().startsWith(prefix + "trumptweet")){
    const text = args.join(" ")
    if(!text) return message.channel.send(new Discord.MessageEmbed().setDescription(`Usage: ${prefix}trumptweet <message>`))
   const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`));
           const json = await res.json();
   const embed = new Discord.MessageEmbed()
   .setImage(json.message)
   message.channel.send(embed)
}

        else if(message.content.toLowerCase() === prefix + "policy"){
            const policy = new Discord.MessageEmbed()
            .setTitle('Vetrilox Privacy Policy')
            .addField('What information is stored', `Vetrilox, to help maintain a smooth experience, stores channel IDs and Guild IDs as well as boolean information for the toggleable features`)
        .addField('Why we store the information and how we use it.', `We store this information to help maintain a smooth experience and to provide features to your liking`)
        .addField('Who gets this data?', `Channel IDs and Guild IDs are accessible by the developers only`)
        .addField('How to Remove your data.', `If you would like your data removed, please join our [support server](https://discord.gg/TcNjDZW) to request removal.`)
        message.channel.send(policy)
        }else if(message.content.toLowerCase().startsWith(prefix + "createtextchannel")){
            const disabled = db.get('disabled')
        if(disabled.includes('moderation')) return message.channel.send('The `Moderation` category is disabled for this server')
            if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new Discord.MessageEmbed().setAuthor('I Am Missing Permissions').setDescription('```MANAGE_CHANNELS```'))
            if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}createtextchannel <channel_name>`))
            message.guild.channels.create(args[0], { type: 'text' }).then(channel => {
            message.channel.send(`Channel created: <#${channel.id}>`)
        })

        }else if(message.content.toLowerCase() === prefix + "restart"){
            if(message.author.id !== "381710555096023061") return;
            exec('pm2 restart 25', (error, stdout, stderr) => {
                if (error) {
                    return message.channel.send('Restart Failed')
                } else {
                    return message.channel.send('Succesfully restarted')
                }
            });



        }else if(message.content.toLowerCase() === prefix + "channeltopic"){
            const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
            let thing;
            if(message.channel.topic === null){
                thing = "This channel does not have a topic"
            } else {
                thing = message.channel.topic
            }

            const embed = new Discord.MessageEmbed()
            .setAuthor('This channel\'s topic is')
            .setDescription(thing)
            .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(embed)

        }else if(message.content.toLowerCase() === prefix + "emojis"){
            const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
            if(message.guild.emojis.cache.size == 0){
                return message.channel.send(new Discord.MessageEmbed().setDescription('This guild has no emojis'))
            } else {
                message.channel.send(new Discord.MessageEmbed().setDescription(message.guild.emojis.cache.map(e => e.toString()).splice(25).join(' '))                .setFooter('Vetrilox', client.user.displayAvatarURL())
                )
            }
        }else if(message.content.toLowerCase() === prefix + "guildicon"){
            const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
            const embed = new Discord.MessageEmbed()
            .setTitle(message.guild.name + ' | Guild Icon')
            .setImage(message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setFooter('Vetrilox', client.user.displayAvatarURL())

            message.channel.send(embed)

        }else if(message.content.toLowerCase().startsWith(prefix + "discrim")){
            const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
            const discrim = args[0] || message.author.discriminator
            const array = []
            client.users.cache.forEach(user => {

                if(user.discriminator === discrim){
                    array.push(`${user.username}#**${user.discriminator}**`)
                }
            })
let output;
            if(array.length === 0){
                output = "No users were found with the discrim of " + discrim
            } else {
                output = array.splice(0, 15).join('\n')
            }

            const embed = new Discord.MessageEmbed()
            .setAuthor(`Discrim: ${discrim}`)
            .setDescription(output)
            .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(embed)




        }else if(message.content.toLowerCase().startsWith(prefix + "members")){
            const disabled = db.get('disabled')
        if(disabled.includes('utility')) return message.channel.send('The `Utility` category is disabled for this server')
            const role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first() || message.guild.roles.cache.find(c => c.name.includes(args.join(" ")))
            if(!role) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}members <role_id | role_mention | role_name>`))
            const array = []
            message.guild.members.cache.forEach(member => {

                if(member.roles.cache.has(role.id)){
                    array.push(`${member.user.tag}`)
                }
            })
let output;
            if(array.length === 0){
                output = `No users were found with the \`${role.name}\` role`
            } else {
                output = array.splice(0, 15).join('\n')
            }

            const embed = new Discord.MessageEmbed()
            .setAuthor(`Users with the \`${role.name}\` role`)
            .setDescription(output)
            .setFooter('Vetrilox', client.user.displayAvatarURL())
            message.channel.send(embed)




        }else if(message.content.toLowerCase().startsWith(prefix + "setpremium")){
            if(message.guild.id !== "708474977342718005") return;
            if(!message.member.roles.cache.has('809926110585946142')) return;
  
            if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription('Supply Guild ID').setColor('BLUE'))
            const guild = client.guilds.cache.get(args[0])
            if(guild === undefined) return message.channel.send('Guild Not Found')
            const dbb = new JSONdb(`./Servers/${args[0]}.sqlite`)
            if(dbb.get('premium') === true) return message.channel.send('Guild is already premium')
            dbb.set('premium', true)
            message.channel.send(`${guild.name} is now a premium guild`)
  
        }else if(message.content.toLowerCase().startsWith(prefix + "removepremium")){
          if(message.guild.id !== "708474977342718005") return;
          if(!message.member.roles.cache.has('809926110585946142')) return;
  
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription('Supply Guild ID').setColor('BLUE'))
          const guild = client.guilds.cache.get(args[0])
          if(guild === undefined) return message.channel.send('Guild Not Found')
          const dbb = new JSONdb(`./Servers/${args[0]}.sqlite`)
          if(dbb.get('premium') === undefined) return message.channel.send('Guild is not premium')
          dbb.delete('premium')
          message.channel.send(`${guild.name} is no longer a premium guild`)
  
      }else if(message.content.toLowerCase().startsWith(prefix + "enable")){
        const nopremium = new Discord.MessageEmbed()
        .setDescription('This server is not premium; Please consult the support servers staff about purchasing premium.')
   .setColor('RED')
        if(db.get('premium') === undefined || db.get('premium') !== true) return message.channel.send(nopremium)
          if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot use this command')
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}enable <category_name>`))
          if(!categories.includes(args[0].toLowerCase())) return message.channel.send(`Incorrect category name. Please choose either \`${categories.join(', ')}\``)

          const disabled = db.get('disabled')
          if(disabled === undefined || disabled.length === 0) return message.channel.send('All categories are enabled')
          if(disabled.includes(args[0].toLowerCase()) === false) return message.channel.send(`The category \`${args[0].toLowerCase()}\` is already enabled`)
          const index = disabled.indexOf(args[0].toLowerCase())
          if(index > -1){
              disabled.splice(index, 1)
          }
          db.set('disabled', disabled)
          message.channel.send(`Successfully enabled category: ${args[0]}`)

        }else if(message.content.toLowerCase().startsWith(prefix + "disable")){
            const nopremium = new Discord.MessageEmbed()
            .setDescription('This server is not premium; Please consult the support servers staff about purchasing premium.')
       .setColor('RED')
            if(db.get('premium') === undefined || db.get('premium') !== true) return message.channel.send(nopremium)
            if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot use this command')
            if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}enable <category_name>`))
            if(!categories.includes(args[0].toLowerCase())) return message.channel.send(`Incorrect category name. Please choose either \`${categories.join(', ')}\``)
  
            const disabled = db.get('disabled')
            if(disabled === undefined){
                db.set('disabled', [args[0]])
            } else {
                if(disabled.includes(args[0].toLowerCase())) return message.channel.send(`The category \`${args[0].toLowerCase()}\` is already disabled`)
            disabled.push(args[0].toLowerCase())
            db.set('disabled', disabled)
            }
            message.channel.send(`Successfully disabled category: ${args[0]}`)
  
          }else if(message.content.toLowerCase().startsWith(prefix + "country")){
              if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor(`Usage: ${prefix}country <country_name>`))
              let failed;
              const res = await axios.get(`https://restcountries.eu/rest/v2/name/${args.join("%20")}`).catch(err => {
                failed = true
                return message.channel.send('Country not found')
              })
              if(failed === true) return;
              const country = res.data[0];
              
              const array = []
              for(i=0; i < country.languages.length; i++){
              const language = country.languages[i]
                  array.push(`iso639_1: ${language.iso639_1}\niso639_2: ${language.iso639_2}\nName: ${language.name}\nNative Name: ${language.nativeName}`)
              }
              
              const embed = new Discord.MessageEmbed()
              .setTitle(country.name)
              .addField('Top Level Domain', country.topLevelDomain, true)
              .addField('Calling Codes', country.callingCodes.join(', '), true)
              .addField('Capital', country.capital, true)
              .addField('Alternate Spellings', country.altSpellings.join(', '), true)
              .addField('Currency', `Symbol: ${country.currencies[0].symbol}\nCode: ${country.currencies[0].code}\nName: ${country.currencies[0].name}`, true)
              .addField('Region', country.region, true)
              .addField('Subregion', country.subregion, true)
              .addField('Timezones', country.timezones.join(', '), true)
              .addField('Languages', array.join('\n\n'), true)
              .setColor('BLUE')
              message.channel.send(embed)
            
          }else if(message.content.toLowerCase().startsWith(prefix + "spotify")){
              if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}spotify <member_mention | member_id>`))
              const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
              if(!member) return message.channel.send('Member Not Found')
              const activities = member.user.presence.activities
              const array = []
              for(i=0;i<activities.length;i++){
                  if(activities[i].syncID !== undefined) {
                  array.push(activities[i].syncID)
                  const data = member.user.presence.activities[i]
              const embed = new Discord.MessageEmbed()
              .setTitle(`${member.user.username} | Spotify`)
              .setDescription(`Listen to this song [here](https://open.spotify.com/track/${data.syncID})`)
              .addField('Song', `${data.details} - ${data.state}`)
              .addField('Album', data.assets.largeText)
              .addField('Time', `${data.timestamps.start.toLocaleString()} - ${data.timestamps.end.toLocaleString()}`)
              .setImage(`https://i.scdn.co/image/${data.assets.largeImage.slice(8)}`);
              message.channel.send(embed)
            }
        }
            if(array.length === 0) return message.channel.send('This user is not listening to music')
          }else if(message.content.toLowerCase().startsWith(prefix + "genius")){
            if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}genius <song_name>`))
            const query = args.join('%20')
           axios({
                method: 'get',
                url: 'https://api.genius.com/search?q=' + query,
                headers: {
                    Authorization: `Bearer ZS2QWEHw45xzl04jw5pH4P7lh9-3jLVWWiKQBXjjI6lqmGK7gzxPPLVXeLlSKV2e`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            }).then(async function(res) {
                if(!res.data.response.hits[0]) return message.channel.send('Song Not Found')
        const data = res.data.response.hits[0].result
        

        const embed = new Discord.MessageEmbed()
        .setTitle(data.full_title)
        .setDescription(`[URL](${data.url})`)
        .setImage(data.song_art_image_url)
        .addField('Statistics', `Page Views: ${data.stats.pageviews}`)
        message.channel.send(embed)
            }).catch(function(err) {
                console.error(err)
            });
            
        }else if(message.content.toLowerCase().startsWith(prefix + "lyrics")){
        if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}lyrics <song_title>`))
        const query = args.join('%20')
        axios({
            method: 'get',
            url: 'https://api.genius.com/search?q=' + query,
            headers: {
                Authorization: `Bearer ZS2QWEHw45xzl04jw5pH4P7lh9-3jLVWWiKQBXjjI6lqmGK7gzxPPLVXeLlSKV2e`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        }).then(async function(res) {
            if(!res.data.response.hits[0]) return message.channel.send('Song Not Found')
    const data = res.data.response.hits[0].result
        const ress = await axios.get(`https://api.lyrics.ovh/v1/${data.primary_artist.name.split(" ").join('%20')}/${data.title.split(" ").join('%20')}`)
        let lyrics;
        if(ress.data.lyrics.length > 2048){
           lyrics = ress.data.lyrics.substring(0, 2048) + "..."
        } else {
            lyrics = ress.data.lyrics
        }
        console.log(lyrics.length)
message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setTitle(`Lyrics for ${data.full_title}`).setDescription(lyrics.replace(/\n\n\n\n/g, '\n\n').replace(/\n\n/g, '\n')))
    })

}else if(message.content.toLowerCase().startsWith(prefix + "superhero")){
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}superhero <hero_name>`))
const res = await axios.get(`https://www.superheroapi.com/api.php/1066904707048626/search/${args[0]}`)
if(res.data.response !== "success") return message.channel.send('Superhero Not Found.')
if(res.data.results.length > 1 && args[1] === undefined) return message.channel.send(`There were multiple search results found; Please specify a number between zero and ${res.data.results.length - 1}`)
const data = res.data.results[args[1] === undefined ? 0 : args[1]];
const embed = new Discord.MessageEmbed()
.setTitle(data.name)
.setThumbnail(data.image.url)
.addField('Powerstats', `Intelligence: ${data.powerstats.intelligence}\nStrength: ${data.powerstats.strength}\nSpeed: ${data.powerstats.speed}\nDurability: ${data.powerstats.durability}\nPower: ${data.powerstats.power}\nCombat: ${data.powerstats.combat}`)
.addField('Biography', `Full Name: ${data.biography["full-name"]}\nAliases: ${data.biography.aliases.join('\n')}\nPlace of Birth: ${data.biography["place-of-birth"]}`)
.addField('Appearance', `Gender: ${data.appearance.gender}\nRace: ${data.appearance.race}\nHeight: ${data.appearance.height.join(' | ')}\nWeight: ${data.appearance.weight.join(' | ')}\nEye Colour: ${data.appearance["eye-color"]}\nHair Colour: ${data.appearance["hair-color"]}`)
message.channel.send(embed)


}else if(message.content.toLowerCase().startsWith(prefix + "redtube")){
    if(message.channel.nsfw === false) return message.channel.send('Command can only be run in NSFW Channels')
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}redtube <search_query>`))
    const query = args.join("%20")
const res = await axios.get(`https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=${query}`)
if(res.data.count === 0) return message.channel.send('No Videos Found.')
const number = Math.floor(Math.random() * res.data.videos.length)
console.log(res.data.videos[number])
const data = res.data.videos[number].video
message.channel.send(data.url)


}else if(message.content.toLowerCase() === prefix + "exchanges-rates"){
const res = await axios.get(`https://api.frankfurter.app//latest?from=USD`)
const data = res.data;
const embed = new Discord.MessageEmbed()
.addField('Amount', data.amount)
.addField('Base', data.base)
.addField('Date', data.date)
.addField('Rates', `AUD: ${data.rates.AUD}\nBGN: ${data.rates.BGN}\nBRL: ${data.rates.BRL}\nCAD: ${data.rates.CAD}\nCHF: ${data.rates.CHF}\nCNY: ${data.rates.CNY}\nCZK: ${data.rates.CZK}\nDKK: ${data.rates.DKK}\nEUR: ${data.rates.EUR}\nGBP: ${data.rates.GBP}\nHKD: ${data.rates.HKD}\nHUF: ${data.rates.HUF}\nIDR: ${data.rates.IDR}\nILS: ${data.rates.ILS}\nINR: ${data.rates.INR}\nISK: ${data.rates.ISK}\nJPY: ${data.rates.JPY}\nKRW: ${data.rates.KRW}\nMXN: ${data.rates.MXN}\nMYR: ${data.rates.MYR}\nNOK: ${data.rates.NOK}\nNZD: ${data.rates.NZD}\nPHP: ${data.rates.PHP}\nPLN: ${data.rates.PLN}\nRON: ${data.rates.RON}\nRUB: ${data.rates.RUB}`)
.setColor('BLUE')
message.channel.send(embed)

}else if(message.content.toLowerCase() === prefix + "baconipsum"){
    const res = await axios.get(`https://baconipsum.com/api/?type=meat-and-filler`)
    const data = res.data;
    const embed = new Discord.MessageEmbed()
    .setDescription(res.data[0])
    .setColor('BLUE')
    message.channel.send(embed)
    
    }else if(message.content.toLowerCase().startsWith(prefix + "robohash")){
        if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`${prefix}robohash <text>`))
        const query = args.join("")
    const embed = new Discord.MessageEmbed()
    .setImage(`https://robohash.org/${query}.png`)
    .setColor('BLUE')
    message.channel.send(embed)
    
    
    }else if(message.content.toLowerCase() === prefix + "plushy"){
      message.channel.send('https://cdn.discordapp.com/avatars/716250356803174511/a_f792f8aa74c6e8776cbaf16a55197b12.webp')
    }else if(message.content.toLowerCase() === prefix + "fitnessgram"){
      message.channel.send('The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly but gets faster each minute after you hear this signal bodeboop. A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark. Get ready!… Start.')
    }else if(message.content.toLowerCase() === prefix + "stickbugged"){
      message.channel.send(`https://media.tenor.com/images/333cf6c5b1aed66544e8b873cb2e4e2b/tenor.gif`)
    }


          // ECONOMY

          else if(message.content.toLowerCase() === prefix + "bal" || message.content.toLowerCase() === prefix + "balance"){
           
              if(fs.existsSync(`./Users/${message.author.id}.sqlite`) === false){
                fs.writeFile(`/Users/${message.author.id}.sqlite`, '', (err) => {})
                    userdb.set('balance', 300)
                    userdb.set('bank', 0)
                    userdb.set('banklimit', 1000)

                    const sentMessage = await message.channel.send('Adding you to the database...')
                    setTimeout(() => {
                        const bal = userdb.get('balance')
                        const bank = userdb.get('bank')
                    const embed = new Discord.MessageEmbed()
              .setTitle(`${message.author.tag} | Balance`)
              .addField('Balance', bal)
              .addField('Bank', bank)
              return sentMessage.edit(embed)
                    }, 2000)
} else {
    const bal = userdb.get('balance')
    const bank = userdb.get('bank')
    const embed = new Discord.MessageEmbed()
              .setTitle(`${message.author.tag} | Balance`)
              .addField('Balance', bal)
              .addField('Bank', bank)
              return message.channel.send(embed)
}
            
              
              
          }else if(message.content.toLowerCase() === prefix + "daily"){
           

            if(fs.existsSync(`./Users/${message.author.id}.sqlite`) === false){
              fs.writeFile(`/Users/${message.author.id}.sqlite`, '', (err) => {})
                 
                  userdb.set('balance', 800)
                  userdb.set('bank', 0)
                  userdb.set('banklimit', 1000)

                  const sentMessage = await message.channel.send('Adding you to the database...')
                  setTimeout(() => {
                      const bal = userdb.get('balance')
                      const bank = userdb.get('bank')
                  const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag} | Balance`)
            .addField('Balance', bal)
            .addField('Bank', bank)
            return sentMessage.edit(embed)
                  }, 2000)
} else {
    const timeout = 86400000;
           const time = userdb.get('dailytimeout')
           if(Date.now() - timeout > time || time === undefined){
  const bal = userdb.get('balance')
  userdb.set('balance', bal + 500)
message.channel.send('500 coins have been added to your account')
userdb.set('dailytimeout', Date.now())
           } else {
               return message.channel.send(`You can use this command in ${prettyMS(timeout - (Date.now() - time))}`)
           }
}
          
            
            
        }else if(message.content.toLowerCase() === prefix + "weekly"){
            const nopremium = new Discord.MessageEmbed()
            .setDescription('You do not have premium; Please consult the support servers staff about purchasing premium.')
       .setColor('RED')
            if(userdb.get('premium') === undefined || userdb.get('premium') !== true) return message.channel.send(nopremium)       
                 if(fs.existsSync(`./Users/${message.author.id}.sqlite`) === false){
              fs.writeFile(`/Users/${message.author.id}.sqlite`, '', (err) => {})
                 
                  userdb.set('balance', 1300)
                  userdb.set('bank', 0)
                  userdb.set('banklimit', 1000)

                  const sentMessage = await message.channel.send('Adding you to the database...')
                  setTimeout(() => {
                      const bal = userdb.get('balance')
                      const bank = userdb.get('bank')
                  const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag} | Balance`)
            .addField('Balance', bal)
            .addField('Bank', bank)
            return sentMessage.edit(embed)
                  }, 2000)
} else {
    const timeout = 604800000;
           const time = userdb.get('weeklytimeout')
           if(Date.now() - timeout > time || time === undefined){
  const bal = userdb.get('balance')
  userdb.set('balance', bal + 1000)
message.channel.send('1000 coins have been added to your account')
userdb.set('weeklytimeout', Date.now())
} else {
    return message.channel.send(`You can use this command in ${prettyMS(timeout - (Date.now() - time))}`)
}
}
          
            
            
        }else if(message.content.toLowerCase().startsWith(prefix + "deposit")){
              if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor(`Usage: ${prefix}deposit <amount>`))
                 if(fs.existsSync(`./Users/${message.author.id}.sqlite`) === false){
              fs.writeFile(`/Users/${message.author.id}.sqlite`, '', (err) => {})
                 
                  userdb.set('bank', 0)
                  userdb.set('balance', 300)
                  userdb.set('banklimit', 1000)
                  const sentMessage = await message.channel.send('Adding you to the database...')
                  setTimeout(() => {
                      const bal = userdb.get('balance')
                      const bank = userdb.get('bank')
                  const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag} | Balance`)
            .addField('Balance', bal)
            .addField('Bank', bank)
            return sentMessage.edit(embed)
                  }, 2000)
} else {
    if(args[0].toLowerCase() === "all"){
        const bal = userdb.get('balance')
        const bank = userdb.get('bank')
        const banklimit = userdb.get('banklimit')
if((banklimit - bank) > bal){
    userdb.set('balance', 0)
    userdb.set('bank', bank + bal)
    return message.channel.send('Successfully deposited all coins')
} else {
    userdb.set('balance', bal - (banklimit - bank))
    userdb.set('bank', banklimit)
    return message.channel.send(`Successfully deposited ${banklimit - bank} coins`)
}
    }
    const bal = userdb.get('balance')
    const bank = userdb.get('bank')
    const banklimit = userdb.get('banklimit')
    if(bal < parseFloat(args[0])) return message.channel.send(`You do not have ${args[0]} coins to transfer`)
    if(bank + parseFloat(args[0]) > banklimit) return message.channel.send(`Your bank cannot fit ${args[0]} more coins`)
    userdb.set('bank', bank + parseFloat(args[0]))
    userdb.set('balance', bal - parseFloat(args[0]))
    return message.channel.send(`Successfully deposited ${args[0]} coins`)

}
          
            
            
        }else if(message.content.toLowerCase().startsWith(prefix + "withdraw")){
            if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor(`Usage: ${prefix}withdraw <amount>`))
               if(fs.existsSync(`./Users/${message.author.id}.sqlite`) === false){
            fs.writeFile(`/Users/${message.author.id}.sqlite`, '', (err) => {})
               
                userdb.set('bank', 0)
                userdb.set('balance', 300)
                userdb.set('banklimit', 1000)
                const sentMessage = await message.channel.send('Adding you to the database...')
                setTimeout(() => {
                    const bal = userdb.get('balance')
                    const bank = userdb.get('bank')
                const embed = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag} | Balance`)
          .addField('Balance', bal)
          .addField('Bank', bank)
          return sentMessage.edit(embed)
                }, 2000)
} else {
    if(args[0].toLowerCase() === "all"){
        const bal = userdb.get('balance')
        const bank = userdb.get('bank')
    userdb.set('balance', bal + bank)
    userdb.set('bank', 0)
    return message.channel.send('Successfully withdrew all coins')
    }
  const bal = userdb.get('balance')
  const bank = userdb.get('bank')
  const banklimit = userdb.get('banklimit')
  if(bank < parseFloat(args[0])) return message.channel.send(`You do not have ${args[0]} coins to transfer`)
  userdb.set('balance', bal + parseFloat(args[0]))
  userdb.set('bank', bank - parseFloat(args[0]))
  return message.channel.send(`Successfully withdrew ${args[0]} coins`)

}
        
          
          
      }else if(message.content.toLowerCase().startsWith(prefix + "rob")){
        if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor(`Usage: ${prefix}rob <member_mention || member_id>`))
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(member.user.id === message.author.id) return message.channel.send('You cannot rob yourself')
        if(!member) return message.channel.send(new Discord.MessageEmbed().setAuthor(`Cannot find this user`))
           if(fs.existsSync(`./Users/${message.author.id}.sqlite`) === false){
        fs.writeFile(`/Users/${message.author.id}.sqlite`, '', (err) => {})
           
            userdb.set('bank', 0)
            userdb.set('balance', 300)
            userdb.set('banklimit', 1000)
            const sentMessage = await message.channel.send('Adding you to the database...')
            setTimeout(() => {
                const bal = userdb.get('balance')
                const bank = userdb.get('bank')
            const embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} | Balance`)
      .addField('Balance', bal)
      .addField('Bank', bank)
      return sentMessage.edit(embed)
            }, 2000)
} else {
    const timeout = 3600000;
    const theirtimeout = 1800000
    const time = userdb.get('robtimeout')
    const lastrobbed = userdb.get('lastrobbed')
    if(Date.now() - timeout > time || time === undefined){
const ownbal = userdb.get('balance')
const theirdb = new JSONdb(`./Users/${member.user.id}.sqlite`)
const lastrobbed = theirdb.get('lastrobbed')
if(Date.now() - theirtimeout > lastrobbed || lastrobbed === undefined){

const theirbal = theirdb.get('balance')
const number = Math.floor(Math.random() * 5) + 1
if(fs.existsSync(`./Users/${member.user.id}.sqlite`) === false){
    return message.channel.send('This person does not have an account')
}
if(number === 1 || number === 2 || number === 3 || number === 4){
const money = Math.floor(Math.random() * theirbal) + 1
userdb.set('balance', ownbal + money)
theirdb.set('balance', theirbal - money)
userdb.set('robtimeout', Date.now())
theirdb.set('lastrobbed', Date.now())
return message.channel.send(`Successfully robbed ${member.user.tag} for ${money} coins`)
} else if(number === 5) {
   
        const money = Math.floor(Math.random() * ownbal) + 1
    userdb.set('balance', ownbal - money)
    theirdb.set('balance', theirbal + money)
    userdb.set('robtimeout', Date.now())
userdb.set('lastrobbed', Date.now())
    return message.channel.send(`${member.user.tag} caught you and stole ${money} coins from you`)
}
} else {
    return message.channel.send(`This user can be robbed again in ${prettyMS(timeout - (Date.now() - lastrobbed))}`)
}
    
      
      
  }else {
    return message.channel.send(`You can rob another user in ${prettyMS(timeout - (Date.now() - time))}`)
}
}

      }else if(message.content.toLowerCase() === prefix + "work"){
          const time = userdb.get('worktimeout')
          const timeout = 7200000
        if(Date.now() - timeout > time || time === undefined){
          if(userdb.get('job') === undefined){
              const bal = userdb.get('balance')
              userdb.set('balance', bal + 15)
              userdb.set('worktimeout', Date.now())
              return message.channel.send(`You're unemployed, get a job. Have V$15`)

          } else {
              const wages = {
                  "rubbish collector": 50,
                  "retail salesman": 200,
                  "author": 500,
                  "developer": 2000,
                  "astronaut": 10000
              }
              const bal = userdb.get('balance')
              const job = userdb.get('job')
              userdb.set('balance', bal + wages[job])
              userdb.set('worktimeout', Date.now())
              message.channel.send(`You have a job as a(n) ${job}. You have been paid V$${wages[job]}`)
          }
      } else {
        return message.channel.send(`You can work again in ${prettyMS(timeout - (Date.now() - time))}`)
    }
} else if(message.content.toLowerCase() === prefix + "jobs"){
    const job = userdb.get('job')
    const embed = new Discord.MessageEmbed()
    .setTitle('Job Vacancies')
    .setDescription(`*Use ${prefix}apply <job_name> to apply for said job*\n\nCurrent Job: ${job === undefined ? "Unemployed" : job}\n\n\`Rubbish Collector\`\nTraining Costs: V$500\n\n\`Retail Salesman\`\nTraining Costs: V$2000\n\n\`Author\`\nTraining Costs: V$5000\n\n\`Developer\`\nTraining Costs: V$20000\n\n\`Astronaut\`\nTraining Costs: V$1000000`)
    .setFooter('Vetrilox', client.user.displayAvatarURL())
    message.channel.send(embed)
}else if(message.content.toLowerCase().startsWith(prefix + "apply")){

    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${prefix}apply <job_title>`))
    const time = userdb.get('applytimeout')
    const timeout = 43200000
  if(Date.now() - timeout > time || time === undefined){
    const job = args.join(" ")
    const wages = [
        "rubbish collector",
        "retail salesman",
        "author",
        "developer",
        "astronaut"
    ]
    if(wages.includes(job.toLowerCase()) === false){
        return message.channel.send('The job you are looking for is not available currently. Please apply for another, Thank you.')
    }

    const number = Math.floor(Math.random() * 2) + 1
    if(number === 1){
        userdb.set('applytimeout', Date.now())
        return message.channel.send(`You were not accepted as a(n) ${job}. Please apply again later.`)
    } else if(number === 2){
        const trainingcosts = {
            "rubbish collector": 500,
                  "retail salesman": 2000,
                  "author": 5000,
                  "developer": 20000,
                  "astronaut": 1000000
        }
        const bal = userdb.get('balance')
        if(bal < trainingcosts[job.toLowerCase()]){
            userdb.set('applytimeout', Date.now())
            return message.channel.send('You were accepted. Unfortunately you cannot pay the training costs')
        }
        userdb.set('balance', bal - trainingcosts[job.toLowerCase()])
        userdb.set('job', job.toLowerCase())
        userdb.set('applytimeout', Date.now())
        return message.channel.send('You were accepted, you paid your training costs. You can start work whenever you feel like it.')
    }
} else {
    return message.channel.send(`You can apply for a job again in ${prettyMS(timeout - (Date.now() - time))}`)
}
}else if(message.content.toLowerCase().startsWith(prefix + "give")){
    if(args[0] === undefined || args[1] === undefined) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${prefix}give <member_mention | member_id> <amount>`))
if(isNaN(args[1]) === true) return message.channel.send('Amount **must** be a number')
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.channel.send('Member not found.')
const theirdb = new JSONdb(`./Users/${member.user.id}.sqlite`)
const yourbal = userdb.get('balance')
if(yourbal < parseFloat(args[1])) return message.channel.send(`You do not have V$${args[1]} to give.`)
const theirbal = theirdb.get('balance')
theirdb.set('balance', theirbal + parseFloat(args[1]))
userdb.set('balance', yourbal - parseFloat(args[1]))
message.channel.send(`Successfully given V$${args[1]} to ${member.user.tag}`)

}






        // Automod





  
else if(message.content.match(regex) || message.content.match(regex2)){
 
        const automodb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
    const automodlinke = automodb.get(`linkdetection`)
    if(automodlinke === undefined || automodlinke === null) return;
    message.delete()
    
    const warn = await message.channel.send(`<@${message.author.id}>  Please do not send links in this server`)
    warn.delete({ timeout: 2000 })
    
}else if(message.content === message.content.toUpperCase()){
  const whitelist = db.get('whitelist')
  

    
    
    const automodb = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
    const automodcaps = automodb.get(`capsdetection`)
    if(automodcaps === undefined || automodcaps === null) return;
    message.delete()
    const warn = await message.channel.send(`<@${message.author.id}>  Please do not send All Caps-lock Messages in this server`)
    warn.delete({ timeout: 2000 })
    

} else {



 
  
  
    const automodinvitee = db.get(`sweardetection`)
    if(automodinvitee === "true"){
            const swearwords = ['4r5e', '5h1t', '5hit', 'a55', 'anal', 'anus', 'ar5e', 'arrse', 'arse', 'ass-fucker', 'asses', 'assfucker', 'assfukka', 'asshole', 'assholes', 'asswhole', 'a_s_s', 'b!tch', 'b00bs', 'b17ch', 'b1tch', 'ballbag', 'ballsack', 'bastard', 'beastial', 'beastiality', 'bellend', 'bestial', 'bestiality', 'bi+ch', 'biatch', 'bitch', 'bitcher', 'bitchers', 'bitches', 'bitchin', 'bitching', 'bloody', 'blow job', 'blowjob', 'blowjobs', 'boiolas', 'bollock', 'bollok', 'boner', 'boob', 'boobs', 'booobs', 'boooobs', 'booooobs', 'booooooobs', 'breasts', 'buceta', 'bugger', 'bunny fucker', 'butt', 'butthole', 'buttmunch', 'buttplug', 'bullshit', 'c0ck', 'c0cksucker', 'carpet muncher', 'cawk', 'chink', 'cipa', 'cl1t', 'clit', 'clitoris', 'clits', 'cnut', 'cock', 'cock-sucker', 'cockface', 'cockhead', 'cockmunch', 'cockmuncher', 'cocks', 'cocksuck ', 'cocksucked ', 'cocksucker', 'cocksucking', 'cocksucks ', 'cocksuka', 'cocksukka', 'cok', 'cokmuncher', 'coksucka', 'coon', 'cox', 'crap', 'cum', 'cummer', 'cumming', 'cums', 'cumshot', 'cunilingus', 'cunillingus', 'cunnilingus', 'cunt', 'cuntlick ', 'cuntlicker ', 'cuntlicking ', 'cunts', 'cyalis', 'cyberfuc', 'cyberfuck ', 'cyberfucked ', 'cyberfucker', 'cyberfuckers', 'cyberfucking ', 'dickhead', 'dildo', 'dildos', 'dink', 'dinks', 'dirsa', 'dog-fucker', 'doggin', 'dogging', 'donkeyribber', 'dyke', 'ejaculate', 'ejaculated', 'ejaculates ', 'ejaculating ', 'ejaculatings', 'ejaculation', 'ejakulate', 'f u c k', 'f u c k e r', 'f4nny', 'fag', 'fagging', 'faggitt', 'faggot', 'faggs', 'fagot', 'fagots', 'fags', 'fanny', 'fannyflaps', 'fannyfucker', 'fanyy', 'fatass', 'fcuk', 'fcuker', 'fcuking', 'feck', 'fecker', 'felching', 'fellate', 'fellatio', 'fingerfuck ', 'fingerfucked ', 'fingerfucker ', 'fingerfuckers', 'fingerfucking ', 'fingerfucks ', 'fistfuck', 'fistfucked ', 'fistfucker ', 'fistfuckers ', 'fistfucking ', 'fistfuckings ', 'fistfucks ', 'flange', 'fook', 'fooker', 'fuck', 'fucka', 'fucked', 'fucker', 'fuckers', 'fuckhead', 'fuckheads', 'fuckin', 'fucking', 'fuckings', 'fuckingshitmotherfucker', 'fuckme ', 'fucks', 'fuckwhit', 'fuckwit', 'fudge packer', 'fudgepacker', 'fuk', 'fuker', 'fukker', 'fukkin', 'fuks', 'fukwhit', 'fukwit', 'fux', 'fux0r', 'f_u_c_k', 'gangbang', 'gangbanged ', 'gangbangs ', 'gaylord', 'gaysex', 'goatse', 'god-dam', 'god-damned', 'goddamn', 'goddamned', 'hardcoresex ', 'heshe', 'hoar', 'hoare', 'hoer', 'hore', 'horniest', 'horny', 'hotsex', 'jack-off ', 'jackoff', 'jap', 'jerk-off ', 'jism', 'jiz ', 'jizm ', 'jizz', 'kawk', 'knobead', 'knobed', 'knobend', 'knobhead', 'knobjocky', 'knobjokey', 'kock', 'kondum', 'kondums', 'kum', 'kummer', 'kumming', 'kums', 'kunilingus', 'l3i+ch', 'l3itch', 'labia', 'lust', 'lusting', 'm0f0', 'm0fo', 'm45terbate', 'ma5terb8', 'ma5terbate', 'masochist', 'master-bate', 'masterb8', 'masterbat*', 'masterbat3', 'masterbate', 'masterbation', 'masterbations', 'masturbate', 'mo-fo', 'mof0', 'mofo', 'mothafuck', 'mothafucka', 'mothafuckas', 'mothafuckaz', 'mothafucked ', 'mothafucker', 'mothafuckers', 'mothafuckin', 'mothafucking ', 'mothafuckings', 'mothafucks', 'mother fucker', 'motherfuck', 'motherfucked', 'motherfucker', 'motherfuckers', 'motherfuckin', 'motherfucking', 'motherfuckings', 'motherfuckka', 'motherfucks', 'muff', 'mutha', 'muthafecker', 'muthafuckker', 'muther', 'mutherfucker', 'n1gga', 'n1gger', 'nazi', 'nigg3r', 'nigg4h', 'nigga', 'niggah', 'niggas', 'niggaz', 'nigger', 'niggers ', 'nob jokey', 'nobhead', 'nobjocky', 'nobjokey', 'numbnuts', 'nutsack', 'orgasim ', 'orgasims ', 'orgasm', 'orgasms ', 'p0rn', 'pawn', 'pecker', 'penis', 'penisfucker', 'phonesex', 'phuck', 'phuk', 'phuked', 'phuking', 'phukked', 'phukking', 'phuks', 'phuq', 'pigfucker', 'pimpis', 'pisser', 'pissers', 'pisses ', 'pissflaps', 'pissin ', 'pissing', 'pissoff ', 'porn', 'porno', 'pornography', 'pornos', 'prick', 'pricks ', 'pron', 'pube', 'pusse', 'pussi', 'pussies', 'pussy', 'pussys ', 'rectum', 'retard', 'rimjaw', 'rimming', 's hit', 's.o.b.', 'sadist', 'schlong', 'screwing', 'scroat', 'scrote', 'scrotum', 'sh!+', 'sh!t', 'sh1t', 'shag', 'shagger', 'shaggin', 'shagging', 'shemale', 'shi+', 'shit', 'shitdick', 'shite', 'shited', 'shitey', 'shitfuck', 'shitfull', 'shithead', 'shiting', 'shitings', 'shits', 'shitted', 'shitter', 'shitters ', 'shitting', 'shittings', 'shitty ', 'skank', 'slut', 'sluts', 'smegma', 'smut', 'snatch', 'son-of-a-bitch', 'spunk', 's_h_i_t', 't1tt1e5', 't1tties', 'teets', 'teez', 'testical', 'testicle', 'tit', 'titfuck', 'tits', 'titt', 'tittie5', 'tittiefucker', 'titties', 'tittyfuck', 'tittywank', 'titwank', 'tosser', 'turd', 'tw4t', 'twat', 'twathead', 'twatty', 'twunt', 'twunter', 'v14gra', 'v1gra', 'vagina', 'vulva', 'w00se', 'wang', 'wank', 'wanker', 'wanky', 'whoar', 'whore', 'willies', 'willy', 'fhek', 'f4ck', 'kuso', 'くそ', 'arsehole', 'stfu']
    const text = message.content.toLowerCase().split(" ")
    let array = []
  for (i = 0; i < text.length; i++) {
    const word = text[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    const finalword = word.replace(/\s{2,}/g," "); 
    if (swearwords.includes(finalword)) {
      array.push(finalword)
    }
}
if(array.length !== 0){
    message.delete()
      const warn = await message.channel.send(`<@${message.author.id}>  Please do not use swear words in this server`)
      warn.delete({timeout: 2000})
}
    }
  }


})


client.on('message', message => {
    if(message.author.bot) return;
    const db = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
    const replies = db.get('autoreply')

if(replies !== undefined){
    if(replies.length !== 0){
for(i=0;i<replies.length;i++){
    
    const trigger = Object.keys(replies[i]).toString()
    if(trigger.toLowerCase() === message.content.toLowerCase()){
        message.channel.send(replies[i][Object.keys(replies[i]).toString()])
    }
}

}
}
})


        











