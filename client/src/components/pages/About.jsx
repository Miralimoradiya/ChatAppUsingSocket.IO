import React from 'react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-center mb-4">
        <img
          src="https://picsum.photos/200/300"
          alt="Image"
          className="rounded-full w-48 h-48"
        />
      </div>
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">John Doe</h1>
        <p className="text-lg text-gray-600">Software Engineer</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded shadow-md p-4">
          <h2 className="text-lg font-bold">Card 1</h2>
          <p className="text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
            libero eius aliquid sunt ullam porro officiis quod, ipsum
            necessitatibus laboriosam quos maxime, eum minima. Architecto
            aliquam voluptate animi, eum unde veritatis explicabo necessitatibus
            rerum Lorem ipsum dolor sit amet consectetur adipisicing elit.,
            distinctio.
          </p>
        </div>
        <div className="bg-white rounded shadow-md p-4">
          <h2 className="text-lg font-bold">Card 2</h2>
          <p className="text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
            libero eius aliquid sunt ullam porro officiis quod, ipsum
            necessitatibus laboriosam quos maxime, eum minima. Architecto
            aliquam voluptate animi, eum unde veritatis explicabo necessitatibus
            rerum Lorem ipsum dolor sit amet consectetur adipisicing elit.,
            distinctio.
          </p>
        </div>
        <div className="bg-white rounded shadow-md p-4">
          <h2 className="text-lg font-bold">Card 3</h2>
          <p className="text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
            libero eius aliquid sunt ullam porro officiis quod, ipsum
            necessitatibus laboriosam quos maxime, eum minima. Architecto
            aliquam voluptate animi, eum unde veritatis explicabo necessitatibus
            rerum Lorem ipsum dolor sit amet consectetur adipisicing elit.,
            distinctio.
          </p>
        </div>
      </div>
    </div>
  );
};


export default About;
