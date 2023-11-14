const {MyTelegramClient} = require("./telegram.client");

const client = new MyTelegramClient();
async function getStringSessionManual() {
    await client.manualLogin();
}

getStringSessionManual().then();
