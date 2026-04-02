import "./Header.css";
import image from '../../public/note-icon-blue.png';

const Header = () => {
  return (
    <>
    <span className="header">
      <div className="header-container">Note Keeper</div>
      <img src={image} width="120" height="90" />
    </span>
      <hr />
    </>
  );
};

export default Header;
