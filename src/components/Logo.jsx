function Logo({ className = "" }) {
  return (
    <h1 className={`logo ${className}`}>
      <span className="logo-master">Master</span>
      <span className="logo-skewb">Skewb</span>
    </h1>
  );
}

export default Logo;