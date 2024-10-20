import Publication from "../models/Publication.js";

export const createNewPublication = async (publicationData, sellerId) => {
  const publication = new Publication({
    ...publicationData,
    seller: sellerId,
  });
  return await publication.save();
};
