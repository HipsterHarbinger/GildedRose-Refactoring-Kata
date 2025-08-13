# Barco Interview Dev Log
## First Impressions
- The first obvious major bad code smell comes from the fact that behavior for each individual item is held in several nested if checks and spread across the method so understanding what the exact behavior is for each class of item is hard to follow
- Because of this it's hard to know at a glace where you would add the code for the new feature
- It also raises the possibility of adding a new feature accidentally modifying the behavior of a feature that has already been implemented if if checks aren't implemented correctly
- Additionally, most of the numbers described in the requirements are hardcoded in the method so it's harder to know what the "magic numbers" represent at a glace
- Further on the requirements, there seems to be a mismatch of what's described in the requirements vs what's implemented in the code.
- For example, the requirements seems to describe the concept of a "backstage pass" class but it's only implemented as a single option for "Backstage passes to a TAFKAL80ETC concert". In a real world situation, I would attempt to clarify the requirements but in this case I will assume that we want to handle more passes and will include that improvement in my solution
- Similarly, there seems to be a broader concept of "legendary items" besides just Sulfuras hinted at in the requirements (although this might be my own bias knowing World of Warcraft). There also seems to be a requirement of the quality of legendary items can be 80 where other items have a max quality of 50 but the limits are only imposed when an item is updating which legendary items never do so I'm unsure how to use that requirement. In a real world situation, I would attempt to clarify the requirements but in this case I will assume that we want to be able to handle additional legendary items and will ignore the 80 quality requirement

- Before we start modifying the code, I will write some simple unit tests to wrap the existing code so we don't break anything and new unit tests for the new item class and new assumptions I'm applying to existing classes
- Additionally, I will annotate the existing code to demonstrate the complexity of the current method

## Second Step
- Next, I think it would be helpful to demonstrate the issues with the current design by attempting to add the new feature. Having annotated the existing feature, I've done a lot of the mental load already but the implementation will be spread throughout the loop and will be relatively simple compared to trying to add a feature in a real life example

- Conjured items (or just conjured mana cakes) are now handled but it has a lot of the same issues of having to find the multiple places we need to put the code related to conjured items and add new quality floor checks. I'll also extract the existing code into its own method to prep for including my idea for a refactor

## Third Step
- The approach I took to refactor this project was to create a collection of classes based on the classifications described for each item, letting them be responsible for knowing how to update the item and wrapping the base item class to avoid modifying the code around the item class. This allows for any future work related to a single class to be done solely in that class without having to worry about how the other items update their quality and any future classes will be able to be added solely be adding a new class with its own updateQuality method and updating the factory method to know about the new class
- Assuming that this was a real world application, what's involved with each class will likely be a lot more complicated than just updating based on the sellIn date so I believe breaking up the logic like this and avoiding having to know about the implementation of other classes is a good approach to speed up work from future developers

## Fourth Step
- After implementing my own approach, since I've got time due to this being a take home assignment and this kata seems to be more widely known, I wanted to explore other approaches and judge their solution vs mine for advantages vs disadvantages.
- Emily Bache (the maintainer of the kata repo), took a more simple approach of leaving the implementation in a series of if blocks but breaking them up based on the type (using tools that her IDE provided to lift up the if checks for individual classes of items).
    - I think I still prefer my approach assuming that the hypothetical system would continue to be worked on and add new item types or more logic around each of them
    - However, in the article linked from the README [Why Most Solutions to Gilded Rose Miss The Bigger Picture](web.archive.org/web/20230530152324/https://iamnotmyself.com/why-most-solutions-to-gilded-rose-miss-the-bigger-picture/), the writer proposes a hypothetical where a developer is excited to get into a new project and immediately wants to rewrite the entire project to add a single feature the client wants and while simple in this case, my approach might balloon to the size of the the hypothetical depending on the complexity
    - I think it's a good callout to judge how much you'll get out of a potential refactor vs what the client might actually want/need
- Exploring online, I was able to find [this implementation](https://amedee.be/my-take-on-the-gilded-rose-kata/) which followed a similar approach to mine. With even more methods to control the updates which I think provides more control in situations with more complicated logic