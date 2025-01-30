import { SharedLib } from "../../../../shared/lib";
import { SaveBlock, SaveBlocksDto } from "../dto";

export class EditingBlock {
  public readonly initialOriginal: string;
  public readonly initialTranslation: string;
  public changed: boolean = false;
  public isNew: boolean = false;
  public deleted: boolean = false;
  public aboveBlockId: number | undefined;

  constructor(
    public id: number,
    public original: string,
    public translation: string,
  ) {
    this.initialOriginal = original;
    this.initialTranslation = translation;
  }

  setContent(original: string, translation: string) {
    if (!original.length || !translation.length) {
      return
    }
    this.original = original;
    this.translation = translation;
    if (this.initialOriginal === original && this.initialTranslation === translation && !this.isNew) {
      this.changed = false;
    } else {
      this.changed = true;
    }
  }

  // setIsNew(isNew: boolean) {
  //   this.isNew = isNew;
  // }

  // setAboveBlockId(blockId: number) {
  //   this.aboveBlockId = blockId;
  // }

  setDeleted(deleted: boolean) {
    this.deleted = deleted;
  }
}

export class EditingTextSpan {
  public editing: boolean = false;
  public editingAtEnd: boolean = false;
  public editingAboveBlockId: number | undefined;
  public editingBelowBlockId: number | undefined;
  public editingBlockId: number | undefined;

  constructor(
    public id: number, 
    public name: string, 
    public blocks: EditingBlock[],
  ) {}

  changeName(name: string) {
    this.name = name;
  }

  newBlockAtEnd() {
    if (this.editing) {
      this.closeEdit();
    }
    this.editing = true;
    this.editingAtEnd = true;
  }

  newBlockAbove(blockId: number) {
    if (this.editing) {
      this.closeEdit();
    }
    this.editing = true;
    this.editingAboveBlockId = blockId;
  }

  newBlockBelow(blockId: number) {
    if (this.editing) {
      this.closeEdit();
    }
    this.editing = true;
    this.editingBelowBlockId = blockId;
  }

  editBlock(blockId: number) {
    if (this.editing) {
      this.closeEdit();
    }
    this.editingBlockId = blockId;
    this.editing = true;
  }

  addBlock(original: string, translation: string) {
    const id = SharedLib.getRandomNumber(1, 10000);
    const newBlock = new EditingBlock(id, original, translation);
    newBlock.isNew = true;
    newBlock.changed = true;
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
    } else if (this.editingAtEnd) {
      this.blocks.push(newBlock);
    }
    this.closeEdit();
  }

  changeBlock(original: string, translation: string) {
    const block = this.getEditedBlock();
    if (!block) {
      return
    }
    block.setContent(original, translation);
    this.closeEdit();
  }

  closeEdit() {
    this.editing = false;
    this.editingAtEnd = false;
    this.editingAboveBlockId = undefined;
    this.editingBelowBlockId = undefined;
    this.editingBlockId = undefined;
  }

  //???
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

  getCopy() {
    const newTextSpan = new EditingTextSpan(this.id, this.name, this.blocks);
    newTextSpan.editing = this.editing;
    newTextSpan.editingAtEnd = this.editingAtEnd;
    newTextSpan.editingBlockId = this.editingBlockId;
    newTextSpan.editingAboveBlockId = this.editingAboveBlockId;
    newTextSpan.editingBelowBlockId = this.editingBelowBlockId;
    return newTextSpan;
  }
}