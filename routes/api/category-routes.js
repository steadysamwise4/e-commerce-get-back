const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  })
  .then(dbCategoryData => {
    res.json(dbCategoryData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
});
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    attributes: ['id', 'category_name'],
    where: { id: req.params.id },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
  }
    res.json(dbCategoryData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
});
  // be sure to include its associated Products
});

// create a new category
router.post('/', (req, res) => {
  // expects { category_name: 'Pants'}
  Category.create({ category_name: req.body.category_name })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
