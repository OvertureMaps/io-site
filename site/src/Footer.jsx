import PropTypes from "prop-types";
export default function Footer({ mode }) {
  return (
    <>
      <div className={`footer ${mode}`}>
        <p className="read-the-docs">
          Head on over to{" "}
          <a href="https://docs.overturemaps.org/how-to" target="_blank">
            {" "}
            the documentation
          </a>{" "}
          to learn more
        </p>
      </div>
    </>
  );
}

Footer.propTypes = {
  mode: PropTypes.string.isRequired,
};
