const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock'],
      through: ProductTag,
      as: 'tag_variations'
    }
})
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  // be sure to include its associated Product data
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findOne({
    attributes: ['id', 'tag_name'],
    where: {
      id: req.params.id 
  },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock'],
      through: ProductTag,
      as: 'tag_variations'
    }
})
.then(dbTagData => {
  if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
  }
  res.json(dbTagData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
  // be sure to include its associated Product data
});

// create a new tag
router.post('/', (req, res) => {
  // expects: { tag_name: 'black'}
  Tag.create({ tag_name: req.body.tag_name })
  .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  // expects: { tag_name: 'black'}
  Tag.update(req.body, {
    individualHooks: true,
    where: {
        id: req.params.id 
    }
})
    .then(dbTagData => {
        if (!dbTagData[0]) {
            res.status(404).json({ message: 'No tag found with this id'});
            return;
        }
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete one tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
        id: req.params.id 
    },
})
    .then(dbTagData => {
        if (!dbTagData) {
            res.status(404).json({ message: 'No tag found with this id'});
            return;
        }
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
