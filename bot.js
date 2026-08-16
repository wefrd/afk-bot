const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'sunucu-adresin.aternos.me', // Aternos IP adresin
    port: 25565,                         // Port numaran
    username: 'AFK_Bot',
    version: '1.20.1'                    // Sunucu sürümün
  });

  bot.on('login', () => {
    console.log('✅ Bot başarıyla oyuna girdi!');
  });

  // Aternos AFK korumasını atlatmak için rastgele yürüme ve dönme hareketi
  bot.on('spawn', () => {
    setInterval(() => {
      // Rastgele bakış açısı değiştir
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, true);

      // İleri yürü ve zıpla
      bot.setControlState('forward', true);
      bot.setControlState('jump', true);

      setTimeout(() => {
        bot.setControlState('forward', false);
        bot.setControlState('jump', false);
      }, 1000);
    }, 15000); // 15 saniyede bir rastgele hareket eder
  });

  bot.on('end', (reason) => {
    console.log(`⚠️ Bağlantı kesildi (${reason}), 15 saniye sonra tekrar deneniyor...`);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Hata oluştu:', err);
  });
}

// Render kapanma uyarısını engellemek için port dinleyici
require('http').createServer((req, res) => res.end('Bot Aktif')).listen(process.env.PORT || 10000);

createBot();
