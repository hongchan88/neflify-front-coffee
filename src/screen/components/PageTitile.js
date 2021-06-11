import { Helmet } from "react-helmet-async";
import { PropTypes } from "prop-types";

function Pagetitle({ title }) {
  return (
    <Helmet>
      <title>{title} | CoffeeShop </title>
    </Helmet>
  );
}

Pagetitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Pagetitle;
