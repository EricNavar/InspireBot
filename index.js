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
          '--no-sandbox',
          '--disable-setuid-sandbox'
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
          var screenshot = await page.screenshot({type: 'png'});
          console.log("screenshot taken");
          message.channel.send({files:[{ attachment: screenshot, name: "screenshot.png" }]});
          await browser.close();
        });
      } catch (error) {
        console.log(error);
        msg.edit("Invalid Link. Error: " + error);
      }
  }
});