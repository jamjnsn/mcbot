# McBot

## What the heck is this?
McBot is a super basic Discord bot for interacting with RCON on a Minecraft server. Really it was just created for my own purposes, but it's cool if somebody else can make use of it.

McBot is meant to run in a Docker container if only because I wanted to learn how to work with Docker containers.

Enjoy! 😊

## 💬 Commands
### say *message*
Sends a message to your Minecraft server using the following command using the nickname of the user executing the command: 
```
/tellraw @a {"text":"[<nickname>] <message>","color":"#7289da"}
```

### whitelist *username*
Adds a Minecraft user with the provided username to the server's whitelist.

## ✨ Getting Started
There's not really much to this app. Just run something like the following:

```
docker run \
  --name=mcbot \
  -e COMMAND_PREFIX='/' \
  -e DISCORD_TOKEN='<Your Discord bot token here!>' \
  -e RCON_HOST='localhost' \
  -e RCON_PORT=25575 \
  -e RCON_PASSWORD='<Your RCON password here!>' \
  --restart unless-stopped \
  jamjnsn/mcbot
```

### Environment Variables
#### `COMMAND_PREFIX`
Character that will proceed all commands. Defaults to `/`.

#### `DISCORD_TOKEN`
Your Discord bot token. **Required.**

#### `RCON_HOST`
Host IP for your RCON server. Defaults to `localhost`.

#### `RCON_PORT`
Host port for your RCON server. Defaults to `25575`.

#### `RCON_PASSWORD`
Password for your RCON server. **Required.**
