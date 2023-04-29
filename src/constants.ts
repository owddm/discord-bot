export const enum CommandCategory {
    SUPPORT = 'Support',
    GENERAL = 'General',
    UTILS = 'Utilities',
    MEMES = 'Memes',
    MODERATION = 'Moderation',
}

export const enum Channels {
    ROLE_SELECT = '1034806605914574868',
}

export const enum ResponseType {
    STATIC,
    EPHEMERAL,
    EDIT,
    DEFER,
    FOLLOW_UP,
}

export const enum Roles {
    ADMIN = '1034806605914574868',
    MODERATOR = '1034806697295872060',
    VOLUNTEER = '1038452012687314954',
    PRESENTER = '1044858536418619392',
    ACCOUNTING = '1087632118424817664',
    BOT = '1034811630200045719',
}

export const enum OpenAIModels {
    GPT4 = 'gpt-4',
    GPT4_32K = 'gpt-4-32k',
    GPT3_TURBO = 'gpt-3.5-turbo',
    TEXT_VINCI = 'text-davinci-003',
    CODE_DAVINCI = 'code-davinci-002',
    CODE_CUSHMAN = 'code-cushman-001',
    TEXT_DAVINCI_EDIT = 'text-davinci-edit-001',
    CODE_DAVINCI_EDIT = 'code-davinci-edit-001',
}
