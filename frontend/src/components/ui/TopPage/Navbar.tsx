const Navbar = () => {
  const links = [
    { label: 'Nanmoとは', id: 'about' },
    { label: '選ばれる理由', id: 'reason' },
    { label: 'よくある質問', id: 'questions' },
    { label: 'お問い合わせ', id: 'contact' },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className='flex items-center list-none ml-8 gap-x-3 text-sm cursor-pointer'>
      {links.map((link, index) => (
        <li key={index} className='hover:text-green-700 hover:-translate-y-1 duration-300'>
          <span  onClick={() => handleScrollTo(link.id)}>{link.label}</span>
        </li>
      ))}
    </nav>
  );
};

export default Navbar;


