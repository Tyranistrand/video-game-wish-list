import { WishList } from "../models/wishlistModel";

const getFormattedVideoGameName = (videoGameName) => {
  if (videoGameName.includes(":")) {
    videoGameName = videoGameName.replace(":", "");
  }
  const formattedName = slugify(videoGameName, {
    lower: true,
    trim: true,
  });
  return formattedName;
};

export const getWishList = async (req, res) => {
  //TODO: Get the signed in user's wishlist
};

export const addVideoGameToWishlist = async (req, res) => {
  const videoGameName = getFormattedVideoGameName(req.body.videoGameName);
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.gg.deals/v1/prices/by-slug/?slugs=${videoGameName}&key=${process.env.DEALS_API_KEY}&region=us`,
    };
    const response = await axios.request(config);

    //TODO: Add better logic dealing with null titles
    let name = "";
    let currentPrice = "";

    if (response.data.data[videoGameName] === null) {
      throw new Error("No deals for this title. Add to wishlist? ");
    } else {
      name = response.data.data[videoGameName].title;
      currentPrice = parseFloat(
        response.data.data[videoGameName].prices.currentRetail.toFixed(2),
      );
    }

    const game = await Game.create({
      name: name,
      currentPrice: currentPrice,
    });

    res.status(200).json({
      data: game,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
