import discord
from discord.ext import commands
import openai
from gtts import gTTS
from dotenv import load_dotenv
import os

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = openai_api_key

bot_token = os.getenv("BOT_TOKEN")

bot = commands.Bot(command_prefix='!', intents=discord.Intents.all(), case_insensitive=True, self_bot=True)

@bot.command()
async def join(ctx):
    voice_channel = ctx.author.voice.channel
    if voice_channel is not None:
        vc = await voice_channel.connect()

@bot.command()
async def leave(ctx):
    vc = ctx.voice_client
    if vc is not None:
        await vc.disconnect()

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return
    if message.content.startswith('!'):
        return
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=message.content
    )
    tts = gTTS(response.choices[0].text)
    tts.save("response.mp3")
    vc = bot.voice_client
    if vc is not None:
        vc.play(discord.FFmpegPCMAudio("response.mp3"))

bot.run(bot_token)