export const enum CommandCategory {
    SUPPORT = 'Support',
    GENERAL = 'General',
    UTILS = 'Utilities',
    MEMES = 'Memes',
    MODERATION = 'Moderation',
}

export const enum ResponseType {
    STATIC,
    EPHEMERAL,
    EDIT,
    DEFER,
    FOLLOW_UP,
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

export const enum MessageID {
    ROLE_SELECT = '1097532966835605605',
}
