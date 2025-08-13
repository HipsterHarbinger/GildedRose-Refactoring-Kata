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

class WrappedItem {
  item: Item
  minQuality: number = 0
  maxQuality: number = 50

  constructor(item: Item) {
    this.item = item
  }

  incrementValue(amount: number) {
    this.item.quality = Math.min(this.item.quality + amount, this.maxQuality)
  }

  decrementValue(amount: number) {
    this.item.quality = Math.max(this.item.quality - amount, this.minQuality)
  }

  updateQuality() {
    this.item.sellIn -= 1
    this.item.sellIn < 0 ? this.decrementValue(2) : this.decrementValue(1)
  }
}

class AgedBrie extends WrappedItem {
  updateQuality() {
    this.item.sellIn -= 1
    this.item.sellIn < 0 ? this.incrementValue(2) : this.incrementValue(1)
  }
}

class LegendaryItem extends WrappedItem {
  updateQuality() {
    // Nothing ever changes
  }
}

class BackstagePasses extends WrappedItem {
  firstLastChanceThreshold: number = 10
  secondLastChanceThreshold: number = 5

  updateQuality() {
    this.item.sellIn -= 1
    if (this.item.sellIn < 0) {
      this.item.quality = 0
    } else if (this.item.sellIn < this.secondLastChanceThreshold) {
      this.incrementValue(3)
    } else if (this.item.sellIn < this.firstLastChanceThreshold) {
      this.incrementValue(2)
    } else {
      this.incrementValue(1)
    }
  }
}

class ConjuredItem extends WrappedItem {
  updateQuality() {
    this.item.sellIn -= 1
    this.item.sellIn < 0 ? this.decrementValue(4) : this.decrementValue(2) 
  }
}

let legendaryItems = ['Sulfuras, Hand of Ragnaros', 'Thunderfury, Blessed Blade of the Windseeker']

function wrappedItemsFactory(item: Item): WrappedItem {
  switch(true){
    case item.name == "Aged Brie":
      return new AgedBrie(item)
    case legendaryItems.includes(item.name):
      return new LegendaryItem(item)
    case  /^Backstage pass/.test(item.name):
      return new BackstagePasses(item)
    case /^Conjured/.test(item.name):
      return new ConjuredItem(item)
    default:
      return new WrappedItem(item)
  }
}

export class GildedRose {
  items: Array<Item>;
  wrappedItems: Array<WrappedItem>

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.wrappedItems = this.items.map((item) => wrappedItemsFactory(item))
  }

  updateQuality() {
    // this.oldImplementation();
    this.newImplementation();
    return this.items;
  }

  private newImplementation() {
    for (let wrappedItem of this.wrappedItems) {
      wrappedItem.updateQuality()
    }
  }

  private oldImplementation() {
    for (let i = 0; i < this.items.length; i++) {
      // Handle all items that don't get better with time
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        // Quality floor check
        if (this.items[i].quality > 0) {
          // Check for Sulfuras (it does not ever change)
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            // Decrement value in normal cases (regular items only so far)
            this.items[i].quality = this.items[i].quality - 1;
            if (this.items[i].name == 'Conjured Mana Cake') {
              if (this.items[i].quality > 0) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          }
        }
        // Handle all items that get better with time (aged brie and backstage passes)
      } else {
        // Quality ceiling check
        if (this.items[i].quality < 50) {
          // Increment quality value
          this.items[i].quality = this.items[i].quality + 1;
          // Handle backstage passes
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            // Handle first backstage pass quality threshold
            if (this.items[i].sellIn < 11) {
              // Another quality ceiling check
              if (this.items[i].quality < 50) {
                // Increment value again
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            // Handle second backstage pass quality threshold
            if (this.items[i].sellIn < 6) {
              // Another quality ceiling check
              if (this.items[i].quality < 50) {
                // Increment value again
                this.items[i].quality = this.items[i].quality + 1;
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
                this.items[i].quality = this.items[i].quality - 1;
                if (this.items[i].name == 'Conjured Mana Cake') {
                  if (this.items[i].quality > 0) {
                    this.items[i].quality = this.items[i].quality - 1;
                  }
                }
              }
            }
            // Handling backstage passes, should set value to zero if sellIn date has passed
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
          // Handle Aged Brie
        } else {
          // Quality ceiling check
          if (this.items[i].quality < 50) {
            // Increment quality
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }
  }
}
