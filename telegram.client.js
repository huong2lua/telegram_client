const { StringSession }   = require("telegram/sessions");
const { TelegramClient }  = require("telegram");
const { NewMessage }      = require("telegram/events");
const { text }            = require("input/dist/lib");
const _    = require("lodash");


const apiId = 22633701; // your api id
const apiHash = "a343544ad3898270d8bbc69bab1d7415"; // your api hash id
const stringSession = new StringSession(""); // can fill this later with the value from session.save()

class MyTelegramClient {

    async start() {
        // after manual login with npm run login, replace the value below
        const rawStringSession = "YOUR_STRING_SESSION"
        const session = new StringSession(rawStringSession);
        const client = new TelegramClient(session, apiId, apiHash, {
            connectionRetries: 5,
        });
        await client.connect();

        const myInfo = await client.getMe();
        console.log("myInfo", myInfo); // check your info if your session work

        // insert telegramChannel you want to listen incoming message
        const telegramChannelId = 1744740898;
        const newMessageParams = {incoming: true, fromUsers: [telegramChannelId]}
        const newMessageEvent = new NewMessage(newMessageParams);
        client.addEventHandler(this.handler, newMessageEvent);
    }

    handler(event) {
        const originalUpdateMessage = _.get(event, "originalUpdate.message.message");
        console.log("originalUpdateMessage", originalUpdateMessage)
    }

    async manualLogin() {
        console.log("Login loading...");
        const client = new TelegramClient(stringSession, apiId, apiHash, {
            connectionRetries: 5,
        });
        await client.start({
            phoneNumber: async () => await text("Please enter your number: "),
            password: async () => await text("Please enter your password: "),
            phoneCode: async () =>
                await text("Please enter the code you received: "),
            onError: (err) => console.log(err),
        });
        console.log("You should now be connected.");
        console.log("stringSession:", client.session.save()); // Save this string to avoid logging in again
        await client.disconnect();
    }

}

exports.MyTelegramClient = MyTelegramClient;
