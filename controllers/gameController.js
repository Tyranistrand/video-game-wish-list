import axios from "axios";
import slugify from "slugify";

// const tokenStorage = {
//   token: null,
//   expiration: 0,
// };

/**
IGDB GetAuth function. Commenting in case I use this again
const getAuthToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.AUTH_BASE_URL}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
    );
    return response.data.access_token;
  } catch (firstError) {
    console.log(`Error getting auth token`);
    throw new Error("Error getting auth token", {
      cause: firstError,
    });
  }
};
*/

const getFormattedVideoGameName = (videoGameName) => {
  const formattedName = slugify(videoGameName, {
    lower: true,
  });
  return formattedName;
};

export const getVideoGamesByName = async (req, res) => {
  const videoGame = getFormattedVideoGameName(req.params.name);
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.gg.deals/v1/prices/by-slug/?slugs=${videoGame}&key=${process.env.DEALS_API_KEY}&region=us`,
    };
    const response = await axios.request(config);
    response.data.videoGame.id = res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const addVideoGameToWishlist = (req, res) => {
  console.log(
    "Placeholder for adding games to the wishlist for specific users",
  );
};
