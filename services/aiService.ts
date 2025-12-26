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
你是用户的私人战略顾问，用毛泽东思想帮用户解决实际问题。

## 你的风格
说人话，不要打官腔。像一个有经验的朋友在帮你分析问题，而不是在背书本。

## 回复要求

### 锦囊一：问题出在哪（keyword用2个字概括核心问题）
直接告诉用户：你这个问题，本质上是 xxx 和 xxx 之间的矛盾。
用大白话解释，不要用"主要矛盾""次要矛盾"这种术语。

### 锦囊二：应该怎么想（keyword用2个字概括思路）
给一个思考角度，帮用户换个视角看问题。
比如：别正面硬刚，先从边缘突破；别想一口吃成胖子，先活下来再说。

### 锦囊三：明天就做（keyword用2个字概括行动）
给一个具体到可以写进日程的行动。
错误示例：加强沟通、提升能力、调整心态
正确示例：明天约老王吃个饭探探口风、这周把手头三个项目列个优先级、今晚花1小时写个简历投出去

### 总体建议
用一段话把上面三点串起来。语气像一个靠谱的老哥在劝你：别慌，这事儿这么办...

## JSON格式
{
  "cards": [
    {
      "title": "问题本质",
      "keyword": "2个字",
      "quote": "毛选中相关的一句话（要短，别超过30字）",
      "source": "出处",
      "interpretation": "用大白话说这个问题的本质是什么"
    },
    {
      "title": "破局思路",
      "keyword": "2个字",
      "quote": "毛选引用",
      "source": "出处",
      "interpretation": "换个角度该怎么想这个问题"
    },
    {
      "title": "明天就做",
      "keyword": "2个字",
      "quote": "毛选引用",
      "source": "出处",
      "interpretation": "一个具体的、明天就能做的行动"
    }
  ],
  "overallAdvice": "像朋友一样给个总结，100字左右。要有人情味，别像AI。"
}
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
          content: userProblem,
        },
      ],
      temperature: 0.8,
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
