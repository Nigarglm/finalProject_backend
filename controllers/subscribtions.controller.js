import Subscribtions from '../models/subscribtions.model.js'; 

// Get all subscriptions
export const getAllSubscribtions = async (req, res) => {
  try {
    const subscriptions = await Subscribtions.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscriptions', error });
  }
};

// Get a single subscription by ID
export const getSingleSubscribtion = async (req, res) => {
  try {
    const subscription = await Subscribtions.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription', error });
  }
};

// Create a new subscription
export const createSubscribtion = async (req, res) => {
  const { name, price, description, userId } = req.body;

  try {
    const newSubscription = new Subscribtions({
      name,
      price,
      description,
      userId,
    });

    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subscription', error });
  }
};

// Edit a subscription
export const editSubscribtion = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const subscription = await Subscribtions.findByIdAndUpdate(id, updates, { new: true });
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subscription', error });
  }
};

// Delete a subscription
export const deleteSubscribtion = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await Subscribtions.findByIdAndDelete(id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscription', error });
  }
};
