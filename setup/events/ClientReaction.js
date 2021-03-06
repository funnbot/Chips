
module.exports = function() {
  client.on("messageReactionAdd", (react, user) => {
    if(user.id == client.user.id) return;

    console.log("Reaction detected");
    if (react.message.channel.type == 'text') {
      console.log("Not in DM (->Starboard)");
      if(disableSelfStar[react.message.guild.id]&&react.message.author.id==user.id)
        if(react.emoji.toString()==Constants.emojis.STAR)
          react.remove(user);
    }else{
      if(react.message.author.id != client.user.id) return;
      console.log("DM channel emoji: " + react.emoji);
      if(react.message.author.id!=client.user.id) return;
      react.message.channel.sendMessage(`The emoji used is ${react.emoji}`);

      console.log("userid: " + user.id);
      console.log(`The emoji used is ${react.emoji}`);
      if(react.emoji.toString()=="1⃣"){react.message.channel.sendMessage("Hi: one (nothing to see here yet)");}
      else if(react.emoji.toString()=="2⃣"){react.message.channel.sendMessage("Hi: two");}
      else if(react.emoji.toString()==":three:"){react.message.channel.sendMessage("Hi: three");}
      react.message.delete();
    }
  });
};
