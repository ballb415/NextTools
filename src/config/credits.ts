/**
 * Centralized Credit Configuration for NEXT TOOLS
 * 
 * Defines standard tool credit costs, free daily allowances,
 * and plan quotas. All tool components and API endpoints
 * reference this single source of truth.
 */

export const FREE_DAILY_CREDITS = Number(process.env.FREE_DAILY_CREDITS) || 10;
export const INITIAL_SIGNUP_CREDITS = Number(process.env.INITIAL_SIGNUP_CREDITS) || 10;
export const PRO_MONTHLY_CREDITS = Number(process.env.PRO_MONTHLY_CREDITS) || 500;

export const TOOL_CREDIT_COSTS: Record<string, number> = {
  // Image Tools
  "image-compressor": 0,
  "image-converter": 0,
  "image-resizer": 0,
  "background-remover": 2,

  // PDF Tools
  "pdf-merger": 1,
  "pdf-splitter": 1,
  "pdf-compressor": 1,
  "pdf-to-image": 1,

  // AI Tools
  "ai-thai-refiner": 2,
  "ai-summarizer": 2,
  "ai-translator": 2,
  "ai-caption-generator": 1,

  // File Conversion
  "file-to-pdf": 1,
  "pdf-to-word": 2,
};

/**
 * Helper to get the credit cost for a given tool.
 * If tool is not found, defaults to 1 credit.
 */
export function getToolCreditCost(toolId: string): number {
  if (toolId in TOOL_CREDIT_COSTS) {
    return TOOL_CREDIT_COSTS[toolId];
  }
  return 1;
}
