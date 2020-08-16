const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
var osutils = require('os-utils');
const config = require('./config.json')
const { inspect } = require("util");
const vm = require("vm");
const codeContext =  {};
const { stripIndents } = require("common-tags");
const { getMember, promptMessage } = require("./functions.js");
const randomPuppy = require("random-puppy");
const superagent = require('superagent')
const customisation = require('./customisation.json');
const fs = require("fs");
const ms = require("ms");
vm.createContext(codeContext);
const gifSearch = require("gif-search");
const snek = require('snekfetch');
const api = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
const steam = require('steam-provider')
const provider = new steam.SteamProvider()
const hastebin = require('hastebin-gen')
const os = require('os')
const cpuStat = require("cpu-stat")
const moment = require("moment")
const weather = require("weather-js")
const snekfetch = require('snekfetch');
const oneLinerJoke = require('one-liner-joke');
const request = require("request");
var JSONdb = require('simple-json-db');
const qrcode = require('qrcode')
const tempy = require('tempy')


	client.on('ready', () => {
	 console.log('Logged in as ' + client.user.tag)
});






const links = new Discord.MessageEmbed()
.setDescription('Invite: https://bit.ly/vetrilox \nDocs: WIP\nSupport Server: https://discord.gg/sxDtd43')

const Invite = new Discord.MessageEmbed()
.setTitle('Invite')
.setDescription('Add Vetrilox to your server: https://bit.ly/30Yvxtk')
.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')

const helpembed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("**Vetrilox Commands**")
  .setDescription("Prefix: v!")
  .addField('Info', `[!help Info]`, true)
  .addField('Fun', `[!help fun]`, true)
  .addField('Moderation', `[!help mod]`, true)

  .addField('Misc', `[!help misc]`, true)
  .addField("Developed by", `Scorprian#2161`)
  .setFooter("Vetrilox");


const images = new Discord.MessageEmbed()
    .setTitle('Images Commands')
	.setDescription('Images may take a while to load')
	.addField("Animals", `\`\`Cat\`\`, \`\`Dog\`\`, \`\`Rabbit\`\`, \`\`Aww\`\`, \`\`Budgie\`\`, \`\`Chinchilla\`\`, \`\`Fox\`\`, \`\`Mice\`\`, \`\`Rat\`\`, \`\`Wolf\`\``)
.addField("Instruments", `\`\`Guitar\`\`, \`\`Bass\`\`, \`\`Drums\`\`, \`\`Piano\`\``)
.addField("Cars", `\`\`Mustang\`\`, \`\`Cayman\`\``)
.addField("Misc", `\`\`Meme\`\``)
 .setFooter(`Vetrilox`, 'https://rendernetwork.co/vetriloxlogo.png')
 const nsfw = new Discord.MessageEmbed()
 .setTitle('NSFW Commands')
 .setDescription('These can only be used in NSFW Servers!\nFormat: v!<command name>')
 .addField('Human', `\`\`4k\`\`, \`\`Anal\`\`, \`\`Ass\`\`, \`\`NGif\`\`, \`\`Thigh\`\`, \`\`Pussy\`\`, \`\`Holo\`\`, \`\`Gonewild\`\``)
.addField('Hentai', `\`\`Hentai\`\`, \`\`Hthigh\`\`, \`\`HAss\`\`, \`\`HAnal\`\``)
/* .addField('4k', `[!4k]`, true)
 .addField('Hentai', `[!hentai]`, true)
 .addField('Anal', `[!anal]`, true)
 .addField('Ass', `[!ass]`, true)
 .addField('GIF', `[!ngif]`, true)
 .addField('Thigh', `[!thigh]`, true)
 .addField('Pussy', `[!pussy]`, true)
 .addField('Holo', `[!holo]`, true)
 .addField('Gonewild', `[!gonewild]`, true)
 .addField('Hthigh',`[!hthigh]`, true)
 .addField('Hass', `[!hass]`, true)
 .addField('Hanal', `[!hanal]`, true)*/
.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
const utility = new Discord.MessageEmbed()
.setTitle('Utility Commands')
.addField('Commands', `\`\`Weather\`\`, \`\`Poll\`\`, \`\`Google\`\`, \`\`Timer\`\`, \`\`Shorten\`\`, \`\`*Suggest\`\`, \`\`Remindme\`\``)
.addField('Vote only', `\`\`Hastebin\`\`, \`\`Morse\`\`, \`\`QrCode\`\``)
.addField('Tags', `\`\`Tag-setup\`\`,\`\`Tag-Create\`\`, \`\`Tag-Delete\`\`, \`\`Tag\`\`, \`\`Tag-List(WIP)\`\``)
/*.addField('Weather', `[!weather [Location]]`, true)
.addField('Poll', `[!poll [question]]`, true)
.addField('Hastebin [Vote Only]', `[!hastebin [text]]`, true)
    .addField('MorseCode [Vote Only]', `[!morse [Text]]`, true)
    .addField("Qrcode [Vote Only]", `[!qrcreate |!qc [Text]]`, true)*/
.setFooter('*[This will send a suggestion to the servers suggestion channel]')
  const funembed = new Discord.MessageEmbed()
  .setTitle('Fun Commands')
  .addField('Commands', `\`\`8Ball\`\`, \`\`Love\`\`, \`\`Clapify\`\`, \`\`Trump\`\`, \`\`FMK\`\`, \`\`Joke\`\`, \`\`RandomNumber\`\`, \`\`Embed\`\``)
  /*.addField('8Ball', `[!8ball]`, true)
  .addField('Love', `[!love [@member]]`, true)
  .addField('Meme', `[!meme]`, true)
  .addField('Clapify', `[!clapify [Sentence]]`, true)
  .addField('Trump', `[!trump]`, true)
  .addField('FMK', `[!fmk [@member]`, true)
  .addField('Joke', `[!joke]`, true)
  .addField('Random Number', `[!randomnumber | rannum [maximum no.]`, true)*/
.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')

  const modhelp = new Discord.MessageEmbed()
  .setTitle('Moderation Commands')
  .addField('Commands', `\`\`Ban\`\`, \`\`Unban\`\`, \`\`Mute\`\`, \`\`Unmute\`\`, \`\`Kick\`\`, \`\`Purge\`\`, \`\`Whois\`\``)
  /*.addField('Ban', `[!ban [@member] [Reason]]`, true)
  .addField('Unban', `[!unban [id] [reason]]`, true)
  .addField('Mute', `[!mute [@member] [time e.g 1s | 1m | 1d]]`, true)
  .addField('Unmute', `[!unmute [@member] [reason]]`, true)
  .addField('Kick', `[!kick [@member]`, true)
  .addField('Purge', `[!purge [number]]`, true)
  .addField('Whois', `[!whois | !userinfo | !ui [@member]]`, true)*/
.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')

  const info = new Discord.MessageEmbed()
  .setTitle('Utility Commands')
  .addField('Commands', `\`\`Serverinfo\`\`, \`\`Botinfo\`\`, \`\`Uptime\`\`, \`\`Invite\`\`, \`\`Support\`\`, \`\`Vote\`\``)
  /*.addField('Serverinfo', `[!serverinfo]`, true)
  .addField('Botinfo', `[!botinfo | !bi]`, true)
  .addField('Uptime', `[!uptime]`, true)
  .addField('Invite', `[!invite]`, true)
  .addField('Support', `[!support]`, true)
  .addField('Vote', `[!vote]`, true)*/

  const economyembed = new Discord.MessageEmbed()
  .setTitle('Economy Commands')
  .addField('Store', `Store|Shop, Buy, Use`)
  .addField('General', `Inv|Inventory, Bal|Balance, Work, Delete`)

.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')


  const prefix = new Discord.MessageEmbed()
  .setTitle('Vetrilox')
  .setDescription('Vetriloxs\' Prefix is **v!**')
.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
  const ping = new Discord.MessageEmbed()
  .setTitle('Pong!')
  .addField('API Latency', `${Math.round(client.ping)}ms`)
.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')

  const miscembed = new Discord.MessageEmbed()
  .addField('Miscellaneous Commands', `\`\`Ping\`\``)
.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')

  const devhelp = new Discord.MessageEmbed()
  .setTitle('Dev Commands')
  .addField('Eval', `[${prefix}eval]`, true)
.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')

  const helpdevembed = new Discord.MessageEmbed()
 .setTitle('Vetrilox Help Commands')
 .addField('❓**Help**', `[${prefix}help]`, true)
 .addField('🛠️**Utility**', `[${prefix}help utility]`, true)
 .addField('🔧**Moderation**', `[${prefix}help mod]`, true)
 .addField('🤷‍♂️**Misc**', `[${prefix}help misc]`, true)
 .addField('😄**Fun**', `[${prefix}help fun]`, true)
 .addField('👑**Dev**', `[${prefix}help dev]`, true)
.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')



  var loadingembed = new Discord.MessageEmbed()
			.setAuthor(`Checking your vote status`, `https://rendernetwork.co/vetriloxloading.gif`);

			var loadingloadingembed = new Discord.MessageEmbed()
			.setAuthor(`Loading...`, `https://rendernetwork.co/vetriloxloading.gif`);
			 var loadingjokeembed = new Discord.MessageEmbed()
			.setAuthor(`Loading your Joke`, `https://rendernetwork.co/vetriloxloading.gif`);

			 var loadingnumberembed = new Discord.MessageEmbed()
			.setAuthor(`Loading your Random Number`, `https://rendernetwork.co/vetriloxloading.gif`);

			var loadingfailed = new Discord.MessageEmbed()
			.setAuthor('You have not voted, please use !vote to get access to this command');
var loadingloveembed = new Discord.MessageEmbed()
			.setAuthor(`Calculating....`, `https://rendernetwork.co/vetriloxloading.gif`);
client.on('guildCreate',  guild => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    channel.send("Thank you for inviting me to your server!\n\nHere are some of my features!\n\`\`\`-> Information Commands such as Botinfo and Serverinfo\n-> Moderation Commands such as Ban, Mute and Purge etc.\n-> Utility Commands such as Gameinfo, Weather and QRCode Creation etc.\n-> Fun Commands such as Trump, 8Ball, Random Number Generator etc.\n-> Image Command such as Cat\n-> NSFW Commands\n-> Miscellaneous Commands such as Prefix and Ping\`\`\`\nIf you have any suggestions, use \`\`!suggest\`\` or join the support server at https://discord.gg/sxDtd43 \n\nThank you for adding me to your server!")

})

	client.on("message", async message => {
		const push = new JSONdb(`./Databases/Prefixes/${message.guild.id}.sqlite`)

	  const prefix = push.get(`${message.guild.id}`)

	  if(prefix === undefined || prefix === null) {
		  const serverprefix = 'v!'
		  fs.writeFile(`./Databases/Prefixes/${message.guild.id}.sqlite`, '', function (err) {
  if (err) return
});

push.set(`${message.guild.id}`, `v!`)
const prefix = push.get(`${message.guild.id}`)


	  }


	   let msgping1 = new Date();

    let botping = new Date() - message.createdAt;

    let msgping2 = new Date() - msgping1;

    let pingembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .addField('API Ping : ', Math.floor(client.ping) + 'ms')
        .addField('Bot Ping : ', Math.floor(botping) + 'ms')
        .addField('Message Ping : ', '~' + Math.round(msgping2) + 'ms')
        .setTimestamp(new Date())
        .setFooter(`requested by ${message.author.tag}`);
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
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
        "southafrica": ":flag_za:  South Africa"
    };
        const serverembed = new Discord.MessageEmbed()
		.setColor('RANDOM')
            .setTitle(message.guild.name)
			.setThumbnail(message.guild.iconURL)
            //.addField('Owner', message.guild.owner.user.username, true)
			.addField('Acronym', message.guild.nameAcronym, true)
			.addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
            .addField('System Channel ID', message.guild.systemChannelID, true)
			//.addField('Owner ID', message.guild.owner.id, true)
            .addField("Server ID", message.guild.id, true)

            .addField("**Stats**", `**Users:** ${message.guild.memberCount}\n**Roles:** ${message.guild.roles.cache.size}\n**Channels:** ${message.guild.channels.cache.size}\n**Emojis:** ${message.guild.emojis.cache.size}`, true)
			.addField('**Settings**', '**Region:** ' + region[message.guild.region] + '\n**Verification Level:** ' + message.guild.verificationLevel + '\n**Partnered?:** ' + message.guild.partnered + '\n**Boosters:** ' + message.guild.premiumSubscriptionCount + '\n**Tier Level:** ' + message.guild.premiumTier, true)


        .setTimestamp()
.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')


const error = new Discord.MessageEmbed()
.setTitle('Error')
.setDescription('Command not Found')
const nsfwerror = new Discord.MessageEmbed()
.setTitle('Error')
.setDescription('This is not an NSFW Channel')

if (message.author.bot) return;
if(message.content.toLowerCase().startsWith(`${prefix}prefix`)){
	 const push = new JSONdb(`./Databases/Prefixes/${message.guild.id}.sqlite`)

	  const prefix = push.get(`${message.guild.id}`)
	 const currentprefix = new Discord.MessageEmbed()
  .setTitle('Vetrilox')
  .setDescription(`This servers prefix is **${prefix}**`)
.setFooter(`Use ${prefix}prefix <prefix> to change the prefix`, 'https://rendernetwork.co/vetriloxlogo.png')
.setColor('WHITE')
if(!args[0]) return message.channel.send(currentprefix);
if(args[0]) {
	if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot set the server prefix')
	push.set(`${message.guild.id}`, args[0])

 const newprefix = new Discord.MessageEmbed()
 .setDescription('✅|This servers prefix has been changed to ' + args[0])
 .setColor('GREEN')
  message.channel.send(newprefix)
}
}
       else if (message.content.toLowerCase() === `${prefix}help`) {
		    const helpv2embed = new Discord.MessageEmbed()
 .setTitle('Vetrilox Help Commands')
 .addField('❔**Help**', `[${prefix}help]`, true)
 .addField('ℹ️**Info**', `[${prefix}help info]`, true)
 .addField('🛠️**Utility**', `[${prefix}help utility]`, true)
 .addField('🔧**Moderation**', `[${prefix}help mod]`, true)
 .addField('🚫**NSFW**', `[${prefix}help nsfw]`, true)
 .addField('😄**Fun**', `[${prefix}help fun]`, true)
       .addField('🖌️**Images**', `[${prefix}help images]`, true)
	   .addField('🛠️**Config**', `[${prefix}help config]`, true)
  .addField('🤷‍♂️**Misc**', `[${prefix}help misc]`, true)
       .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
	   const links = new Discord.MessageEmbed()
.setDescription('Invite: https://bit.ly/vetrilox \nDocs: WIP\nSupport Server: https://discord.gg/sxDtd43')
            message.channel.send(helpv2embed)
            message.channel.send(links);
            message.react('✅')
        } else if (message.content.toLowerCase() === prefix + "help mod") {
            message.channel.send(modhelp)
            message.react('✅')
        } else if (message.content.toLowerCase() === prefix + "help gameinfo") {
            message.channel.send(error)
        } else if (message.content.toLowerCase() === prefix + prefix + "help nsfw") {
            message.channel.send(nsfw)
            message.react('✅')
        } else if (message.content.toLowerCase() === prefix + "help hastebin") {
            message.channel.send(error)
		} else if (message.content.toLowerCase() === prefix + "help config") {
			const configembed = new Discord.MessageEmbed()
.setTitle('Configuration')
.addField('Prefix', `[${prefix}prefix [prefix]`)
.addField('Suggestions Channel', `[${prefix}setsuggestionschannel <channel>]`)
            message.channel.send(configembed)
        } else if (message.content.toLowerCase() === prefix + "help weather") {
            message.channel.send(error)
        } else if (message.content.toLowerCase() === prefix + "help images") {
            message.channel.send(images)
            message.react('✅')
	  }else if(message.content.toLowerCase() === prefix + "help morse"){
	  message.channel.send(error)
	  }else if(message.content.toLowerCase() === prefix + "help economy"){
	  message.channel.send(economyembed)
	  }else if(message.content.toLowerCase() === prefix + "help ban"){
	  message.channel.send(error)
	  }else if(message.content.toLowerCase() === prefix + "help kick"){
	  message.channel.send(error)
	  }else if(message.content.toLowerCase() === prefix + "help purge"){
	  message.channel.send(error)
	  }else if(message.content.toLowerCase() === prefix + "help whois"){
	  message.channel.send(error)
	  }else if(message.content.toLowerCase() === prefix + "help level"){
	  message.channel.send(error)
	  }else if(message.content.toLowerCase() === prefix + "help leaderboard"){
	  message.channel.send(error)
	  }else if(message.content.toLowerCase() === prefix + "help give"){
	  message.channel.send(error)
	  }else if(message.content.toLowerCase() === prefix + "help cleanup"){
	  message.channel.send(error)
	  }else if (message.content.toLowerCase().match(new RegExp(`^<@!?${client.user.id}>`))) {
		  const currentprefix = new Discord.MessageEmbed()
  .setTitle('Vetrilox')
  .setDescription(`This servers prefix is **${prefix}**`)
.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
.setColor('WHITE')
  message.channel.send(currentprefix)
	  }
else if(message.content.toLowerCase() === prefix + "help ping"){
	  message.channel.send(error)
	  }else if(message.content.toLowerCase() === prefix + "mod"){
            message.channel.send(error)
        } else if (message.content.toLowerCase() === prefix + "botinfo" || message.content.toLowerCase() === prefix + "bi") {
			let { version } = require("discord.js");

            cpuStat.usagePercent(function (err, percent, seconds) {
                if (err) {
                    return console.log(err);
                }

                let secs = Math.floor(client.uptime % 60);
                let days = Math.floor((client.uptime % 31536000) / 86400);
                let hours = Math.floor((client.uptime / 3600) % 24);
                let mins = Math.floor((client.uptime / 60) % 60);
      const clientembed = new Discord.MessageEmbed()
	  .setTitle('Bot Stats')
          .setColor("RANDOM")
          .addField("Dev", `Scorprian#2161`, true)
          .addField("Library", `NodeJs`, true)
          .addField("Default Prefix:", 'v!', true)
          .addField('Guilds', client.guilds.cache.size, true)
          .addField('Channels', client.channels.cache.size, true)
          .addField('Users', client.users.cache.size, true)
		  .addField('\u200b', '\u200b')
		  .addField("• Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
		   .addField("• Discord.js", `${version}`, true)
					.addField("• Node", `${process.version}`, true)
					.addField("• Uptime ", `\`\`${hours}h ${mins}m\`\``, true) //`${duration}`, true)
                    .addField("• CPU usage", `\`${percent.toFixed(2)}%\``, true)
                    .addField("• Platform", `\`\`${os.platform()}\`\``, true)
          .addField("Add to Server", "[Click here](https://bit.ly/vetrilox)", true)
          .addField("Support Server", "[Click here](https://discord.gg/sxDtd43)", true)
          .addField('Documentation', `WIP`, true)
          .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
    message.channel.send(clientembed);
			})
  }else if(message.content.toLowerCase() === prefix + "serverinfo" || message.content.toLowerCase() === prefix + "si"){
    message.channel.send(serverembed);
  }else if(message.content.toLowerCase() === prefix + "help info"){
    message.channel.send(info);
	message.react('✅')
	}else if(message.content.toLowerCase() === prefix + "info"){
    message.channel.send(error);
	}else if(message.content.toLowerCase() === prefix + "invite"){
    message.channel.send(Invite);
	}else if(message.content.toLowerCase() === prefix + "help fun"){
    message.channel.send(funembed);
	message.react('✅')
	}else if(message.content.toLowerCase() === prefix + "fun"){
    message.channel.send(error);
        } else if (message.content.toLowerCase() === prefix + "help serverinfo" || message.content.toLowerCase() === prefix + "help si"){
    message.channel.send(error);
        } else if (message.content.toLowerCase() === prefix + "help botinfo" || message.content.toLowerCase() === prefix + "help bi"){
    message.channel.send(error);
        } else if (message.content.toLowerCase() === prefix + "help roleinfo" || message.content.toLowerCase() === prefix + "help ri"){
    message.channel.send(error);
        } else if (message.content.toLowerCase() === prefix + "help emojilist" || message.content.toLowerCase() === prefix + "help el"){
    message.channel.send(error);
  }else if(message.content.toLowerCase() === prefix + "help misc"){
    message.channel.send(miscembed);
	message.react('✅')
	}else if(message.content.toLowerCase() === prefix + "misc"){
    message.channel.send(error);
	}else if(message.content.toLowerCase() === prefix + "help levelling"){
    message.channel.send(Levelling);
	}else if(message.content.toLowerCase() === prefix + "levelling"){
    message.channel.send(error);
  }else if(message.content.toLowerCase() === prefix + "ping"){
    message.channel.send(pingembed);
	}else if(message.content.toLowerCase() === prefix + "help ping"){
    message.channel.send(error);
  }else if(message.content.toLowerCase() === prefix + "help utility"){
    message.channel.send(utility);
	message.react('✅')
	}else if(message.content.toLowerCase() === prefix + "utility"){
    message.channel.send(error);
  }else if(message.content.toLowerCase() === "<@492476933808979979>"){
    message.channel.send(prefix);
    }else if(message.content.toLowerCase() === prefix + "render"){
    message.channel.send(renderembed);
  }else if(message.content.toLowerCase().startsWith  (prefix + 'help dev')){
	  if(message.author.id !== '381710555096023061') return message.reply('You do not have permission to use this command!')
	  message.channel.send(devhelp)
  message.react('✅')
	}else if(message.content.toLowerCase().startsWith  (prefix + 'top10')){
		  if (client.guilds.cache.size < 10) return message.reply("Bot is not in 10 servers");

const top = client.guilds.sort((a,b)=>a.memberCount-b.memberCount).array().reverse();
message.channel.send(`1. **${top[0].name}**: ${top[0].memberCount} Users.\n2. **${top[1].name}**: ${top[1].memberCount} Users.\n3. **${top[2].name}**: ${top[2].memberCount} Users.\n4. **${top[3].name}**: ${top[3].memberCount} Users.\n5. **${top[4].name}**: ${top[4].memberCount} Users.\n6. **${top[5].name}**: ${top[5].memberCount} Users.\n7. **${top[6].name}**: ${top[6].memberCount} Users.\n8. **${top[7].name}**: ${top[7].memberCount} Users.\n9. **${top[8].name}**: ${top[8].memberCount} Users.\n10. **${top[9].name}**: ${top[9].memberCount} Users.`)
        } if (message.content.toLowerCase().startsWith(prefix + "say")) {
            // makes the bot say something and delete the message. As an example, it's open to anyone to use.
            // To get the "message" itself we join the `args` back into a string with spaces:
            const sayMessage = args.join(" ");
            // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
            message.delete().catch(O_o => { });
            // And we get the bot to say the thing:
            message.channel.send(sayMessage);
        } else if (message.content.toLowerCase().startsWith(prefix + "kick")) {
            // This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit:
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if (!message.guild.me.hasPermission("KICK_MEMBERS"))
                return message.reply("You do not have permissions to use this!");

            // Let's first check if we have a member and if we can kick them!
            // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
            // We can also support getting the member by ID, which would be args[0]
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!member)
                return message.reply("Please mention a valid member of this server");
            if (!member.kickable)
                return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

            // slice(1) removes the first part, which here should be the user mention or ID
            // join(' ') takes all the various parts to make it a single string.
            let reason = args.slice(1).join(' ');
            if (!reason) reason = "No reason provided";

            // Now, time for a swift kick in the nuts!
            await member.kick(reason)
                .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
            message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

        } else if (message.content.toLowerCase().startsWith(prefix + "ban")) {
            // Most of this command is identical to kick, except that here we'll only let admins do it.
            // In the real world mods could ban too, but this is just an example, right? ;)
            if (!message.guild.me.hasPermission("BAN_MEMBERS")
            )
                return message.reply("You do not have permission to use this command!");

            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!member)
                return message.reply("Please mention a valid member of this server");
            if (!member.bannable)
                return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

            let reason = args.slice(1).join(' ');
            if (!reason) reason = "No reason provided";

            await member.ban(reason)
			const banerror = new Discord.MessageEmbed()
			.setDescription(`Sorry ${message.author} I couldn't ban because of : ${error}`)
                .catch(error => message.channel.send(banerror));
				const bansuccess = new Discord.MessageEmbed()
				.setDescription(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`)
            message.channel.send(bansuccess);
        } else if (message.content.toLowerCase().startsWith(prefix + "purge")) {
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
		.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
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
} else if (message.content.toLowerCase().startsWith(prefix + 'whois') || message.content.toLowerCase().startsWith(prefix + "userinfo") || message.content.toLowerCase().startsWith(prefix + "ui")) {
            const { stripIndents } = require("common-tags");
            const { getMember, formatDate } = require("./functions.js");
            const member = getMember(message, args.join(" "));







            // Member variables
            const joined = formatDate(member.joinedAt);
            const roles = member.roles.cache
                .filter(r => r.id !== message.guild.id)
                .map(r => r).join(", ") || 'none';
				const user = client.users.cache.get(member.id);

            // User variables
            const created = formatDate(member.user.createdAt);

            const whoisembed = new Discord.MessageEmbed()
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
            **- Created at**: ${created}
			**- Last Message:** ${member.user.lastMessage}`, true)
			.addField('**- Roles:**', `${roles}`)

                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')


            if (member.user.presence.game)
                whoisembed.addField('Currently playing', stripIndents`** Name:** ${member.user.presence.game.name}`);
			const supportserver = client.guilds.cache.get('708474977342718005')
			  const banList = await supportserver.fetchBans();


            message.channel.send(whoisembed);
        } else if (message.content.toLowerCase().startsWith(prefix + 'love')) {
            let person = getMember(message, args[0]);

            if (!person || message.author.id === person.id) {
                person = message.guild.members
                    .filter(m => m.id !== message.author.id)
                    .random();
            }
const sendMessage = await message.channel.send(loadingloveembed)
await sendMessage.delete({ timeout: 4000 });
            const love = Math.random() * 100;
            const loveIndex = Math.floor(love / 10);
            const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
setTimeout(function () {
                const loveembed = new Discord.MessageEmbed()
                .setColor("#ffb6c1")
                .addField(`☁ **${person.displayName}** loves **${message.member.displayName}** this much:`,
                    `💟 ${Math.floor(love)}%\n\n${loveLevel}`)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(loveembed);
            }, 4000);

        } else if (message.content.toLowerCase().startsWith(prefix + 'meme')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["dankmeme", "meme", "me_irl"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);
           setTimeout(function () {



            const memembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setTitle(`From /r/${random}`)
                .setURL(`https://reddit.com/r/${random}`)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(memembed);
            }, 4000);

        } else if (message.content.toLowerCase().startsWith(prefix + 'cat')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			sentMessage.delete({ timeout: 4000 });

            const { body } = await superagent
                .get("http://aws.random.cat/meow");
setTimeout(function () {
            const catembed = new Discord.MessageEmbed()
                .setColor("#ff9900")
                .setTitle("Here's Your Cat")
                .setImage(body.file)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(catembed);
			}, 4000)
        } else if (message.content.toLowerCase().startsWith(prefix + '8ball')) {
            if (!args[2]) return message.reply("Please ask a question");
            let replies = ["Yes.", "No.", "I have no clue.", "Maybe", "Please ask another question",
                "You're making decisions based on what a bot tells you to do? Jeez...", "No, stuff off.", "Leave me alone! I'm Sleeping", "Too hard", "What are you, stupid?", "How the hell do you not know that?"
                , "Give me a break", "Gone to lunch, back in 15 minutes.", "The cake is a lie", "I'm sorry the person you were trying to call...",];

            let result = Math.floor((Math.random() * replies.length));
            let question = args.slice(0).join(" ");

            let ballembed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag)
                .setColor("#0c45d6")
                .addField("Question", question)
                .addField("Answer", replies[result])
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(ballembed);



        } /*else if (message.content.toLowerCase().startsWith(prefix + 'avatar')) {
            const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
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
            const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');
            if (args.length < 1) return message.channel.send("**I need some text to clapify.** `!clapify <sentence>`")
            message.channel.send(args.map(randomizeCase).join(':clap:'));

        }else if (message.content.toLowerCase().startsWith(prefix + 'gif')) {
            if (message.channel.type == "dm") return;

            if (!args[0]) return message.channel.send("Please specify a GIF name");

            gifSearch.random(args[0]).then(
                gifUrl => {

                    let randomcolor = ((1 << 24) * Math.random() | 0).toString(16) //Optional
                    var embed = new Discord.MessageEmbed()
                        .setColor(`#${randomcolor}`)
                        .setImage(gifUrl)
                        .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
                    message.channel.send(embed);
                });


        } /*else if (message.content.toLowerCase().startsWith(prefix + 'roleinfo') || message.content.toLowerCase().startsWith(prefix + "ri")) {
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(role => role.name === args[0]);

            // If we can't find any role, then just default to the author's highest role
            if (!role) role = message.member.highestRole;


            // Define our embed
            const roleembed = new Discord.MessageEmbed()
                .setTitle(`Role: ${role.name}`)
                .addField('Members', role.members.cache.size, true)
                .addField('Creation Date', role.createdAt.toDateString(), true)
                .addField('Editable', role.editable.toString(), true)
                .addField('Managed', role.managed.toString(), true)
                .addField('ID', role.id, true)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            return message.channel.send(roleembed)
        }*/ else if (message.content.toLowerCase().startsWith(prefix + 'trump')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			sentMessage.delete({ timeout: 4000 });
			setTimeout(function () {
                snek.get(api).then(r => {
                let embed = new Discord.MessageEmbed()
                    .setTitle('Here is your trump quote')
                    .setDescription(r.body.message)
                    .setColor('RANDOM')
                    .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
                message.channel.send(embed)
				})
            }, 4000);


        } else if (message.content.toLowerCase().startsWith(prefix + 'fmk')) {
            let replies = ['MARRY :ring:', 'KILL :bomb:', 'FUCK :ok_hand:'];
            let result = Math.floor(Math.random() * replies.length);

            let makifuembed = new Discord.MessageEmbed()

                .setDescription(`**${args[0]} has been chosen by <@${message.author.id}>**`)
                .setColor('RANDOM')
                .addField('They want to', replies[result])
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
                .setTimestamp();

            if (!message.mentions.users.first()) return message.channel.send(`<@${message.author.id}>, please mention a user you wanna choose!`).then(msg => {
                msg.delete({ timeout: 3000 });
            });

            message.channel.send(makifuembed);
        } else if (message.content.toLowerCase().startsWith(prefix + 'gameinfo') || message.content.toLowerCase().startsWith(prefix + "gi")) {
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
                        .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
                    message.channel.send(embed).catch(e => {
                        console.log(e)
                        message.reply('Error has occured or `' + game + '` cannot be found')
                    })
                })
            })
 } else if (message.content.toLowerCase().startsWith(prefix + 'hastebin')) {
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
 } else if (message.content.toLowerCase().startsWith(prefix + 'botstats')) {
            if (message.author.id !== '381710555096023061') return message.reply('You do not have permission to use this command!')
            let { version } = require("discord.js");

            cpuStat.usagePercent(function (err, percent, seconds) {
                if (err) {
                    return console.log(err);
                }

                let secs = Math.floor(client.uptime % 60);
                let days = Math.floor((client.uptime % 31536000) / 86400);
                let hours = Math.floor((client.uptime / 3600) % 24);
                let mins = Math.floor((client.uptime / 60) % 60);

                //let duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
                let embedStats = new Discord.MessageEmbed()
                    .setTitle("*** Stats ***")
                    .setColor("#00ff00")
                    .addField("• Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
                    .addField("• Discord.js", `v${version}`, true)
					.addField("• Node", `${process.version}`, true)
                    .addField("• Servers", `${client.guilds.cache.size.toLocaleString()}`, true)
					.addField("• Users", `${client.users.cache.size.toLocaleString()}`, true)
                    .addField("• Channels ", `${client.channels.cache.size.toLocaleString()}`, true)
					.addField("• Uptime ", `\`\`${hours}h ${mins}m\`\``, true) //`${duration}`, true)
                    .addField("• CPU usage", `\`${percent.toFixed(2)}%\``, true)
                    .addField("• Platform", `\`\`${os.platform()}\`\``, true)
                    .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')

                message.channel.send(embedStats)
            })


        } else if (message.content.toLowerCase().startsWith(prefix + 'weather')) {
            weather.find({ search: args.join(" "), degreeType: "C" }, function (err, result) {
                if (err) message.channel.send(err)

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
                    .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
                //Display when it's called
                message.channel.send(weathembed)

            });
        } else if (message.content.toLowerCase().startsWith(prefix + 'morse')) {
            if (!args[0]) { return message.channel.send("What would you like translated?") }
			var sentMessage = await message.channel.send(loadingembed);
			await sentMessage.delete({ timeout: 3000 });
			const target = client.guilds.cache.get('708474977342718005').members.cache.get(message.author.id);
			if(!target.roles.cache.has('708477002813931520')) return message.channel.send(loadingfailed);
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
            var joke = oneLinerJoke.getRandomJoke();

            const sentMessage = await message.channel.send(loadingjokeembed)
			sentMessage.delete({ timeout: 2000 });
            const jokembed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(joke.body)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            setTimeout(function () {
                message.channel.send(jokembed);
            }, 2000);
        } else if (message.content.toLowerCase().startsWith(prefix + 'randomnumber') || message.content.toLowerCase().startsWith(prefix + 'rannum')) {
            const argus = message.content.toLowerCase().slice(config.prefix.length).trim().split(/ +/g);
            if (!argus[1]) return message.reply('Please provide the maximum amount....')
            const sentMessage = await message.channel.send(loadingnumberembed)
			await sentMessage.delete({ timeout: 1000 });

            setTimeout(function () {
				var randomNumber = Math.round(Math.random() * argus[1]);
            const randomnumber = new Discord.MessageEmbed()
                .setTitle(randomNumber)
                message.channel.send(randomnumber)
            }, 900);
        } else if (message.content.toLowerCase().startsWith(prefix + 'unban')) {
			if (!message.guild.me.hasPermission("BAN_MEMBERS")
            )
                return message.reply("Sorry, you don't have permissions to use this!");

            let reason = args.slice(1).join(' ');
            client.unbanReason = reason;
            client.unbanAuth = message.author;
            let user = args[0];
            if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
            if (reason.length < 1) return message.reply('You must supply a reason for the unban.');

            message.guild.unban(user)
			const unban = new Discord.MessageEmbed()
			.setDescription(`*${user} was unbanned by ${message.author.tag} for ${reason}`)
            message.channel.send(unban)



        } else if (message.content.toLowerCase().startsWith(prefix + 'mute')) {
			try {
            let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!tomute) return message.reply("Please mention a valid member of this server");
            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have permission to use this command");
            let muterole = message.guild.roles.find(`name`, "muted");
            //start of create role
            if (!muterole) {
                try {
                    muterole = message.guild.createRole({
                        name: "muted",
                        color: "#000000",
                        permissions: []
                    })
                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                    });
                } catch (e) {
                    console.log(e.stack);
                }
            }
            //end of create role
            let mutetime = args[1];
            if (!mutetime) return message.reply("You didn't specify a time!");

            await (tomute.roles.add(muterole.id));
			const mutesuccess = new Discord.MessageEmbed()
			.setDescription(`*<@${tomute.id}> has been muted for ${ms(ms(mutetime))}*`)
            message.reply(mutesuccess);

            setTimeout(function () {
                tomute.removeRole(muterole.id);
				const muteover = new Discord.MessageEmbed()
				.setDescription('*' + tomute + ' has been unmuted*')
				if(!tomute.roles.cache.has(muterole.id)) return;
                message.channel.send(muteover);
            }, ms(mutetime));
			} catch(err) {
				let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
				if (!tomute) return message.reply("Please mention a valid member of this server");


				const muteerror = new Discord.MessageEmbed()
				.setDescription('I cannot mute ' + `<@` + tomute + `>` + '\nPlease check that I have the right permissions')
				message.channel.send(muteerror)
			}

        } else if (message.content.toLowerCase().startsWith(prefix + 'unmute')) {
            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have permission to use this command")

            let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
            if (!toMute) return message.reply("Please mention a valid member of this server");

            let role = message.guild.roles.cache.find(r => r.name === "muted")
const unmuteerror = new Discord.MessageEmbed()
.setDescription(`<@` + toMute + `>` + ' is not muted')
            if (!role || !toMute.roles.cache.has(role.id)) return message.channel.send(unmuteerror);

            await toMute.roles.remove(role);
			const unmutesuccess = new Discord.MessageEmbed()
			.setDescription(`<@` + toMute + `>` + ' has been unmuted by ' + message.author.tag)
            message.channel.send(unmutesuccess);


        } else if (message.content.toLowerCase().startsWith(prefix + 'uptime')) {
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
                .setColor("RANDOM")
                .addField('Uptime', uptime)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(uptimeembed);

        } else if (message.content.toLowerCase().startsWith(prefix + 'ngif')) {
            if (message.channel.nsfw === true) {
                superagent.get('https://nekobot.xyz/api/image')
                    .query({ type: 'pgif' })
                    .end((err, response) => {
                        message.channel.send({ file: response.body.message });
                    });
            } else {
                message.channel.send(nsfwerror)
            }
        } else if (message.content.toLowerCase().startsWith(prefix + 'ass')) {
            if (message.channel.nsfw === true) {
                superagent.get('https://nekobot.xyz/api/image')
                    .query({ type: 'ass' })
                    .end((err, response) => {
                        message.channel.send({ file: response.body.message });
                    });
            } else {
                message.channel.send(nsfwerror)
            }
        } else if (message.content.toLowerCase().startsWith(prefix + 'anal')) {
            if (message.channel.nsfw === true) {
                superagent.get('https://nekobot.xyz/api/image')
                    .query({ type: 'anal' })
                    .end((err, response) => {
                        message.channel.send({ file: response.body.message });
                    });
            } else {
                message.channel.send(nsfwerror)
            }
        } else if (message.content.toLowerCase().startsWith(prefix + 'hentai')) {
            if (message.channel.nsfw === true) {
                superagent.get('https://nekobot.xyz/api/image')
                    .query({ type: 'hentai_anal' })
                    .end((err, response) => {
                        message.channel.send({ file: response.body.message });
                    });
            } else {
                message.channel.send(nsfwerror)
            }
        } else if (message.content.toLowerCase().startsWith(prefix + '4k')) {
            if (message.channel.nsfw === true) {
                superagent.get('https://nekobot.xyz/api/image')
                    .query({ type: '4k' })
                    .end((err, response) => {
                        message.channel.send({ file: response.body.message });
                    });
            } else {
                message.channel.send(nsfwerror)
            }
        } else if (message.content.toLowerCase().startsWith(prefix + 'thigh')) {
            if (message.channel.nsfw === true) {
                superagent.get('https://nekobot.xyz/api/image')
                    .query({ type: 'thigh' })
                    .end((err, response) => {
                        message.channel.send({ file: response.body.message });
                    });
            } else {
                message.channel.send(nsfwerror)
            }
        } else if (message.content.toLowerCase().startsWith(prefix + 'pussy')) {
            if (message.channel.nsfw === true) {
                superagent.get('https://nekobot.xyz/api/image')
                    .query({ type: 'pussy' })
                    .end((err, response) => {
                        message.channel.send({ file: response.body.message });
                    });
            } else {
                message.channel.send(nsfwerror)
            }
        } else if (message.content.toLowerCase().startsWith(prefix + 'holo')) {
            if (message.channel.nsfw === true) {
                superagent.get('https://nekobot.xyz/api/image')
                    .query({ type: 'holo' })
                    .end((err, response) => {
                        message.channel.send({ file: response.body.message });
                    });
            } else {
                message.channel.send(nsfwerror)
            }
        } else if (message.content.toLowerCase().startsWith(prefix + 'cosplay')) {
            if (message.channel.nsfw === true) {
                superagent.get('https://nekobot.xyz/api/image')
                    .query({ type: 'cosplay' })
                    .end((err, response) => {
                        message.channel.send({ file: response.body.message });
                    });
            } else {
                message.channel.send(nsfwerror)
            }
        } else if (message.content.toLowerCase().startsWith(prefix + 'gonewild')) {
            if (message.channel.nsfw === true) {
                superagent.get('https://nekobot.xyz/api/image')
                    .query({ type: 'gonewild' })
                    .end((err, response) => {
                        message.channel.send({ file: response.body.message });
                    });
            } else {
                message.channel.send(nsfwerror)
            }
        } else if (message.content.toLowerCase().startsWith(prefix + 'hthigh')) {
            if (message.channel.nsfw === true) {
                superagent.get('https://nekobot.xyz/api/image')
                    .query({ type: 'hthigh' })
                    .end((err, response) => {
                        message.channel.send({ file: response.body.message });
                    });
            } else {
                message.channel.send(nsfwerror)
            }
        } else if (message.content.toLowerCase().startsWith(prefix + 'hass')) {
            if (message.channel.nsfw === true) {
                superagent.get('https://nekobot.xyz/api/image')
                    .query({ type: 'hass' })
                    .end((err, response) => {
                        message.channel.send({ file: response.body.message });
                    });
            } else {
                message.channel.send(nsfwerror)
            }
        } else if (message.content.toLowerCase().startsWith(prefix + 'hanal')) {
            if (message.channel.nsfw === true) {
                superagent.get('https://nekobot.xyz/api/image')
                    .query({ type: 'hanal' })
                    .end((err, response) => {
                        message.channel.send({ file: response.body.message });
                    });
            } else {
                message.channel.send(nsfwerror)
            }
        } else if (message.content.toLowerCase().startsWith(prefix + "qrcreate") || message.content.toLowerCase().startsWith(prefix + "qc")) {
            if (!args[0]) { return message.channel.send("Please specify some text") }

			var sentMessage = await message.channel.send(loadingembed);
			await sentMessage.delete({ timeout: 3000 });
			const target = client.guilds.cache.get('708474977342718005').members.cache.get(message.author.id);
			if(!target.roles.cache.has('708477002813931520')) return message.channel.send(loadingfailed);
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
		const suggestno = new Discord.MessageEmbed()
		.setDescription('❎ | You cannot set the suggestions channel')
		if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(suggestno)
	const welcomechannel =  message.mentions.channels.first()
	var welcome = new JSONdb(`./Databases/suggest.sqlite`);
const channel = welcome.set(`${message.guild.id}`, welcomechannel.id)
const newchannel = new Discord.MessageEmbed()
.setDescription('✅ | Suggestions channel has been set to <#' + welcomechannel.id + '>')
message.channel.send(newchannel)
}else if(message.content.toLowerCase().startsWith(prefix + 'suggest')){
		const thing = new JSONdb('./Databases/suggest.sqlite')
		const suggestchannel = thing.get(`${message.guild.id}`)
		const nosuggest = new Discord.MessageEmbed()
		.setDescription(`❎ | This server has not set their suggestions channel\nUse ${prefix}setsuggestionschannel <channel> to set it.`)
		if(!suggestchannel) return message.channel.send(nosuggest)
  const suggestion = args.join(" ");
if(!suggestion) return message.reply('What would you like to suggest to the server?')
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
	.setFooter('Vetrilox', `https://rendernetwork.co/vetriloxtrans.png`)
	message.channel.send(voteembed)
}else if(message.content.toLowerCase() === prefix + "support"){
	const support = new Discord.MessageEmbed()
	.setDescription(`Join the support server [here](https://discord.gg/sxDtd43) \nor click this link: https://discord.gg/sxDtd43`)
	message.channel.send(support)
}else if(message.content.toLowerCase().startsWith(prefix + "poll")){
	if(!args[0]) return message.reply('Please provide some text')
		var loadingpollembed = new Discord.MessageEmbed()
			.setAuthor(`Creating your poll...`, `https://rendernetwork.co/vetriloxloading.gif`);
		const sentMessage = await message.channel.send(loadingpollembed)
		sentMessage.delete({ timeout: 3000 });
	setTimeout(function () {
                const question = args.join(" ")
	const pollembed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setDescription(question)
	.setFooter(`Initiated by ${message.author.tag}`)
	.setTimestamp()
	message.channel.send(pollembed) .then(function (message) {
              message.react("✅")
              message.react("❎")
	})
	}, 3000);


} else if (message.content.toLowerCase().startsWith(prefix + 'dog')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["lookatmydog"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);




            const dogembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(dogembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'rabbit')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["Rabbits"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);




            const rabbitembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(rabbitembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'aww')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["aww"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);




            const awwembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(awwembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'budgie')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["budgies"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);




            const awwembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(awwembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'chinchilla')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["chinchilla"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);
const awwembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(awwembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'bass')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["BassGuitar"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);
const awwembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(awwembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'guitar')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["guitars"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);
const awwembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(awwembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'drums')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["drums"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);
const awwembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(awwembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'piano')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["piano"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);
const awwembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(awwembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'mice')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["PetMice"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);
const awwembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(awwembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'rat')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["RATS"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);
const awwembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(awwembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'fox')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["Fox"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);
const awwembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(awwembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'wolf')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["wolves"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);
const awwembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(awwembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'mustang')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["Mustang"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);
const awwembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(awwembed);


        }else if (message.content.toLowerCase().startsWith(prefix + 'cayman')) {
			const sentMessage = await message.channel.send(loadingloadingembed)
			await sentMessage.delete({ timeout: 4000 });
			 const subReddits = ["Porsche_Cayman"];
			 const random = subReddits[Math.floor(Math.random() * subReddits.length)];
			const img = await randomPuppy(random);
const awwembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
            message.channel.send(awwembed);


        }else if(message.content.toLowerCase().startsWith(prefix + 'google')){
if(!args[0]) return message.reply('What do you want me to google for you?')
	const arguments = args.join('+')
const google = new Discord.MessageEmbed()
.setDescription(`Click on the link below to see your results!\nhttps://lmgtfy.com/?q=${arguments}`)
	message.channel.send(google)
		}else if(message.content.toLowerCase().startsWith(prefix + 'embed')){
			if(!args[0]) return message.reply('What would you like to embed?')

		const sentMessage = await message.channel.send(loadingloadingembed);
		sentMessage.delete({ timeout: 2000 })
		setTimeout(function () {
			const arguments = args.join(' ')
			const letsembed = new Discord.MessageEmbed()
			.setTitle(`This is ${message.author.tag}'s embed!`)
			.setDescription(`This is what he has to say:\n\n ${arguments}`)
			message.channel.send(letsembed)
		}, 2000)
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
} else if(message.content.toLowerCase().startsWith(prefix + 'tag-setup')){
	var tagcount = new JSONdb(`./Databases/Tags/tagcount.sqlite`);
	var guildtagcount = tagcount.get(`${message.guild.id}`)
	const accountnosetup = new Discord.MessageEmbed()
		.setDescription('You Guild has already been setup, make a tag using **!tag-create**')
		if(guildtagcount >= 0) return message.channel.send(accountnosetup);
	if(guildtagcount === undefined || guildtagcount === null) {
		fs.writeFile(`Databases/Tags/${message.guild.id}.sqlite`, '{}', function (err) {
  if (err) return message.channel.send('File Not Created')
});fs.writeFile(`Databases/Tags/${message.guild.id}owners.sqlite`, '{}', function (err) {
  if (err) return message.channel.send('File Not Created')
});
		tagcount.set(`${message.guild.id}`, `0`)
		const accountsetup = new Discord.MessageEmbed()
		.setDescription('Your Guild has been setup, Make your first tag with **!tag-create**')
		message.channel.send(accountsetup)
	}

}else if(message.content.toLowerCase().startsWith(prefix + "tag-create")){
	var tagcount = new JSONdb(`./Databases/Tags/tagcount.sqlite`);
	var guildtagcount = tagcount.get(`${message.guild.id}`)
	const taglimit = new Discord.MessageEmbed()
	.setDescription('This guild has reached its tag limit of \`\`50\`\`, please use **!tag-delete** to delete some')
	if(guildtagcount === 50) return message.channel.send(taglimit);
	const accountyesetup = new Discord.MessageEmbed()
		.setDescription('Your Guild has not been setup, Please run **!tag-setup** to do so')
		if(guildtagcount === undefined || guildtagcount === null) return message.channel.send(accountyesetup);
	var tags = new JSONdb(`./Databases/Tags/${message.guild.id}.sqlite`);
	var tagowners = new JSONdb(`./Databases/Tags/${message.guild.id}owners.sqlite`);
	var tagcount = new JSONdb(`./Databases/Tags/tagcount.sqlite`);
	var tagname = message.content.toLowerCase().split(" ").slice(1, 2).join(" ");
	var tagcontext = message.content.split(" ").slice(2).join(" ");
	const nocreatetag = new Discord.MessageEmbed().setDescription('You must specify Name AND Content')
	if(!tagname) return message.channel.send(nocreatetag);
	if(!tagcontext) return message.channel.send(nocreatetag);
tags.set(`${tagname}`, `${tagcontext}`)
tagowners.set(`${message.author.id}-${tagname}`, `true`)
var guildtagcount = tagcount.get(`${message.guild.id}`)
var x5 = parseInt(guildtagcount)
tagcount.set(`${message.guild.id}`, x5 + 1)

const createtag = new Discord.MessageEmbed()
.setDescription(`Tag \`\`${tagname}\`\` has been set to \`\`${tagcontext}\`\``)
message.channel.send(createtag)

}else if(message.content.toLowerCase().startsWith(prefix + 'tag-delete')){
	var tagcount = new JSONdb(`./Databases/Tags/tagcount.sqlite`);
	var guildtagcount = tagcount.get(`${message.guild.id}`)
	const accountyesetup = new Discord.MessageEmbed()
		.setDescription('Your Guild has not been setup, Please run **!tag-setup** to do so')
		if(guildtagcount === undefined || guildtagcount === null) return message.channel.send(accountyesetup);
	const nodeletetag = new Discord.MessageEmbed()
	.setDescription('Please Specify which Tag you would like to delete')
	var tagname = message.content.toLowerCase().split(" ").slice(1, 2).join(" ");
	if(!tagname) return message.channel.send(nodeletetag)
	var tags = new JSONdb(`./Databases/Tags/${message.guild.id}.sqlite`);
	var tagowners = new JSONdb(`./Databases/Tags/${message.guild.id}owners.sqlite`);
	var owner = tagowners.get(`${message.author.id}-${tagname}`)
	var tagexist = tags.get(`${tagname}`)
	const notag = new Discord.MessageEmbed()
	.setDescription('That tag does not exist')
	if(tagexist === undefined || tagexist === null) return message.channel.send(notag)
	const deletetag = new Discord.MessageEmbed().setDescription('You cannot delete this tag as you are not the owner or do not have the Manage Guild Permission')

if(owner === undefined || owner === null) return message.channel.send(deletetag)

	if(!tagname) return message.channel.send(nodeletetag)
		var owner = tagowners.get(`${message.author.id}-${tagname}`)

	tags.delete(`${tagname}`)
	tagowners.delete(`${message.author.id}-${tagname}`)
	var tagcount = new JSONdb(`./Databases/Tags/tagcount.sqlite`);
	var guildtagcount = tagcount.get(`${message.guild.id}`)
	const x14 = parseInt(guildtagcount)
	tagcount.set(`${message.guild.id}`, x14 - 1)
	const deletedtag = new Discord.MessageEmbed()
	.setDescription(`Tag \`\`${tagname}\`\` has been deleted`)
	message.channel.send(deletedtag)




}

else if(message.content.toLowerCase().startsWith(prefix + "tag")){
	var tagcount = new JSONdb(`./Databases/Tags/tagcount.sqlite`);
	var guildtagcount = tagcount.get(`${message.guild.id}`)
	const accountyesetup = new Discord.MessageEmbed()
		.setDescription('Your Guild has not been setup, Please run **!tag-setup** to do so')
		if(guildtagcount === undefined || guildtagcount === null) return message.channel.send(accountyesetup);
	var tagname = message.content.toLowerCase().split(" ").slice(1, 2).join(" ");
	const notagshow = new Discord.MessageEmbed().setAuthor('Here are your available tags:\n(This is a WIP)').setFooter('Use tag <tag name> to view the tag')
	if(!tagname) return message.channel.send(notagshow)
	var tags = new JSONdb(`./Databases/Tags/${message.guild.id}.sqlite`);
	const tagoutput = await tags.get(`${tagname}`)
	const notag = new Discord.MessageEmbed()
	.setDescription('That tag does not exist, Please use **!tag-create** to make one')
	if(tagoutput === undefined || tagoutput === null) return message.channel.send(notag)


	const output = new Discord.MessageEmbed()
	.setDescription(tagoutput)
	message.channel.send(output)
}else if(message.content.toLowerCase().startsWith(prefix + "shorten")){
	if(!args[0]) return message.channel.send('Please provide a link to shorten')
	TinyURL.shorten(args[0], function(res, err) {
    if (err)
        console.log(err)
    const shorten = new Discord.MessageEmbed()
	.setAuthor('Here is your shortened link...')
	.addField('Original Link', args[0])
	.addField('Shortened Link', res)
	.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
	message.channel.send(shorten)
});
}else if(message.content.toLowerCase().startsWith(prefix + "remindme")){
	var tagname = message.content.toLowerCase().split(" ").slice(1, 2).join(" ");
		var tagcontext = message.content.split(" ").slice(2).join(" ");
	if(!tagname) return message.channel.send('Please specify when you want me to remind you')
		if(!tagcontext) return message.channel.send('Please specify what you want me to remind you about.')
			const reminderset = new Discord.MessageEmbed()
		.setDescription(`Reminder set for ${tagname}`)
		.setFooter('Vetrilox', 'https://rendernetwork.co/vetriloxlogo.png')
message.channel.send(reminderset)

		setTimeout(function () {
			const reminder = new Discord.MessageEmbed()
			.setTitle('Here is your reminder...')
			.setDescription(tagcontext)
			.setFooter(`Reminder from ${tagname} ago`)
			message.author.send(reminder)
		}, ms(tagname))
}else if(message.content.toLowerCase() === prefix + "updatecountchannels"){
		 client.guilds.cache.get('708474977342718005').channels.cache.get('733912249072353379').setName(`Servers: ${client.guilds.cache.size}`);
		 client.guilds.cache.get('708474977342718005').channels.cache.get('736378748978462830').setName(`Channels: ${client.channels.cache.size}`);
		 client.guilds.cache.get('708474977342718005').channels.cache.get('736378763788550225').setName(`Users: ${client.users.cache.size}`);
	 }else if (message.content.toLowerCase().startsWith(prefix + 'redpanda')) {
					 superagent.get('https://some-random-api.ml/img/red_panda')
							 .end((err, response) => {
									 message.channel.send({ file: response.body.message });
							 });
			 }
		 })












client.login(TOKEN);
