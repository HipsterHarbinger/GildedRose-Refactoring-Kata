export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      // Handle all items that don't get better with time
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        // Quality floor check
        if (this.items[i].quality > 0) {
          // Check for Sulfuras (it does not ever change)
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            // Decrement value in normal cases (regular items only so far)
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      // Handle all items that get better with time (aged brie and backstage passes)
      } else {
        // Quality ceiling check
        if (this.items[i].quality < 50) {
          // Increment quality value
          this.items[i].quality = this.items[i].quality + 1
          // Handle backstage passes
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            // Handle first backstage pass quality threshold
            if (this.items[i].sellIn < 11) {
              // Another quality ceiling check
              if (this.items[i].quality < 50) {
                // Increment value again
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            // Handle second backstage pass quality threshold
            if (this.items[i].sellIn < 6) {
              // Another quality ceiling check
              if (this.items[i].quality < 50) {
                // Increment value again
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      // Decrement all items sellIn time except Sulfuras
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      // Handle items that have passed their sellIn date
      if (this.items[i].sellIn < 0) {
        // Handle all items not aged brie
        if (this.items[i].name != 'Aged Brie') {
          // Handle all items not backstage passes
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            // Another quality floor check
            if (this.items[i].quality > 0) {
              // Checking for Sulfuras since it doesn't change
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                // Decrement quality of item that hasn't been filtered yet (only regular items in this case)
                this.items[i].quality = this.items[i].quality - 1
              }
            }
            // Handling backstage passes, should set value to zero if sellIn date has passed
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
          // Handle Aged Brie
        } else {
          // Quality ceiling check
          if (this.items[i].quality < 50) {
            // Increment quality
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
