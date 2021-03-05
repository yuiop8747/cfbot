const { RTMClient } = require("@slack/client");
require("dotenv").config();
const token = process.env.TOKEN;
const rtm = new RTMClient(token);
const getCfInfo = require("./request");
rtm.start();

rtm.on("message", async (message) => {
  var text = message.text;
  console.log(message);
  if (text.includes("코포시간")) {
    let data = await getCfInfo();
    data.shift();
    for (let i = 0; i < data.length; i += 1) {
      rtm.sendMessage(
        "라운드 : " + data[i].title + "\n" + "시간 : " + data[i].time,
        message.channel
      );
    }
  }
});
