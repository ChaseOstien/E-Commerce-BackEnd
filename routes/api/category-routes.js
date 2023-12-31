const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
try {
  const category = await Category.findAll({
    include: [{ model: Product}],
  });
  res.status(200).json(category);
} catch (err) {
  res.status(500).json(err);
}
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if(!category) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});  

router.put('/:id', (req, res) => {
  // update a category by its `id` value
    Category.update({ category_name: req.body.category_name }, 
      { where: {id: req.params.id} })
      .then(updatedCategory => {
        res.json(updatedCategory);
      }).catch(err => res.json(err));
  }); // Updates the category with the specified ID

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    }); // Deletes the category with the specified ID.

    if(!category) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
