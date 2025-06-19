'use client';

/**
 * 智能体列表组件 - Agents List Component
 * 展示 tRPC 路由的工作原理
 */
export function AgentsList() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">智能体列表 / Agents List</h2>
      
      {/* 代码示例 - Code Example */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="font-semibold mb-2">tRPC 路由配置 / tRPC Router Configuration</h3>
        <pre className="text-sm">
{`// src/trpc/routers/_app.ts
import { agentsRouter } from '@/modules/agents/server/procedures';

export const appRouter = createTRPCRouter({
  agents: agentsRouter, // 将 agents 路由挂载到根路由器
});

// 客户端调用示例 / Client Usage Example
const { data } = useTRPC().agents.getMany.useQuery();`}
        </pre>
      </div>

      <div className="space-y-2">
        <div className="p-3 border rounded-lg">
          <h3 className="font-semibold">路由结构 / Router Structure</h3>
          <p className="text-gray-600">
            • appRouter.agents.getMany - 获取所有智能体 / Get all agents<br/>
            • 类型安全 - 完整的 TypeScript 支持 / Full TypeScript support<br/>
            • 自动代码生成 - 客户端类型自动同步 / Auto-generated client types
          </p>
        </div>
        
        <div className="p-3 border rounded-lg">
          <h3 className="font-semibold">工作流程 / Workflow</h3>
          <p className="text-gray-600">
            1. 客户端调用 useTRPC().agents.getMany.useQuery()<br/>
            2. tRPC 自动发送 HTTP 请求到 /api/trpc/agents.getMany<br/>
            3. 服务器执行 agentsRouter.getMany 过程<br/>
            4. 返回数据库查询结果 / Return database query results
          </p>
        </div>
      </div>
    </div>
  );
} 