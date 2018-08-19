var Discord = require("discord.js");
var prefix = ".";
var client = new Discord.Client();

client.on("ready", () => {
  client.user.setActivity('Haumea - ScreenShare Shop', { type: 'PLAYING' });
  console.log("[HAUMEA] BOT ONLINE!");
});

var bannedwords = "fuck,shit,slut,whore".split(",");

client.on("message", msg => {
  if (msg.guild === null) return;

  for (i=0;i<bannedwords.length;i++) {Q
    if (msg.content.toLowerCase().includes(bannedwords[i])) {
      msg.delete();
      msg.reply("não fale palavrões em inglês, você não é gang.");
      return;
    }
  }

  if (msg.author.bot) return;
  if (!msg.member.hasPermission("ADMINISTRATOR")) return;

  if (!msg.content.toLowerCase().startsWith(prefix)) return;
  msg.delete();
  if (msg.content.toLowerCase().startsWith(prefix + "kick")) {
    var mem = msg.mentions.members.first();
    mem.kick().then(() => {
      msg.channel.send(mem.displayName + " foi kickado do servidor por " + msg.author.username + "!");
    }).catch(e => {
      msg.channel.send("Ocorreu um erro!");
    });
  }
  if (msg.content.toLowerCase().startsWith(prefix + "banir")) {
    var mem = msg.mentions.members.first();
    var mc = msg.content.split(" ")[2];
    mem.ban(mc).then(() => {
      msg.channel.send(mem.displayName + " foi banido do servidor por " + msg.author.username + " com um tempo de " + mc + " dias!");
    }).catch(e => {
      msg.channel.send("Ocorreu um erro!");
    });
  }
  if (msg.content.toLowerCase().startsWith(prefix + "mutar")) {
    var mem = msg.mentions.members.first();
    if (msg.guild.roles.find("name", "Mutado")) {
      mem.addRole(msg.guild.roles.find("name", "Mutado")).then(() => {
        msg.channel.send(mem.displayName + " foi mutado com sucesso!");
      }).catch(e => {
        msg.channel.send("Ocorreu um erro!");
        console.log(e);
      });

    }
  }
  if (msg.content.toLowerCase().startsWith(prefix + "desmutar")) {
    var mem = msg.mentions.members.first();
    if (msg.guild.roles.find("name", "Mutado")) {
      mem.removeRole(msg.guild.roles.find("name", "Mutado")).then(() => {
        msg.channel.send(mem.displayName + " foi desmutado!");
      }).catch(e => {
        msg.channel.send("Ocorreu um erro!");
        console.log(e);
      });

    }
  }
  if (msg.content.toLowerCase().startsWith(prefix + "purge")) {
    var mc = msg.content.split(" ")[1];
    msg.channel.bulkDelete(mc);
  }
  if (msg.content.toLowerCase().startsWith(prefix + "eval")) {
    var sc = msg.content.substring(msg.content.indexOf(" "));
    eval(sc);
  }
});


client.login("NDgwMDEwMzY4MjExNjE1NzU0.DlhkSA.2nPFDKb8xOHkBqdylnEmZc5JyBY");
