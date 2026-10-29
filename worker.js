export default {
  async fetch(request, env, ctx) {
    if (request.method === "POST") {
      try {
        const payload = await request.json();
        
        // চেক করা হচ্ছে মেসেজটি /start কিনা
        if (payload.message && payload.message.text === "/start") {
          const chatId = payload.message.chat.id;
          
          // ⚠️ এখানে আপনার বটের টোকেন দিন (BotFather থেকে পাওয়া)
          const BOT_TOKEN = "9008599278:AAGXF9PNk-L2LRkMQDWuiFenq7hqG60EZzw";
          
          // ⚠️ এখানে আপনার GitHub Pages এর লিংক দিন
          const MINI_APP_URL = "https://sadikrs.github.io/EarnX-App/";

          const text = 
            "✅ Your account has been successfully verified!\n\n" +
            "👇 Click on the required buttons below:\n\n" +
            "🚀 Open Bot - Click to start working.\n" +
            "💰 Earn - Click here to earn money.\n" +
            "💸 Withdraw - Click here to withdraw money.\n" +
            "👥 Refer - Click here to get referral bonuses.\n" +
            "❓ Help - Click here if you have any problems.";

          const replyMarkup = {
            inline_keyboard: [
              [
                {
                  text: "🚀 Open Bot",
                  web_app: { url: MINI_APP_URL }
                }
              ],
              [
                { text: "💰 Earn", callback_data: "earn" },
                { text: "💸 Withdraw", callback_data: "withdraw" }
              ],
              [
                { text: "👥 Refer", callback_data: "refer" },
                { text: "❓ Help", callback_data: "help" }
              ]
            ]
          };

          // টেলিগ্রাম এপিআই-তে মেসেজ পাঠানো
          const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
          await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: text,
              reply_markup: replyMarkup
            })
          });
        }
        
        // বাটন ক্লিকের রেসপন্স (যদি প্রয়োজন হয়)
        if (payload.callback_query) {
            const callbackId = payload.callback_query.id;
            const BOT_TOKEN = "9008599278:AAGXF9PNk-L2LRkMQDWuiFenq7hqG60EZzw";
            // লোডিং এনিমেশন বন্ধ করা
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ callback_query_id: callbackId })
            });
        }

        return new Response("OK", { status: 200 });
      } catch (e) {
        return new Response("Error", { status: 500 });
      }
    }
    return new Response("Bot is running!", { status: 200 });
  }
};