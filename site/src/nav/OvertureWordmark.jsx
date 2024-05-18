import overtureLogo from "/omf_logo_transparent.png";

export default function OvertureWordmark() {
  return (
    <a
      href="https://overturemaps.org"
      target="_blank"
      rel="noopener noreferrer"
      className="navbar__brand"
    >
      <div className="navbar__logo">
        <img
          src={overtureLogo}
          alt="Overture Maps Foundation Logo"
          className="themedComponent_mlkZ themedComponent--light_NVdE"
        />
      </div>
      <b className="navbar__title">Overture Maps</b>
    </a>
  );
}
