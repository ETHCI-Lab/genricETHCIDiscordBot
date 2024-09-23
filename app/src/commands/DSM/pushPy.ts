import { ChatInputCommandInteraction, CommandInteraction, EmbedBuilder, Interaction, SlashCommandStringOption, VoiceChannel } from "discord.js";
import { CommandInfo } from "../../interfaces/CommandInfo";
import { loginDSM } from "../../init/loginDSM";
import { StateManger } from "../../utils/StateManger";
import { joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice';
import { getPyAudio } from "../../utils/music/getPyAudio";
import { logger } from "../../utils/log";

const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config()

const data = new SlashCommandBuilder().setName('pushmusic').setDescription('推入培宇音樂').addStringOption((option: SlashCommandStringOption) => option.setName('name').setDescription('歌名').setRequired(true))

const playPy = async (interaction: CommandInteraction) => {

    /**
     * 延遲回應
     */
    await interaction.deferReply();

    const player = StateManger.getPlayer()
    const controller = StateManger.getPlayController()

    if (StateManger.getDSMSid() != undefined&&StateManger.getDSMCookie() != undefined) {
            //@ts-ignore
            const voiceChannel:VoiceChannel = interaction.member.voice.channel
            if (voiceChannel&&interaction.guild) {

                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: interaction.guildId as string,
                    adapterCreator: interaction.guild.voiceAdapterCreator
                })
    
                connection.on("error",(error)=>{
                    logger.error(error)
                })

                connection.on(VoiceConnectionStatus.Disconnected ,()=>{
                    logger.info("Disconnected ")
                    controller?.clear()
                })

                if (controller?.musicList.length == 0) {
                    player?.stop()
                }
        
                const resource = await getPyAudio(encodeURI(`/ETHCI/無損音檔/PeiYu Cheng/${interaction.options.get("name")?.value}`),interaction.options.get("name")?.value as string)

                if (player&&resource) {
                    connection.subscribe(player);
                    controller?.pushMusic(resource);
                    await interaction.editReply(`新增: ${interaction.options.get("name")?.value}`);

                }else{

                    await interaction.editReply("撥放器初始化失敗/未找到資源");

                }
            }else{
                await interaction.editReply("不在頻道");
            }

    } else {
        await interaction.editReply("登入失敗");
        await loginDSM({
            name: process.env.SynnologyDsmUserName as string,
            password: process.env.SynnologyDsmPassword as string
        })
    }
}

const info: CommandInfo = {
    data: data,
    execute: playPy
}


module.exports = info;
