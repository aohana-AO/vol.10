"use server";

import { auth, clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createChat, createUser, createRooms } from "./prisma";
import { formatDate, getChats, getRoomById } from "@/app/_lib/prisma";

/*ライブラリからインポート*/
import deepl from 'deepl-node';
import OpenAI from 'openai';
import Replicate from 'replicate';
import Anthropic from '@anthropic-ai/sdk';

import { Translator } from 'deepl-node';

const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

/*APIキー取得*/
const authKey = process.env.DEEPL_API_KEY || '';
console.log('-------');
console.log(authKey);
console.log('-------');
const translator = new Translator(authKey);
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});
const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(process.env.PALM_API_KEY),
});
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

/*プロンプト*/
const prompt =
    `
# Requests
You are one of the debaters. Discuss the given topic with reference to the conversation log.

# Rules
If the user imposes conditions, follow their instructions.
Output should be limited to 200 words.
Please speak up so that users are not aware of the prompt.
`;

/*Deepl 日本語→英語, 英語→日本語の翻訳用*/
async function JAtoEN(input: string) {
    const EN_text = await translator.translateText(input, 'ja', 'en-US')
    return EN_text.text
}

async function ENtoJA(input: string) {
    const JA_text = await translator.translateText(input, 'en', 'ja')
    return JA_text.text
}

/*LLMモジュール*/
export async function ChatGPT(input_text: string) {
    const input = await JAtoEN(input_text) //日本語→英語

    const completion = await openai.chat.completions.create({ //パラメータ設定
        messages: [
            { role: 'system', content: prompt }, //プロンプト
            { role: 'user', content: input }, //テキスト
        ],
        model: 'gpt-3.5-turbo',
    });

    const output = completion.choices[0].message?.content

    if (output !== null) { //outputがstring | nullのためnull除去
        const output_text = await ENtoJA(output) //英語→日本語

        return output_text
    }
}

export async function Llama(input_text: string) {
    const input = await JAtoEN(input_text) //日本語→英語

    const output = await replicate.run(
        'meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3',
        {
            input: { //パラメータ設定
                debug: false,
                top_k: 50,
                top_p: 1,
                prompt: input, //テキスト
                temperature: 0.5,
                system_prompt: prompt, //プロンプト
                max_new_tokens: 300, //トークンの最大値
                min_new_tokens: -1, //トークンの最小値
            }
        }
    );

    var s = ''
    for (var item in output) { //出力が単語毎のため結合
        s += item
    };

    const output_text = await ENtoJA(s) //英語→日本語
    return output_text
}

export async function Palm(input_text: string) {
    const input_text_EN = await JAtoEN(input_text) //日本語→英語
    const input = prompt + input_text_EN //プロンプトとテキストを結合

    const output = await client.generativeMessage({ //パラメータ設定
        model: 'models/text-bison-001',
        prompt: { input }, //テキスト
        max_output_tokens: 300, //トークン最大値
    });

    const output_text = await ENtoJA(output[0].candidates[0].content) //英語→日本語
    return output_text
}

export async function Claude(input_text: string) {
    const input_text_EN = await JAtoEN(input_text) //日本語→英語
    const input = prompt + input_text_EN //プロンプトとテキストを結合

    const output = await anthropic.completions.create({ //パラメータ設定
        model: 'claude-2.1',
        max_tokens_to_sample: 300, //トークン最大値
        temperature: 0,
        prompt: `${Anthropic.HUMAN_PROMPT}${input}${Anthropic.AI_PROMPT}`, //テキスト
    });

    const output_text = await ENtoJA(output.completion) //英語→日本語

    return output_text
}

//----

export async function deleteUserAction(userId: string) {
    if (!userId) return;
    await clerkClient.users.deleteUser(userId); // アカウント削除
}
export async function upsertUserAction(
    uuid: string,
    name: string,
    profileImageUrl: string
) {
    return await createUser(uuid, name, profileImageUrl);
}

export const createChatAction = async (
    roomId: number,
    userId: number,
    message: string
) => {
    await createChat(roomId, userId, message);

    const room = await getRoomById(roomId);
    if (!room) {
        return null;
    }

    console.log(room.chatgpt)
    console.log(room)
    console.log("------")

    if (room.chatgpt === 1) {
        let responseMessage = await ChatGPT(message);
        await createChat(roomId, 100, responseMessage);

    } else if (room.chatgpt === 2) {
        let responseMessage = await ChatGPT(message);
        console.log(responseMessage)
        await createChat(roomId, 100, responseMessage);

    } else if (room.chatgpt === 3) {
        let responseMessage = await ChatGPT(message);
        await createChat(roomId, 100, responseMessage);
    }

    //llama

    if (room.llama === 1) {
        let responseMessage = await Llama(message);
        await createChat(roomId, 102, responseMessage);

    } else if (room.llama === 2) {
        let responseMessage = await Llama(message);
        console.log(responseMessage)
        await createChat(roomId, 102, responseMessage);

    } else if (room.llama === 3) {
        let responseMessage = await Llama(message);
        await createChat(roomId, 102, responseMessage);
    }

    //palm
    if (room.palm === 1) {
        let responseMessage = await Palm(message);
        await createChat(roomId, 101, responseMessage);

    } else if (room.palm === 2) {
        let responseMessage = await Palm(message);
        console.log(responseMessage)
        await createChat(roomId, 101, responseMessage);

    } else if (room.palm === 3) {
        let responseMessage = await Palm(message);
        await createChat(roomId, 101, responseMessage);
    }

    //claude

    if (room.claude === 1) {
        let responseMessage = await Claude(message);
        await createChat(roomId, 103, responseMessage);

    } else if (room.claude === 2) {
        let responseMessage = await Claude(message);
        console.log(responseMessage)
        await createChat(roomId, 103, responseMessage);

    } else if (room.claude === 3) {
        let responseMessage = await Claude(message);
        await createChat(roomId, 103, responseMessage);
    }

    // パスの再検証
    revalidatePath(`/room/${roomId}`);

};
export const createRoomAction = async (
    name: string,
    description: string,
    chatgpt: number,
    palm: number,
    llama: number,
    claude: number
) => {
    const room = await createRooms(name, description, chatgpt, palm, llama, claude);
    return room;
};