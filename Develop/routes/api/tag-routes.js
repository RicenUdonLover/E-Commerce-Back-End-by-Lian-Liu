const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    const tags = await Tag.findAll({
      include: [

        {
          model: Product,
          through: ProductTag
          // as: "tagged_products", 
          // attributes: {exclude: ['product_tag']} 
        }
      ]
    });
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  router.get('/:id', async (req, res) => {
    try {
      // find a single tag by its id
      const tag = await Tag.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Product,
            through: ProductTag

            // as: "tagged_products", 
            //   attributes: {exclude: ['product_tag']} 
          }
        ]
      });
      if (!tag) {
        res.status(404).json(`No tag found with this id`);
        return;
      }
      res.json(tag);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
});

router.post('/', async (req, res) => {
  try {
    // create a new tag
    // const { tag_name } = req.body
    const newTag = await Tag.create(req.body);
    res.json(newTag);
    res.json(`New tag successfully created!`)
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a tag's name by its id value
    const updated = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updated) {
      res.status(404).json(`No tag found with this id`);
      return;
    }
    res.json(`Tag updated`);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete one tag by its id value
    const deleted = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleted) {
      res.status(404).json(`No tag found with this id`);
      return;
    }
    res.json(`Tag deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
