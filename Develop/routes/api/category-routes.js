const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    const categories = await Category.findAll({
      include: [{
        model: Product,
        attributes: ['product_name']
      }]
    });
    res.json(categories);
  } catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const category = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Product,
        attributes: ['product_name']
      }]
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(category);
  } catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new category
    const {id, category_name} = req.body
    const newCategory = await Category.create(
      {id: id,
      category_name: category_name}
    );
    res.json(newCategory);
    res.send(`New category successfully created!`)
  } catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const [updated] = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updated) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json({ message: 'Category updated' });
  } catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const deleted = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleted) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json({ message: 'Category deleted' });
  } catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
