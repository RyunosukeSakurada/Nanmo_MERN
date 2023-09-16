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
    <nav className='flex flex-col md:flex-row md:items-center md:ml-8  gap-y-4 md:gap-y-0 gap-x-3 text-[8px] md:text-sm cursor-pointer'>
      {links.map((link, index) => (
        <li key={index} className='hover:text-green-700 md:hover:-translate-y-1 duration-300 bg-white md:bg-transparent p-2 md:p-0 rounded-lg md:rounded-none'>
          <span  onClick={() => handleScrollTo(link.id)}>{link.label}</span>
        </li>
      ))}
    </nav>
  );
};

export default Navbar;



