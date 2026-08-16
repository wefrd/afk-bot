const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'ereftek.aternos.me', // Sunucu adresin
    port: 28095,                // Aternos'un sana verdiği port
    username: 'AFK_Bot',        // Botun oyundaki adı
    version: '1.20.1'           // Sunucunun Minecraft sürümü
  });

  bot.on('login', () => {
    console.log('✅ Bot başarıyla oyuna girdi!');
  });

  // Aternos AFK atmasını önlemek için hareketler
  bot.on('spawn', () => {
    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, true);

      bot.setControlState('forward', true);
      bot.setControlState('jump', true);

      setTimeout(() => {
        bot.setControlState('forward', false);
        bot.setControlState('jump', false);
      }, 1000);
    }, 15000);
  });

  bot.on('end', (reason) => {
    console.log(`⚠️ Bağlantı kesildi (${reason}), 15 saniye sonra tekrar bağlanılıyor...`);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Hata oluştu:', err.message);
  });
}

// Render servisinin kapanmasını önleyen port dinleyicisi
require('http').createServer((req, res) => res.end('Bot Aktif')).listen(process.env.PORT || 10000);

createBot();
