import OpenAI from "openai";
import { SpreadData } from "../types";

export const fetchMaoWisdom = async (userProblem: string): Promise<SpreadData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing in environment variables.");
  }

  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://api.siliconflow.cn/v1",
    dangerouslyAllowBrowser: true,
  });

  const systemInstruction = `
你是一位深谙毛泽东思想的实战型战略顾问。你的任务是帮助用户解决他们的具体问题。

## 核心原则
1. **紧扣用户问题**: 每一条建议都必须直接回应用户描述的具体情况，禁止泛泛而谈
2. **实用落地**: 给出的建议必须是用户明天就能开始做的具体行动
3. **毛选智慧**: 用毛泽东思想的方法论来分析问题，但要翻译成现代语境

## 分析框架
先在心中完成以下分析（不要输出）：
- 用户面临的核心困境是什么？
- 谁是"敌人"（阻碍因素）？谁是"朋友"（可借助的力量）？
- 用户当前的优势和劣势是什么？
- 什么是用户可以立即采取的第一步？

## 输出要求
返回JSON格式，包含三条锦囊：

锦囊一【看清局势】: 帮用户看清问题本质
- 用毛泽东"矛盾分析法"剖析：主要矛盾是什么？次要矛盾是什么？
- interpretation 要具体指出用户情况中的矛盾点

锦囊二【战略思维】: 给出战略层面的指导思想
- 引用毛选中相关的战略思想（持久战、统一战线、农村包围城市等）
- interpretation 要说明这个思想如何具体应用到用户的场景

锦囊三【立即行动】: 给出具体可执行的下一步
- 必须是一个明确、具体、可量化的行动
- interpretation 要写成"你现在应该：xxx"的格式

## JSON格式
{
  "cards": [
    {
      "title": "看清局势",
      "keyword": "两个字的核心词",
      "quote": "毛选原文引用（要准确）",
      "source": "出处文章名",
      "interpretation": "针对用户问题的具体解读，50字以内"
    },
    {
      "title": "战略思维",
      "keyword": "两个字",
      "quote": "毛选原文",
      "source": "出处",
      "interpretation": "如何应用到用户场景"
    },
    {
      "title": "立即行动",
      "keyword": "两个字",
      "quote": "毛选原文",
      "source": "出处",
      "interpretation": "你现在应该：[具体行动]"
    }
  ],
  "overallAdvice": "用2-3句话总结：1)用户问题的关键 2)核心策略 3)第一步该做什么。要像一个睿智的老同志在给你指点迷津，语气亲切但有力量。"
}

记住：用户来找你是真的有困惑，要给出能真正帮到他的建议，而不是空洞的口号！
`;

  try {
    const response = await client.chat.completions.create({
      model: "deepseek-ai/DeepSeek-V3",
      messages: [
        {
          role: "system",
          content: systemInstruction,
        },
        {
          role: "user",
          content: `我的问题是：${userProblem}\n\n请认真分析我的具体情况，给我三条真正有用的锦囊妙计。`,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error("No response received.");

    return JSON.parse(text) as SpreadData;
  } catch (error) {
    console.error("Error fetching wisdom:", error);
    throw error;
  }
};
