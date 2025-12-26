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
你是一个毛选智慧生成器。用户问你一个问题，你给出一条精炼的建议。

要求：
1. keyword: 2个字，概括核心思想，要有力量感（如：破局、突围、蓄势、亮剑）
2. quote: 毛选中最贴切的一句话，不超过25个字
3. source: 出处（如：《论持久战》）
4. advice: 针对用户问题的一句话建议，要具体实用，15-25字
5. encouragement: 一句鼓励的话，有力量但不鸡汤，10-20字

风格：简洁、有力、像一张精心设计的卡片上的文字

JSON格式：
{
  "keyword": "破局",
  "quote": "在战略上藐视敌人，在战术上重视敌人",
  "source": "《论持久战》",
  "advice": "先把最难啃的那个问题单独拎出来解决",
  "encouragement": "敢于斗争，才能赢得胜利"
}
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
