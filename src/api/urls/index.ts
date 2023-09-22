import loginUrls from "./loginUrls";
import publicUrls from "./publicUrls";
import homeUrls from "./homeUrl";

const Urls = {
  ...publicUrls,
  ...homeUrls,
  login: loginUrls,
};

export default Urls;
