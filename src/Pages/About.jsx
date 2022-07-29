function About() {
  return (
    <div>
      <h1 className='text-6xl mb-4'>Github Finder</h1>
      <p className='mb-4 text-2xl font-light'>
        A React app to search GitHub profiles and see profile details.
        <a
          style={{ color: 'steelblue', padding: '3px' }}
          href='https://github.com/Philballer/Github-finder-Using-TailwindCSS-'
        >
          Phil Eze
        </a>
      </p>
      <p className='text-lg text-gray-400'>
        Version <span className='text-white'>1.2.1</span>
      </p>
    </div>
  );
}

export default About;
