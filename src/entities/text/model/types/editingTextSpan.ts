import { SharedLib } from "../../../../shared/lib";
import { SaveBlock, SaveBlocksDto } from "../dto";

export class EditingBlock {
  public readonly initialOriginal: string;
  public readonly initialTranslation: string;
  public changed: boolean = false;
  public isNew: boolean = false;
  public aboveBlockId: number | undefined;
  public deleted: boolean = false;

  constructor(
    public id: number,
    public original: string,
    public translation: string,
  ) {
    this.initialOriginal = original;
    this.initialTranslation = translation;
  }

  setOriginal(original: string) {
    if (original !== this.original) {
      this.changed = true;
      this.original = original;
    }
    // if (original === this.initialOriginal) {
    //   this.changed = false;
    // } 
  }

  setTranslation(translation: string) {
    if (translation !== this.translation) {
      this.translation = translation;
      this.changed = true;
    }
    // if (translation === this.initialTranslation) {
    //   this.changed = false;
    // } 
  }

  setIsNew(isNew: boolean) {
    this.isNew = isNew;
  }

  setAboveBlockId(blockId: number) {
    this.aboveBlockId = blockId;
  }

  setDeleted(deleted: boolean) {
    this.deleted = deleted;
  }
}

export class EditingTextSpan {
  public editing: boolean = false;
  public editingBlockId: number | undefined;
  public editingAboveBlockId: number | undefined;
  public editingBelowBlockId: number | undefined;

  constructor(
    public id: number, 
    public name: string, 
    public blocks: EditingBlock[],
  ) {}

  changeName(name: string) {
    this.name = name;
  }

  newBlock() {
    this.editing = true;
  }

  addBlock(original: string, translation: string) {
    const id = SharedLib.getRandomNumber(1, 10000);
    // const id = Number(this.blocks.at(-1)?.id) + 1;
    const newBlock = new EditingBlock(id, original, translation);
    newBlock.changed = true;
    newBlock.setIsNew(true);
    if (this.editingAboveBlockId) {
      const index = this.blocks.findIndex(block => block.id === this.editingAboveBlockId);
      if (!index) {
        return
      }
      newBlock.aboveBlockId = this.editingAboveBlockId;
      this.blocks.splice(index, 0, newBlock);
    } else if (this.editingBelowBlockId) {
      const index = this.blocks.findIndex(block => block.id === this.editingBelowBlockId);
      if (!index) {
        return
      }
      this.blocks.splice(index + 1, 0, newBlock);
    } else {
      this.blocks.push(newBlock);
    }
    this.closeEdit();
  }

  // addBlockAbove(original: string, translation: string) {
  //   if (!this.editingAboveBlockId) {
  //     return
  //   }
  //   const id = SharedLib.getRandomNumber(1, 10000);
  //   const newBlock = new EditingBlock(id, original, translation);
  //   newBlock.changed = true;
  //   newBlock.setIsNew(true);
  //   const index = this.blocks.find(block => block.id === this.editingAboveBlockId)?.id;
  //   if (!index) {
  //     return
  //   }
  //   this.blocks.splice(index, 0, newBlock);
  //   this.closeEdit();
  // }

  // addBlockBelow(original: string, translation: string) {
  //   if (!this.editingBelowBlockId) {
  //     return
  //   }
  //   const id = SharedLib.getRandomNumber(1, 10000);
  //   const newBlock = new EditingBlock(id, original, translation);
  //   newBlock.changed = true;
  //   newBlock.setIsNew(true);
  //   const index = this.blocks.find(block => block.id === this.editingAboveBlockId)?.id;
  //   if (!index) {
  //     return
  //   }
  //   this.blocks.splice(index + 1, 0, newBlock);
  //   this.closeEdit();
  // }

  changeBlock(original: string, translation: string) {
    const block = this.getEditedBlock();
    if (!block) {
      return
    }
    block.setOriginal(original);
    block.setTranslation(translation);
    this.closeEdit();
  }

  editBlock(blockId: number) {
    this.editingBlockId = blockId;
    this.editing = true;
  }

  newBlockAbove(blockId: number) {
    this.editingBelowBlockId = undefined;
    this.editingAboveBlockId = blockId;
  }

  newBlockBelow(blockId: number) {
    this.editingAboveBlockId = undefined;
    this.editingBelowBlockId = blockId;
  }

  closeEdit() {
    this.editingBlockId = undefined;
    this.editing = false;
    this.editingAboveBlockId = undefined;
    this.editingBelowBlockId = undefined;
  }

  getEditedBlock(): EditingBlock | undefined {
    const block = this.blocks.find(block => block.id === this.editingBlockId);
    return block
  }

  getSaveBlocksDto(): SaveBlocksDto {
    const blocks: SaveBlock[] = [];
    for (let block of this.blocks) {
      if (block.aboveBlockId) {
        blocks.push({
          type: 'newBlockAbove',
          original: block.original,
          translation: block.translation,
          blockId: block.aboveBlockId,
        })
      } else if (block.isNew) {
        blocks.push({
          type: 'new',
          original: block.original,
          translation: block.translation,
        });
      } else if (block.deleted) {
        blocks.push({
          type: 'delete',
          blockId: block.id,
        });
      } else if (block.changed) {
        blocks.push({
          type: 'edit',
          blockId: block.id,
          original: block.original,
          translation: block.translation,
        })
      }
    }

    const dto: SaveBlocksDto = {
      textId: this.id,
      blocks,
    }
    return dto
  }

  // deleteBlock(blockId: number) {
  //   const blocks = this.blocks.filter(block => block.id !== blockId);
  //   this.blo
  // }

  getCopy() {
    const newTextSpan = new EditingTextSpan(this.id, this.name, this.blocks);
    newTextSpan.editing = this.editing;
    newTextSpan.editingBlockId = this.editingBlockId;
    newTextSpan.editingAboveBlockId = this.editingAboveBlockId;
    newTextSpan.editingBelowBlockId = this.editingBelowBlockId;
    return newTextSpan;
  }
}