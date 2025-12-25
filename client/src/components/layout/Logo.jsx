import logoImage from '../../assets/images/Logo.jpeg';

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logoImage}   
        alt="CodeLore Logo"
        className="h-8 w-8 rounded-xl object-cover"
      />
      <span className="font-semibold text-sm md:text-base tracking-wide">
        CodeLore
      </span>
    </div>
  );
}

export default Logo;