import { MemoryArgs, Page } from "../utils/types";

export default class Memory {
  public pagesInMemory: Page[]

  constructor(args: MemoryArgs) {
    const { memoryInitalState } = args;
    this.pagesInMemory = memoryInitalState.map(cur => {
      return {
        pageName: cur,
        referenced: true,
        modified: false,
        timeInMemory: 0,
      }
    });
  }

  public findIndex(pageName: string) {
    return this.pagesInMemory.findIndex((value) => value.pageName === pageName)
  }

  public findPageByIndex(index: number) {
    return this.pagesInMemory[index].pageName;
  }

  public getPages() {
    return JSON.parse(JSON.stringify(this.pagesInMemory));
  }

  public hasFreePosition() {
    return this.pagesInMemory.some((value) => value.pageName === "0")
  }

  public increaseTimeInMemory() {
    this.pagesInMemory.forEach(cur => cur.timeInMemory++);
  }

  public getTimeInMemory(pageName: string) {
    const pageIndex = this.findIndex(pageName);
    return this.pagesInMemory[pageIndex].timeInMemory;
  }

  public referencePage(pageName: string): boolean {
    this.increaseTimeInMemory();
    const pageIndex = this.findIndex(pageName)
    if (pageIndex === -1) {
      return false;
    } else {
      this.setReferenced(pageIndex, true);
      return true;
    }
  }

  public pageIsReferenced(pageName: string): boolean {
    const pageIndex = this.findIndex(pageName)
    return this.pagesInMemory[pageIndex].referenced;
  }

  public pageIsModified(pageName: string): boolean {
    const pageIndex = this.findIndex(pageName)
    return this.pagesInMemory[pageIndex].modified;
  }

  public setReferenced(pageIndex: number, referenced: boolean) {
    this.pagesInMemory[pageIndex].referenced = referenced;
  }

  public setModified(pageIndex: number, modified: boolean) {
    this.pagesInMemory[pageIndex].modified = modified;
  }

  public replacePage(pageName: string, pageNameToReplace: string) {
    const pageIndex = this.findIndex(pageNameToReplace)
    this.pagesInMemory[pageIndex].pageName = pageName;
    this.pagesInMemory[pageIndex].timeInMemory = 1;
    this.setReferenced(pageIndex, true);
  }

  public resetReferenced() {
    for (let i = 0; i < this.pagesInMemory.length; i++) {
      this.setReferenced(i, false);
    }
  }
}