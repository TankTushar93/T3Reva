import React from 'react';

// Data for the blog posts
const blogPosts = [
  {
    image: 'https://t3-reva.t3planet.de/fileadmin/_processed_/1/2/csm_Corporate_7_efb1272534.jpg',
    category: 'Software',
    title: 'How Buy Now, Pay Later Could Transform Traditional B2B Trade Finance Models',
    date: 'December 23rd 2005',
    author: 'admin',
    comments: '0',
    excerpt: 'There are more questions that need answers before significant disruption to current models, such as the credit card...',
  },
  {
    image: 'https://t3-reva.t3planet.de/fileadmin/_processed_/3/3/csm_Corporate_8_280faaa1b3.jpg',
    category: 'Business',
    title: 'Hiring Your Startup’s First Customer Success Lead',
    date: 'November 23rd 2010',
    author: 'admin',
    comments: '0',
    excerpt: 'Customer success (CS) is one of the most critical functions of a startup.',
  },
  {
    image: 'https://t3-reva.t3planet.de/fileadmin/_processed_/1/3/csm_Corporate_5_8cf78dc8b9.jpg',
    category: 'Software',
    title: 'This Entrepreneur Is Bringing The In-Person Bazaar',
    date: 'November 23rd 2009',
    author: 'admin',
    comments: '0',
    excerpt: 'Digital marketplaces continue to be a staple of the e-commerce world today.',
  },
    {
        image: 'https://t3-reva.t3planet.de/fileadmin/_processed_/1/2/csm_Corporate_7_efb1272534.jpg',
        category: 'Software',
        title: 'How Buy Now, Pay Later Could Transform Traditional B2B Trade Finance Models',
        date: 'December 23rd 2005',
        author: 'admin',
        comments: '0',
        excerpt: 'There are more questions that need answers before significant disruption to current models, such as the credit card...',
    },
    {
        image: 'https://t3-reva.t3planet.de/fileadmin/_processed_/3/3/csm_Corporate_8_280faaa1b3.jpg',
        category: 'Business',
        title: 'Hiring Your Startup’s First Customer Success Lead',
        date: 'November 23rd 2010',
        author: 'admin',
        comments: '0',
        excerpt: 'Customer success (CS) is one of the most critical functions of a startup.',
    },
    {
        image: 'https://t3-reva.t3planet.de/fileadmin/_processed_/1/3/csm_Corporate_5_8cf78dc8b9.jpg',
        category: 'Software',
        title: 'This Entrepreneur Is Bringing The In-Person Bazaar',
        date: 'November 23rd 2009',
        author: 'admin',
        comments: '0',
        excerpt: 'Digital marketplaces continue to be a staple of the e-commerce world today.',
    },
];

// Reusable Card Component
const Card = ({ image, category, title, date, author, comments, excerpt }) => {
  return (
    <div className="bg-white  shadow-md overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full cursor-pointer h-auto object-cover transform transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6  flex flex-col flex-grow">
        <span className="text-blue-500 text-center bg-gray-100 w-22 p-1 text-sm   mb-5">
          {category}
        </span>

        <h3 className="text-xl text-cyan-500 font-bold  mb-5 transition-colors duration-200 hover:text-blue-500 cursor-pointer">
          {title}
        </h3>

        {/* Meta Info */}
        <div className="flex  items-center text-gray-500 text-sm mb-5">
          <span className="flex justify-center gap-1 text-md items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {date}
          </span>
          <span className="flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
           <p className=''> {author}</p>
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            {comments}
          </span>
        </div>

        {/* Excerpt */}
        <p className="text-gray-500 text-lg mb-5 flex-grow">
          {excerpt}
        </p>

        {/* Read More Link */}
        <a href="/how-buy-now-pay-later-could-transform-traditional-b2b-trade-finance-models" className="text-blue-500 font-semibold mb-5 flex items-center ">
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 8.5l4 4-4 4M21 12H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

// Main Blog Section Component
const Blog = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <Card
            key={index}
            image={post.image}
            category={post.category}
            title={post.title}
            date={post.date}
            author={post.author}
            comments={post.comments}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;