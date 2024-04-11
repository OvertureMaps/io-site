import overtureLogo from '/omf_logo_transparent.png';

export default function Header() {
  return (
    <>
      <div>
        <a href="https://overturemaps.org" target="_blank">
          <img
            src={overtureLogo}
            className="logo overture"
            alt="Overture Maps logo"
          />
        </a>
        <div>OvertureMaps.io</div>
      </div>
    </>
  );
}
