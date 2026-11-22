import axios from "axios";
import slugify from "slugify";
import { Game } from "../models/gameModel.js";

const tokenStorage = {
  token: null,
  expiration: 0,
};

const getAuthToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.AUTH_BASE_URL}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
    );
    return response.data.access_token;
  } catch (firstError) {
    throw new Error("Error getting auth token", {
      cause: firstError,
    });
  }
};

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

const handleDealResponse = (body) => {
  console.log("Placeholder");
};

const capitalizeGameName = (videoGameName) => {
  return videoGameName[0].toUpperCase() + videoGameName.slice(1);
};

export const getVideoGamesByName = async (req, res) => {
  const videoGameName = capitalizeGameName(req.params.name);
  try {
    if (tokenStorage.token === null) {
      tokenStorage.token = await getAuthToken();
    }
    const data = `fields name,id,cover.image_id; search "${videoGameName}"; limit 10;`;
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.igdb.com/v4/games",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${tokenStorage.token}`,
      },
      data: data,
    };
    const response = await axios.request(config);
    if (response.status === 401) {
      tokenStorage.token = await getAuthToken();
    }
    res.status(200).json({
      message: "success",
      data: response.data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Failure",
      error: error.message,
    });
  }
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
