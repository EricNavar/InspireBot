require('dotenv').config();
const puppeteer = require("puppeteer-extra");
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", message => {
  if (message.content.toLowerCase().startsWith('!inspire')) {
    const args = message.content
      .slice(1)
      .trim()
      .split(/ +/g);
    
      try {
        const argies = [
          "--no-sandbox",
          '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36"',
          "--start-maximized"
        ];
        const options = {
          args: argies
        };
        //add cookies here and you'll be able to log into any site!

        puppeteer.launch(options).then(async browser => {
          const page = await browser.newPage();
          await page.goto("https://www.ericnavar.com/inspire").catch(e => {
            console.log(e);
            message.channel.send("Could not find inspiration!" + e);
          });
          await page.screenshot({ path: "inspiration.png" });
          console.log("normal screenshot taken");
          message.channel.send("", {
            files: ["inspiration.png"]
          });
          await browser.close();
        });
      } catch (error) {
        console.log(error);
        msg.edit("Invalid Link. Error: " + error);
      }
  }
});