const discord = require("discord.js");
const { MongoClient } = require("mongodb")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = discord;
const { inviteMember } = require("../../commands/chat_input_command/inviteMember.js");
const { createTeam } = require("../../commands/chat_input_command/createTeam.js");
const { deleteTeam } = require("../../commands/chat_input_command/deleteTeam.js");
const { kickMember } = require("../../commands/chat_input_command/kickMember.js");
const { customize_team } = require("../../commands/chat_input_command/customizeTeam.js");
const { leaveTeam } = require("../../commands/chat_input_command/leaveTeam.js");
const { applyTeamButton } = require("../../features/teamApplyButton");
const { applyTeamModal } = require("../../features/teamApplyModal");
const { invitationAccept } = require("../../features/inviteAccept")
const { invitationaReject } = require("../../features/inviteReject")
const { inviteAccept } = require("../../features/applicationAccept.js");

const { kickMemberModal } = require("../../features/kickMemberModal")




require("dotenv").config();

// Client interactionCreate event

module.exports = {

    /**
     * 
     * @param {discord.Client} client 
     * @param {MongoClient} mongoClient
     */

    async event(client, mongoClient) {

        // collects every slash command script into an object
        client.on("interactionCreate", async (interaction) => {

            if (interaction.isCommand()) {

                if (interaction.commandName === "invite_member") {
                    inviteMember(interaction, mongoClient);
                }
                if (interaction.commandName === "create_team") {
                    createTeam(interaction, mongoClient, client);
                }
                if (interaction.commandName === "delete_team") {
                    deleteTeam(interaction, mongoClient, client);
                }
                if (interaction.commandName === "kick_member") {

                    kickMemberModal(interaction, mongoClient, client);
                }
                if (interaction.commandName === "customize_team") {
                    customize_team(interaction, mongoClient, client);
                }
                if (interaction.commandName === "leave_team") {
                    leaveTeam(interaction, mongoClient, client);
                }

            }

            //  button interactions
            if (interaction.isButton()) {
                
                if(interaction.customId.startsWith("apply")){
                    if(interaction.customId.startsWith("applyAccept")){
                        await inviteAccept(interaction, mongoClient, client);
                    }
                }

                if (interaction.customId.startsWith("teamApply")) {
                    await applyTeamButton(interaction,mongoClient,client);

                }
                if(interaction.customId.startsWith("acceptButton")){
                    await invitationAccept(interaction, mongoClient, client);
                }
                if(interaction.customId.startsWith("rejectButton")){
                    await invitationaReject(interaction, mongoClient, client);
                }
            }

            if(interaction.isModalSubmit()){
                if(interaction.customId.startsWith("userInfo")){
                    applyTeamModal(interaction,mongoClient,client);
                }
                else if(interaction.customId.startsWith("kickReason")){
                    kickMember(interaction,mongoClient,client);
                }
            }

        });

    },


}