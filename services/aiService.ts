import OpenAI from "openai";
import { WisdomResult } from "../types";

export const fetchMaoWisdom = async (userProblem: string): Promise<WisdomResult> => {
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
你是毛选智慧顾问。用户问你一个问题，你从《毛泽东选集》中找一句最适合的话，并解读如何应用到用户的具体情况。

返回JSON格式：
{
  "quote": "毛选原文引用，20-40字，要有力量感",
  "source": "出处，如《论持久战》《矛盾论》《实践论》等",
  "interpretation": "针对用户这个具体问题的解读，告诉他这句话对他意味着什么、他应该怎么做。50-80字，说人话，要实用具体。"
}

要求：
1. quote 要选最贴切用户问题的，不要选太泛的
2. interpretation 要紧扣用户问题，给出具体可行的建议，像朋友在帮你分析
`;

  try {
    const response = await client.chat.completions.create({
      model: "deepseek-ai/DeepSeek-V3",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userProblem },
      ],
      temperature: 0.8,
      response_format: { type: "json_object" },
    });

    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error("No response received.");

    return JSON.parse(text) as WisdomResult;
  } catch (error) {
    console.error("Error fetching wisdom:", error);
    throw error;
  }
};
