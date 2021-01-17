import models from '../models';

export const populateDB = async () => {
  try {
    const category = new models.Category({
      name: 'Desktop Apps',
    });

    const product1 = new models.Product({
      name: 'b0006se5bq',
      number: 'singing coach unlimited',
      description:
        'singing coach unlimited - electronic learning products (win me nt 2000 xp)',
      images: [
        {
          url: 'http://lorempixel.com/200/200/technics/',
          name: 'singing coach',
        },
        {
          url: 'http://lorempixel.com/200/200/abstract/',
          name: 'front side',
        },
      ],
      category: category.id,
    });

    const product2 = new models.Product({
      name: 'b00021xhzw',
      number:
        'adobe after effects professional 6.5 upgrade from standard to professional',
      description:
        'upgrade only; installation of after effects standard new disk caching tools speed up your interactive work save any combination of animation parameters as presets',
      images: [],
      category: category.id,
    });

    const product3 = new models.Product({
      name: 'b00021xhzw1',
      number: 'domino designer/developer v5.0',
      description:
        'reference domino designer/developer r5 doc pack includes the following titles: application development with domino designer (intermediate-advanced) 536 pages it explains building applications creating databases using forms fields views folders navi',
      images: [
        {
          url: 'http://lorempixel.com/200/200/people/',
          name: 'cover',
        },
      ],
      category: category.id,
    });

    await product1.save();
    await product2.save();
    await product3.save();

    await category.save();
  } catch (e) {
    console.error(e);
  }
};
