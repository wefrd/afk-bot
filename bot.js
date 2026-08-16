const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'ereftek.aternos.me', 
    port: 25565,                           
    username: 'AFK_Botu',
    version: '1.21.4' // Paper 26.2 build'ine karşılık gelen Minecraft sürümü
  });

  bot.on('spawn', () => {
    console.log('✅ Bot başarıyla oyuna girdi!');
    
    // Botun AFK kalıp atılmaması için 10 saniyede bir zıplamasını sağlar
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('end', () => {
    console.log('⚠️ Bağlantı kesildi, 15 saniye sonra tekrar deneniyor...');
    setTimeout(startBot, 15000);
  });

  bot.on('error', err => console.log('Hata oluştu:', err));
}

startBot();

const expressServer = require('http');
expressServer.createServer((req, res) => res.end('Bot Aktif')).listen(process.env.PORT || 3000);
const expressServer = require('http');
expressServer.createServer((req, res) => res.end('Bot Aktif')).listen(process.env.PORT || 3000);
const expressServer = require('http');
expressServer.createServer((req, res) => res.end('Bot Aktif')).listen(process.env.PORT || 3000);
