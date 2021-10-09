export const replacePage = (memory: string[], pageFault: string, pageToReplace: string): string[] => {
  let replaced = false;
  return memory.map(cur => {
    if (cur === pageToReplace && !replaced) {
      replaced = true;
      return pageFault;
    } else {
      return cur;
    }
  })
}