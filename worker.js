export default {
  async fetch(request, env, ctx) {
    if (request.method === "POST") {
      try {
        const payload = await request.json();
        
        // ⚠️ এখানে আপনার বটের টোকেন এবং অ্যাপের লিংক দিন
        const BOT_TOKEN = "9008599278:AAGXF9PNk-L2LRkMQDWuiFenq7hqG60EZzw";
        const MINI_APP_URL = "https://sadikrs.github.io/EarnX-App/";

        // ১. /start কমান্ড হ্যান্ডেল করা
        if (payload.message && payload.message.text === "/start") {
          const chatId = payload.message.chat.id;
          
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
              [{ text: "🚀 Open Bot", web_app: { url: MINI_APP_URL } }],
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

          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: text,
              reply_markup: replyMarkup
            })
          });
        }

        // ২. বাটন ক্লিক (Callback Query) হ্যান্ডেল করা
        if (payload.callback_query) {
          const callbackId = payload.callback_query.id;
          const chatId = payload.callback_query.message.chat.id;
          const action = payload.callback_query.data;

          // বাটনের লোডিং এনিমেশন বন্ধ করা
          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ callback_query_id: callbackId })
          });

          // কোন বাটনে ক্লিক করলে কী মেসেজ যাবে
          let responseText = "";
          if (action === 'earn') {
            responseText = "💰 <b>Earn Money</b>\n\nTo start earning, click the button below to open the app and go to the <b>Earn</b> section. Watch videos and complete tasks to increase your balance!";
          } else if (action === 'withdraw') {
            responseText = "💸 <b>Withdraw Money</b>\n\nYou can withdraw your earnings via bKash, Nagad, or USDT. Open the app and go to the <b>Withdraw</b> section to submit a request.";
          } else if (action === 'refer') {
            responseText = "👥 <b>Refer & Earn</b>\n\nInvite your friends and earn ৳25 for each friend! Open the app to get your personal referral link and share it with your friends.";
          } else if (action === 'help') {
            responseText = "❓ <b>Help & Support</b>\n\nIf you are facing any problems, please open the app and go to <b>Profile -> Help & Support</b> to chat with our admin directly.";
          }

          // মেসেজ এবং অ্যাপ ওপেন করার বাটন পাঠানো
          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: responseText,
              parse_mode: "HTML",
              reply_markup: {
                inline_keyboard: [
                  [{ text: "🚀 Open App Now", web_app: { url: MINI_APP_URL } }]
                ]
              }
            })
          });
        }

        return new Response("OK", { status: 200 });
      } catch (e) {
        console.error(e);
        return new Response("Error", { status: 500 });
      }
    }
    return new Response("Bot is running!", { status: 200 });
  }
};