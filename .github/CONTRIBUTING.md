# Contributing Guide

Please reference the information below when contributing to this repository.

## Welcome

Welcome to the OWDDM bot repository. Thank you for your interest in contributing to the project. Full details and guidelines on how to ensure this project is managed are included below.

## Helping others

Please help other contributors to the project wherever you can, as people all start somewhere. If you require assistance or wish to provide assistance you can ask/answer questions in the [Discord Server](https://owddm.com/discord).

## Prerequisites

- [node](https://nodejs.org/) version >= 16.x

## Ground Rules

To ensure that commands are written professionally and clearly, please follow the guide below:

- Use the proper name for third party services.
- If you are using images within the command, please ensure that they are clear and easy to understand.
- Refrain from using exclamation points unless it is a warning.
- Ensure that the contents of the command are correct. If you are unsure if something is correct please speak to any volunteer, and they will be able to verify.
- Ensure that grammar and spelling is correct.

## Pull Request Process

Reminder: When submitting a pull request, please ensure you target the `staging` branch.

1. Fork the repository.
2. Clone to your local system using your IDE of choice.
3. Make a new branch from staging and name appropriately (e.g. feat: added database command, fix: typos fixed in README).
4. Create/edit the command you are working on.
5. Test your build locally.
6. Create a PR to merge your changes into staging.

Note: It may be beneficial to create a draft PR while working on your command. This will allow us to see who is working on what, and will enable the community to give active feedback on your work.

## Pull Request Template

You can find the pull request template [here](PULL_REQUEST_TEMPLATE.md).

## Setting up the Bot

1. Log into the Discord website and navigate to the [applications page](https://discord.com/developers/applications).
2. Click `New Application`.
3. Give your application a name.
4. Navigate to the `Bot` tab and click `Add Bot`. You will have to confirm by clicking `Yes, do it!`.
5. Click the `Copy` button underneath token. (Do not share this).
6. Copy the `.env.example` file and rename it to `.env`.
7. Inside the .env file, type `DISCORD_TOKEN=TOKEN` replacing TOKEN with what you copied in `step 6.`

## Setting Up Privileged Gateway Intents

Privileged Gateway Intents must now be enabled within the Discord Developer Portal in order for your bot to function. The steps below will explain how to enable them.

1. Log into the Discord website and navigate to the [applications page](https://discord.com/developers/applications) and select your application. Then select `Bot` under `Settings`
2. Scroll down to the Privileged Gateway Intents section and enable all the intents.

### Inviting the Bot to Your Server

1. Create a Discord server where you can test your bot.
2. On the [applications page](https://discord.com/developers/applications), select your application and navigate to the `OAuth2` tab. Then select `bot` under the `scopes` section.
3. Tick `Administrator` box under the `Bot Permissions` section.
4. Click the `Copy` button and paste it into your search bar in the browser of choice, and invite it to your test server.

## Running the Bot

1. Run `npm install` to install the dependencies.
2. Run `npm run dev` to start the development build.

## Tokens

Some commands may require additional tokens. If you would like to test them out on your bot, you must include the tokens inside your .env file. (E.g. working with the 'chat' command)

## Adding a New Command

>Please note, this will only show the basics of adding a command.

1. Create a new file in the relevant folder within `src/commands/` and name it appropriately. `yourcommand.ts`.
2. Create your command.
3. Add it to `src/commands/index.ts`. You need to add the line `import { name } from './commandfolder/filename';`, replacing `name` with the `export const` from your command, `commandfolder` with the relevant folder your command has been placed within, and `filename` with the file name you created in `step 1` (Add this below the last command).
4. Add changes to `.github/CHANGELOG.md` and add command to `.github/command-docs.md`.

If you need help creating a command, you may find it useful to copy an existing command as a template, changing what you need.

Please ensure that the command category is appropriate for the command. You can find what each category means in `src/lib/constants.ts`. For example, a command used for support would use the `SUPPORT` category.

> ### Considerations
>
> - Choose user-friendly command names.
> - Test your build locally before submitting as ready for review.

## Modifying a Command

1. All you need to do is open the command you wish to edit in `src/commands/` and edit what you need.
2. Add changes to `.github/CHANGELOG.md` (and `.github/command-docs.md` if necessary).
3. Commit and Push.

## Example Slash Commands

For commands that need to respond with a message (no complex logic), take a look at a command that is based on the `CommandDefinition` interface. This interface is specifically designed to minimize the effort of creating these types of commands.

The basic structure of such a command looks similar to this example:

```ts
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const genericCommandEmbed = makeEmbed({
    title: 'Command Title',
    description: 'A simple message that is returned when the command is executed.',
    fields: [ // optional
        {
            name: 'field name',
            value: 'value of field',
            inline: false, // or true
        }
    ],
    image: { url: 'URL to image to show' }, // optional
});

export const command: CommandDefinition = {
    name: 'command',
    description: 'A short description of the purpose of the command.',
    category: CommandCategory.GENERAL,
    interaction: async ({ interaction }) => {
        await interaction.reply({ embeds: [genericCommandEmbed] });
    },
};
```

In the above example, you should change the following:

- `const genericCommandEmbed`: Replace `Command` with a proper unique name for your command. Also update the `title` and `description`.
- `export const command`: Replace `command` with the same proper unique name for your command. Also update the `name` of the command with the proper command and aliases.
- `genericEmbed: genericCommandEmbed`: Replace `Command` with the same unique name for your command as in the actual `const genericCommandEmbed`.
