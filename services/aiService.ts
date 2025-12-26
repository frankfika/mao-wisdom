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
你是一位运用"毛泽东思想"和《毛泽东选集》的战略顾问。
用户有一个问题，你必须提供"锦囊三计"作为战略建议。

锦囊一: 本质 - 分析主要矛盾
锦囊二: 纲领 - 提供高层次的理论原则（如持久战、群众路线）
锦囊三: 手段 - 提供一个具体的、可立即执行的行动

对于每条锦囊，选择一段独特而有力的引言。
"keyword"必须是2个有冲击力的中文字（书法风格）。
输出语言：简体中文。

你必须以JSON格式输出，格式如下：
{
  "cards": [
    {
      "title": "锦囊类型标签，如'形势分析'、'指导原则'、'行动方案'",
      "keyword": "两个有力的中文字，如'矛盾'、'必胜'、'联合'",
      "quote": "来自毛泽东选集的相关引言",
      "source": "引言来源的文章标题",
      "interpretation": "一句话解释这条建议如何适用于用户"
    }
  ],
  "overallAdvice": "综合三条锦囊，给出最终战略建议的完整段落"
}

确保cards数组正好有3个元素。
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
          content: `我的问题是: "${userProblem}". 请赐予我三条锦囊妙计。`,
        },
      ],
      temperature: 0.75,
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
