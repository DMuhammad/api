import { formatDistanceToNow } from "date-fns";
import id from "date-fns/locale/id/index.js";

const fdtn = (date) => {
  return formatDistanceToNow(new Date(Number(date)), {
    addSuffix: true,
    includeSeconds: true,
    locale: id,
  });
};

export { fdtn };
