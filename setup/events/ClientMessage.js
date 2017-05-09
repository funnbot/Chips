// Client Message Events
let slSwitcher=false, helper3=false;
global.testC, global.nLogs, global.sLogs, global.sxLogs, global.stLogs, global.snLogs;
global.sLogs2;

//user submission step stored by id
let submStep = {'id0': -1};

//steps {stepnum: ["Step1 text", numoptions]}
const steps = {
  0: ["Step 0 text: You've requested -helppt. React with 1 to continue.", 2],
  1: ["Step 1 text: Submission type", 3],
  2: ["Step 2 text: Gamemode", 4]
};

global.muteTrigger=false;

module.exports = function() {
  console.log("Client message event..");
  client.on("message", message => {
    //rekt
    if(muteTrigger&& (message.author.id=="244533925408538624" && (message.content.toLowerCase().indexOf("user muted successfully")>-1||message.content.toLowerCase().indexOf("user banned successfully")>-1)))
      return message.channel.send("Omg rekt! https://giphy.com/gifs/TEcDhtKS2QPqE");

    if (message.author.bot) return;

    //wowbleach trigger
    if(message.content.toLowerCase().indexOf("wowbleach")>-1) message.channel.send(" \ _ \ _ \ <:Bleach:274628490844962826>\n\ <:WOW:290865903384657920>");

    if (!message.guild)
      return dmHandle(message);

    //console.log(monitorMode);
    if (monitorMode && message.channel == testC)
      console.log("\n", chalk.bold.bgBlue("Social spy: "), chalk.bgBlack("\n\t[" + message.author.username + "] message content: " + message.content));

    if (message.content.toLowerCase().startsWith(prefix.toLowerCase())){
      console.log("command detected");
      CommandHandler(message, prefix);
    }

    try{
      if(message.guild.id==Constants.servers.SNAP){
        send2(message, snLogs);
        snMsgs++;
      }
    }catch(err){console.log(`Log errored! ${err}`);}

    filter(message);
    detectPartyLink(message);
  });
  c2.on('message', m => {
    try{
      if(m.guild.id==Constants.servers.SK){
        if(slSwitcher)
          send2(m,sLogs);
        else
          send2(m,sLogs2);
        slSwitcher=!slSwitcher;
        sMsgs++;
      }else
      if(m.guild.id==Constants.servers.SINX){
        send2(m,sxLogs);
        sxMsgs++;
      }else
      if(m.guild.id==Constants.servers.STTOC){
        send2(m,stLogs);
        stMsgs++;
      }
    }catch(err){console.log(`Log errored! ${err}`);}
  });
  c3.on('message', m => {
    try{
      if(m.guild.id==Constants.servers.NEB){
        send2(m,nLogs);
        nMsgs++;
      }
    }catch(err){console.log(`Log errored! ${err}`);}
  });

  require('./ClientReaction')();
};

async function dmHandle (message) {
  if(database.sheets[`botlog`]==null) return message.channel.send("Bot is still starting up...");
  DMLogger(message);
  if(message.content==(prefix+"help")){
    message.channel.sendMessage(`Do -helppt`);
    return;
  }
  if(message.content.startsWith(prefix+"helppt")){
    submStep[message.author.id]=0;
    await reactOptions(message);
    console.log("helppt");
  }
}

async function reactOptions(message) {
  let stepNum = submStep[`${message.author.id}`];
  let text = steps[stepNum][0];
  let numChoices = steps[stepNum][1];
  await message.channel.send("You are on step " + stepNum);
  const msg = await message.channel.send(text);
  if (isNaN(numChoices)) throw new TypeError("Number of choices must be a number.");
  if (numChoices > 9) numChoices = 9;
  await msg.react("⬅");
  let index=1;
  try{
    do
      await msg.react(Constants.CHOICES[index]);
    while(++index<numChoices+1);
    await msg.react("❌");
  }catch(err){
    console.log("Dm message was probably deleted");
  }
}

async function isntMe(react){
  return react.me;
}

async function detectPartLink(message){
  try{
    let bad = new Discord.RichEmbed().setColor("13551").setTitle("Party Link Detected!");
    let lInfo =require(path.join(__dirname, '../../handlers/DiepAddons')).getInfo(message.cleanContent);
    bad.addField("code:",lInfo.code);
    bad.addField("ip:", `${lInfo.ip}:${lInfo.port}`, true);
    bad.addField("host:", lInfo.host, true);
    bad.addField("gamemode:", lInfo.gamemode);
    bad.addField("location: ", lInfo.location, true);
    bad.addField("link:", lInfo.link, true);
    message.channel.send(bad);
  }catch(err){
    //not a party link or something went wrong.
  }
}
