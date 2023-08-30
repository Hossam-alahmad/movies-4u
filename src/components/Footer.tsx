import { Link } from "react-router-dom";
import { icons } from "../utils/icons";

const links = [
  { id: 1, name: "Terms of use", url: "#" },
  { id: 2, name: "Privacy policy", url: "#" },
  { id: 3, name: "About", url: "#" },
  { id: 4, name: "Blog", url: "#" },
  { id: 5, name: "FAQ", url: "#" },
];

const socialLinks = [
  {
    id: 1,
    icon: icons.facebook,
    url: "https://www.facebook.com/hossma.alahmd",
  },
  { id: 2, icon: icons.instagram, url: "#" },
  {
    id: 3,
    icon: icons.github,
    url: "https://github.com/Hossam-alahmad",
  },
  {
    id: 4,
    icon: icons.linkedIn,
    url: "https://www.linkedin.com/in/hossam-alahmed/",
  },
];
const Footer = () => {
  return (
    <div className="footer bg-black-light/30  text-secondary ">
      <div className="container mx-auto w-full md:w-3/4 p-10">
        <div className="">
          <ul className=" mb-4 flex justify-center gap-4 flex-wrap">
            {links.map((link) => (
              <li key={link.id} className="p-4 hover:text-primary text-lg">
                <Link to={link.url} className="block">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-zinc-400 text-center mb-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem nulla,
            est iusto quis ipsam corrupti blanditiis quod consectetur placeat
            inventore at minus. Quos ducimus doloremque distinctio id!
            Inventore, laudantium amet. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Rem nulla, est iusto quis ipsam corrupti
            blanditiis quod consectetur placeat inventore at minus. Quos ducimus
            doloremque distinctio id! Inventore, laudantium amet.
          </p>

          <ul className="social-links flex justify-center gap-4 text-xl mb-10">
            {socialLinks.map((socialLink) => (
              <li
                key={socialLink.id}
                className=" hover:bg-primary transition-all bg-black-light/50 w-[50px] h-[50px] rounded-full"
              >
                <Link
                  to={socialLink.url}
                  target="_blank"
                  className="w-full h-full flex justify-center items-center"
                >
                  {socialLink.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="bg-black-light/50 text-center p-2">
        All right reserved 2023 &copy; by{" "}
        <Link
          target="_blank"
          to="https://www.linkedin.com/in/hossam-alahmed/"
          className="text-primary"
        >
          Hosam Alahmad
        </Link>
      </p>
    </div>
  );
};

export default Footer;
