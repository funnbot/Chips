module.exports = {
  name: "setdm",
  async func(msg, { send, member, author, doEval }) {
    const used = member || author;
    switch (used.id) {
      case "259209114268336129":
      case "265611625283715072":
        break;
      default:
        return send("You must be approved to use this command! " + member ? member.displayName : author.username);
    }
    let sentmsg;
    try {
      sentmsg = await send("Setting dOutput...");
    } catch (err) { console.error(`Error at sending message of SetOutput: ${err}`); }
    try {
      await doEval("dmC = channel");
      sentmsg && sentmsg.edit("DChannel set!");
    } catch (err) {
      sentmsg && sentmsg.edit("There was an error setting dOutput channel! (It has been logged)");
      console.error("Error setting dOutput channel: " + err);
    }
  }
};