import User from './user.schema';
import get from 'lodash/get';

async function retrieveUser(req, res) {
  console.info('retrieveUser');
  try {
    let user = await User.findById(req.user._id).lean();

    delete user.password;
    delete user.salt;

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function deleteUser(req, res) {
  console.info('deleteUser');
  try {
    await User.findByIdAndDelete(req.user._id).exec();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function updateUser(req, res) {
  console.info('updateUser');

  try {
    let user = await User.findById(req.user._id).exec();
    if (req.body.name) {
      user.name = req.body.name;
      await user.save();
      res.status(201).json(user);
    } else res.status(300).json(user);
  } catch (err) {
    res.status(get(err, 'code', 500)).json(get(err, 'message', err));
  }
}

async function createUser(req, res) {
  console.info('createUser');

  let user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    image: req.body.image
  });

  try {
    await user.save();
    return res.status(201).send();
  } catch (err) {
    res.status(get(err, 'code', 500)).json(get(err, 'message', err));
  }
}

export default {
  retrieve: retrieveUser,
  delete: deleteUser,
  update: updateUser,
  create: createUser
};
