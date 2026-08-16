const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'ereftek.aternos.me', 
    port: 25565,                           
    username: 'AFK_Botu',
    checkTimeoutInterval: 60 * 1000,
    versionCheck: false // Sunucunun gönderdiği hatalı sürüm kontrolünü devre dışı bırakır
  });

  bot.on('spawn', () => {
    console.log('✅ Bot başarıyla oyuna girdi!');
    
    // Botun AFK'dan düşmemesi için 10 saniyede bir zıplamasını sağlar
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
