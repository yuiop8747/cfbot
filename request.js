const request = require("request");
const cheerio = require("cheerio");
const getCfInfo = async () => {
  return new Promise(async (resolve) => {
    await request("http://codeforces.com/contests", (error, response, body) => {
      $ = cheerio.load(body);
      let data = [];
      const $bodyList = $(
        ".contestList > .datatable > div > table > tbody"
      ).children("tr");
      //   console.log($bodyList.length);
      $bodyList.each((i, elem) => {
        // console.log($(elem).find("[target=_blank]").text());
        // console.log($(elem).html());
        // console.log($(elem).find("td").first().empty().html());
        data.push({
          title: $(elem).find("td").first().text().trim(),
          time: $(elem).find("[target=_blank]").text().trim(),
        });
        // data.push($(elem).find("[target=_blank]").text().trim());
      });
      for (let i = 1; i < data.length; i += 1) {
        // console.log(data[i]);
        let str = data[i].time;
        str = str.split(" ");
        let sub = str[1].split(":");
        let temp = Number(sub[0]) + 6;
        sub[0] = temp;
        const tm = str[0] + " " + sub[0] + ":" + sub[1];
        data[i].time = tm;
        let title = data[i].title.split("\n");
        data[i].title = title[0];
      }
      //   console.log("request : " + data[1].title);
      resolve(data);
    });
  });
};

module.exports = getCfInfo;
// writer , title , 대회시간 정보 필요
