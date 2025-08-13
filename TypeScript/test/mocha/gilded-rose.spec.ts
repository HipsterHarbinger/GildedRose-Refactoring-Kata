import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  function expectItemQualityInDays(gildedRose: GildedRose, expectedDays: Array<{sellIn: Number, quality: Number}>) {
    for (let expected of expectedDays) {
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).to.equal(expected.sellIn)
      expect(item.quality).to.equal(expected.quality)
    }
  }

  it('should handle regular items', () => {
    const gildedRose = new GildedRose([new Item('foo', 3, 6)]);
    const expectedDays = [
      {sellIn: 2, quality: 5},
      {sellIn: 1, quality: 4},
      {sellIn: 0, quality: 3},
      {sellIn: -1, quality: 1},
      {sellIn: -2, quality: 0},
      {sellIn: -3, quality: 0},
    ]

    expectItemQualityInDays(gildedRose, expectedDays)
  });

  it('should handle Aged Brie', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 3, 45)])
    const expectedDays = [
      {sellIn: 2, quality: 46},
      {sellIn: 1, quality: 47},
      {sellIn: 0, quality: 48},
      {sellIn: -1, quality: 50},
      {sellIn: -2, quality: 50},
      {sellIn: -3, quality: 50},
    ]

    expectItemQualityInDays(gildedRose, expectedDays)
  });

  it('should handled original backstage item', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 30)])
    const expectedDays = [
      {sellIn: 11, quality: 31},
      {sellIn: 10, quality: 32},
      {sellIn: 9, quality: 34},
      {sellIn: 8, quality: 36},
      {sellIn: 7, quality: 38},
      {sellIn: 6, quality: 40},
      {sellIn: 5, quality: 42},
      {sellIn: 4, quality: 45},
      {sellIn: 3, quality: 48},
      {sellIn: 2, quality: 50},
      {sellIn: 1, quality: 50},
      {sellIn: 0, quality: 50},
      {sellIn: -1, quality: 0},
      {sellIn: -2, quality: 0},
    ]

    expectItemQualityInDays(gildedRose, expectedDays)
  });

  it('should handle new backstage item', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a ABCALC123ETC concert', 3, 45)])
    const expectedDays = [
      {sellIn: 11, quality: 31},
      {sellIn: 10, quality: 32},
      {sellIn: 9, quality: 34},
      {sellIn: 8, quality: 36},
      {sellIn: 7, quality: 38},
      {sellIn: 6, quality: 40},
      {sellIn: 5, quality: 42},
      {sellIn: 4, quality: 45},
      {sellIn: 3, quality: 48},
      {sellIn: 2, quality: 50},
      {sellIn: 1, quality: 50},
      {sellIn: 0, quality: 50},
      {sellIn: -1, quality: 0},
      {sellIn: -2, quality: 0},
    ]

    expectItemQualityInDays(gildedRose, expectedDays)
  });

  it('should handle original legendary item', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 3, 80)])
      const expectedDays = [
        {sellIn: 3, quality: 80},
        {sellIn: 3, quality: 80},
        {sellIn: 3, quality: 80},
        {sellIn: 3, quality: 80},
      ]

      expectItemQualityInDays(gildedRose, expectedDays)
  });

  it('should handle new legendary item', () => {
      const gildedRose = new GildedRose([new Item('Thunderfury, Blessed Blade of the Windseeker', 3, 80)])
      const expectedDays = [
        {sellIn: 3, quality: 80},
        {sellIn: 3, quality: 80},
        {sellIn: 3, quality: 80},
        {sellIn: 3, quality: 80},
      ]

      expectItemQualityInDays(gildedRose, expectedDays)
  });

  it('should handle conjured items', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 3, 12)])
    const expectedDays = [
      {sellIn: 2, quality: 10},
      {sellIn: 1, quality: 8},
      {sellIn: 0, quality: 6},
      {sellIn: -1, quality: 2},
      {sellIn: -2, quality: 0},
      {sellIn: -3, quality: 0},
    ]

    expectItemQualityInDays(gildedRose, expectedDays)
  });
});
