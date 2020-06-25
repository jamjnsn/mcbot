const { exec } = require("child_process");
const config = require('./config.json');

exec("docker build --tag mcbot:0.0 .", (error, stdout, stderr) => {
    if(error) {
        console.log(`error: ${error.message}`);
        return;
    }

    if(stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    console.log(stdout);
});

let cmd = `
docker run --rm \
  --name=mcbot \
  -e COMMAND_PREFIX='${config.prefix}' \
  -e DISCORD_TOKEN='${config.token}' \
  -e RCON_HOST='${config.rconfig.host}' \
  -e RCON_PORT='${config.rconfig.port}' \
  -e RCON_PASSWORD='${config.rconfig.password}' \
  mcbot:0.0
`.trim();

exec(cmd, (error, stdout, stderr) => {
    if(error) {
        console.log(`error: ${error.message}`);
        return;
    }

    if(stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    console.log(stdout);
});