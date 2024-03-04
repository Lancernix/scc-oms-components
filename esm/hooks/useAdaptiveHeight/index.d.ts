/**
 * 根据当前视窗高度获取适合的高度
 * @param offsetTop 偏移顶部的距离
 * @param offsetButtom 偏移底部的距离
 * @param minHeight 最低高度，如果可用高度少于最低高度，则使用最低高度
 * @returns 自适应高度
 */
export default function useAdaptiveHeight(offsetTop: number, offsetButtom: number, minHeight?: number): number;
