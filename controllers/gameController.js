import axios from "axios";

const tokenStorage = {
  token: null,
  expiration: 0,
};

//gameController helper functions
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

const capitalizeGameName = (videoGameName) => {
  return videoGameName[0].toUpperCase() + videoGameName.slice(1);
};

export const getVideoGamesByName = async (req, res) => {
  const videoGameName = capitalizeGameName(req.params.name);
  console.log(tokenStorage.token);
  try {
    if (tokenStorage.token === null) {
      tokenStorage.token = await getAuthToken();
    }
    const data = `fields name,id,cover.image_id; search "${videoGameName}"; limit 50;`;
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
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
