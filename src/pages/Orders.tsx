import { Link } from "react-router";
import { ROUTES } from "../routes/routePaths";

const Orders = () => {
  return (
    <div className="md:w-6/8 w-full md:p-8 py-10 flex flex-col gap-6">
      <p className="md:text-xl text-lg font-[var(--font-regular)]  md:leading-8 leading-6 mb-10">
        Browse <Link className="text-amber-800" to={ROUTES.ALL_PRODUCTS}>products</Link> No order has been
        made yet.
      </p>
    </div>
  );
};

export default Orders;
