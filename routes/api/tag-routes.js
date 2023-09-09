const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tag = await Tag.findAll({
      include: [{ model: Product }], // Includes product data associated with all tags.
    });
    res.status(200).json(tag); //Success response
  } catch (err) {
    res.status(500).json(err); // Error response
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }], // Includes products associated with the specified tag.
    });

    if(!tag) {
      res.status(404).json({ message: 'No tag found with that id!'}); // No tag found response
      return;
    }

    res.status(200).json(tag); // Success response
  } catch (err) {
    res.status(500).json(err); // Error response
  }
  // be sure to include its associated Product data
});

router.post('/',  async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create({
      tag_name: req.body.tag_name, // Tag name must be passed as json in request body.
    });
    res.status(200).json(tag); // Success response
  } catch (err) {
    res.status(400).json(err); // Error response
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({ tag_name: req.body.tag_name }, // Updates the name of the tag specified by the id param in the put request. 
    { where: {id: req.params.id}}) 
    .then(updatedTag => {
      res.json(updatedTag); // Success response
    }).catch(err => res.json(err)); // Error response
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    }); // Deletes the tag specified by the id passed in the request params.

    if (!tag) {
      res.status(404).json({ message: 'No tag found with that id!' }); // No tag found response.
      return;
    }
    res.status(200).json(tag); // Success response
  } catch (err) {
    res.status(500).json(err); // Error response.
  }
});

module.exports = router;
