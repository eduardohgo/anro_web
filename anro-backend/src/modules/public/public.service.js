const prisma = require("../../config/prisma");

const HOME_PAGE_SLUG = "home";

const getPublicHomeContent = async () => {
  const pageContent = await prisma.pageContent.findUnique({
    where: { slug: HOME_PAGE_SLUG },
  });

  if (!pageContent) {
    return null;
  }

  return pageContent.content;
};

module.exports = {
  getPublicHomeContent,
};
