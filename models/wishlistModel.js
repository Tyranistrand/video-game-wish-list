import mongoose from "mongoose";

//TODO: Adding more details here
const wishlistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const WishList = mongoose.model("WishList", wishlistSchema);
